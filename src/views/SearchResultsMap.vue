<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <v-flex xs12 style="height:90vh;">
      <div id="map" style="width:100%;height:100%;"></div>
    </v-flex>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
import Ads from "@/components/Ads";
import BottomNavigation from "@/components/BottomNavigation";
var L = require("leaflet");
var geocode = require("esri-leaflet-geocoder");
export default {
  components: {
    Ads,
    BottomNavigation
  },
  mounted() {
    var self = this;
    var locations = [];
    this.$route.params.ads.forEach(function(ad) {
      locations.push([
        `
        <img src="${ad.image}" style="width:100%;"/>
        <br>
        <h2>${ad.title}</h2>
        <br>
        <b>${ad.country},${ad.city}</b>`,
        parseFloat(ad.longitude),
        parseFloat(ad.latitude)
      ]);
    });
    var map = L.map("map").setView([locations[0][1], locations[0][2]], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //console.log(locations);
    for (var i = 0; i < locations.length; i++) {
      var marker = new L.marker([locations[i][1], locations[i][2]])
        .bindPopup(locations[i][0])
        .addTo(map);
    }
  },
  name: "SearchResultsMap",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
img.logo {
  display: inline-block;
  width: 90px;
  padding: 10px;
}
</style>
