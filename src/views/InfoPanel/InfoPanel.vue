
<template>
  <div class="InfoPanel" :shown="isInfoPanelShown && association != null" v-if="association != null">
    <img class="InfoPanel__closeIcon" :src="getIconUrl('mdi-window-close-white')" alt="Fermer le panneau"
      @click="closeInfoPanel">
    <div class="InfoPanel__head">
      <h1>{{ association.name }}</h1>
      <a v-if="association.websiteUrl" :href="association.websiteUrl" target="_blank">
        {{ association.websiteUrl }}
        <img :src="getIconUrl('mdi-open-in-new')" alt="Nouvel onglet">
      </a>
    </div>
    <div class="InfoPanel__email" v-if="association.emails && association.emails.length && association.emails[0] != ''">
      <CopyToClipboard :label="association.emails[0]" />
      <div class="InfoPanel__otherEmailCtn" v-if="association.emails.length > 1">
        <span class="InfoPanel__otherEmail" v-for="email in association.emails.slice(1)" >{{ email }}</span>
      </div>
    </div>
    <div class="InfoPanel__scrollableCtn">
      <div class="InfoPanel__statusCtn">
        <h2 v-if="association.status">{{ association.status }}</h2>
        <div class="InfoPanel__statusRow">
          <span class="InfoPanel__creationDate" v-if="association.year">Créée en {{ association.year }}</span>
          <span class="InfoPanel__cost" v-if="association.budget">{{ association.budget }}</span>
        </div>
      </div>
      <div class="InfoPanel__divider"></div>
      <div class="InfoPanel__descCtn">
        <div class="InfoPanel__descItem" v-if="association.intervention">
          <h2>Territoires d’intervention</h2>
          <span>{{ association.intervention }}</span>
        </div>
        <div class="InfoPanel__descItem" v-if="association.dialog">
          <h2>Liens et dialogue avec des institutions</h2>
          <span>{{ association.dialog }}</span>
        </div>
        <div class="InfoPanel__descItem" v-if="association.thematics.length">
          <h2>Thématiques d’intervention</h2>
          <ul>
            <li v-for="(thematic, key) in association.thematics" :key="key">{{ getThematic(thematic) }}</li>
          </ul>
        </div>
      </div>
      <div class="InfoPanel__divider"></div>
      <div class="InfoPanel__location" v-if="association.adress">
        <img :src="getIconUrl('map-marker')" alt="Localisation icon">
        <span>{{ association.adress }}</span>
      </div>
      <div class="InfoPanel__updatedAt" v-if="association.updatedAt">Mise à jour {{ association.updatedAt }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app'
import CopyToClipboard from '@/components/CopyToClipboard.vue'
import { useAssociationStore } from '@/stores/associations';
import { useFilterStore } from '@/stores/filters';
import type Association from '@/model/interfaces/Association';
import type Thematic from '@/model/interfaces/Thematic';

@Component({
  components: { CopyToClipboard }
})
export default class InfoPanel extends Vue {

  @Watch("association")
  associationWatcher() {
    useAppStore().isInfoPanelShown = true
  }

  get isInfoPanelShown() {
    return useAppStore().isInfoPanelShown;
  }

  get association(): Association|null {
    return useAssociationStore().activeAssociation;
  }

  getIconUrl(icon: string): string {
    return './img/icons/' + icon + '.svg'
  }

  getThematic(thematicKey: Thematic['value']): Thematic['label']|null {
    return useFilterStore().getThematicName(thematicKey)
  }

  closeInfoPanel() {
    useAppStore().isInfoPanelShown = false
  }
}
</script>

<style lang="less">
.InfoPanel {
  width: 20rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  background: @color-primary;
  color: white;
  height: 100%;
  width: @dim-association-info-panel-w;
  padding-top: 4rem;
  padding-bottom: 1.25rem;
  position: relative;
  transition: all .3s ease-out;

  > * {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  &[shown="false"] {
    transform: translateX(100%);
  }

  .InfoPanel__scrollableCtn {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    flex: 1 0 0;
    overflow-y: auto;
  }

  .InfoPanel__closeIcon {
    position: absolute;
    padding: 0;
    right: 0;
    top: 0;
    width: 1.5rem;
    margin: 1rem;
    cursor: pointer;
  }

  .InfoPanel__head {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.375rem;

    h1 {
      font-size: @font-m;
      font-weight: 700;
      line-height: 2rem;
    }

    a {
      color: white;
      text-decoration: none;
      font-size: @font-s;
      font-family: @font-secondary;
      display: flex;
      align-items: center;

      img {
        margin-left: .25rem;
        width: 0.75rem;
      }
    }
  }

  .InfoPanel__email {
    display: flex;
    flex-flow: column nowrap;
    gap: .5rem;
    text-transform: lowercase;

    .InfoPanel__otherEmailCtn {
      font-size: @font-s;
      opacity: 0.7;
      margin-left: 1rem;
      display: flex;
      flex-flow: column nowrap;
      gap: .25rem;
    }
  }

  .InfoPanel__statusCtn {
    display: flex;
    flex-flow: column nowrap;
    gap: .5rem;
    h2 {
      font-family: @font-secondary;
      line-height: 1.5rem;
    }

    .InfoPanel__statusRow {
      line-height: 2.25rem;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      text-transform: uppercase;
      font-size: @font-s;
      font-weight: 700;
      letter-spacing: 0.07813rem;

      .InfoPanel__creationDate {}

      .InfoPanel__cost {}
    }
  }

  .InfoPanel__divider {
    border-top: solid 1px #fff;
  }

  .InfoPanel__descCtn {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    .InfoPanel__descItem {
      h2 {
        font-size: @font-s;
        font-family: @font-secondary;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: 0.01563rem;
        opacity: 0.7;
      }
      span {
        line-height: 1.5rem;
      }
      ul {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.25rem;
        margin-left: 1rem;

        li {
          list-style: inside;
          font-family: @font-secondary;
          line-height: 1.25rem;
        }
      }
    }
  }

  .InfoPanel__location {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    gap: 1rem;

    img {
      width: 1.5rem;
    }

    span {
      font-size: @font-s;
      font-family: @font-secondary;
      line-height: 1.5rem;
      white-space: pre-line;
    }
  }

  .InfoPanel__updatedAt {
    opacity: 0.7;
    font-family: @font-secondary;
    text-align: right;
    font-size: @font-s;
  }

}</style>