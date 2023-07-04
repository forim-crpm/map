<script setup lang="ts">
import OSCMap from '@/views/OSCMap/OSCMap.vue'
import OSCTypeFiltersBar from '@/views/OSCTypeFilter/OSCTypeFiltersBar.vue'
import OSCOtherFiltersBar from '@/views/OSCOtherFilter/OSCOtherFiltersBar.vue'
import AboutModal from '@/views/About/AboutModal.vue'
</script>

<template>
  <div class="App">
    <OSCTypeFiltersBar class="App__ctn App__ctn--left" />
    <div class="App__ctn App__ctn--right">
      <OSCOtherFiltersBar />
      <OSCMap />
    </div>
    <AboutModal />
  </div>
</template>

<style lang="less">
@import '@/assets/less/main.less';

.App {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;

  .OSCTypeFiltersBar {
    z-index: 1;
    position: relative;
  }

  &__ctn {
    &--left {
      min-width: @dim-ost-type-filter-bar-w;
    }

    &--right {
      display: flex;
      flex-flow: column nowrap;
      flex: 1 0 auto;

      .OSCMap {
        flex: 1 0 auto;
      }
    }
  }
}
</style>
