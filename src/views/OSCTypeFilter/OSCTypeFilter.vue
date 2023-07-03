
<template>
  <div class="OSCTypeFilter" v-if="oscType !== undefined">
    <input type="checkbox" :name="oscType.value" :id="oscType.value" :checked="oscType.isActive" @change="toggleFilter">
    <label :for="oscType.value" :style="'background-color: ' + color + ';'">{{ oscType.label }}</label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator'
import type OSCType from '@/model/interfaces/OSCType'
import { useFilterStore } from '@/stores/filters'

@Component({})
export default class OSCTypeFilter extends Vue {

  @Prop({ default: 0 })
  index!: number

  @Prop({ default: {} })
  oscType!: OSCType

  get color(): string {
    if (this.oscType.isActive || useFilterStore().isAllOSCTypeFiltersInactive) {
      return this.oscType.color;
    }
    return '#EEEEEE'
  }

  toggleFilter(e: any) {
    useFilterStore().oscTypes[this.index].isActive = e.target.checked;
  }
}
</script>

<style lang="less">
.OSCTypeFilter {
  input {
    display: none;
    &:checked ~ label {
    }
  }
  label {
    cursor: pointer;
    @dim-filter-h: 2.5rem;
    padding: 0 1rem;
    height: @dim-filter-h;
    min-height: @dim-filter-h;
    border-radius: calc(@dim-filter-h / 2);
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    font-weight: 500;
    font-size: @font-s;
    user-select: none;
  }
}
</style>