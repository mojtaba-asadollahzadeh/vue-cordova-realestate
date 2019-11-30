<template>
  <v-layout align-start justify-start row fill-height>
    <myToolbar :title="language.AddAnnoucement[lang]" class="header"></myToolbar>
    <v-stepper v-model="step" style="width: 100%">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 4" step="4"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5"></v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout wrap align-center>
            <v-flex>
              <v-select
                item-text="name"
                item-value="id"
                name="category"
                :items="categories"
                v-model="bind.category"
                :label="language.SelectCategoryToPublish[lang]"
                v-on:change="selectedCategory"
              ></v-select>
            </v-flex>
            <v-flex v-if="types.length > 0">
              <v-select
                item-text="name"
                item-value="id"
                :items="types"
                v-model="bind.type"
                name="types[]"
                :label="language.SelectCategoryType[lang]"
                v-on:change="selectedType"
              ></v-select>
            </v-flex>
            <v-flex v-if="options.length > 0" v-for="option in options">
              <v-select
                style="width:100%;"
                v-if="option.mode == 'selective'"
                :items="option.values"
                :label="option.name"
                item-text="name"
                item-value="name"
                v-on:change="selectedOption([option.id,$event])"
              ></v-select>
              <v-text-field
                v-if="option.mode == 'input'"
                style="width:100%;"
                :label="option.name"
                name="options[]"
                v-on:change="selectedOption([option.id,$event])"
              ></v-text-field>
              <v-text-field
                v-if="option.mode == 'numeric'"
                type="number"
                style="width:100%;"
                :label="option.name"
                name="options[]"
                v-on:change="selectedOption([option.id,$event])"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn color="#0b5065" outline @click="step = 2" v-text="language.Continue[lang]"></v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-flex>
            <v-select
              :label="language.SelectYourCountry[lang]"
              :items="countries"
              item-text="name"
              item-value="id"
              v-on:change="selectedCountry"
              v-model="bind.country"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-select
              :label="language.SelectYourCity[lang]"
              :items="cities"
              item-text="name"
              item-value="id"
              v-on:change="selectedCity"
              v-model="bind.city"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-select
              :label="language.SelectYourStreet[lang]"
              :items="streets"
              item-text="name"
              item-value="id"
              v-model="bind.street"
            ></v-select>
          </v-flex>

          <v-flex>
            <v-textarea :label="language.Address[lang]" v-model="bind.address"></v-textarea>
          </v-flex>
          <v-text-field
            type="number"
            style="width:100%;"
            :label="language.Price[lang]"
            v-model="bind.price"
          ></v-text-field>
          <v-btn color="#0b5065" outline @click="step = 3" v-text="language.Continue[lang]"></v-btn>

          <v-btn @click="step = 1" flat v-text="language.Back[lang]"></v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-flex>
            <v-text-field
              style="width:100%;"
              :label="language.GiveYourAnnoucementATitle[lang]"
              v-model="bind.title"
            ></v-text-field>
            <v-textarea :label="language.GiveADescription[lang]" v-model="bind.text"></v-textarea>
          </v-flex>

          <v-btn color="#0b5065" outline @click="step = 4" v-text="language.Continue[lang]"></v-btn>

          <v-btn @click="step = 2" flat v-text="language.Back[lang]"></v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-flex style="margin-bottom:20px;">
            <h3 v-text="language.SelectYourLocationOnMap[lang]"></h3>
            <div id="map" style="width:100%;height:400px;"></div>
            <input type="hidden" value="0" id="lat" />
            <input type="hidden" value="0" id="lng" />
          </v-flex>
          <v-btn color="#0b5065" outline @click="step = 5" v-text="language.Continue[lang]"></v-btn>

          <v-btn @click="step = 2" flat v-text="language.Back[lang]"></v-btn>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-flex>
            <v-img src="img-select.png" aspect-ratio="3" contain></v-img>
            <v-btn color="#0b5065" outline block>
              <input type="file" class="images" @change="readFile([$event,1])" />
            </v-btn>
            <v-flex>
              <v-img v-if="fileUrls[0].src" :src="fileUrls[0].src" contain></v-img>
            </v-flex>
            <v-btn color="#0b5065" outline block>
              <input type="file" class="images" @change="readFile([$event,2])" />
            </v-btn>
            <v-flex>
              <v-img v-if="fileUrls[1].src" :src="fileUrls[1].src" contain></v-img>
            </v-flex>
            <v-btn color="#0b5065" outline block>
              <input type="file" class="images" @change="readFile([$event,3])" />
            </v-btn>
            <v-flex>
              <v-img v-if="fileUrls[2].src" :src="fileUrls[2].src" contain></v-img>
            </v-flex>
            <v-btn color="#0b5065" outline block>
              <input type="file" class="images" @change="readFile([$event,4])" />
            </v-btn>
            <v-flex>
              <v-img v-if="fileUrls[3].src" :src="fileUrls[3].src" contain></v-img>
            </v-flex>
          </v-flex>
          <br />
          <br />
          <v-btn
            color="#0b5065"
            class="white--text"
            block
            @click="publish"
            v-text="language.PublishYourAdvertisement[lang]"
          ></v-btn>

          <v-btn @click="step = 2" flat v-text="language.Back[lang]"></v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-snackbar v-model="snackbar" :bottom="'bottom'">
      {{ snackbartext }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
import FormData from "form-data";
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
import Swal from "sweetalert2";
let storage = window.localStorage;
var L = require("leaflet");
var geocode = require("esri-leaflet-geocoder");

export default {
  name: "publishads",
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    if (storage.getItem("user")) {
      this.user = JSON.parse(storage.getItem("user"));
    }
    this.fetchCategories();
    this.fetchCountries();
    var map = L.map("map");
    map.invalidateSize();
    map.setView([37.74, -121.62], 10);
    var marker = L.marker([37.74, -121.62], {
      draggable: true
    }).addTo(map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // let user_position = [
          //   position.coords.latitude,
          //   position.coords.longitude
          // ];
          // map.setView(user_position, 20);
          // var newLatLng = L.LatLng(
          //   position.coords.latitude,
          //   position.coords.longitude
          // );
          // marker.setLatLng(newLatLng);
        },
        function() {
          console.log("error");
        }
      );
      // If the geolocation is available
    }
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var searchControl = geocode.geosearch().addTo(map);
    var results = L.layerGroup().addTo(map);

    searchControl.on("results", function(data) {
      results.clearLayers();
      for (var i = data.results.length - 1; i >= 0; i--) {
        marker.setLatLng(data.results[i].latlng);
        map.invalidateSize();
      }
    });

    marker.dragging.enable();
    marker.on("dragend", function(e) {
      console.log(marker.getLatLng().lat);
      console.log(marker.getLatLng().lng);
      document.getElementById("lat").value = marker.getLatLng().lat;
      document.getElementById("lng").value = marker.getLatLng().lng;
    });
  },
  data() {
    return {
      language: language,
      lang: lang,
      user: {},
      snackbar: false,
      snackbartext: "",
      step: 0,
      terms: false,
      categories: [],
      countries: [],
      cities: [],
      streets: [],
      types: [],
      options: [],
      form: [],
      bind: {
        category: null,
        type: null,
        options: [],
        country: null,
        city: null,
        street: null,
        address: null,
        price: null,
        title: null,
        text: null
      },
      fileUrls: [{ src: null }, { src: null }, { src: null }, { src: null }]
    };
  },
  methods: {
    fetchCategories() {
      var self = this;
      $.ajax({
        url: API + "/categories/all",
        headers: {
          language: lang
        },
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(category) {
            self.categories.push({
              id: category._id,
              name: category.name
            });
          });
        }
      });
    },

    fetchCountries() {
      var self = this;
      $.ajax({
        url: API + "/country/all",
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(country) {
            self.countries.push({
              id: country._id,
              name: country.name
            });
          });
        }
      });
    },
    selectedCategory(id) {
      var self = this;
      this.form.push({
        category: id
      });
      this.types = [];
      $.ajax({
        url: API + "/categories/" + id + "/types",
        type: "GET",
        headers: {
          language: lang
        },
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(type) {
            self.types.push({
              id: type._id,
              name: type.name
            });
          });
        }
      });
    },
    selectedType(id) {
      var that = this;
      this.options = [];
      $.ajax({
        url: API + "/types/" + id + "/options",
        headers: {
          language: lang
        },
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(option) {
            that.options.push({
              id: option._id,
              name: option.name,
              mode: option.mode,
              values: option.values
            });
          });
        }
      });
    },
    selectedOption(event) {
      this.bind.options.push(event);
    },
    selectedCountry(id) {
      var self = this;
      this.cities = [];
      this.form.push({
        country: id
      });
      $.ajax({
        url: API + "/country/" + id + "/cities",
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(city) {
            self.cities.push({
              id: city._id,
              name: city.name
            });
          });
        }
      });
    },
    selectedCity(id) {
      var self = this;
      $.ajax({
        url: API + "/city/" + id + "/streets",
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(street) {
            self.streets.push({
              id: street._id,
              name: street.name
            });
          });
        }
      });
    },
    readFile(event) {
      this.fileUrls[event[1] - 1].src = URL.createObjectURL(
        event[0].currentTarget.files[0]
      );
    },
    // publish advertisement
    publish() {
      var self = this;
      if (this.user.token === undefined) {
        self.snackbartext = "You Must Login To Publish Your Ads";
        self.snackbar = true;
        return;
      }

      var formData = new FormData();
      // attaching the filters
      Object.keys(this.bind).forEach(function(key) {
        if (key == "options") {
          self.bind[key].forEach(function(option) {
            formData.append("options[]", option);
          });
        } else {
          formData.append(key, self.bind[key]);
        }
      });

      formData.append("longitude", document.getElementById("lat").value);
      formData.append("latitude", document.getElementById("lng").value);

      // attaching other images
      for (
        var i = 0;
        i < document.getElementsByClassName("images").length;
        i++
      ) {
        if (
          document.getElementsByClassName("images")[i].files[0] != null ||
          document.getElementsByClassName("images")[i].files[0] != undefined
        ) {
          formData.append(
            "images[]",
            document.getElementsByClassName("images")[i].files[0]
          );
        }
      }

      $.ajax({
        url: API + "/ad/store",
        type: "POST",
        headers: {
          "xs-token": this.user.token
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(json) {
          if (json.status == 200) {
            Swal.fire({
              type: "success",
              title: "Your Advertisement Published Successfully !",
              showConfirmButton: false,
              timer: 2000
            });
            self.$router.push({ name: "Home" });
          } else {
            Swal.fire({
              type: "error",
              title: "You Have Some Errors On Your Request! Check Your Inputs.",
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      });
    }
  }
};
</script>
<style>
</style>