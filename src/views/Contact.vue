<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar :title="language.Contacts[lang]" class="header"></myToolbar>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line>
            <v-card v-for="(item,i) in contacts" :key="i" :to="'/chat/' + item._id">
              <v-divider></v-divider>

              <v-list-tile :key="item.name" avatar>
                <v-list-tile-avatar>
                  <img :src="item.avatar ? website + item.avatar : '/avatar-512.png'" />
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <span class="has-unread-message" v-if="item.unread != null"></span>
                  <v-list-tile-title
                    class="last-message"
                    v-if="item.unread != null"
                  >{{item.unread.text.substr(0, 19)}} ...</v-list-tile-title>
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
let storage = window.localStorage;
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    if (storage.getItem("user")) {
      this.user = JSON.parse(storage.getItem("user"));
    }
    if (this.user.token != null) {
      this.fetchContacts();
    }
    this.website = KEYTEN;
  },
  name: "contact",
  data() {
    return {
      user: {},
      ads: [],
      contacts: [],
      website: null,
      language: language,
      lang: lang
    };
  },
  methods: {
    fetchContacts() {
      var self = this;
      $.ajax({
        url: API + "/chat/contacts",
        type: "GET",
        headers: {
          "xs-token": this.user.token
        },
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(contact) {
            self.contacts.push(contact);
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
span.has-unread-message {
  width: 10px;
  height: 10px;
  background: #c0392b;
  border-radius: 100%;
  float: right !important;
  right: 20px;
  position: absolute;
}
.last-message {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
</style>
