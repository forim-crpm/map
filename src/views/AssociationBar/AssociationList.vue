
<template>
  <div class="AssociationList" ref="associationlist">
    <AssociationListItem :association="association" v-for="(association, key) in associations" :key="key" :index="key" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from 'vue-facing-decorator'
import { useAssociationStore } from '@/stores/associations'
import AssociationListItem from '@/views/AssociationBar/AssociationListItem.vue'
import type Association from '@/model/interfaces/Association'

@Component({
  components: { AssociationListItem }
})
export default class AssociationList extends Vue {

  @Ref
  readonly associationlist!: HTMLDivElement

  get associations(): Association[] {
    return useAssociationStore().filteredAssociations
  }

  @Watch('associations')
  associationsWatcher() {
    if (this.associationlist) {
      this.associationlist.scrollTop = 0
    }
  }
}
</script>

<style lang="less">
.AssociationList {
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  flex: 1;
}
</style>