<template>
  <v-app class="v-container">
    <v-chart :options="polar" ref="chart" style="width:100%;height:100%;background:white;"/>
  </v-app>
</template>
<script>
import ECharts from "vue-echarts";

import "echarts/extension/bmap/bmap";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts/lib/chart/scatter";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      polar: {
        // 加载 bmap 组件
        bmap: {
          // 百度地图中心经纬度
          center: [117.321386, 39.055289],
          // 百度地图缩放
          zoom: 11,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {
            style : "midnight"
          }
        },
        visualMap: {
          show: false,
          top: "top",
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ["blue", "blue", "green", "yellow", "red"]
          }
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "bmap",
            data: [],
            pointSize: 6,
            blurSize: 8
          }
        ]
      }
    };
  },
  beforeMount() {
    this.$axios.get("/city/json").then(resp => {
      let obj = resp.data;
      this.polar.series[0].data = obj.map(dd => {
        return [dd.longitude, dd.latitude, dd.size];
      });
      //eslint-disable-next-line
      console.log(this.polar.series[0].data);
    });
  }
};
</script>
<style lang="less" scoped>
// @import url("../../../../../node_modules/animate.css/animate.css");
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
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
