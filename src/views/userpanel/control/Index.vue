<template>
  <v-app>
    <!-- 确认框 -->
    <v-dialog v-model="confirm.show" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{confirm.title}}</v-card-title>
        <v-card-text>{{confirm.content}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="confirm.show = false">取消</v-btn>
          <v-btn color="green darken-1" flat @click="doOk">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 警告框 -->
    <v-dialog v-model="dialog.show" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{dialog.title}}</v-card-title>
        <v-card-text>{{dialog.content}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog.show = false">我知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!------------------------------->
    <v-layout flat wrap>
      <v-flex md2>
        <drawer/>
      </v-flex>
      <v-flex md9 sm12 class="right-panel">
        <v-fade-transition mode="out-in">
           <router-view />
        </v-fade-transition>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Drawer from "../../../components/user/LeftPanel";

//vuex

import { mapState } from "vuex";

/**
 * @author hafrans@163.com
 * @deprecated need refactoring
 */
export default {
  provide() {
    return {
      showMessageDialog: this.showMessageDialog,
      showConfirmDialog: this.showConfirmDialog
    };
  },
  data() {
    return {
      dialog: {
        show: false,
        title: "default title",
        content: "test content here."
      },
      confirm: {
        show: false,
        title: "default",
        content: "test",
        ok: () => {}
      }
    };
  },
  components: {
    Drawer,
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
    }
  },
  methods: {
    showConfirmDialog(content, title = "提示", callback = () => {}) {
      this.confirm.title = title;
      this.confirm.content = content;
      this.confirm.ok = callback;
      this.confirm.show = true;
    },
    showMessageDialog(content, title = "提示") {
      this.dialog.content = content;
      this.dialog.title = title;
      this.dialog.show = true;
    },
    doOk(){
      this.confirm.show = false;
      this.confirm.ok();
      
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../../node_modules/animate.css/animate.min.css);

@default-padding: 2rem;

.right-panel {
  padding: 2rem 2rem /*dynamic?*/;
}
@media screen and (max-width: 1366px) {
  .right-panel {
    padding: 0rem 0;
    width: 100;
  }
}
</style>

