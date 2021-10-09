<template>
  <div id="map-container"></div>
</template>

<script>
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"
import MapboxLanguage from "@mapbox/mapbox-gl-language"
import { camelToSnake } from "@/utils/helpers"
export default {
  name: "AppMap",
  model: {
    event: "eventLocationData",
  },
  props: {
    defaultValues: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      access_token: process.env.MAPBOX_ACCESS_TOKEN,
      map: {},
      geocoder: {},
    }
  },
  computed: {
    defaultValuesExists() {
      return this.defaultValues && Object.keys(this.defaultValues).length > 0
    },
  },
  mounted() {
    this.createMap()
    this.initDefaultMarker()
  },
  methods: {
    createMap() {
      mapboxgl.accessToken = this.access_token

      this.map = this.initMap()
      // console.log(this.map.getStyle())
      // this.map.setStyle(mapboxLanguage.setLanguage(this.map.getStyle(), "fr"))
      // this.geocoder = this.initGeocoder()
      // this.map.addControl(this.geocoder)
      this.map.on("click", this.handleMapClick)
      this.map.on("load", this.handleOnMapLoad)
    },
    handleOnMapLoad() {
      const mapboxLanguage = new MapboxLanguage({ defaultLanguage: "es" })
      this.map.addControl(new mapboxgl.NavigationControl(mapboxLanguage))
      this.map.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      })
      this.map.addLayer({
        id: "point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#448ee4",
        },
      })
      // this.map.setLayoutProperty("country-label", "text-field", ["get", "fr"])
      // mapboxLanguage.setLanguage(this.map.getStyle())
      // this.map.getStyle().layers.forEach(function (thisLayer) {
      this.map.setLayoutProperty("country-label", "text-field", [
        "get",
        "name_ru",
      ])
      this.map.setLayoutProperty("state-label", "text-field", [
        "get",
        "name_ru",
      ])
      this.map.setLayoutProperty("settlement-label", "text-field", [
        "get",
        "name_ru",
      ])
      this.map.setLayoutProperty("settlement-subdivision-label", "text-field", [
        "get",
        "name_ru",
      ])
    },
    buildResult(data) {
      /* eslint-disable */
      const longitude = data?.geometry?.coordinates[0]
      const latitude = data?.geometry?.coordinates[1]
      const addressStreet = data?.place_name
      const addressPostcode = ""
      const addressCity = data?.place_name
      const addressCountryCode = _.chain(data.context)
        .find((i) => i.id.includes("country"))
        .get("short_code")
        .value()
      const result = {
        longitude,
        latitude,
        addressStreet,
        addressPostcode,
        addressCity,
        addressCountryCode,
      }
      return camelToSnake(result)
    },
    initMap() {
      return new mapboxgl.Map({
        container: "map-container",
        // style: "mapbox://styles/mapbox/streets-v11",
        style: "mapbox://styles/mapbox/light-v10",
        zoom: 11,
        center: [32.013517, 46.956622],
        scrollZoom: false,
      })
    },
    handleMapClick({ lngLat }) {
      const { lat, lng } = lngLat
    },
    initDefaultMarker() {
      new mapboxgl.Marker({
        color: "#10192e",
      })
        .setLngLat([32.04610387190852, 46.91435637566413])
        .addTo(this.map)
    },
  },
  // watch: {
  //   defaultValues: {
  //     handler(value) {
  //       console.log(value);
  //     },
  //     deep: true
  //   }
  // }
}
</script>
