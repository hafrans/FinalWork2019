<template>
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <!-- 图片填充！ -->
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{greeting}}，{{username}}!</span>
                </v-flex>

                <v-spacer/>

                <v-btn icon>
                  <v-icon color="white">exit_to_app</v-icon>
                </v-btn>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span ><b>当前时间：</b><span>{{new Date()}}</span></span>
              <br>
              <span class="grey--text">{{aphorism}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="showMessageDialog('暂未开放')">分享</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title>最新公告</v-card-title>
          <v-card-text>
            <v-list
              three-line
              color="blue-grey darken-2"
              style="background:tranparent !important"
              class="white--text"
            >
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>测试数据通知</v-list-tile-title>
                  <v-list-tile-sub-title>
                      <span>超级管理员</span><br>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo at tortor vitae vestibulum. Mauris porttitor non neque vitae imperdiet. Aenean ornare arcu quis magna venenatis pellentesque. Vivamus venenatis imperdiet lacus a tincidunt. Morbi id tortor euismod, ultricies ipsum in, accumsan risus. Maecenas feugiat porta ullamcorper. Aliquam sed quam condimentum nibh mattis venenatis. Morbi blandit nulla id erat viverra bibendum. Aliquam id massa orci. In non diam nisl.
                      </span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="white">更多公告</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
        <v-card color="cyan darken-2" class="white--text">
          <v-card-title>系统信息</v-card-title>
          <v-layout flat>
            <v-flex xs3 offset-xs1>
              
                <img :src="require('../../../assets/map.png')">
              
            </v-flex>
            <v-flex xs8>
              <ul style="list-style:square">
                <li>系统版本：0.45.2699</li>
                <li>上次编译时间：Mar 17 2019 23:41:36 CST</li>
                <li>运行环境：Linux LAPTOP-HAFRANS 4.4.0-17763-Microsoft #379-Microsoft Wed Mar 06 19:16:00 PST 2019 x86_64 x86_64 x86_64 GNU/Linux</li>
              </ul>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer/>
            <v-btn flat color="white" @click="showMessageDialog('您使用的是最新版系统，无需更新！')">检查更新</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
        <v-card color="blue darken2" class="white--text">
          <v-card-title>问题反馈</v-card-title>

          <v-card-text>
            <v-textarea
              name="input-7-1"
              flat
              auto-grow
              background-color="transparent"
              color="white"
              class="white--text"
              style="color:white"
              prepend-icon="feedback"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="orange">提交反馈</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  inject:['showMessageDialog','showConfirmDialog'],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    }),
    greeting() {
      let hour = new Date().getHours();
      if (hour >= 0 && hour < 5) {
        return "凌晨好";
      } else if (hour >= 5 && hour < 8) {
        return "早上好";
      } else if (hour >= 8 && hour < 12) {
        return "上午好";
      } else if (hour == 12) {
        return "中午好";
      } else if (hour >= 13 && hour < 17) {
        return "下午好";
      } else if (hour >= 17 && hour < 19) {
        return "傍晚好";
      } else {
        return "晚上好";
      }
    },
    aphorism(){
      let aphorisms_list = [
        "書到用時方恨少，事非經過不知難。——陸游",
        "智者千虑，必有一失；愚者千虑，必有一得。——《晏子春秋》",
        "天行健，君子以自强不息。——《周易·干·象》",
        "路漫漫其修远兮，吾将上下而求索。——屈原《离骚》",
        "欲速则不达，见小利则大事不成。——《论语》",
        "天行健，君子以自强不息。地势坤，君子以厚德载物。——《易经》",
        "忧劳可以兴国，逸豫可以亡身。——欧阳修",
        "纸上得来终觉浅，绝知此事要躬行。——陆游",
        "You cannot improve your past, but you can improve your future. Once time is wasted, life is wasted.",
        "Don't aim for success if you want it; just do what you love and believe in, and it will come naturally.",
        "Jack of all trades and master of none",
        "Judge not from appearances.",
        "A journey of a thousand miles begins with a single step."

      ];
      let randomIndex = Math.floor(Math.random()*aphorisms_list.length);
      return aphorisms_list[randomIndex]; 
    }
  }
};
</script>
<style lang="less" scoped>
.v-list__tile__content {
  background: transparent;
}
html {
  overflow: auto;
}
</style>


