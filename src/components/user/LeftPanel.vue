<template>
  <v-navigation-drawer fixed :height="windowInnerHeight">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/84.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{windowInnerHeight}}</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer/>
          <v-btn icon @click="$root.$children[0].$children[0].confirm.show = true">
            <v-icon>logout</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider/>
    <v-list>
      <v-list-tile @click="test">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>首页</v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-group>
        <template #activator>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>账号管理</v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <v-list-tile-title>基本信息修改</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>账户注销</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>密码修改</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-divider/>
      <v-list-group>
        <template #activator>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>announcement</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>公告管理</v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <v-list-tile-title>公告列表</v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-list>


    <v-footer fixed>
      <v-spacer/>2009-2019 @ hafrans&nbsp;&nbsp;
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      windowInnerHeight: 100
    };
  },
  beforeMount() {
    this.windowInnerHeight = window.innerHeight;
  },
  methods: {
    test() {}
  }
};
</script>
<style lang="less" scoped>
.transparent {
  margin-top: 20em;
}
</style>