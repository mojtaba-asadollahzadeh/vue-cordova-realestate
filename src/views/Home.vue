<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar title class="header"></myToolbar>
    <v-flex xs12>
      <Ads class="ads" v-bind:ads="ads" />
    </v-flex>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
let storage = window.localStorage;
import Ads from "@/components/Ads";
import BottomNavigation from "@/components/BottomNavigation";
import myToolbar from "@/components/MyToolbar";
export default {
  components: {
    Ads,
    myToolbar,
    BottomNavigation
  },
  beforeCreate() {
    // check if the app is instaled
    if (storage.getItem("installed") == null) {
      this.$router.push({ name: "Landing" });
    }
  },
  mounted() {
    this.fetchFeed();
  },
  name: "home",
  data() {
    return {
      ads: [],
      bottomNav: "home",
      lang: lang
    };
  },
  methods: {
    fetchFeed() {
      var token = this.token;
      var self = this;
      $.ajax({
        url: API + "/feed",
        type: "GET",
        headers: {
          language: lang
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
