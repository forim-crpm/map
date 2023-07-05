
<template>
  <div class="InfoPanel" :shown="isInfoPanelShown && association != null" v-if="association != null">
    <img class="InfoPanel__closeIcon" :src="getIconUrl('mdi-window-close')" alt="Fermer le panneau"
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
    </div>
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
        <h2>Échelle territoriale d’intervention</h2>
        <span>{{ association.intervention }}</span>
      </div>
      <div class="InfoPanel__descItem" v-if="association.dialog">
        <h2>Niveau de dialogue institutionnel</h2>
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
  width: @dim-osc-info-panel-w;
  padding: 4rem 1.5rem 1.25rem 1.5rem;
  position: relative;
  transition: all .3s ease-out;

  &[shown="false"] {
    transform: translateX(-100%);
  }

  .InfoPanel__closeIcon {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.5rem;
    margin: 1rem;
    cursor: pointer;
  }

  .InfoPanel__head {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.25rem;

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

  .InfoPanel__statusCtn {
    h2 {
      font-family: @font-secondary;
      line-height: 1.5rem;
    }

    .InfoPanel__statusRow {
      line-height: 2.25rem;
      display: flex;
      flex-flow: row nowrap;
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

}</style>