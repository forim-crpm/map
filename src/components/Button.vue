<template>
  <button class="Button" :uppercase="uppercase" :fill="fill" :small="small">
    <img v-if="icon !== null" :src="iconUrl" :alt="icon">
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-facing-decorator'

@Component({})
export default class Button extends Vue {

  @Prop({ default: "Button label" })
  label!: string

  @Prop({ default: false })
  fill?: boolean

  @Prop({ default: false })
  uppercase?: boolean

  @Prop({ default: false })
  small?: boolean

  @Prop({ default: null })
  icon?: string

  get iconUrl(): string {
    return './img/icons/' + this.icon + '.svg'
  }
}
</script>

<style lang="less">
.Button {
  display: flex;
  flex-flow: row nowrap;
  height: 2.5rem;
  padding: 0rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: calc(2.5rem / 2);
  // border: solid 1px @color-grey-2;
  border: solid 1px @color-green-accent-2;
  width: fit-content;
  background: white;
  cursor: pointer;
  transition: border-width .15s ease-in;;

  img {
    max-height: 65%;
  }

  span {
    font-weight: 600;
    font-size: @font-s;
  }

  &[uppercase='true'] {
    span {
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.07813rem;
    }
  }

  &[fill='true'] {
    background: @color-green-accent-2;
    border-color: @color-green-accent-2;
    span {
      color: white;
    }
  }

  &[small='true'] {
    transform: scale(.8);
  }
}
</style>