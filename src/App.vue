<template>
  <v-app class="App">
    <h1 class="App__title">
      
      <img :src="'./img/icons/mdi-travel.svg'" alt="Map icon">
      Cartographie des <b><span class="hide-sm">Organisations de la Société Civile (</span>OSC<span class="hide-sm">)</span> africaines actives sur les enjeux migratoires</b></h1>
    <div class="App__content">
      <AssociationBar class="App__ctn App__ctn--left" />
      <div class="App__ctn App__ctn--right">
        <FiltersBar />
        <OSCMap />
      </div>
      <AboutModal />
      <RedirectionConfirmModal />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { useAssociationStore } from '@/stores/associations'
import { useFilterStore } from '@/stores/filters'
import OSCMap from '@/views/OSCMap/OSCMap.vue'
import AssociationBar from '@/views/AssociationBar/AssociationBar.vue'
import FiltersBar from '@/views/FiltersBar/FiltersBar.vue'
import AboutModal from '@/views/About/AboutModal.vue'
import RedirectionConfirmModal from '@/views/Contribution/RedirectionConfirmModal.vue'
import AssociationService from '@/services/AssociationService'

import type Association from '@/model/interfaces/Association'

@Component({
  components: { OSCMap, AssociationBar, FiltersBar, AboutModal, RedirectionConfirmModal }
})
export default class App extends Vue {
  
  async mounted() {
    const associations: Association[] = await AssociationService.readAssociationDb();
    useAssociationStore().associations = associations;
    useFilterStore().countries = [...new Set(associations.map(association => association.country))].sort();
  }
}

</script>

<style lang="less">
@import '@/assets/less/main.less';

.App {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  .v-application__wrap {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    max-height: 100%;

    
    .App__content {
      display: flex;
      flex-flow: row nowrap;
      flex: 1 0 auto;
      height: 0;
    }

    h1.App__title {
      display: inline-flex;
      align-items: center;
      white-space: pre-wrap;
      font-size: 1.05rem;
      padding: 1rem;
      color: @color-primary;
      background: white;
      z-index: 1;
      line-height: 1.4em;
      width: 100%;
      border-bottom: @mixin-divider-border;
      
      b {
        font-weight: 700;
      }
      img {
        height: 1.6rem;
        margin-right: .375rem;
      }
    }

  }

  .AssociationListItemsBar {
    z-index: 1;
    position: relative;
  }

  &__ctn {
    &--left {
      min-width: @dim-association-bar-w;
      max-width: @dim-association-bar-w;
    }

    &--right {
      display: flex;
      flex-flow: column nowrap;
      flex: 1 1 auto;
      max-width: 100%;

      .OSCMap {
        flex: 1 0 auto;
      }
    }
  }
}
</style>
