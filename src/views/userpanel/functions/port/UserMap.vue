<template>
  <div>
    <div>
      <div class="global-overlay animated bounceIn delay4s">
        <h1>{{time}}</h1>
        <hr class="spliter">
        <ul>
          <li>
            今日警示次数：
            <span>
              <b style="color:red">16</b> 个
            </span>
          </li>
          <li>
            本周警示次数：
            <span>
              <b style="color:red">52</b> 个
            </span>
          </li>
          <li>
            本月警示次数：
            <span>
              <b style="color:red">74</b> 个
            </span>
          </li>
          <li>
            非安全区数量:
            <span>
              <b style="color:yellow">{{$store.state.abnormalPolygons.length}}</b> 个
            </span>
          </li>
          <li>
            非安全区内人员/设备数量：
            <span>
              <b style="color:red">{{$store.state.abnormalPoints.length}}</b> 个
            </span>
          </li>
        </ul>
      </div>
      <!-- 统计面板 -->
      <baidu-map
        class="charts"
        :center="$store.state.port.center"
        :zoom="$store.state.port.zoom"
        :scroll-wheel-zoom="true"
        @ready="handleReady"
        ref="bmap"
        mapType="BMAP_NORMAL_MAP"
      >
        <!-- 信息窗体 -->
        <transition>
          <bm-info-window
            :position="highlightWindowInfo.position"
            :title="highlightWindowInfo.title"
            v-show="highlightWindowInfo.show"
            :show="highlightWindowInfo.show"
          >
            <p v-html="highlightWindowInfo.content"></p>
            <v-layout nowrap>
              <v-flex xs12>
                <v-spacer/>
                <v-btn
                  color="primary"
                  style="float:right"
                  @click="highlightInfoWindowClose"
                  small
                >我知道了</v-btn>
              </v-flex>
            </v-layout>
          </bm-info-window>
        </transition>

        <!-- 比例尺 -->
        <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
        <bm-map-type
          :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_TOP_RIGHT"
        ></bm-map-type>

        <!-- 瓦片图层 实际使用中务必添加-->
        <bm-tile
          :isTransparentPng="true"
          tileUrlTemplate="//developer.baidu.com/map/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png"
        ></bm-tile>

        <!-- 电子围栏区域 -->
        <bm-polygon
          v-for="item in abnormalPolygons"
          :key="JSON.stringify(item[0])"
          :path="item"
          stroke-color="rgb(236,25,27)"
          :stroke-opacity="0.5"
          :stroke-weight="5"
          fillColor="#DD4F43"
          :editing="false"
        />
        <!-- 在非安全区域工作人员 -->
        <bml-marker-clusterer :averageCenter="true">
          <bm-marker
            v-for="(item,index) in abnormalPoints"
            :position="item"
            :key="item.serialId"
            :dragging="false"
            :icon="item.trackType == 0 ? personIcon : carIcon"
            :animation="item.show == true ? 'BMAP_ANIMATION_BOUNCE' : 'None'"
            @click="highlight(index)"
          >
            <bm-label
              :content="item.user"
              :labelStyle="{color: 'red', fontSize : '8px'}"
              :offset="{width: -20, height: 30}"
            />
          </bm-marker>
        </bml-marker-clusterer>

        <!-- 单个人员的轨迹  琥珀色-->
        <bm-polyline :path="personTrack" :key="6" strokeColor="#FFBF00" :strokeWeight="3"></bm-polyline>
      </baidu-map>
      <transition
        appear-active-class="animated fadeInUp delay-2s"
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <stat v-show="port.statShow"/>
      </transition>
      <float-button :entity="entity" />
    </div>
  </div>
</template>


<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
import Stat from "../../../../components/port/StatDashboard";
import { mapState } from "vuex";
import FloatButton from '../../../../components/port/RetCenter.vue';

