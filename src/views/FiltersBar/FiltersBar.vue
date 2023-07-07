
<template>
  <div class="FiltersBar" :shown="isShown" v-if="isShown">
    <Button label="Réinitialiser" uppercase="true" small="true"  class="FiltersBar__resetBtn" @click="resetFilters" />
    <div class="FiltersBar__filtersCtn">
      <AutocompleteFilter label="Pays" :data="countries" @on-selected="(countries: any) => updateCountries(countries)"/>
      <AutocompleteFilter label="Thématique" :data="thematics" @on-selected="(thematics: any) => updateThematics(thematics)"/>
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

@Component({
  components: { AutocompleteFilter, Button }
})
export default class FiltersBar extends Vue {

  get isShown() {
    return useAppStore().isFiltersBarShown
  }

  get countries() {
    return useFilterStore().countries
  }

  get thematics() {
    return useFilterStore().thematics.map(t => t.label)
  }

  resetFilters() {
    useFilterStore().countriesFilter = []
    useFilterStore().thematicsFilter = []
    useFilterStore().search = ''
  }

  updateCountries(countries: string[]) {
    useFilterStore().countriesFilter = countries
  }

  updateThematics(thematics: Thematic['label'][]) {
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