
<template>
  <div class="OSCTypeFilters">
    <OSCTypeFilter :oscType="oscType" v-for="(oscType, key) in oscTypes" :key="key" :index="key" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { useFilterStore } from '@/stores/filters'
import OSCTypeFilter from '@/views/OSCTypeFilter/OSCTypeFilter.vue'

@Component({
  components: { OSCTypeFilter }
})
export default class OSCTypeFilters extends Vue {

  get oscTypes() {
    return useFilterStore().oscTypes
  }

  get oscCount() {
    return 156
  }
  get oscCountLabel() {
    return this.oscCount + " OSC affichés"
  }
}
</script>

<style lang="less">
.OSCTypeFilters {
  display: flex;
  flex-flow: column nowrap;
  gap: .75rem;
}
</style>