<template>
  <v-layout align-start justify-start row fill-height style="margin:20px 0px;">
    <myToolbar :title="item.user.name" class="header"></myToolbar>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          aspect-ratio="1"
          :src="item.user.avatar ? website + item.user.avatar : '/avatar-512.png'"
        ></v-img>

        <v-card-title primary-title>
          <h3 class="headline mb-30">{{item.user.name}}</h3>
          <div style="margin-top:10px;">
            <div>
              <b>{{language.Phone[lang]}} :</b>
              {{item.agent.phone}}
            </div>
            <div>
              <b>{{language.Address[lang]}} :</b>
              {{item.agent.address}}
            </div>
            <div>
              <b>{{language.Website[lang]}} :</b>
              {{item.agent.website}}
            </div>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <div style="padding: 10px;">
          <div>
            <b>Languages I Speak :</b>
            {{item.agent.languages}}
          </div>
          <v-btn color="dark" :to="'/chat/'+item.user._id">{{language.Chat[lang]}}</v-btn>
        </div>
      </v-card>
    </v-flex>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  name: "agent",
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    this.website = KEYTEN;
  },
  created() {
    this.fetchAgent(this.$route.params.id);
  },
  data() {
    return {
      language: language,
      lang: lang,
      item: {
        agent: {},
        user: {}
      },
      website: null
    };
  },
  methods: {
    fetchAgent(id) {
      var self = this;
      $.ajax({
        url: API + "/agents/" + id,
        type: "GET",
        dataType: "json",
        success: function(json) {
          self.item = json.data;
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
</style>
