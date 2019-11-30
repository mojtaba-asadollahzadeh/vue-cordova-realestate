<template>
  <v-footer class="pa-3" id="bottomNav" :fixed="true" style="height:56px;">
    <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="#fff">
      <v-btn
        v-for="menu in menus"
        color="#0b5065"
        flat
        :value="menu.action"
        :to="menu.action"
        :key="menu.action"
      >
        <span>{{menu.text}}</span>
        <v-icon>{{menu.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-footer>
</template>


<script>
let storage = window.localStorage;

export default {
  name: "BottomNavigation",

  mounted() {},
  data: function() {
    return {
      bottomNav: "home",
      menus: [
        { icon: "home", text: language.Home[lang], action: "/" },
        { icon: "search", text: language.Search[lang], action: "/search" },
        { icon: "add_circle", text: language.New[lang], action: "/new" },
        { icon: "domain", text: language.Agencies[lang], action: "/agencies" },
        { icon: "chat", text: language.Chat[lang], action: "/chat" }
      ]
    };
  }
};
</script>