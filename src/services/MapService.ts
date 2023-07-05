import type Association from "@/model/interfaces/Association";
import { useAssociationStore } from "@/stores/associations";

export default class MapService {

  static getGeoJSON(): Object {
    const geojson: any = [];
    Array.prototype.forEach.call(useAssociationStore().associations , (association: Association) => {
      geojson.push({
        'properties': {
          'id': association.id,
          'name': association.name,
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [association.coords.y , association.coords.x]
        }
      })
    })

    return {
      'type': 'FeatureCollection',
      'features': geojson
    };
  }
}