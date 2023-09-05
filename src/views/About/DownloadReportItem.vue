
<template>
  <a class="DownloadReportItem" :href="'./reports/' + downloadReport.filename" download>
    <h3 class="DownloadReportItem__name">{{ downloadReport.name }}</h3>
    <img :src="'./img/icons/mdi-download-circle-outline-grey.svg'" alt="Download icon">
  </a>
</template>

<script lang="ts">
import type DownloadReport from '@/model/interfaces/DownloadReport';
import { Vue, Component, Prop } from 'vue-facing-decorator'

@Component({})
export default class DownloadReportItem extends Vue {

  @Prop({ default: "Button label" })
  downloadReport!: DownloadReport
}
</script>

<style lang="less">
.DownloadReportItem {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 2rem;
  gap: .5rem;
  background: #f0f0f0;
  padding: .5rem .75rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all .15s ease-in;

  &:hover {
    background: #e0e0e0;
  }

  h3 {
    font-weight: 700;
    font-size: 1.1rem;
    color: @color-black-faded-3;
    text-decoration: none;
  }
}
</style>