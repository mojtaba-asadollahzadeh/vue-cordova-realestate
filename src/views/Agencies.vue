<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar :title="language.RealestateAgencies[lang]" class="header"></myToolbar>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line>
            <v-card v-for="(item,i) in agencies" :key="i" :to="'/agency/' + item.agency._id">
              <v-divider></v-divider>

              <v-list-tile :key="item.agency.name" avatar>
                <v-list-tile-avatar>
                  <img :src=" website + item.user.avatar" />
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.agency.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="language.Tel[lang] + ' : ' + item.agency.phone"></v-list-tile-sub-title>
                  <v-list-tile-sub-title
                    v-html="language.Address[lang] + ' : ' + item.agency.address"
                  ></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-card>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
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
  mounted() {
    this.fetchFeed();
    this.website = KEYTEN;
  },
  name: "agencies",
  data() {
    return {
      language: language,
      lang: lang,
      ads: [],
      agencies: [],
      website: null
    };
  },
  methods: {
    fetchFeed() {
      var token = this.token;
      var self = this;
      $.ajax({
        url: API + "/feed/agencies",
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(agency) {
            self.agencies.push(agency);
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
