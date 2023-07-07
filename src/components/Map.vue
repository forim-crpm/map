<template>
  <div id="map"></div>
</template>

<script lang="ts">
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Vue, Component, Watch } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app';
import MapService from "@/services/MapService";
import { useAssociationStore } from "@/stores/associations";
import type Association from "@/model/interfaces/Association";
import { useFilterStore } from "@/stores/filters";

@Component({})
export default class Map extends Vue {
  map: any = null
  geojsonData: any = null

  layers = {
    ASSOC: 'association',
    UNCLUSTERED_POINT: 'unclustered-point'
  }

  async mounted() {
    this.map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://api.maptiler.com/maps/dataviz/style.json?key=0tupl15DKhXOvwp27x8c', // style URL
      // style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1, // starting zoom
    })

    this.setMapPadding()

    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    // Add zoom control
    var nav = new maplibregl.NavigationControl({
      showCompass: false,
    });
    this.map.addControl(nav, 'top-right');

    // Add fullscreen control
    const body = document.querySelector('body')
    if (body !== null) {
      this.map.addControl(new maplibregl.FullscreenControl({ container: body }));
    }
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

  get activeAssociationId(): Association['id']|null {
    return useAssociationStore().activeAssociationId;
  }

  get activeAssociation(): Association|null {
    return useAssociationStore().activeAssociation;
  }

  @Watch('activeAssociationId')
  activeAssociationIdWatcher(newVal: Association['id'], oldVal: Association['id']) {
    if (this.activeAssociation !== null) {
      this.zoomToAssociation(this.activeAssociation)
    }
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

  setMapPadding() {
    this.map.easeTo({
      padding: this.padding,
      duration: 300 // In ms, CSS transition duration property for the sidebar matches this value
    });
  }

  @Watch("isInfoPanelShown")
  infoPanelWatcher() {
    this.setMapPadding()
  }

  @Watch("associations")
  associationsWatcher() {
    
    this.updateOscMap()
    
    if (useFilterStore().isMapSynced) {
      console.log("deokdoekdoke")
      this.initMapSyncFilter()
    }
  }

  initMapSyncFilter() {
    this.map.on('moveend', async () => {
      const features = this.map.queryRenderedFeatures({ layers: [this.layers.UNCLUSTERED_POINT, this.layers.ASSOC + '-clusters'] });
      const source = this.map.getSource(this.layers.ASSOC)
      let associations: Association['id'][] = []
      await features.forEach(async (feature: any) => {
        const clusterId = feature.properties.cluster_id
        const pointCount = feature.properties.point_count
        if (clusterId !== undefined) {
          await source.getClusterLeaves(clusterId, pointCount, 0, (err: any, clusterFeatures: any) => {
            let associationIds = clusterFeatures.map((feature: any) => feature.id)
            associations.push(...associationIds)
          })
        } else {
          await associations.push(feature.id)
        }
      })

      // Buggy
      setTimeout(() => {
        return useFilterStore().mapShownAssociations = associations
      }, 200)
    })
  }

  initMap() {
    this.updateOscMap()
  }

  updateOscMap() {
    this.addOscSource()
    this.addOscLayer()
    this.addTooltipOnHover()
    this.updateAssociationOnClick()
    this.fitBounds()
  }

  get geojson(): any {
    if (this.geojsonData === null) {
      this.geojsonData = MapService.getGeoJSON()
    }
    return this.geojsonData
  }

  addOscSource() {
    if (!this.map.getSource(this.layers.ASSOC)) {
      let data = this.geojson
      this.map.addSource(this.layers.ASSOC, {
        type: 'geojson',
        data: data,
        cluster: true,
        clusterMaxZoom: 11,
        clusterRadius: 50
      })
    }
  }

  addOscLayer() {
    if (this.map.getLayer(this.layers.ASSOC) === undefined) {
      this.map.addLayer({
        id: this.layers.ASSOC + '-clusters-bg',
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
        id: this.layers.ASSOC + '-clusters',
        type: 'circle',
        source: this.layers.ASSOC,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#558B2F',
          'circle-radius': 20
        }
      });

      this.map.addLayer({
        id: this.layers.ASSOC + '-cluster-count',
        type: 'symbol',
        source: this.layers.ASSOC,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 12,
        },
        paint: {
          'text-color': '#fff'
        }
      });

      this.map.loadImage(`./img/pins/pin_orange.png`, (error: any, res: any) => {
        if (error) throw error;
        this.map.addImage(`marker`, res);
        this.map.addLayer({
          id: this.layers.UNCLUSTERED_POINT,
          type: 'symbol',
          source: this.layers.ASSOC,
          filter: ['!', ['has', 'point_count']],
          layout: {
            'icon-image': `marker`,
            'icon-allow-overlap': true,
            'text-field': ["step", ["zoom"], "", 8.5, ['get', 'name']],
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': 1.8,
            'text-size': 12,
            'text-justify': 'auto',
            'text-font': ["Arial Unicode MS Regular", "Open Sans Regular"]
          },
          paint: {
            'icon-opacity': ["case", ['!', ['has', 'point_count']], 1, 0],
            'text-halo-width': 2,
            'text-halo-color': '#fff',
          }
        });
      })
    }
  }

  updateAssociationOnClick() {
    this.map.on('click', this.layers.UNCLUSTERED_POINT, (e: any) => {
      useAssociationStore().activeAssociationId = e.features[0].properties.id;
    })
  }

  zoomToAssociation(association: Association) {
    const currentZoom = this.map.getZoom()
    const neededZoom = 12
    this.map.flyTo({
      center: [association.coords.y , association.coords.x],
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

      const popupHtml = `<h3>${associationName}</h3><span>Plus d'infos</span>`

      popup.setLngLat(coordinates).setHTML(popupHtml).addTo(this.map);
      popup.addClassName('show');
    });

    this.map.on('mouseleave', this.layers.UNCLUSTERED_POINT, () => {
      this.map.getCanvas().style.cursor = '';
      popup.removeClassName('show');
    });
  }

  fitBounds() {
    let features = this.geojson.features
    const bounds = MapService.getBounds(features)
    this.map.fitBounds(bounds, {
      padding: this.padding
    })
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
    max-width: 25rem; 
    width: fit-content;
    gap: 0.5rem;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0;
    box-shadow: none;

    h3 {
      font-size: @font-s;
      font-family: @font-secondary;
      font-weight: 400;
      line-height: 1.375rem;
    }

    span {
      text-decoration: underline;
      font-size: @font-s;
      font-weight: 600; 
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

      &.maplibregl-ctrl-zoom-in {
        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-plus.svg);
        }
      }

      &.maplibregl-ctrl-zoom-out {
        order: -1;

        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-minus.svg);
        }
      }

      &.maplibregl-ctrl-fullscreen,
      &.maplibregl-ctrl-shrink {
        .maplibregl-ctrl-icon {
          background-image: url(../img/icons/mdi-image-filter-center-focus-strong-outline.svg);
        }
      }
    }
  }
}
</style>