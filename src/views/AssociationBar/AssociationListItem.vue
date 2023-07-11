
<template>
  <div
    class="AssociationListItem"
    v-if="association !== undefined"
    :active="isActive"
    @click="updateActiveAssociation(association.id)"
    @mouseover="updateHoveredAssociation(association.id)"
    @mouseleave="updateHoveredAssociation(null)"
    >{{ association.name }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator'
import type Association from '@/model/interfaces/Association'
import { useAssociationStore } from "@/stores/associations";
import { useAppStore } from '@/stores/app';

@Component({})
export default class AssociationListItem extends Vue {

  @Prop({ default: 0 })
  index!: number

  @Prop({ default: {} })
  association!: Association

  get activeAssociationId(): Association['id']|null {
    return useAssociationStore().activeAssociationId
  }

  get isActive(): boolean {
    return this.activeAssociationId === this.association.id
  }

  updateActiveAssociation(id: Association['id']) {
    if (id === this.activeAssociationId) {
      useAppStore().isInfoPanelShown = false
      setTimeout(() => useAssociationStore().activeAssociationId = null, 300)
    } else {
      useAssociationStore().activeAssociationId = id;
    }
  }

  updateHoveredAssociation(id: Association['id']|null) {
    useAssociationStore().hoveredAssociationId = id
  }
}
</script>

<style lang="less">
.AssociationListItem {
  max-width: 100%;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 2.5rem;
  padding: .5rem 1rem;
  gap: 2rem;
  border-radius: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: @font-s;
  font-weight: 600;
  transition: all .15s ease-in;
  cursor: pointer;
  line-height: 1.375rem;
  flex-shrink: 0;

  &:hover, &[active="true"] {
    background: rgba(251, 140, 0, 0.20);
    color: #FF5252;
  }
}
</style>