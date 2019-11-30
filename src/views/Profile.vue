<template>
  <v-layout align-start justify-start row fill-height style="margin-bottom: 10px;margin-top:50px;">
    <myToolbar :title="language.Profile[lang]" class="header"></myToolbar>

    <v-card style="width: 100%;" v-if="user.token">
      <v-card-text>
        <v-flex class="mb-4">
          <v-avatar size="96" class="mr-4">
            <img :src="user.avatar ? website + user.avatar : '/avatar-512.png'" />
          </v-avatar>
          <v-btn
            onclick="document.getElementById('avatar').click()"
            v-text="language.ChangeAvatar[lang]"
          >
            <v-icon style="margin-right: 10px;">portrait</v-icon>
          </v-btn>
          <input type="file" id="avatar" class="avatar" style="display:none" />
        </v-flex>
        <v-text-field v-model="user.name" :label="language.YourName[lang]"></v-text-field>
        <v-text-field v-model="user.mobile" :label="language.MobileNumber[lang]"></v-text-field>
        <v-text-field v-model="user.email" :label="language.YourEmail[lang]"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn color="#0b5065" block outline @click="update" v-text="language.SaveChanges[lang]"></v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="black" block outline to="/profile/promot">Show Role Info</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
          color="#27ae60"
          block
          outline
          to="/profile/promot"
          v-text="language.UpgradeAccount[lang]"
        ></v-btn>
      </v-card-actions>
    </v-card>

    <div style="width: 100%;" v-if="user.token == null">
      <v-card style="margin-bottom:20px;">
        <v-img src="images/43022.jpg" aspect-ratio="2" contain style="margin-top:10px;"></v-img>
        <v-card-text>
          <h3 v-text="language.LoginToKeyten[lang]"></h3>
        </v-card-text>
        <v-card-text>
          <v-text-field v-model="loginForm.mobile" :label="language.MobileNumber[lang]"></v-text-field>
          <v-text-field
            type="password"
            v-model="loginForm.password"
            :label="language.Password[lang]"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-btn color="#0b5065" outline block @click="login" v-text="language.LoginToKeyten[lang]"></v-btn>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <h3 v-text="language.RegisterInKeyten[lang]"></h3>
        </v-card-text>
        <v-card-text>
          <v-text-field v-model="registerForm.name" :label="language.YourName[lang]"></v-text-field>
          <v-text-field v-model="registerForm.mobile" :label="language.MobileNumber[lang]"></v-text-field>
          <v-text-field
            type="password"
            v-model="registerForm.password"
            :label="language.Password[lang]"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-btn
            color="#0b5065"
            outline
            block
            @click="register"
            v-text="language.RegisterInKeyten[lang]"
          ></v-btn>
        </v-card-text>
      </v-card>
    </div>

    <v-snackbar v-model="snackbar" :top="'top'">
      {{ snackbartext }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <BottomNavigation></BottomNavigation>
  </v-layout>
</template>

<script>
let storage = window.localStorage;
import Swal from "sweetalert2";
import FormData from "form-data";
import myToolbar from "@/components/MyToolbar";
import BottomNavigation from "@/components/BottomNavigation";
export default {
  components: {
    myToolbar,
    BottomNavigation
  },
  name: "profile",
  created() {
    this.website = KEYTEN;
  },
  mounted() {
    if (storage.getItem("user")) {
      this.user = JSON.parse(storage.getItem("user"));
    }
    if (this.user.token != null) {
      this.loadUserData(this.user._id);
    }
  },
  data() {
    return {
      language: language,
      lang: lang,
      snackbar: false,
      snackbartext: "",
      website: null,
      user: {},
      registerForm: {
        password: null,
        mobile: null,
        name: null
      },
      loginForm: {
        password: null,
        mobile: null
      },
      showAvatarPicker: false
    };
  },
  methods: {
    register() {
      var self = this;
      var formData = new FormData();
      for (var key in this.registerForm) {
        formData.append(key, this.registerForm[key]);
      }
      $.ajax({
        url: API + "/user/register",
        type: "POST",
        headers: {
          language: lang
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(json) {
          if (json.status == 200) {
            storage.setItem("user", JSON.stringify(json.data));
            self.user = json.data;
            self.loadUserData(json.data._id);
            window.location.reload();
          }
        }
      });
    },
    login() {
      var self = this;
      var formData = new FormData();
      for (var key in this.loginForm) {
        formData.append(key, this.loginForm[key]);
      }
      $.ajax({
        url: API + "/user/login",
        type: "POST",
        headers: {
          language: lang
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(json) {
          if (json.status == 200) {
            storage.setItem("user", JSON.stringify(json.data));
            self.user = json.data;
            self.loadUserData(json.data._id);
            window.location.reload();
          } else {
            this.snackbartext = "Wrong Credentials !Try Again";
            this.snackbar = true;
          }
        }
      });
    },
    loadUserData(id) {
      var token = this.token;
      var self = this;
      $.ajax({
        url: API + "/user/" + id,
        type: "GET",
        headers: {
          "xs-token": this.user.token
        },
        dataType: "json",
        success: function(json) {
          self.user = json.data;
        }
      });
    },
    update() {
      var self = this;
      var formData = new FormData();
      for (var key in this.user) {
        formData.append(key, this.user[key]);
      }
      // attaching the avatar
      if (
        document.getElementsByClassName("avatar")[0].files[0] != undefined &&
        document.getElementsByClassName("avatar")[0].files[0] != null
      ) {
        formData.append(
          "avatar",
          document.getElementsByClassName("avatar")[0].files[0]
        );
      }

      $.ajax({
        url: API + "/user/update",
        type: "POST",
        headers: {
          "xs-token": this.user.token
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(json) {
          self.user = json.data;
          storage.setItem("user", JSON.stringify(json.data));
          Swal.fire({
            type: "success",
            title: "",
            showConfirmButton: false,
            timer: 1500
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
</style>
