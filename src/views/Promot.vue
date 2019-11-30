<template>
  <v-layout align-start justify-start row fill-height>
    <myToolbar :title="language.UpgradeAccount[lang]" class="header"></myToolbar>
    <v-card v-if="user.token != null" style="max-height: 83vh; overflow-y: scroll">
      <v-img :src="user.avatar ? website + user.avatar : '/avatar-512.png'" aspect-ratio="1.4"></v-img>
      <v-card-text>
        <v-radio-group row v-model="role">
          <v-radio v-for="role in roles" :label="role.name" :value="role.id" :key="role.id"></v-radio>
        </v-radio-group>
      </v-card-text>

      <v-card-text>
        <v-text-field
          v-model="form.languages"
          :label="language.SpeakLanguage[lang]"
          v-if="role == 2"
        ></v-text-field>
        <v-text-field v-model="form.name" :label="language.AgencyName[lang]"></v-text-field>
        <v-text-field v-model="form.phone" :label="language.PhoneNumber[lang]"></v-text-field>
        <v-text-field v-model="form.email" :label="language.YourEmail[lang]"></v-text-field>
        <v-text-field v-model="form.website" :label="language.Website[lang]"></v-text-field>
        <v-textarea v-model="form.address" :label="language.Address[lang]"></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn color="#0b5065" block outline @click="update" v-text="language.SaveChanges[lang]"></v-btn>
      </v-card-actions>
    </v-card>
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
  name: "promot",
  created() {
    this.website = KEYTEN;
  },
  mounted() {
    this.user = JSON.parse(storage.getItem("user"));
  },
  data() {
    return {
      language: language,
      lang: lang,
      token: null,
      id: null,
      user: {},
      role: 3,
      roles: [
        { id: 2, name: language.RealestateConsultant[lang] },
        { id: 3, name: language.ConstructionCompany[lang] },
        { id: 4, name: language.RealestateOffice[lang] }
      ],
      form: {
        phone: "",
        name: "",
        email: "",
        website: "",
        address: "",
        languages: ""
      }
    };
  },
  methods: {
    update() {
      var self = this;
      var formData = new FormData();
      for (var key in this.form) {
        formData.append(key, this.form[key]);
      }

      formData.append("role", this.role);

      const options = {
        method: "POST",
        body: formData,
        // If you add this, upload won't work
        headers: {
          "xs-token": this.user.token
        }
      };

      $.ajax({
        url: API + "/user/role/update",
        type: "POST",
        headers: {
          "xs-token": this.user.token
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(json) {
          if (json.status == 200) {
            var user = json.data["user"];
            var role = json.data["data"];
            Swal.fire({
              type: "success",
              title: "Your Role Updated Successfully !",
              showConfirmButton: false,
              timer: 1500
            });
            storage.setItem("user", JSON.stringify(user));
            storage.setItem("role", JSON.stringify(role));
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
