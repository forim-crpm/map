
<template>
  <div class="AssociationBar">
    <div class="AssociationBar__ctn AssociationBar__ctn--top">
      <div class="AssociationBar__head">
        <h3 class="AssociationBar__count">{{ associationsCountLabel }}</h3>
        <Button @click="toggleFiltersBar" class="AssociationBar__toggleFiltersBtn" :label="toggleFiltersLabel" :uppercase="true" :small="true" :toggled="isFiltersBarShown"
          :icon="toggleFiltersIcon" />
      </div>
      <InputSearch />
      <AssociationList />
      <v-switch :class="'AssociationBar__switchMap' + (isMapSynced ? ' active' : '')" label="Synchroniser avec la carte" inset hide-details="auto" v-model="filterStore.isMapSynced"></v-switch>
    </div>
    <div class="AssociationBar__ctn AssociationBar__ctn--bottom">
      <div class="AssociationBar__divider"></div>
      <img :src="logoPath" alt="Logo CRPM"  class="AssociationBar__crpmLogo">
      <Button @click="openAboutModal" class="AssociationBar__aboutBtn" label="À propos du projet" :uppercase="true"
        icon="mdi-information-variant-circle-outline" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import AssociationList from '@/views/AssociationBar/AssociationList.vue'
import Button from '@/components/Button.vue'
import InputSearch from '@/components/InputSearch.vue'
import { useAppStore } from '@/stores/app'
import { useAssociationStore } from '@/stores/associations'
import { useFilterStore } from '@/stores/filters'
import type Association from '@/model/interfaces/Association'

@Component({
  components: { AssociationList, Button, InputSearch }
})
export default class AssociationBar extends Vue {
  
  get associations(): Association[] {
    return useAssociationStore().associations
  }

  get filteredAssociations(): Association[] {
    return useAssociationStore().filteredAssociations
  }

  get associationsCount(): number {
    return this.associations.length
  }

  get filteredAssociationsCount(): number {
    return this.filteredAssociations.length
  }

  get associationsCountLabel(): string {
    return this.filteredAssociationsCount + " association" + (this.filteredAssociationsCount > 1 ? 's' : '') + " sur " + this.associationsCount
  }

  get logoPath() {
    return './img/logos/forim-subtitle.jpg'
  }

  get isFiltersBarShown() {
    return useAppStore().isFiltersBarShown;
  }

  get isMapSynced() {
    return useFilterStore().isMapSynced;
  }

  get filterStore() {
    return useFilterStore()
  }

  get toggleFiltersLabel() {
    return this.isFiltersBarShown ? 'Masquer' : 'Filtrer'
  }

  get toggleFiltersIcon() {
    return this.isFiltersBarShown ? 'mdi-window-close' : 'mdi-filter-variant'
  }

  toggleFiltersBar() {
    useAppStore().isFiltersBarShown = !this.isFiltersBarShown
  }

  openAboutModal() {
    useAppStore().isAboutModalShown = true
  }
}
</script>

<style lang="less">
.AssociationBar {
  background: white;
  padding: 1rem 1rem 1.5rem 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border-right: @mixin-divider-border;
  max-height: 100vh;

  .AssociationBar__ctn {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    &--top {
      flex: 1;
      overflow-y: auto;

      .AssociationBar__head {
        display: flex;
        align-items: center;
        gap: 1rem;
        align-self: stretch; 
        justify-content: space-between;
      }

      .AssociationBar__switchMap {
        flex: 0;
      }
    }

    &--bottom {
      gap: 1rem;
      align-items: center;
    }
  }

  .AssociationBar__count {
    color: @color-grey-3;
    font-size: 1.25rem;
    font-weight: bold;
    height: 2rem;
    display: flex;
    align-items: center;
  }

  .AssociationBar__divider {
    width: 100%;
    border-top: @mixin-divider-border;
  }

  img.AssociationBar__crpmLogo {
    width: 11rem;
    align-self: center;
  }
}
</style>