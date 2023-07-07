<template>
  <v-app class="App">
    <AssociationBar class="App__ctn App__ctn--left" />
    <div class="App__ctn App__ctn--right">
      <FiltersBar />
      <OSCMap />
    </div>
    <AboutModal />
    <RedirectionConfirmModal />
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
  flex-flow: row nowrap;
  height: 100%;

  .v-application__wrap {
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
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
      flex: 1 0 auto;

      .OSCMap {
        flex: 1 0 auto;
      }
    }
  }
}
</style>
