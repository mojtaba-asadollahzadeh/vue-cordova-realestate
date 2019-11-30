<template>
  <div>
    <v-layout
      row
      wrap
      style="background: #fff;margin-bottom: 10px;border-radius: 10px;"
      v-for="(item,i) in ads"
      :key="i"
    >
      <v-flex xs4 style="border-right: 5px solid #d8d8d8;">
        <router-link :to="'ad/' + item.id">
          <v-img aspect-ratio="1" contain :src="item.image"></v-img>
        </router-link>
      </v-flex>
      <v-flex xs8 style="padding:10px;border: 4px slolid #d8d8d8;">
        <v-btn
          style="float: right;height: 2rem;width: 2rem;line-height: 2rem;"
          color="#0b5065"
          class="white--text"
          fab
          small
          @click="favorit(item.id)"
        >
          <v-icon color="yellow" v-if="favorits.includes(item.id)">star</v-icon>
          <v-icon v-if="!favorits.includes(item.id)">star</v-icon>
        </v-btn>
        <router-link :to="'ad/' + item.id" style="color: #444;text-decoration: none;">
          <div class="font-weight-light grey--text title mb-2">{{item.country}}</div>
          <h3 class="font-weight-light mb-2" style="font-size: 1.2rem;">{{item.title}}</h3>
          <div class="font-weight-light title mb-1" style="font-size: 1rem !important;">
            {{item.city}}, {{item.street}}
            <br />
            <li class="price red--text">{{language.Price[lang]}} : {{item.price}}</li>
          </div>
        </router-link>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" :top="'top'">
      You Must Login To Add To Favorit !
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
let storage = window.localStorage;
import FormData from "form-data";
export default {
  props: {
    ads: Array,
    fav: 0
  },
  name: "Ads",
  data() {
    return {
      language: language,
      lang: lang,
      snackbar: false,
      favorits: []
    };
  },
  created() {
    if (JSON.parse(storage.getItem("user")) != null) {
      this.fetchFavorits();
    }
  },
  methods: {
    favorit(id) {
      var self = this;
      if (JSON.parse(storage.getItem("user")).token == undefined) {
        self.snackbar = true;
        return;
      }
      $.ajax({
        url: API + "/user/favorit/add/" + id,
        type: "GET",
        headers: {
          "xs-token": JSON.parse(storage.getItem("user")).token
        },
        dataType: "json",
        success: function(json) {
          if (json.status == 200) {
            self.favorits.push(json.data.ad);
          } else if (json.status == 201) {
            var index = self.favorits.indexOf(json.data.ad);
            if (index > -1) {
              self.favorits.splice(index, 1);
            }
          }
        }
      });
    },
    fetchFavorits() {
      var self = this;
      $.ajax({
        url: API + "/user/favorits",
        type: "GET",
        headers: {
          "xs-token": JSON.parse(storage.getItem("user")).token
        },
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(ad) {
            self.favorits.push(ad.id);
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.item {
  margin-bottom: 7px;
}
.icon {
  background: rgba(166, 194, 215);
  border-radius: 100%;
  margin-right: 10px;
  padding: 3px;
}
li.price {
  list-style: none;
  margin-top: 13px;
  font-size: 0.8rem;
}
</style>