<template>
  <div class="statusbar">
    <div class="text-bar">
      <div v-show="control1">
        <transition :duration="2000" mode="out-in">
          <v-icon v-if="$store.state.port.statShow" color="#ccc" @click="$store.state.port.statShow = false">mdi-arrow-down-drop-circle-outline</v-icon>
          <v-icon v-else color="#ccc" @click="$store.state.port.statShow = true">mdi-arrow-up-drop-circle-outline</v-icon>
        </transition>
      </div>
      <!-- <div>非安全区内人员/设备数量：{{$store.state.abnormalPoints.length}}</div>
      <div>非安全区数量: {{$store.state.abnormalPolygons.length}}</div> -->
    </div>
    <div class="timebar">{{time}}</div>
  </div>
</template>

<script>
/**
 * StatusBar
 *  状态栏
 * @author hafrans
 * @email hafrans@163.com
 */
import {mapState} from 'vuex';
export default {
  data() {
    return {
      year: "2018",
      month: "1",
      day: "18",
      hour: "01",
      minute: "03",
      second: "02"
    };
  },
  beforeMount() {
    var that = this;
    var func = function() {
      let date = new Date();
      that.year = date.getFullYear();
      that.month = that.addPrefixZero(date.getMonth() + 1);
      that.day = that.addPrefixZero(date.getDate());
      that.hour = that.addPrefixZero(date.getHours());
      that.minute = that.addPrefixZero(date.getMinutes());
      that.second = that.addPrefixZero(date.getSeconds());
      setTimeout(func, 1000);
    };

    setTimeout(func, 50);
  },
  methods: {
    addPrefixZero(text) {
      let s = Number.parseInt(text);
      if (s < 10) {
        return "0" + s;
      }
      return s.toString();
    }
  },
  computed: {
    time() {
      return (
        this.year +
        "-" +
        this.month +
        "-" +
        this.day +
        " " +
        this.hour +
        ":" +
        this.minute +
        ":" +
        this.second
      );
    },
    ...mapState({
      control1: (state) => state.port.show_control
    })
  }
};
</script>

<style lang="less" scoped>
@import url(../../node_modules/@mdi/font/css/materialdesignicons.css);

.statusbar {
  position: fixed;
  width: 100%;
  height: 2.85em;
  background: rgba(66, 66, 66, 1);
  color: #eee;
  bottom: 0;
  left: 0;
  // pointer-events: none;
  z-index: 4000;
}
.timebar {
  right: 0%;
  text-align: right;
  width: 50%;
  font-size: 1.25em;
  padding-right: 1.75em;
  position: absolute;
  top: 0.5em;
  pointer-events: none;
}
.text-bar {
  position: absolute;
  font-size: 1.1em;
  top:0.5em;
  div {
    display: inline-block;
    margin-right: 1em;
    margin-left:1em;
    pointer-events: all;
  }
}
</style>

