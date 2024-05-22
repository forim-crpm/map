<template>
  <div id="map"></div>
</template>

<script lang="ts">
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Vue, Component, Watch } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app';
import MapService from "@/services/MapService";
import ResetMapExtentControl from "@/components/MapControls/ResetMapExtentControl";
import { useAssociationStore } from "@/stores/associations";
import type Association from "@/model/interfaces/Association";
import { useFilterStore } from "@/stores/filters";

@Component({})
export default class Map extends Vue {
  map: any = null
  geojsonData: any = null
  defaultZoomExtent = null

  layers = {
    ASSOC: 'association',
    ASSOC_CLUSTER: 'association-cluster',
    ASSOC_CLUSTER_COUNT: 'association-cluster-count',
    ASSOC_CLUSTER_BG: 'association-cluster-bg',
    UNCLUSTERED_POINT: 'unclustered-point'
  }

  async mounted() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/dataviz/style.json?key=0tupl15DKhXOvwp27x8c',
      // style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 1,
    })

    this.setMapPadding()

    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    // Add zoom control
    var nav = new maplibregl.NavigationControl({
      showCompass: false,
    });
  
    this.map.addControl(nav, 'top-right');
    this.map.addControl(new ResetMapExtentControl)

    // Add fullscreen control
    const body = document.querySelector('body')
    if (body !== null) {
      this.map.addControl(new maplibregl.FullscreenControl({ container: body }));
    }

    this.initMapSyncFilter()
  }

  get filterPin() {
    return  [
      'case',
      ['in',
        ['get', 'id'],
        ['literal', [
          this.hoveredAssociationId,
          this.activeAssociationId
        ].filter(f => f)]
      ], 'marker-active',
      'marker'
    ]
  }

  updatePins() {
    if (this.map.getLayer(this.layers.UNCLUSTERED_POINT) !== undefined) {
      this.map.setLayoutProperty(this.layers.UNCLUSTERED_POINT, 'icon-image', this.filterPin)
    }
  }

  @Watch('activeAssociationId')
  activeAssociationIdWatcher() {
    if (this.activeAssociation !== null) {
      this.zoomToAssociation(this.activeAssociation)
    }
    this.updatePins()
  }

  @Watch('hoveredAssociationId')
  hoveredAssociationIdWatcher() {
    this.updatePins()
  }

  @Watch("isInfoPanelShown")
  infoPanelWatcher() {
    this.setMapPadding()
  }

  @Watch("associations")
  associationsWatcher() {
    this.updateOscMap()
  }

  @Watch("triggerZoomReset")
  zoomResetWatcher() {
    this.fitBounds(true)
  }

  @Watch("filteredAssociationsWithoutMapFilter")
  filteredAssociationsWithoutMapFilterWatcher(newVal: Association[], oldVal: Association[]) {
    if (newVal !== oldVal) {
      if (!useFilterStore().isMapSynced) {
        this.fitBounds()
      } else {
        this.setMapFilter()
      }
    }
  }

  @Watch("filteredAssociations", {
    deep: true
  })
  filteredAssociationsWatcher() {
    this.addOscSource()
  }

  get isInfoPanelShown(): boolean {
    return useAppStore().isInfoPanelShown;
  }

  get associations(): Association[] {
    return useAssociationStore().associations;
  }

  get filteredAssociations(): Association[] {
    return useAssociationStore().filteredAssociations;
  }

  get filteredAssociationsWithoutMapFilter(): Association[] {
    return useAssociationStore().filteredAssociationsWithoutMapFilter;
  }

  get filteredAssociationsId(): Association['id'][] {
    return this.filteredAssociations.map((association: Association) => association.id);
  }

  get activeAssociationId(): Association['id'] | null {
    return useAssociationStore().activeAssociationId;
  }

  get hoveredAssociationId(): Association['id'] | null {
    return useAssociationStore().hoveredAssociationId;
  }

  get activeAssociation(): Association | null {
    return useAssociationStore().activeAssociation;
  }

  get triggerZoomReset(): boolean {
    return useAppStore().triggerZoomReset;
  }

  get padding() {
    const padding = 30
    return {
      top: padding,
      bottom: padding,
      left: padding,
      right: (this.isInfoPanelShown ? 360 : 0) + padding
    }
  }

  get geojson(): any {
    return MapService.getGeoJSON()
  }

  setMapPadding() {
    this.map.easeTo({
      padding: this.padding,
      duration: 300 // In ms, CSS transition duration property for the sidebar matches this value
    });
  }

  async setMapFilter() {
    if (this.map.getLayer(this.layers.UNCLUSTERED_POINT) !== undefined) {

      const features = this.map.queryRenderedFeatures({ layers: [this.layers.UNCLUSTERED_POINT, this.layers.ASSOC_CLUSTER] });
      const source = this.map.getSource(this.layers.ASSOC)
      let associations: Association['id'][] = []
      await features.forEach(async (feature: any) => {
        const clusterId = feature.properties.cluster_id
        const pointCount = feature.properties.point_count
        if (clusterId !== undefined) {
          await source.getClusterLeaves(clusterId, pointCount, 0, (err: any, clusterFeatures: any) => {
            if (clusterFeatures !== undefined) {
              let associationIds = clusterFeatures.map((feature: any) => feature.id)
              associations.push(...associationIds)
            }
          })
        } else {
          await associations.push(feature.id)
        }
      })

      // Buggy
      setTimeout(() => {
        return useFilterStore().mapShownAssociations = associations
      }, 200)
    }
  }

  initMapSyncFilter() {
    this.map.on('moveend', async () => {
      await this.setMapFilter()
    })
  }

  initMap() {
    this.updateOscMap()
  }

  updateOscMap() {
    this.addOscSource()
    this.addOscLayer()
    this.addClusterClickEvent()
    this.addTooltipOnHover()
    this.updateAssociationOnClick()
    this.fitBounds()
  }

  addOscSource() {
    let data = this.geojson
    if (!this.map.getSource(this.layers.ASSOC)) {
      this.map.addSource(this.layers.ASSOC, {
        type: 'geojson',
        data: data,
        cluster: true,
        clusterMaxZoom: 11,
        clusterRadius: 50,
        attribution: 'Developed by <b><a href="https://cartong.org" target="_blank">CartONG</a></b>'
      })
    } else {
      this.map.getSource(this.layers.ASSOC).setData(this.geojson)
    }
  }

  addOscLayer() {
    if (this.map.getLayer(this.layers.ASSOC) === undefined) {
      this.map.addLayer({
        id: this.layers.ASSOC_CLUSTER_BG,
        type: 'circle',
        source: this.layers.ASSOC,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#558B2F',
          'circle-radius': 40,
          'circle-opacity': 0.15
        }
      });

      this.map.addLayer({
        id: this.layers.ASSOC_CLUSTER,
        type: 'circle',
        source: this.layers.ASSOC,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#558B2F',
          'circle-radius': 20
        }
      });

      this.map.addLayer({
        id: this.layers.ASSOC_CLUSTER_COUNT,
        type: 'symbol',
        source: this.layers.ASSOC,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 12,
          'text-font': ["Open Sans Bold", "Arial Unicode MS Bold"]
        },
        paint: {
          'text-color': '#fff'
        }
      });
      this.map.loadImage(`./img/pins/pin_active.png`, (error: any, res: any) => {
        if (error) throw error;
        this.map.addImage(`marker-active`, res);
      })
      this.map.loadImage(`./img/pins/pin_orange.png`, (error: any, res: any) => {
        if (error) throw error;

        if (this.map.hasImage('marker')) {
          this.map.removeImage('marker')
        }

        this.map.addImage(`marker`, res);
        this.map.addLayer({
          id: this.layers.UNCLUSTERED_POINT,
          type: 'symbol',
          source: this.layers.ASSOC,
          filter: ['!', ['has', 'point_count']],
          layout: {
            'icon-image': this.filterPin,
            'icon-allow-overlap': true,
            // 'text-field': ["step", ["zoom"], "", 8.5, ['get', 'name']],
            // 'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            // 'text-radial-offset': 1.8,
            // 'text-size': 12,
            // 'text-justify': 'auto',
            // 'text-font': ["Arial Unicode MS Regular", "Open Sans Regular"]
          },
          // paint: {
          //   'text-halo-width': 2,
          //   'text-halo-color': '#fff',
          // }
        });
      })
    }
  }

  updateAssociationOnClick() {
    this.map.on('click', this.layers.UNCLUSTERED_POINT, (e: any) => {
      useAssociationStore().activeAssociationId = e.features[0].properties.id;
    })
  }

  addClusterClickEvent() {
    this.map.on('click', this.layers.ASSOC_CLUSTER, (e: any) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [this.layers.ASSOC_CLUSTER]
      });
      const clusterId = features[0].properties.cluster_id;
      this.map.getSource(this.layers.ASSOC).getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
        if (err) return;
        this.map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
        }
      );
    })

    this.map.on('mouseenter', this.layers.ASSOC_CLUSTER, (e: any) => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', this.layers.ASSOC_CLUSTER, () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  zoomToAssociation(association: Association) {
    const currentZoom = this.map.getZoom()
    const neededZoom = 12
    this.map.flyTo({
      center: [association.coords.y, association.coords.x],
      zoom: currentZoom < neededZoom ? neededZoom : currentZoom,
      padding: this.padding,
      bearing: 0,
      speed: 3,
      curve: 1,
      easing: function (t: any) {
        return t;
      },
      essential: true
    });
  }

  addTooltipOnHover() {

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('mouseenter', this.layers.UNCLUSTERED_POINT, (e: any) => {
      this.map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.features[0].geometry.coordinates.slice();
      var associationName = e.features[0].properties.name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const popupHtml = `<h3>${associationName}</h3><span>Cliquez pour plus d'informations</span>`

      popup.setLngLat(coordinates).setHTML(popupHtml).addTo(this.map);
      popup.addClassName('show');
      
      useAssociationStore().hoveredAssociationId = e.features[0].properties.id;
    });

    this.map.on('mouseleave', this.layers.UNCLUSTERED_POINT, () => {
      this.map.getCanvas().style.cursor = '';
      popup.removeClassName('show');
      useAssociationStore().hoveredAssociationId = null;
    });
  }

  fitBounds(reset = false) {
    let features = this.geojson.features
    if (features.length) {
      const bounds = MapService.getBounds(features)

      // Store default bounds
      if (this.defaultZoomExtent === null) {
        this.defaultZoomExtent = bounds
      }

      this.map.fitBounds(reset ? this.defaultZoomExtent : bounds, {
        padding: 30
      })
    }
  }

}
</script>

