
<template>
  <div class="OSCMap">
    <InfoPanel />
    <Map />
    <Button @click="openAboutModal" class="OSCMap__aboutBtn" label="À propos du projet" :uppercase="true" :fill="true"
      icon="mdi-information-variant-circle-outline" />
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

  openAboutModal() {
    useAppStore().isAboutModalShown = true
  }
}
</script>

<style lang="less">
.OSCMap {
  position: relative;
  overflow: hidden;

  .OSCMap__aboutBtn {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 1.5rem;
  }

  .InfoPanel {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>