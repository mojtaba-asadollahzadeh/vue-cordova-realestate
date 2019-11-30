<template>
  <v-layout align-start justify-start row fill-height style="margin-top: 30px;margin-bottom: 30px;">
    <myToolbar title class="header"></myToolbar>
    <div>
      <div v-for="(message,i) in messages" :key="i" class="block right">
        <div class="message" v-bind:class="{ 'sender': message.sender == user._id }">
          {{message.text}}
          <v-divider class="mt-2 mb-2"></v-divider>
          <span class="grey--text date">{{message.date}}</span>
        </div>
      </div>
    </div>
    <v-footer class="pa-0" :fixed="true" style="z-index: 1200">
      <v-textarea solo :label="language.YourMessage[lang]" v-model="message"></v-textarea>
    </v-footer>
    <v-footer class="pa-0" :fixed="true" style="z-index: 1200">
      <v-btn
        color="#0b5065"
        style="margin:0;width: 100%;color: #fff;"
        @click="send"
      >{{language.Send[lang]}}</v-btn>
    </v-footer>
  </v-layout>
</template>

<script>
let storage = window.localStorage;
import FormData from "form-data";
import myToolbar from "@/components/MyToolbar";
export default {
  name: "chat",
  components: {
    myToolbar
  },
  mounted() {
    if (storage.getItem("user")) {
      this.user = JSON.parse(storage.getItem("user"));
      this.fetchMessages();
    } else {
      this.$router.to("/profile");
    }
  },
  data() {
    return {
      user: {},
      message: "",
      contact: this.$route.params.id,
      messages: [],
      language: language,
      lang: lang
    };
  },
  methods: {
    send() {
      var self = this;
      if (this.user.token == null) {
        return;
      }
      var formData = new FormData();
      formData.append("uid", self.contact);
      formData.append("message", self.message);
      $.ajax({
        url: API + "/chat/send",
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
            var message = json.data;
            self.message = "";
            self.messages.push({
              date: message.created_at,
              text: message.text,
              sender: message.sender
            });
          }
        }
      });
    },
    fetchMessages() {
      var self = this;
      if (this.user.token == null) {
        return;
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "xs-token": this.user.token
        }
      };
      $.ajax({
        url: API + "/chat/messages/" + self.contact + "/all",
        type: "GET",
        headers: {
          "xs-token": this.user.token
        },
        dataType: "json",
        success: function(json) {
          json.data.forEach(function(message) {
            self.messages.push({
              date: message.created_at,
              text: message.text,
              sender: message.sender
            });
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.block {
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
}

.message {
  width: 100%;
  border: 0.5px solid #0b5065;
  padding: 10px;
  border-radius: 10px;
  background: #fff;
}

.sender {
  background: #0b5065;
  color: #fff;
}
.sender .date {
  color: #fff;
}

#bottomNav {
  display: none;
}
</style>