<style lang="less">
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  .maplibregl-ctrl-bottom-right {
    z-index: 0;
    font-family: @font-secondary;
  }

  .maplibregl-popup {
    top: -1.5rem;
    transition: opacity .15s ease-in;
    opacity: 0;
    pointer-events: none;

    &.show {
      opacity: 1;
    }
  }

  .maplibregl-popup-content {
    background: @color-primary;
    pointer-events: none;
    color: white;
    padding: .75rem 1rem;
    max-width: 30rem;
    width: fit-content;
    gap: 0.25rem;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0;
    box-shadow: none;

    h3 {
      font-size: @font-s;
      font-family: @font-secondary;
      font-weight: 400;
      line-height: 1.375rem;
      font-weight: 600;
    }
    
    span {
      font-size: 0.75rem;
    }
  }

  .maplibregl-popup-tip {
    display: none;
  }

  .maplibregl-ctrl-top-right {
    margin: 1.5rem;
    display: flex;
    flex-flow: column nowrap;
    gap: 0.62rem;
  }

  .maplibregl-ctrl-group {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.62rem;
    background: none;
    box-shadow: none;
    margin: 0;
    transition: all .15s ease-in;

    button {
      background: @color-primary;
      color: white;
      @dim-map-btn-w: 2.5rem;
      width: @dim-map-btn-w;
      height: @dim-map-btn-w;
      border-radius: 0.3125rem;
      border-width: 0;
      position: relative;

      &:hover {
        &::after {
          transform: scale(1);
          opacity: 1;
        }
      }

      &::after {
        background: fade(@color-primary, 100%);
        z-index: 8;
        position: absolute;
        border-radius: 4px;
        padding: .25rem .5rem;
        right: 100%;
        top: 0;
        bottom: 0;
        margin: auto .5rem;
        height: fit-content;
        white-space: nowrap;
        transform-origin: right center;
        transform: scale(0);
        opacity: 0;
        pointer-events: none;
        transition: all .15s ease-in;
      }

      &.maplibregl-ctrl-zoom-in {
        &::after {
          content: "Zoomer";
        }
        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-plus.svg);
        }
      }

      &.maplibregl-ctrl-zoom-out {
        order: -1;

        &::after {
          content: "Dézoomer";
        }
        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-minus.svg);
        }
      }

      &.maplibregl-ctrl-shrink::after {
        content: "Quitter le plein écran";
      }
      &.maplibregl-ctrl-fullscreen::after {
        content: "Ouvrir en plein écran";
      }

      &.maplibregl-ctrl-fullscreen,
      &.maplibregl-ctrl-shrink {
        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-zoom-out.svg);
          background-size: 70%;
        }
      }

      &.maplibregl-ctrl-zoom-extent {
        &::after {
          content: "Revenir à l'étendue globale";
        }
        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-image-filter-center-focus-strong-outline.svg);
        }
      }
    }
  }
}
</style>