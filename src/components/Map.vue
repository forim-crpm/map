<template>
  <div id="map"></div>
</template>

<script lang="ts">
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Vue, Component, Watch } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app';

@Component({})
export default class Map extends Vue {
  map: any = null

  async mounted() {
    this.map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
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
      this.map.addControl(new maplibregl.FullscreenControl({container: body}));
    }
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
          background-image: url(/img/icons/mdi-plus.svg);
        }
      }
      &.maplibregl-ctrl-zoom-out {
        order: -1;
        .maplibregl-ctrl-icon {
          background-image: url(/img/icons/mdi-minus.svg);
        }
      }

      &.maplibregl-ctrl-fullscreen, &.maplibregl-ctrl-shrink {
        .maplibregl-ctrl-icon {
          background-image: url(/img/icons/mdi-image-filter-center-focus-strong-outline.svg);
        }
      }
    }
  }
}
</style>