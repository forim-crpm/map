import type Association from "@/model/interfaces/Association";
import type Thematic from "@/model/interfaces/Thematic";
import { useFilterStore } from "@/stores/filters";
import * as Papa from "papaparse";

export default class AssociationService {

  private static associationDbFileName = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvwjGskDe6C81X_mESVjkXUHQCzDWcYE-dsUXADsmOf8xbS7zg_fZn-xoztj4-3g/pub?gid=766950911&single=true&output=csv'

  static async parseFile(filename: string): Promise<[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(filename, {
        header: true,
        delimiter: ",",
        download: true,
        skipEmptyLines: true,
        complete(results: any) {
          resolve(results.data);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }

  static async readAssociationDb(): Promise<Association[]> {
    const result = await this.parseFile(this.associationDbFileName);
    return result.map((association: any, key: number): Association  => {
      let thematics = useFilterStore().thematics.map((thematic: Thematic): Thematic['value']|null => {
        return association[thematic.value] === 'x' ? thematic.value : null;
      })

      return {
        id: key,
        updatedAt: association.maj ?? null,
        country: association.pays ?? null,
        coords: {
          x: parseFloat(association.coordo_x.replace(',','.')) ?? null,
          y: parseFloat(association.coordo_y.replace(',','.')) ?? null,
        },
        name: association.nom ?? null,
        adress: association.adresse ?? null,
        indic: association.indic ?? null,
        tel: association.numero ?? null,
        telOther: association.autre_numero ?? null,
        emails: association.email.split(";").map((email: string) => email.trim()) ?? [],
        websiteUrl: association.internet ?? null,
        status: association.statut ?? null,
        year: association.annee ?? null,
        budget: association.budget ?? null,
        dialog: association.dialogue ?? null,
        intervention: association.intervention ?? null,
        thematics: thematics.filter(t => t != null) as Thematic['value'][]
      };
    });
  }
}
