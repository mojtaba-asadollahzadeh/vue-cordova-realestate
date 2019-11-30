import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Settings from "@/views/Settings";
import Ad from "@/views/Ad";
import Search from "@/views/Search";
import SearchResults from "@/views/SearchResults";
import SearchResultsMap from "@/views/SearchResultsMap";
import PublishAds from "@/views/PublishAds";
import Profile from "@/views/Profile";
import Promot from "@/views/Promot";
import Agencies from "@/views/Agencies";
import Agency from "@/views/Agency";
import Agents from "@/views/Agents";
import Agent from "@/views/Agent";
import Chat from "@/views/Chat";
import Favorits from "@/views/Favorits";
import Landing from "@/views/Landing";
import Contact from "@/views/Contact";
import Page from "@/views/Page";
import MyAds from "@/views/MyAds";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/landing",
      name: "Landing",
      component: Landing
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem("installed") == null) {
          next("/landing");
        }
        next();
      }
    },
    {
      path: "/ad/:id",
      name: "Ad",
      component: Ad
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/search-results",
      name: "SearchResults",
      component: SearchResults
    },
    {
      path: "/search-results-map",
      name: "SearchResultsMap",
      component: SearchResultsMap
    },
    {
      path: "/new",
      name: "new",
      component: PublishAds
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/profile/promot",
      name: "promot",
      component: Promot
    },
    {
      path: "/agencies",
      name: "agencies",
      component: Agencies
    },
    {
      path: "/agency/:id",
      name: "Agency",
      component: Agency
    },
    {
      path: "/agents",
      name: "agents",
      component: Agents
    },
    {
      path: "/agents/:id",
      name: "Agent",
      component: Agent
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/chat",
      name: "chathome",
      component: Contact,
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem("user") == null) {
          next("/profile");
        }
        next();
      }
    },
    {
      path: "/chat/:id",
      name: "chat",
      component: Chat,
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem("user") == null) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/favorits",
      name: "Favorits",
      component: Favorits,
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem("user") == null) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/page/:id",
      name: "page",
      component: Page
    },
    {
      path: "/myads",
      name: "myads",
      component: MyAds,
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem("user") == null) {
          next("/");
        }
        next();
      }
    }
  ]
});
