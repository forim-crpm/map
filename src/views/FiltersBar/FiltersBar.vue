
<template>
  <div class="FiltersBar" :shown="isShown" v-if="isShown">
    <Button label="Réinitialiser" uppercase="true" small="true"  class="FiltersBar__resetBtn" @click="resetFilters" />
    <div class="FiltersBar__filtersCtn">
      <AutocompleteFilter label="Pays" :reset="resetTrigger" :data="countriesData" @on-selected="(countries: FilterItem[]) => updateCountries(countries.map((c: FilterItem) => c.value))"/>
      <AutocompleteFilter label="Thématique" :reset="resetTrigger" :data="thematicsData" @on-selected="(thematics: FilterItem[]) => updateThematics(thematics.map((t: FilterItem) => t.value))"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app'
import { useFilterStore } from '@/stores/filters'
import AutocompleteFilter from '@/components/AutocompleteFilter.vue'
import Button from '@/components/Button.vue'
import type Thematic from '@/model/interfaces/Thematic';
import type Association from '@/model/interfaces/Association'
import type FilterItem from '@/model/interfaces/FilterItem'

@Component({
  components: { AutocompleteFilter, Button }
})
export default class FiltersBar extends Vue {

  get isShown() {
    return useAppStore().isFiltersBarShown
  }

  get filterStore() {
    return useFilterStore()
  }

  get countriesData(): FilterItem[]  {
    return useFilterStore().countries.map((country: Association['country']) => {
      return {
        label: country,
        value: country
      }
    })
  }

  get thematicsData(): FilterItem[] {
    return useFilterStore().thematics.map((thematic: Thematic) => {
      return {
        label: thematic.label,
        value: thematic.value
      }  
    })
  }

  get resetTrigger() {
    return useFilterStore().resetTrigger
  }

  resetFilters() {
    useFilterStore().countriesFilter = []
    useFilterStore().thematicsFilter = []
    useFilterStore().resetTrigger = !this.resetTrigger
    useFilterStore().search = ''
  }

  updateCountries(countries: Association['country'][]) {
    useFilterStore().countriesFilter = countries
  }

  updateThematics(thematics: Thematic['value'][]) {
    useFilterStore().thematicsFilter = thematics
  }
}
</script>

<style lang="less">
.FiltersBar {
  display: flex;
  flex-flow: column nowrap;
  padding: .75rem 1.5rem 1.25rem 1.5rem;
  border-bottom: @mixin-divider-border;

  .FiltersBar__resetBtn {
    align-self: flex-end;
    transform-origin: right;
  }

  &[shown="false"] {
    display: none;
  }

  .FiltersBar__filtersCtn {
    display: flex;
    flex-flow: row wrap;
    gap: 1.5rem;

    > * {
      flex: 1 0 calc(33.33% - 1.5rem);
    }
  }
}
</style>