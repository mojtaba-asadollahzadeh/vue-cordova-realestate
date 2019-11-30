<template>
  <div>
    <v-toolbar flat />
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" :key="i"></v-divider>
        <v-list-tile :to="item.action" :key="i" v-else>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <template v-if="user.token != null">
        <v-divider dark></v-divider>
        <v-list-tile to="/chat">
          <v-list-tile-action>
            <v-icon color="black">chat</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="language.Chat[lang]"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/favorits">
          <v-list-tile-action>
            <v-icon color="yellow">star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="language.Favorits[lang]"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/myads">
          <v-list-tile-action>
            <v-icon color="#0b5065">history</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="language.MyAds[lang]"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="red">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="logout" v-text="language.Logout[lang]"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>


<script>
let storage = window.localStorage;
export default {
  name: "drawer",
  mounted() {
    if (storage.getItem("user")) {
      this.user = JSON.parse(storage.getItem("user"));
    }
    this.fetchPages();
  },
  data: function() {
    return {
      language: language,
      lang: lang,
      user: {},
      items: [
        { icon: "home", text: language.Home[lang], action: "/" },
        { icon: "person", text: language.Profile[lang], action: "/profile" },
        {
          icon: "settings",
          text: language.Settings[lang],
          action: "/settings"
        }
      ]
    };
  },
  methods: {
    fetchPages() {
      var self = this;
      $.ajax({
        url: API + "/pages/all",
        type: "GET",
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(page) {
            self.items.push({
              icon: "fiber_smart_record",
              text: page.name,
              action: "/page/" + page.id
            });
          });
        }
      });
    },
    logout() {
      storage.removeItem("user");
      storage.removeItem("role");
      window.location.reload();
    }
  }
};
</script>