<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar title class="header"></myToolbar>
    <v-flex xs12>
      <History class="ads" v-bind:ads="ads" />
    </v-flex>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
let storage = window.localStorage;
import History from "@/components/History";
import BottomNavigation from "@/components/BottomNavigation";
import myToolbar from "@/components/MyToolbar";
export default {
  components: {
    History,
    myToolbar,
    BottomNavigation
  },
  mounted() {
    this.fetchMyAds();
  },
  name: "myads",
  data() {
    return {
      ads: [],
      lang: lang
    };
  },
  methods: {
    fetchMyAds() {
      var self = this;
      $.ajax({
        url: API + "/user/ads",
        type: "GET",
        headers: {
          "xs-token": JSON.parse(storage.getItem("user")).token
        },
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(ad) {
            self.ads.push({
              id: ad.id,
              title: ad.title,
              price: ad.price,
              country: ad.country.name,
              city: ad.city.name,
              street: ad.street.name,
              text: ad.text,
              image: KEYTEN + ad.thumbnails[0]
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped>
img.logo {
  display: inline-block;
  width: 90px;
  padding: 10px;
}
</style>
