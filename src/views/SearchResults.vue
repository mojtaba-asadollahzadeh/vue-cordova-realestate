<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar :title="language.SearchResults[lang]" class="header">
      <v-btn
        style="float: right;height: 2.2rem;width: 2.2rem;line-height: 2.2rem;"
        color="#fff"
        class="black--text"
        fab
        small
        @click="map"
      >
        <v-icon>map</v-icon>
      </v-btn>
    </myToolbar>
    <v-flex xs12>
      <Ads class="ads" v-bind:ads="ads" />
    </v-flex>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
import Ads from "@/components/Ads";
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  components: {
    Ads,
    myToolbar,
    BottomNavigation
  },
  created() {
    this.website = KEYTEN;
    var self = this;
    this.$route.params.ads.forEach(function(ad) {
      self.ads.push({
        id: ad.id,
        title: ad.title,
        price: ad.price,
        country: ad.country.name,
        city: ad.city.name,
        street: ad.street.name,
        text: ad.text,
        image: self.website + ad.thumbnails[0],
        longitude: ad.longitude,
        latitude: ad.latitude
      });
    });
  },
  name: "SearchResults",
  data() {
    return {
      language: language,
      lang: lang,
      ads: [],
      website: null
    };
  },
  methods: {
    map() {
      this.$router.push({
        name: "SearchResultsMap",
        params: { ads: this.ads }
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
