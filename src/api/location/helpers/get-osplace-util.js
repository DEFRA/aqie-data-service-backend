// import { proxyFetch } from '~/src/api/common/helpers/proxy.js'
import { fetchData } from '~/src/api/location/helpers/fetch-data.js'
import { getNearestLocation } from '~/src/api/location/helpers/get-nearest-location.js'
// import { config } from '~/src/config/index.js'

async function fetchmonitoringstation(request) {
  if (
    request.params.userLocation !== '' &&
    request.params.userLocation !== null &&
    request.params.userLocation !== "''"
  ) {
    // const url = config.get('OSPlaceApiUrl')
    const locationType = 'uk-location'
    const locationNameOrPostcode = request.params.userLocation //= 'DA16 1LT'//'London'
    // const userLocation = request.params.userLocation.toUpperCase() //= 'DA16 1LT'//'LONDON'
    const miles = 8 * 1000

    const { getOSPlaces, getMeasurements } = await fetchData(
      locationType,
      locationNameOrPostcode,
      request,
      'h'
    )
    if (locationType === 'uk-location') {
      // let results  = getOSPlaces
      const selectedMatches = getOSPlaces

      const { nearestLocationsRange, latlon } = getNearestLocation(
        selectedMatches,
        getMeasurements?.measurements,
        locationType,
        miles,
        0
        // 'en'
      )
      if (latlon !== null) {
        return nearestLocationsRange
      }
      return nearestLocationsRange
    }
  }
  return 'no data found'
}
export { fetchmonitoringstation }
