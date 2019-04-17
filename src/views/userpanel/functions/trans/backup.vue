<template>
  <v-app class="v-container">
    <baidu-map style="display:none"/>
    <v-chart :options="option" ref="chart" style="width:100%;height:100%"/>
  </v-app>
</template>

<script>
// import PMenu from "../../../../components/port/PreWarningMenu";
// eslint-disable-next-line
//eslint-disable-next-line
import BMap from "vue-baidu-map";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/helper/Polyline";
import "echarts/lib/chart/helper/EffectPolyline";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
import "echarts/map/js/world";
import "echarts/extension/bmap/bmap.js";
import "zrender/lib/svg/svg";
require("echarts/lib/component/geo");
require("echarts/extension/bmap/bmap");

// //eslint-disable-next-line

export default {
  provide() {
    return {
      //retCenter:this.centerFocus
    };
  },
  data() {
    return {
      option: {
        // 加载 bmap 组件
        bmap: {
          // 百度地图中心经纬度
          center: [120.13066322374, 30.240018034923],
          // 百度地图缩放
          zoom: 14,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {}
        },
        series: [
          {
            type: "scatter",
            // 使用百度地图坐标系
            coordinateSystem: "bmap",
            // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [[120, 30, 1]]
          }
        ]
      }
    };
  },
  components: {
    // PMenu
  },
  methods: {
    centerFocus() {
      this.$store.state.port.center = this.$store.state.port.defaultCenter;
      this.$store.state.port.zoom = this.$store.state.port.defaultZoom;
    },
    input(e) {
      //eslint-disable-next-line
      console.log(e);
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
