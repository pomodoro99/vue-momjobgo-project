<template>
  <v-app>
    <v-card
      width="500"
      style="top: 25%"
      class="mx-auto mt-5"
    >
      <v-card-title class="pb-0">
        <h3>Login</h3>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            label="Id"
            v-model="id"
            @keyup.enter="$refs.pwd.focus()"
            autofocus
          />
          <v-text-field
            ref="pwd"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            @keyup.enter="login"
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <SignUpModalViewVue btn-color="success">
          <template v-slot:title>회원가입</template>
        </SignUpModalViewVue>
        <v-btn
          color="info"
          @click="login"
          style="margin-left: 8px;"
        >로그인</v-btn>
      </v-card-actions>

    </v-card>
  </v-app>
</template>

<script>
import SignUpModalViewVue from "./SignUpModalView.vue";

import { mapGetters, mapActions } from "vuex"
//import axios from "axios"

export default {
  data: () => ({
    showPassword: false,
    id: "",
    password: "",
    token: ""
  }),

  mounted () {
    this.setAllVisible(false);
  },

  beforeDestroy () {
    this.setAllVisible(true);
  },

  computed: {
    ...mapGetters('page', ['basePath']),
  },

  methods: {
    ...mapActions('page', ['setAllVisible']),
    ...mapActions('user', ['setToken', 'setUserName', 'setUserId']),

    async login () {
      /**
       * 로그인.
       * 
       * 로그인 한 후 발급된 토큰을 vuex에 저장
       * 로그인 성공 후 location.href='/'
       */
      const response = await this.$api(`/auth/user`, "post", {
        id: this.id,
        pwd: this.password,
      });

      if (response.status === 200) {
        //console.log(`resp_token[${response.data.token}]`)
        this.setToken(response.data.token)

        /*app.vue getUserInfo에서 유저정보 가져오는 것으로 변경함*/
        // const { data: user } = await this.$api(`/api/auth/user`, 'get')
        // // this.setUserInfo(user);
        // //console.log(`name[${user.name}]`)
        // this.setUserName(user.name);
        // this.setUserId(user.id);

        // location.href = '/'   //이부분이 없어도 페이지는 바뀌나 navview에서 유저네임 표시 안됨.
        location.href = this.basePath;
      }
    }
  },

  components: {
    SignUpModalViewVue
  }
}
</script>

<style>
</style>