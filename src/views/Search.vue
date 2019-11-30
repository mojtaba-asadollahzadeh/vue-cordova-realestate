<template>
  <v-layout align-start justify-start row fill-height>
    <myToolbar :title="title" class="header"></myToolbar>
    <v-card class="content" style="width: 100%">
      <v-layout wrap align-center>
        <v-flex>
          <v-select
            :label="countryLabel"
            :items="countries"
            item-text="name"
            item-value="id"
            v-on:change="selectedCountry"
          ></v-select>
        </v-flex>
        <v-flex>
          <v-select
            :label="cityLabel"
            :items="cities"
            item-text="name"
            item-value="id"
            v-on:change="selectedCity"
          ></v-select>
        </v-flex>
        <v-flex>
          <v-select
            item-text="name"
            item-value="id"
            :items="categories"
            :label="categoryLabel"
            v-on:change="selectedCategory"
          ></v-select>
        </v-flex>
        <v-flex v-if="types.length > 0">
          <v-select
            item-text="name"
            item-value="id"
            :items="types"
            :label="typeLabel"
            v-on:change="selectedType"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-btn
        outline
        block
        color="#0b5065"
        class="continue"
        @click="search"
        bottom
        v-text="searchLabel"
      ></v-btn>
    </v-card>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
import FormData from "form-data";
export default {
  name: "search",
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    this.fetchCountries();
    this.fetchCategories();
  },
  data() {
    return {
      title: language.SearchThroughAds[lang],
      countryLabel: language.SelectYourCountry[lang],
      cityLabel: language.SelectYourCity[lang],
      categoryLabel: language.SelectCategoryToSearch[lang],
      typeLabel: language.SelectCategoryType[lang],
      searchLabel: language.Search[lang],
      terms: false,
      categories: [],
      types: [],
      countries: [],
      cities: [],
      options: [],
      form: []
    };
  },
  methods: {
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
      this.form.push({
        types: id
      });
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
      this.form.push({
        city: id
      });
    },
    search() {
      var self = this;
      var formData = new FormData();
      // attaching the filters
      this.form.forEach(function(obj) {
        if (obj.country) {
          formData.append("country", obj.country);
        }
        if (obj.city) {
          formData.append("city", obj.city);
        }
        if (obj.category) {
          formData.append("category", obj.category);
        }
        if (obj.types) {
          formData.append("types[]", obj.types);
        }
      });

      $.ajax({
        url: API + "/search",
        type: "POST",
        headers: {
          language: lang
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(json) {
          self.$router.push({
            name: "SearchResults",
            params: { ads: json.data }
          });
        }
      });
    },
    map() {
      this.$router.push({
        name: "SearchResultsMap",
        params: { ads: this.ads }
      });
    }
  }
};
</script>
<style>
</style>