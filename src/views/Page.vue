<template>
  <v-layout align-start justify-start row fill-height style="margin:20px 0px;">
    <myToolbar :title="page.name" class="header"></myToolbar>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <h2 class="headline mb-30">{{page.name}}</h2>
          <div style="margin-top:10px;" v-html="page.text"></div>
        </v-card-title>
        <v-divider></v-divider>
        <div style="padding: 10px;">
          <v-divider></v-divider>
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
  name: "page",
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    this.fetchPage(this.$route.params.id);
    this.website = KEYTEN;
  },
  created() {},
  data() {
    return {
      page: null,
      website: null
    };
  },
  methods: {
    fetchPage(id) {
      var self = this;
      $.ajax({
        url: API + "/pages/" + id,
        type: "GET",
        dataType: "json",
        success: function(json) {
          self.page = json.data;
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
