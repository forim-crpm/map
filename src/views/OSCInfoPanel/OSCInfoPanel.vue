
<template>
  <div class="OSCInfoPanel" :shown="isInfoPanelShown">
    <img class="OSCInfoPanel__closeIcon" :src="getIconUrl('mdi-window-close')" alt="Fermer le panneau" @click="closeInfoPanel">
    <div class="OSCInfoPanel__head">
      <h1>Nom de l'association</h1>
      <a href="" target="_blank">site-internet.com <img :src="getIconUrl('mdi-open-in-new')" alt="Nouvel onglet"></a>
    </div>
    <div class="OSCInfoPanel__email">
      <CopyToClipboard label="mail@site-internet.com" />
    </div>
    <div class="OSCInfoPanel__statusCtn">
      <h2>Statut de l'association</h2>
      <div class="OSCInfoPanel__statusRow">
        <span class="OSCInfoPanel__creationDate">Créée en 1968</span>
        <span class="OSCInfoPanel__cost">200 000 €</span>
      </div>
    </div>
    <div class="OSCInfoPanel__divider"></div>
    <div class="OSCInfoPanel__descCtn">
      <div class="OSCInfoPanel__descItem">
        <h2>Échelle territoriale d’intervention</h2>
        <span>Lorem ipsum</span>
      </div>
      <div class="OSCInfoPanel__descItem">
        <h2>Niveau de dialogue institutionnel</h2>
        <span>Lorem ipsum</span>
      </div>
      <div class="OSCInfoPanel__descItem">
        <h2>Thématiques d’intervention</h2>
        <ul>
          <li>Cohésion sociale et vivre ensemble, lutte contre les discriminations</li>
          <li>Droit et Protection de Migrants</li>
          <li>Education et santé</li>
          <li>Enfants et migration</li>
        </ul>
      </div>
    </div>
    <div class="OSCInfoPanel__divider"></div>
    <div class="OSCInfoPanel__location">
      <img :src="getIconUrl('map-marker')" alt="Localisation icon">
      <ul>
        <li>adresse postale</li>
        <li>adresse postale</li>
        <li>adresse postale</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { useAppStore } from '@/stores/app'
import CopyToClipboard from '@/components/CopyToClipboard.vue'

@Component({
  components: { CopyToClipboard }
})
export default class OSCInfoPanel extends Vue {

  get isInfoPanelShown() {
    return useAppStore().isInfoPanelShown;
  }

  getIconUrl(icon: string): string {
    return '/img/icons/' + icon + '.svg'
  }

  closeInfoPanel() {
    useAppStore().isInfoPanelShown = false
  }
}
</script>

<style lang="less">

.OSCInfoPanel {
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

  .OSCInfoPanel__closeIcon {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.5rem;
    margin: 1rem;
    cursor: pointer;
  }
  .OSCInfoPanel__head {
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
  .OSCInfoPanel__statusCtn {
    h2 {
      font-family: @font-secondary;
      line-height: 1.5rem;
    }
    .OSCInfoPanel__statusRow {
      line-height: 2.25rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      text-transform: uppercase;
      font-size: @font-s;
      font-weight: 700;
      letter-spacing: 0.07813rem;
      .OSCInfoPanel__creationDate {

      }
      .OSCInfoPanel__cost {

      }
    }
  }
  .OSCInfoPanel__divider {
    border-top: solid 1px #fff;
  }

  .OSCInfoPanel__descCtn {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    .OSCInfoPanel__descItem {
      h2 {
        font-size: @font-s;
        font-family: @font-secondary;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: 0.01563rem;
        opacity: 0.7;
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
  .OSCInfoPanel__location {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    gap: 1rem;
    img {
      width: 1.5rem;
    }

    li {
      font-size: @font-s;
      font-family: @font-secondary;
      line-height: 1.25rem;
    }
  }

}
</style>