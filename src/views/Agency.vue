<template>
  <v-layout align-start justify-start row fill-height style="margin:20px 0px;">
    <myToolbar :title="agency.name" class="header"></myToolbar>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img :src="website + user.avatar"></v-img>

        <v-card-title primary-title>
          <h3 class="headline mb-30">{{agency.name}}</h3>
          <div style="margin-top:10px;">
            <div>
              <b>Phone :</b>
              {{agency.phone}}
            </div>
            <div>
              <b>Address :</b>
              {{agency.address}}
            </div>
            <div>
              <b>Website :</b>
              {{agency.website}}
            </div>
          </div>
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
  name: "agency",
  components: {
    myToolbar,
    BottomNavigation
  },
  mounted() {
    this.website = KEYTEN;
  },
  created() {
    this.fetchAgency(this.$route.params.id);
  },
  data() {
    return {
      agency: {},
      user: {},
      website: null
    };
  },
  methods: {
    fetchAgency(id) {
      var self = this;
      $.ajax({
        url: API + "/agency/" + id,
        type: "GET",
        dataType: "json",
        success: function(json) {
          var data = response.data.data;
          self.agency = data[0];
          self.user = data[1];
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
