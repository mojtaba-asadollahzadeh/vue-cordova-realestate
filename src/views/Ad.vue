<template>
  <v-layout align-start justify-start row fill-height style="margin:20px 0px;">
    <myToolbar :title="ad.title" class="header"></myToolbar>
    <v-card style="width: 100%;">
      <div
        class="dial"
        style="position:fixed;z-index:1200 !important;right:10px;width:min-content;"
      >
        <a :href="'tel:'+this.ad.broker.phone">
          <v-btn fab dark small color="green">
            <v-icon>call</v-icon>
          </v-btn>
        </a>
        <a :href="'sms:'+this.ad.broker.phone">
          <v-btn fab dark small color="red">
            <v-icon>sms</v-icon>
          </v-btn>
        </a>
        <a :href="'mailto:'+this.ad.broker.email">
          <v-btn fab dark small color="blue">
            <v-icon>email</v-icon>
          </v-btn>
        </a>
      </div>
      <v-carousel class="carousel" hide-delimiters>
        <v-carousel-item cycle v-for="(item,i) in ad.images" :key="i" :src="website + item"></v-carousel-item>
      </v-carousel>
      <v-card-title>
        <h2 class="text-left">{{ad.title}}</h2>
      </v-card-title>
      <v-card-text>
        <div
          class="subtitle-1 black--text"
        >{{ad.country.name}}, {{ad.city.name}} , {{ad.street.name}}</div>

        <h4 class="price">
          {{language.Price[lang]}} :
          {{ad.price}}
        </h4>
        <v-chip color="#0b5065" text-color="white">
          <v-icon left>{{ ad.category.icon }}</v-icon>
          {{ ad.category.name }}
        </v-chip>
        <v-chip v-if="ad.type" color="#0b5065" text-color="white">
          <v-icon left>star</v-icon>
          {{ ad.type.name }}
        </v-chip>
      </v-card-text>
      <v-layout justify-space-around class="analatics">
        <v-chip label outline color="#0b5065" text-color="#0b5065">
          <v-icon color="#0b5065" left>av_timer</v-icon>
          {{ ad.date }}
        </v-chip>
        <v-chip label outline color="#0b5065" text-color="#0b5065">
          <v-icon color="#0b5065" left>visibility</v-icon>
          {{ ad.view }}
        </v-chip>
        <v-chip label outline color="#0b5065" text-color="#0b5065">
          <v-icon color="#0b5065" left>view_headline</v-icon>
          {{ ad.code }}
        </v-chip>
      </v-layout>
      <v-card-text>
        <h4 v-text="language.Address[lang] + ' : '"></h4>
        <p>{{ad.address}}</p>
      </v-card-text>
      <v-card-text>
        <h4 v-text="language.Description[lang] + ':'"></h4>
        <p>{{ad.text}}</p>
      </v-card-text>
      <v-card-text>
        <h3>
          <v-icon>location_on</v-icon>
          {{language.Location[lang]}}
        </h3>
      </v-card-text>
      <v-card-text style="position:sticky;">
        <div id="map" style="width:100%;height:400px;"></div>
      </v-card-text>
      <v-card-text>
        <h4 v-for="(name,val) in ad.options" v-bind:key="name">- {{val}} : {{name}}</h4>
      </v-card-text>
      <v-flex v-if="ad.broker != null" class="pa-4">
        <v-flex xs12>
          <v-card color="cyan darken-2" class="white--text">
            <v-layout>
              <v-flex xs5>
                <v-img
                  :src="ad.user.avatar ? website + ad.user.avatar : '/avatar-512.png'"
                  height="125px"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{ad.broker.agency}}</div>
                    <div>{{ad.broker.name}}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              Website : {{ad.broker.website}}
              <br />
              Address : {{ad.broker.address}}
            </v-card-actions>
            <v-btn color="dark" :to="'/chat/'+ad.user._id">{{language.Chat[lang]}}</v-btn>
          </v-card>
        </v-flex>
      </v-flex>
    </v-card>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
var L = require("leaflet");
var geocode = require("esri-leaflet-geocoder");
export default {
  name: "ad",
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    // bind ad ID
  },
  created() {
    this.fetchAd(this.$route.params.id);
    this.website = KEYTEN;
  },
  data() {
    return {
      language: language,
      lang: lang,
      ad: {
        id: null,
        user: {
          _id: "",
          email: "",
          name: "",
          avatar: ""
        },
        broker: { name: null },
        country: { id: "", name: "" },
        city: { id: "", name: "" },
        street: { id: "", name: "" },
        category: { name: null },
        type: { name: null },
        options: null,
        lon: null,
        lat: null,
        address: null,
        price: null,
        title: null,
        text: null,
        chat: null,

        thumbnails: null,
        date: null,
        view: null,
        code: null
      },
      website: null
    };
  },
  methods: {
    fetchAd(id) {
      var self = this;
      $.ajax({
        url: API + "/ad/" + id,
        type: "GET",
        headers: {
          language: lang
        },
        dataType: "json",
        success: function(json) {
          var data = json.data;
          self.ad = data;
          var map = L.map("map");
          map.invalidateSize();
          map.setView([data.lng, data.lat], 15);
          var marker = L.marker([data.lng, data.lat], {
            draggable: false,
            title: data.title
          })
            .addTo(map)
            .bindPopup(
              `<h2>${data.title}</h2><br>${data.country.name +
                " " +
                data.city.name}</b>`
            )
            .openPopup();
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
        }
      });
    }
  }
};
</script>

<style scoped>
.carousel {
  height: 200px;
}
.price {
  color: #d50000;
}
.analatics {
  padding: 5px 4px;
  background: rgba(235, 235, 235);
}
.text-left {
  text-align: left;
}
.dial a {
  text-decoration: none;
}
.v-carousel__item:first-child {
  display: block !important;
}
</style>
