<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <myContentDrawer />
    </v-navigation-drawer>

    <v-toolbar color="#0b5065" clipped-left app>
      <v-toolbar-side-icon dark @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text" style="width:100%;line-height:2;">
        {{title}}
        <div style="float:right;">
          <slot></slot>
        </div>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import myContentDrawer from "@/components/Drawer";

export default {
  name: "myToolbar",
  props: {
    title: String,
    link: String
  },
  components: { myContentDrawer },
  data: function() {
    return {
      drawer: false
    };
  },
  mounted: function() {
    // Listen for event openDrawer (triggered by other component, like the button in the home)
    document.addEventListener("toggleDrawer", this.toggleDrawer);
  },
  beforeDestroy: function() {
    // If the component is unmount, unlisten the event.
    document.removeEventListener("toggleDrawer", this.toggleDrawer);
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    goHome() {
      window.location.hash = "/";
    },
    linker(link) {
      this.$router.push("/filter/" + link);
    }
  }
};
</script>
