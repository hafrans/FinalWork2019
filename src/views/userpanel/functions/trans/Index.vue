<template>
  <v-app class="v-container">
    <v-chart :options="bus"/>
  </v-app>
</template>

<script>
// import PMenu from "../../../../components/port/PreWarningMenu";

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/helper/Polyline'
import 'echarts/lib/chart/helper/EffectPolyline'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'
import echarts from 'echarts'



export default {
  provide() {
    return {
      //retCenter:this.centerFocus
    };
  },
  data() {

    let data = require('../../../../assets/lines-bus.json')

    var hStep = 300 / (data.length - 1);
    var busLines = [].concat.apply(
      [],
      data.map(function(busLine, idx) {
        var prevPt;
        var points = [];
        for (var i = 0; i < busLine.length; i += 2) {
          var pt = [busLine[i], busLine[i + 1]];
          if (i > 0) {
            pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
          }
          prevPt = pt;

          points.push([pt[0] / 1e4, pt[1] / 1e4]);
        }
        return {
          coords: points,
          lineStyle: {
            normal: {
              color: echarts.color.modifyHSL("#5A94DF", Math.round(hStep * idx))
            }
          }
        };
      })
    );

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      show: true,
      test: "hafrans!",
      /////////////////////
      bus: {
        bmap: {
          center: [116.46, 39.92],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#031628"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#000102"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#0b3d51"
                }
              },
              {
                featureType: "local",
                elementType: "geometry",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "railway",
                elementType: "geometry.stroke",
                stylers: {
                  color: "#08304b"
                }
              },
              {
                featureType: "subway",
                elementType: "geometry",
                stylers: {
                  lightness: -70
                }
              },
              {
                featureType: "building",
                elementType: "geometry.fill",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#857f7f"
                }
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: {
                  color: "#000000"
                }
              },
              {
                featureType: "building",
                elementType: "geometry",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "green",
                elementType: "geometry",
                stylers: {
                  color: "#062032"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#465b6c"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#022338"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              normal: {
                opacity: 0.2,
                width: 1
              }
            },
            progressiveThreshold: 500,
            progressive: 200
          },
          {
            type: "lines",
            coordinateSystem: "bmap",
            polyline: true,
            data: busLines,
            lineStyle: {
              normal: {
                width: 0
              }
            },
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1.5
            },
            zlevel: 1
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
