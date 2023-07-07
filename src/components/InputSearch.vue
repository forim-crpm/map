<template>
  <input class="InputSearch" type="search" :placeholder="placeholder" @keyup="updateSearch" />
</template>

<script lang="ts">
import { useFilterStore } from '@/stores/filters';
import { Vue, Prop, Component } from 'vue-facing-decorator'

@Component({})
export default class InputSearch extends Vue {

  @Prop({ default: "Rechercher une association" })
  placeholder!: string

  updateSearch(e: any) {
    useFilterStore().search = e.target.value
  }
}
</script>

<style lang="less">
.InputSearch {
  display: flex;
  flex-flow: row nowrap;
  height: 2.5rem;
  padding: 0rem 1rem 0rem 3rem;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border-radius: calc(2.5rem / 2);
  border: solid 1px @color-black-faded-2;
  background: white;
  cursor: pointer;
  transition: all .15s ease-in;
  background: url(../img/icons/search.svg) 1rem center no-repeat;

  &:focus, &:active, &:focus-visible {
    outline-color: @color-primary;
    border-color: @color-primary;
    outline: none;
  }

  font-size: @font-s;
  font-family: @font-primary;
  font-weight: 600;

  img {
    max-height: 65%;
  }
}
</style>