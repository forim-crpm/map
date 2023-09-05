
<template>
  <dialog class="AboutModal" :open="isAboutModalShown">
    <div class="AboutModal__head">
      <h1>{{ !isDownloadShown ? "À propos du projet" : "Téléchargements" }}</h1>
      <Button
        :label="!isDownloadShown ? 'Téléchargements' : 'À propos'"
        :uppercase="true"
        :icon="!isDownloadShown ? 'mdi-download-circle-outline' : 'mdi-information-variant-circle-outline'"
        @click="toggleIsDownloadShown()" />
    </div>
    <div class="AboutModal__content" v-if="isDownloadShown">
      <div class="AboutModal__downloadsCtn">
        <DownloadReportItem v-for="(downloadReport, key) in downloadReports" :downloadReport="downloadReport" :key="key" />
      </div>
    </div>
    <div class="AboutModal__content" v-if="!isDownloadShown">
      <div class="AboutModal__ctn AboutModal__ctn--right">
        <div class="AboutModal__titles">
          <h2>Coopération régionale des politiques migratoires</h2>
          <h3>Composante 2 : Société civile :« Améliorer le dialogue entre OSC et pouvoirs publics pour des politiques
            migratoires justes et pertinentes en Afrique »</h3>
        </div>
        <div class="AboutModal__contentDesc">
          <p>Financé par l’AFD, Expertise France a lancé en juin 2020 le programme « Coopération Régionale des Politiques
            Migratoires » qui vise à renforcer le dialogue entre 7 pays africains sur les politiques nationales en matière
            de migration (Tunisie, Maroc, Sénégal, Mali, Côte d’Ivoire, Guinée et Cameroun).</p>
          <p>La Composante 1 du programme, entend développer, via des points focaux dans les ministères en charge des
            enjeux migrations dans chaque pays, les capacités de suivi des autorités et l’élaboration de nouveaux
            indicateurs, ainsi que le partage de pratiques.</p>
          <p class="bold">La composante 2 du programme se concentre quant à elle sur les organisations de la société
            civile et ambitionne de créer et pérenniser des mécanismes de dialogue entre les OSC et les autorités
            nationales et régionales sur les politiques migratoires.</p>
        </div>
      </div>
      <div class="AboutModal__ctn AboutModal__ctn--left">
        <div class="AboutModal__actorsCtn" v-for="(actor, key) in actors" :key="key">
          <h3>{{ actor.category }}</h3>
          <div class="AboutModal__partnersCtn">
            <a :href="partner.link" target="_blank" rel="noopener noreferrer" v-for="(partner, i) in actor.partners"
              :key="i">
              <img :src="'./img/logos/' + partner.logo" :alt="partner.name + ' logo'" loading="lazy">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="AboutModal__footer">
      <button @click="close()">Fermer</button>
    </div>
  </dialog>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';
import { Vue, Component } from 'vue-facing-decorator'
import Button from '@/components/Button.vue';
import DownloadReportItem from '@/views/About/DownloadReportItem.vue';
import type DownloadReport from '@/model/interfaces/DownloadReport'

@Component({
  components: { Button, DownloadReportItem }
})
export default class AboutModal extends Vue {
  actors = [
    {
      category: "Coordination du projet",
      partners: [
        {
          name: 'FORIM',
          logo: 'forim.png',
          link: 'https://forim.net/'
        }
      ]
    },
    {
      category: "Comité de pilotage du projet",
      partners: [
        {
          name: 'GRDR',
          logo: 'grdr.svg',
          link: 'https://grdr.org/'
        },
        {
          name: 'LOUJNA',
          logo: 'loujna.png',
          link: 'http://loujna-tounkaranke.org/'
        }
      ]
    },
    {
      category: "Financé par",
      partners: [
        {
          name: 'AFD',
          logo: 'afd.svg',
          link: 'https://www.afd.fr/'
        },
        {
          name: 'Expertise France',
          logo: 'expertise_france.svg',
          link: 'https://www.expertisefrance.fr/'
        }
      ]
    }
  ]

  get isAboutModalShown() {
    return useAppStore().isAboutModalShown
  }
  
  get isDownloadShown() {
    return useAppStore().isDownloadShown
  }

  get downloadReports(): DownloadReport[] {
    return useAppStore().downloadReports
  }

  close() {
    useAppStore().isAboutModalShown = false
    setTimeout(() => useAppStore().isDownloadShown = false, 300)
  }

  toggleIsDownloadShown() {
    useAppStore().isDownloadShown = !this.isDownloadShown
  }

}
</script>

<style lang="less">
.AboutModal {
  width: 54.625rem;
  max-width: 100%;
  min-height: 15rem;
  background: white;
  border-radius: 0.25rem;
  box-shadow: 0px 11px 15px 0px rgba(0, 0, 0, 0.20);
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: @z-modal;
  border: none;

  .AboutModal__head {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 0.5rem;

    h1 {
      color: var(--black-087, rgba(0, 0, 0, 0.87));
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 2rem;
      letter-spacing: 0.01563rem;
    }
  }

  .AboutModal__content {
    display: flex;
    flex-flow: row nowrap;
    border-top: @mixin-divider-border;
    border-bottom: @mixin-divider-border;

    .AboutModal__downloadsCtn {
      flex: 1 0 auto;
      gap: 1rem;
      display: flex;
      flex-flow: column nowrap;
      padding: 2rem;
      overflow-y: auto;
      max-height: 66vh;
    }

    .AboutModal__ctn {

      &--right {
        max-width: 33rem;

        .AboutModal__titles {
          display: flex;
          padding: 1.5rem 1rem 2rem 1.5rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          h2 {
            font-size: @font-m;
            font-weight: 700;
            line-height: 2rem;
            color: @color-primary;
          }

          h3 {
            font-size: @font-s;
            font-weight: 600;
            line-height: 1.375rem;
          }
        }

        .AboutModal__contentDesc {
          display: flex;
          padding: 0rem 1rem 1rem 1.5rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          p {
            font-family: @font-secondary;
            color: @color-grey-3;
            font-size: 0.875rem;
            line-height: 1.375rem;
            letter-spacing: 0.00625rem;
          }
        }
      }

      &--left {
        display: flex;
        padding: 4.0625rem 1rem 2rem 3.5rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
        flex: 1 0 0;
        align-self: stretch;
        border-left: @mixin-divider-border;

        .AboutModal__actorsCtn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          align-self: stretch;

          h3 {
            color: @color-black-faded-3;
            font-size: @font-s;
            font-family: @font-secondary;
            line-height: 1.375rem;
            letter-spacing: 0.00625rem;
          }

          .AboutModal__partnersCtn {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 2rem;
          }
        }
      }
    }
  }

  .AboutModal__footer {
    display: flex;
    padding: 0.5rem;
    align-items: flex-start;
    gap: 0.5rem;
    align-self: stretch;

    button {
      display: flex;
      height: 2.25rem;
      padding: 0rem 1rem;
      align-items: center;
      gap: 1rem;
      color: var(--custom-primary, #2B5B39);
      text-align: center;
      font-size: @font-s;
      font-weight: 700;
      line-height: 2.25rem;
      letter-spacing: 0.07813rem;
      text-transform: uppercase;
    }
  }
}
</style>