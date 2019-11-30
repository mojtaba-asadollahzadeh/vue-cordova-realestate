<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar title class="header"></myToolbar>

    <v-flex xs12>
      <v-flex class="text-xs-center" v-if="ads.length == 0">
        <v-icon size="128">star</v-icon>
        <v-btn block color="#0b5065" outline v-text="language.YouHaveNoFavorits[lang]"></v-btn>
      </v-flex>
      <Ads class="ads" v-bind:ads="ads" fav="1" />
    </v-flex>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
let storage = window.localStorage;
import Ads from "@/components/Ads";
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  components: {
    Ads,
    myToolbar,
    BottomNavigation
  },
  mounted() {
    this.website = KEYTEN;
    if (storage.getItem("user")) {
      this.user = JSON.parse(storage.getItem("user"));
    }
    if (this.user.token != null) {
      this.fetchFavorits();
    }
  },
  name: "favorits",
  data() {
    return {
      user: {},
      language: language,
      lang: lang,
      ads: [],
      website: null
    };
  },
  methods: {
    fetchFavorits() {
      var token = this.token;
      var self = this;
      $.ajax({
        url: API + "/user/favorits",
        type: "GET",
        headers: {
          "xs-token": self.user.token
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
              image: self.website + ad.thumbnails[0]
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
