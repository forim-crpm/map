
export default class MapService {

  static getGeoJSON(): Object {
    // const geojson = [];
    // Array.prototype.forEach.call(this.$store.state.submissions , function(line) {
    //   geojson.push({
    //     'properties': {
    //       'id': line.id,
    //       '_submission_time': line._submission_time,
    //       'icon': line.icon,
    //       'label': line.label,
    //       'type_en': line.type.en,
    //       'type_fr': line.type.fr,
    //       'image': line.image,
    //     },
    //     'geometry': {
    //     'type': 'Point',
    //     'coordinates': line.coords
    //     }
    //   })
    // })

    return {
      'type': 'FeatureCollection',
      'features': []
    };
  }
}