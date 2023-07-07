
<template>
  <div class="OSCMap" :info-panel-shown="isInfoPanelShown">
    <InfoPanel />
    <Map />
    <Button
      label="Renseigner une association"
      class="OSCMap__newAssocBtn"
      :uppercase="true"
      icon="mdi-add"
      :fill="true"
      @click="openRedirectionModal"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app'
import Map from '@/components/Map.vue'
import Button from '@/components/Button.vue'
import InfoPanel from '@/views/InfoPanel/InfoPanel.vue'

@Component({
  components: { Map, Button, InfoPanel }
})
export default class OSCMap extends Vue {
  openInfoPanel() {
    useAppStore().isInfoPanelShown = true
  }

  openRedirectionModal() {
    useAppStore().isRedirectionModalShown = true
  }
  
  get isInfoPanelShown() {
    return useAppStore().isInfoPanelShown;
  }
}
</script>

<style lang="less">
.OSCMap {
  position: relative;
  overflow: hidden;
  
  &[info-panel-shown="true"] {
    .maplibregl-ctrl-top-right, .OSCMap__newAssocBtn {
      right: @dim-association-info-panel-w;
      transition: all .15 ease-in;
    }
  }

  .OSCMap__newAssocBtn {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 1.5rem;
    transition: all .15 ease-in;
  }

  .InfoPanel {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
</style>