<template>
  <v-layout align-start justify-start>
    <myToolbar :title="language.Settings[lang]" class="header"></myToolbar>
    <v-card class="content">
      <v-img src="images/technical-support.png" aspect-ratio="2" contain></v-img>
      <br />
      <h2 v-text="language.Settings[lang]"></h2>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex>
          <v-select
            item-text="name"
            item-value="id"
            :items="countries"
            v-model="form.country"
            :label="language.SelectYourCountry[lang]"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 d-flex>
          <v-select
            item-text="name"
            item-value="id"
            :items="languages"
            v-model="form.language"
            :label="language.SelectYourLanguage[lang]"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-btn
        outline
        block
        color="#0b5065"
        class="continue"
        @click="save"
        bottom
        v-text="language.SaveAndContinueToKeyten[lang]"
      ></v-btn>
    </v-card>
    <v-snackbar v-model="snackbar" :top="true">
      {{ snackbartext }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
let storage = window.localStorage;
import FormData from "form-data";
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  name: "settings",
  components: {
    myToolbar,
    BottomNavigation
  },
  created() {
    this.token = storage.getItem("token");
    this.form.id = storage.getItem("_id");
  },
  mounted() {
    this.fetchCountries();
  },
  data() {
    return {
      language: language,
      lang: lang,
      token: null,
      snackbar: false,
      snackbartext: "",
      countries: [],
      languages: [],
      form: {
        id: null,
        country: storage.getItem("country"),
        language: parseInt(storage.getItem("lang"))
      }
    };
  },
  methods: {
    fetchCountries() {
      var that = this;
      $.ajax({
        url: API + "/country/all",
        type: "GET",
        dataType: "json",
        success: function(json) {
          var i = 0;
          json.data.forEach(function(country) {
            that.countries.push({
              id: country._id,
              name: country.name
            });

            if (country.isLanguage) {
              that.languages.push({
                id: i,
                name: country.language
              });
            }
            i++;
          });
        }
      });
    },
    save() {
      var self = this;
      $.ajax({
        url: API + "/language",
        type: "GET",
        dataType: "json",
        success: function(json) {
          storage.setItem("language", JSON.stringify(json));
        }
      });
      storage.setItem("country", this.form.country);
      storage.setItem("lang", this.form.language);
      setInterval(function() {
        window.location.reload();
      }, 1000);
    }
  }
};
</script>
<style>
.content {
  padding: 15px;
}
h2 {
  text-align: center;
}
</style>