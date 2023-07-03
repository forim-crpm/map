
<template>
  <div class="OSCOtherFiltersBar" :shown="isShown" v-if="isShown">
    <Button label="Réinitialiser" uppercase="true" small="true"  class="OSCOtherFiltersBar__resetBtn" />
    <div class="OSCOtherFiltersBar__filtersCtn">
      <AutocompleteFilter label="Association" />
      <AutocompleteFilter label="Pays" />
      <AutocompleteFilter label="Thématique" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app'
import AutocompleteFilter from '@/components/AutocompleteFilter.vue'
import Button from '@/components/Button.vue'

@Component({
  components: { AutocompleteFilter, Button }
})
export default class OSCOtherFiltersBar extends Vue {

  get isShown() {
    return useAppStore().isOtherFiltersShown
  }
}
</script>

<style lang="less">
.OSCOtherFiltersBar {
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 1.5rem 1.25rem 1.5rem;
  border-bottom: @mixin-divider-border;

  .OSCOtherFiltersBar__resetBtn {
    align-self: flex-end;
    transform-origin: right;
  }

  &[shown="false"] {
    display: none;
  }

  .OSCOtherFiltersBar__filtersCtn {
    display: flex;
    flex-flow: row wrap;
    gap: 1.5rem;

    > * {
      flex: 1 0 calc(33.33% - 1.5rem);
    }
  }
}
</style>