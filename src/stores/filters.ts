import { defineStore } from 'pinia'
import type Thematic from '@/model/interfaces/Thematic'
import type Association from '@/model/interfaces/Association'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    search: '' as string,
    isMapSynced: false,
    resetTrigger: false,
    mapShownAssociations: [] as Association['id'][],
    countriesFilter: [] as Association['country'][],
    thematicsFilter: [] as Thematic['value'][],
    countries: [] as string[],
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
  }),

  getters: {
    getThematicName: (state) => (thematicKey: Thematic['value']): Thematic['label']|null => {
      return state.thematics.find(thematic => thematic.value === thematicKey)?.label ?? null
    },
  },

  actions: {
  }
})
