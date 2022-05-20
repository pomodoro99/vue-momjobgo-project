<template>
  <v-container>
    <v-row>

      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          type="text"
          v-model="search"
          @keyup.enter="callData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="2"
      >
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="callData"
        >네이버 검색</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="8"
      >
        <v-card
          elevation="2"
          outlined
          shaped
          tile
          v-for="(item, index) in list"
          :key="index"
          style="margin:5px"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div
              align="left"
              @click="onClickRedirect(item.url)"
            >
              <v-card-title
                class="text-h5"
                v-html="item.title"
              ></v-card-title>
              <v-card-subtitle v-html="item.contents"></v-card-subtitle>
            </div>
            <v-avatar
              class="ma-3"
              size="100"
              tile
            >
              <v-img :src="item.thumbnail"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: 'Home',

  data: () => ({
    search: '',

    list: []
  }),

  components: {

  },


  methods: {
    callData () {
      axios.get("/v1/search/webkr.json", {      //axios의 결과가  promise이다
        headers: {
          "X-Naver-Client-Id": "8x1NIuLCel90bvpW_mwb",
          "X-Naver-Client-Secret": "hI7_xn7PSo"
        },
        params: {
          query: this.search
        }
      }).then(response => {
        console.log(response)
        //this.list = response.data.documents;
      }).catch(error => {
        console.error(error)
      })
    },

  }
}
</script>