export default {
  provide() {
    return {
      highlight: this.highlight //使用依赖注入
    };
  },
  data() {
    return {
      entity:{},
      center: { lng: 119.394079, lat: 35.134196 },
      // 百度地图缩放
      zoom: 17,
      // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
      roam: true,
      mapStyle: {
        // style: "midnight",
        /**
          自定义主题存在bug
         */
        styleJson: []
      },
      registers: {
        lng: 119.394079,
        lat: 35.134196,
        serialId: 25217
      },
      year: "2018",
      month: "1",
      day: "18",
      hour: "01",
      minute: "03",
      second: "02",
      personTrack: [],
      personIcon: {
        url: require("../../../../assets/person.png"),
        size: { width: 24, height: 29 }
      },
      carIcon: {
        url: require("../../../../assets/car.png"),
        size: { width: 24, height: 24 }
      },
      highlightWindowInfo: {
        position: { lng: 119.394079, lat: 35.134196 }, //lng and lat
        title: "信息",
        content: "默认信息",
        show: false //默认不显示窗体
      }
    };
  },
  components: {
    BmlMarkerClusterer,
    Stat,
    FloatButton
  },
  methods: {
    /**
     * 地图加载后
     */
    handleReady(target) {
      this.entity = target;//BMap: {…}, map: Ka
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
      this.$parent.$parent.show = false;
    },
    /**
     * 增加前缀0
     */
    addPrefixZero(text) {
      let s = Number.parseInt(text);
      if (s < 10) {
        return "0" + s;
      }
      return s.toString();
    },
    highlight(index) {
      this.highlightInfoWindowClose();
      let payload = {
        lng: this.$store.state.abnormalPoints[index].lng,
        lat: this.$store.state.abnormalPoints[index].lat,
        index: index
      };
      this.$store.commit("setcenter", payload);
      this.$store.dispatch("animationstart", payload);
      //高亮时候显示轨迹
      this.personTrack = this.$store.state.abnormalPoints[payload.index].paths;
      //显示信息

      setTimeout(
        function() {
          this.highlightInfoWindowOpen(
            payload,
            `<ul>
        <li>设备号: ${this.$store.state.abnormalPoints[index].serialId}</li>
        <li>设备类型: ${this.$store.state.abnormalPoints[index].device}</li>
        <li>设备持有人: ${this.$store.state.abnormalPoints[index].user}</li>
        <li>位置经度: ${this.$store.state.abnormalPoints[index].lng}</li>
        <li>位置纬度: ${this.$store.state.abnormalPoints[index].lat}</li>
       <!-- <li>联系方式: ${
         this.$store.state.abnormalPoints[index].contact
       }</li> -->
      </ul>
      `,
            "人员/设备信息详情"
          );
        }.bind(this),
        500
      );
    },
    highlightInfoWindowClose() {
      this.highlightWindowInfo.title = "通知";
      this.highlightWindowInfo.content = "默认信息";
      this.highlightWindowInfo.position = { lat: 0, lng: 0 };
      this.highlightWindowInfo.show = false;
    },
    highlightInfoWindowOpen(
      sposition = { lng: 0, lat: 0 },
      scontent = "默认",
      stitle = "default"
    ) {
      this.highlightWindowInfo.position = sposition;
      this.highlightWindowInfo.title = stitle;
      this.highlightWindowInfo.content = scontent;
      this.highlightWindowInfo.show = true;
    },

  },
  computed: {
    abnormalPointsForMap() {
      let points = [];
      for (let obj of this.abnormalPoints) {
        points.push([obj.lng, obj.lat]);
      }
      return points;
    },
    time() {
      return this.hour + ":" + this.minute + ":" + this.second;
    },
    ...mapState(["abnormalPoints", "abnormalPolygons", "port"])
  },
  created() {
    this.$store.state.port.show_control = true;
  },
  beforeDestroy() {
    this.$store.state.port.show_control = false;
  }
};
</script>

<style lang="less" scoped>
@import url("../../../../../node_modules/animate.css/animate.css");
.charts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.global-overlay {
  position: fixed;
  top: 4em;
  right: 2em;
  width: 20%;
  height: 20rem;
  pointer-events: none;
  z-index: 1035;
  background: rgba(0, 0, 0, 0.5);
  > h1 {
    color: #ddd;
    font-size: 3rem;
    text-align: right;
    padding-right: 2rem;
    font-weight: 300;
  }
  ul {
    color: #ddd;
    font-size: 1.25rem;
    list-style: none;
    padding-left: 1.5rem;
    margin-top: 1.25rem;
    li {
      margin: 0.5rem 0;
      span {
        float: right;
        margin-right: 2rem;
      }
    }
  }
}

.active {
  background: rgba(0, 0, 0, 0.15);
}
.spliter {
  border: none;
  height: 1px;
  border-radius: 0.5em;
  background: #aaa;
}
.appear-a {
  opacity: 0;
}

.appear-b {
  opacity: 1;
}
</style>

