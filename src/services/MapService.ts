import type Association from "@/model/interfaces/Association";
import { useAssociationStore } from "@/stores/associations";
import maplibregl from "maplibre-gl";

export default class MapService {

  static getGeoJSON(): any {
    const geojson: any = [];
    Array.prototype.forEach.call(useAssociationStore().associations , (association: Association) => {
      geojson.push({
        'id': association.id,
        'properties': {
          'id': association.id,
          'name': association.name,
          'country': association.country,
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

  static getBounds (features: any) {
    const coordinates = features.map((f: any) => f.geometry.coordinates)
    return coordinates.reduce((bounds: any, coord: any) => {
        return bounds.extend(coord);
    }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
  }
}