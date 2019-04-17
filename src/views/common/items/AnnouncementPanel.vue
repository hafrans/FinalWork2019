<template>
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex xs12>
        <v-card color="blue darken-2" >
          <!-- <v-img height="200px" :src="require('../../../assets/dock1.jpg')"> -->
            <v-container fill-height fluid>
              <v-layout fill-height style="color:#EEE" wrap>
                <v-flex xs12>
                    <v-btn icon @click="$router.go(-1)">
                        <v-icon color="#FFF">arrow_back</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12 style="text-align:center" justify-center align-end>
                  <span class="headline" style="font-size:3em;">{{announce.title}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          <!-- </v-img> -->
          <v-card-text class="white--text">
            <div style="text-align:center;color:#DDD">{{announce.user}}</div>
            <div style="text-align:center;color:#DDD">{{announce.time}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card color="#F0F1DF" style="color:#222">
          <v-container>
            <v-layout>
              <v-flex xs12>
                <div class="announce-inner-text" v-html="announce.content"></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    // title:{
    //     type:String,
    //     required:true,
    //     default:"无题公告"
    // },
    // user:{
    //     type:String,
    //     required:false,
    //     default:"管理员"
    // },
    // time:{
    //     type:String,
    //     required:false,
    //     default:"" + new Date()
    // },
    // content:{
    //     type:String,
    //     required:true,
    // }
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      announce(state) {
        let id = parseInt(this.id);
        if (id == 0) {
          //没有公告！
          return {
            title: "暂无公告",
            id: 0
          };
        } else {
          for (let i of state.annoucements) {
            if (i.id == id) {
              return i;
            }
          }
          return {
            title: "暂无公告",
            id: 0,
            user: "该用户已注销"
          };
        }
      }
    })
  }
};
</script>


<style lang="less" scoped>
.announce-inner-text {
  padding: 4rem;
}

@media screen and (max-width: 768px) {
  .announce-inner-text {
    padding: 1em;
  }
}
</style>


