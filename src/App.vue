<template>
  <v-app toolbar>
    <v-content class="main-content">
      <v-slide-y-transition mode="out-in">
        <v-container pa-2 fluid fill-height align-content-center align-center>
          <router-view></router-view>
        </v-container>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<script>
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  name: "app",
  components: {
    myToolbar
  },
  mounted() {},
  data() {
    return {
      bottomNav: "home"
    };
  },
  methods: {}
};
</script>
<style>
.main-content {
  background: #d8d8d8;
  padding: 20px;
}
#loading {
  position: absolute;
  text-align: center;
  height: 100%;
  top: 0;
  width: 100%;
  z-index: 1200;
  background: red;
}
</style>