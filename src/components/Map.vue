<template>
  <div id="map"></div>
</template>

<script lang="ts">
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Vue, Component, Watch } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app';
import { useFilterStore } from '@/stores/filters';
import type OSCType from "@/model/interfaces/OSCType";

@Component({})
export default class Map extends Vue {
  map: any = null

  layers = {
    OSC: 'osc'
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
    this.map.on('load', () => {
      this.initMap()
    })
  }

  get isInfoPanelShown() {
    return useAppStore().isInfoPanelShown;
  }

  get padding() {
    return {
      left: this.isInfoPanelShown ? 360 : 0
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

  initMap() {
    this.updateOscMap()
  }

  updateOscMap() {
    this.addOscSource()
    this.addOscLayer()
  }

  addOscSource() {
    if (!this.map.getSource(this.layers.OSC)) {
      // let data = MapService.getGeoJSON()
      let data = 'https://maplibre.org/maplibre-gl-js-docs/assets/earthquakes.geojson'
      this.map.addSource(this.layers.OSC, {
        type: 'geojson',
        data: data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      })
    }
  }

  addOscLayer() {
    if (this.map.getLayer(this.layers.OSC) === undefined) {
      this.map.addLayer({
        id: this.layers.OSC + '-clusters-bg',
        type: 'circle',
        source: this.layers.OSC,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#2B5B39',
          'circle-radius': 40,
          'circle-opacity': 0.15
        }
      });

      this.map.addLayer({
        id: this.layers.OSC + '-clusters',
        type: 'circle',
        source: this.layers.OSC,
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#2B5B39',
          'circle-radius': 20
        }
      });

      this.map.addLayer({
        id: this.layers.OSC + '-cluster-count',
        type: 'symbol',
        source: this.layers.OSC,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          // 'text-font': ['Cabin', 'Arial'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#fff'
        }
      });

      Promise.all(
        useFilterStore().oscTypes.map((oscType: OSCType) => new Promise<void>((resolve, reject) => {
          this.map.loadImage(`./img/pins/pin_${oscType.value}.png`, (error: any, res: any) => {
            this.map.addImage(`${oscType.value}-marker`, res);
            resolve();
          })
        }))
      ).then(() => {
        useFilterStore().oscTypes.forEach((oscType, key) => {
          this.map.addLayer({
            id: oscType.value + '-unclustered-point',
            type: 'symbol',
            source: this.layers.OSC,
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': `${oscType.value}-marker`,
              'icon-anchor': 'bottom',
              // 'icon-rotate': key * 15,
              'icon-allow-overlap': true,
            }
          });
        })
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
          background-image: url(./img/icons/mdi-image-filter-center-focus-strong-outline.svg);
        }
      }
    }
  }
}</style>