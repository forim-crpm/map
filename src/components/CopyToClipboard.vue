
<template>
  <div class="CopyToClipboard">
    <span>{{ label }}</span>
    <img :src="iconUrl" alt="Copier" @click="copyToClipboard" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-facing-decorator'

@Component({})
export default class CopyToClipboard extends Vue {

  @Prop({ default: "" })
  label!: string

  copying = false

  get iconUrl(): string {
    return '/img/icons/' + (this.copying ? 'done' : 'mdi-content-copy') + '.svg'
  }

  copyToClipboard() {
    const self = this
    function listener(e: any) {
      self.copying = true
      setTimeout(() => (self.copying = false), 1500)

      e.clipboardData.setData("text/html", self.label)
      e.clipboardData.setData("text/plain", self.label)
      e.preventDefault()
    }
    document.addEventListener("copy", listener)
    document.execCommand("copy")
    document.removeEventListener("copy", listener)
  }
}
</script>

<style lang="less">
.CopyToClipboard {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 2.5rem;
  padding: 0rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: calc(2.5rem / 2);
  width: 100%;
  background: @color-green-accent-2;

  img {
    width: 1.5rem;
    cursor: pointer;
  }

  span {
    font-weight: 600;
    font-size: @font-s;
  }
}
</style>