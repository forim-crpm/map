
<template>
  <div class="AutocompleteFilter">
    <label>{{ label }}</label>
    <v-autocomplete
      v-model="selected"
      :items="data"
      item-value="value"
      item-title="label"
      id="autocomplete"
      rounded="xl"
      placeholder="Sélectionner..."
      variant="outlined"
      multiple
      return-object
    />
  </div>
</template>

<script lang="ts">
import type FilterItem from '@/model/interfaces/FilterItem'
import { Vue, Prop, Component, Emit, Watch } from 'vue-facing-decorator'

@Component({})
export default class AutocompleteFilter extends Vue {

  selected: FilterItem[] = []

  @Prop({ default: "Button label" })
  label!: string

  @Prop({ default: [] })
  data!: FilterItem[]

  @Watch('selected')
  selectedWatcher() {
    this.onSelected()
  }

  @Emit()
  onSelected(): FilterItem[] {
    return this.selected
  }
}
</script>

<style lang="less">
.v-list-item-title {

  font-size: @font-s !important;
  font-family: @font-primary !important;
}
.AutocompleteFilter {
  display: flex;
  flex-flow: column nowrap;
  gap: .44rem;
  font-size: @font-s;

  label {
    margin-left: .5rem;
  }

  .v-input__control {

    max-height: 2.5rem !important;
    display: flex;

    .v-field--focused .v-autocomplete__selection {
      display: none;
    }

    .v-field__input {
      --v-input-control-height: 2.5rem;
      align-items: center;
      gap: 0.25rem;
      align-self: stretch;
      padding: 0.5rem 0.75rem 0.5rem 1.5rem !important;
      font-size: @font-s !important;
      font-family: @font-primary !important;
      height: 2.5rem !important;
      overflow: hidden;
      min-height: inherit;
      input {
        margin: 0;
        align-self: inherit !important;
        position: inherit;
        transform: inherit;
        top: inherit;
        padding: 0 !important;
        font-weight: 600 !important;
        &::placeholder {
          font-size: @font-s !important;
          font-weight: 600 !important;
          font-family: @font-primary !important;
          color: black;
          opacity: 1 !important;
        }
      }
    }
  }

  .v-input__details {
    display: none;
  }
  .v-field__outline {
      border: solid 1px @color-grey !important;
      border-radius: 4rem;
      > * {
        border-width: 0 !important;
      }
    }

}
</style>