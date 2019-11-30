<template>
  <v-card class="content">
    <v-img src="logo.png" aspect-ratio="4" contain></v-img>
    <h2>Welcome To Keyten</h2>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex>
        <v-select
          item-text="name"
          item-value="id"
          :items="countries"
          v-model="form.country"
          label="Select Your Country"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 d-flex>
        <v-select
          item-text="name"
          item-value="id"
          :items="languages"
          v-model="form.language"
          label="Select Your Language"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-checkbox v-model="form.terms" label="Agree To Terms Of Services"></v-checkbox>
      </v-flex>
    </v-layout>
    <v-btn outline block color="#0b5065" class="continue" @click="register" bottom>Continue</v-btn>
    <v-snackbar v-model="snackbar" :bottom="'bottom'">
      {{ snackbartext }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
let storage = window.localStorage;
import FormData from "form-data";
import Swal from "sweetalert2";
export default {
  name: "landing",
  components: {},
  mounted() {
    this.fetchCountries();
  },
  data() {
    return {
      snackbar: false,
      snackbartext: "",
      countries: [],
      languages: [],
      form: {
        country: null,
        language: null,
        terms: 0
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
    register() {
      if (!this.form.terms) {
        Swal.fire({
          type: "warning",
          title: "You Must Agree With Terms Of Services",
          showConfirmButton: false
          //timer: 4000
        });
        return;
      }

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
      storage.setItem("installed", true);
      setInterval(function() {
        window.location.reload();
      }, 1000);
      this.$router.push({ name: "Home" });
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
.swal2-icon.swal2-warning,
.swal2-title {
  font-family: serif !important;
  line-height: 3rem;
}
</style>