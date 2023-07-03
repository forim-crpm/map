
<template>
  <div class="AutocompleteFilter">
    <label>{{ label }}</label>
    <v-autocomplete
      id="autocomplete"
      placeholder="Sélectionner..."
      variant="outlined"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-facing-decorator'

@Component({})
export default class AutocompleteFilter extends Vue {

  @Prop({ default: "Button label" })
  label!: string

  @Prop({ default: false })
  fill?: boolean

  @Prop({ default: false })
  uppercase?: boolean

  @Prop({ default: null })
  icon?: string

  get iconUrl(): string {
    return './img/icons/' + this.icon + '.svg'
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
      gap: 0.625rem;
      align-self: stretch;
      padding: 0.5rem 0.75rem 0.5rem 1.5rem !important;
      font-size: @font-s !important;
      font-family: @font-primary !important;
      height: 2.5rem !important;
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