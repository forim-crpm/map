
<template>
  <div class="OSCTypeFiltersBar">
    <div class="OSCTypeFiltersBar__ctn">
      <h3 class="OSCTypeFiltersBar__count">{{ oscCountLabel }}</h3>
      <OSCTypeFilters />
      <div class="OSCTypeFiltersBar__divider"></div>
      <Button label="Autres filtres" :icon="'mdi-eye' + (isOtherFiltersShown ? '-off' : '') + '-outline'" @click="toggleOtherFiltersBar" />
    </div>
    <div class="OSCTypeFiltersBar__ctn">
      <div class="OSCTypeFiltersBar__divider"></div>
      <img :src="logoPath" alt="Logo CRPM"  class="OSCTypeFiltersBar__crpmLogo">
      <Button label="Téléchargements" :uppercase="true" icon="mdi-download-circle-outline" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import OSCTypeFilters from '@/views/OSCTypeFilter/OSCTypeFilters.vue'
import Button from '@/components/Button.vue'
import { useAppStore } from '@/stores/app'

@Component({
  components: { OSCTypeFilters, Button }
})
export default class OSCTypeFiltersBar extends Vue {
  get oscCount() {
    return 156
  }
  get oscCountLabel() {
    return this.oscCount + " OSC affiché" + (this.oscCount > 1 ? 's' : '')
  }
  get logoPath() {
    return '/img/logo-crpm.svg'
  }

  get isOtherFiltersShown() {
    return useAppStore().isOtherFiltersShown;
  }

  toggleOtherFiltersBar() {
    useAppStore().isOtherFiltersShown = !this.isOtherFiltersShown
  }
}
</script>

<style lang="less">
.OSCTypeFiltersBar {
  background: white;
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border-right: @mixin-divider-border;
  max-height: 100vh;

  .OSCTypeFiltersBar__ctn {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  .OSCTypeFiltersBar__count {
    color: @color-primary;
    font-size: 1.25rem;
    font-weight: bold;
    height: 2rem;
  }

  .OSCTypeFiltersBar__divider {
    width: 100%;
    border-top: @mixin-divider-border;
  }

  img.OSCTypeFiltersBar__crpmLogo {
    width: 70%;
    align-self: center;
  }
}
</style>