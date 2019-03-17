<template>
  <v-app class="v-container">
    <p-menu/>
    <!-- 加载中遮罩层 -->
    <transition leave-active-class="animated fadeOutDown">
      <div class="global-overlay-index" v-show="show">
        <div class="center-loading">
          <img src="../../../../assets/loading.gif" width="400">
        </div>
      </div>
    </transition>
    <!-- 正文 -->
    <transition>
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import PMenu from "../../../../components/port/PreWarningMenu";
export default {
  provide() {
    return {
      //retCenter:this.centerFocus
    };
  },
  data() {
    return {
      show: true,
      test: "hafrans!"
    };
  },
  components: {
    PMenu
  },
  methods: {
    centerFocus() {
      this.$store.state.port.center = this.$store.state.port.defaultCenter;
      this.$store.state.port.zoom = this.$store.state.port.defaultZoom;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../../../../node_modules/animate.css/animate.css");
html {
  width: 100%;
  position: relative;
  height: 100%;
  overflow: auto;
}
body {
  width: 100%;
  height: 100%;
  position: relative;
}
.application--wrap {
  min-height: 0px !important;
  background: transparent !important;
}
.global-overlay-index {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 11035;
  background: rgba(0, 0, 0, 1);
  > h1 {
    color: #aaaaaa;
    font-size: 3rem;
    text-align: right;
    padding-right: 2rem;
    font-weight: 200;
  }
}

.active {
  background: rgba(0, 0, 0, 0.15);
}

.center-loading {
  position: fixed;
  height: 5em;
  width: 100%;
  top: (50% - 4em) / 2;
  left: 0;
  text-align: center;
}
.loading-finish {
  opacity: 0;
}
</style>
