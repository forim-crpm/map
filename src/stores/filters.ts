import { defineStore } from 'pinia'
import type OSCType from '@/model/interfaces/OSCType'
import type Thematic from '@/model/interfaces/Thematic'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    thematics: [
      {
        value: 'accueil',
        label: "Accueil, assistance et orientation"
      },
      {
        value: 'accompagnement',
        label: "Accompagnement  des migrants de retour"
      },
      {
        value: 'humanitaire',
        label: "Assistance humanitaire (réfugies, déplacés, apatrides)"
      },
      {
        value: 'cohesion',
        label: "Cohésion sociale et vivre ensemble, lutte contre les discriminations"
      },
      {
        value: 'droit',
        label: "Droit et protection des migrants"
      },
      {
        value: 'education_sante',
        label: "Education et santé"
      },
      {
        value: 'enfants',
        label: "Enfants et migration"
      },
      {
        value: 'genre',
        label: "Genre et migration"
      },
      {
        value: 'gouvernance',
        label: "Gouvernance et politiques migratoires"
      },
      {
        value: 'professionnel',
        label: "Formation, insertion professionnelle, intégration économique"
      },
      {
        value: 'developpement',
        label: "Migration et développement "
      },
      {
        value: 'plaidoyer',
        label: "Plaidoyer et sensibilisation"
      },
      {
        value: 'circulation',
        label: "Prévention de la migration irrégulière, promotion de la migration légale et de la liberté de circulation"
      },
      {
        value: 'autre_theme',
        label: "Autre"
      }
    ] as Thematic[],
    oscTypes: [
      {
        label: "Agence / Organisme public",
        value: "agence_org_pub",
        color: "#FFD180",
        isActive: false,
      },
      {
        label: "Association",
        value: "association",
        color: "#FF9E80",
        isActive: false,
      },
      {
        label: "Collectivité territoriale",
        value: "col_ter",
        color: "#FFE57F",
        isActive: false,
      },
      {
        label: "Culturel",
        value: "culturel",
        color: "#FFFF8D",
        isActive: false,
      },
      {
        label: "Entreprise / Syndicat",
        value: "entreprise_syndicat",
        color: "#DCE775",
        isActive: false,
      },
      {
        label: "ONG internationale",
        value: "ong_int",
        color: "#B9F6CA",
        isActive: false,
      },
      {
        label: "OSIM (diaspora)",
        value: "osim",
        color: "#C5E1A5",
        isActive: false,
      },
      {
        label: "Recherche / Apprentissage",
        value: "recherche_app",
        color: "#E0F2F1",
        isActive: false,
      }
    ] as OSCType[],
  }),

  getters: {
    isAllOSCTypeFiltersInactive: (state): boolean => {
      return state.oscTypes.filter(oscType => oscType.isActive).length === 0
    },
    getThematicName: (state) => (thematicKey: Thematic['value']): Thematic['label']|null => {
      return state.thematics.find(thematic => thematic.value === thematicKey)?.label ?? null
    },
  },

  actions: {
  }
})
