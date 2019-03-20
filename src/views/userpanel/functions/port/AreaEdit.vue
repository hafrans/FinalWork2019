<template>
  <div>
    <!-- 右上角的框-->
    <div class="global-overlay">
      <h1>编辑模式</h1>
      <hr class="spliter">
      <div>
        <h3>使用说明：</h3>
        <ul>
          <li>新创建围栏，请先点击"开始绘制围栏"，单击地图上的位置绘制线条</li>
          <li>右击鼠标结束划线,可以连续画多个围栏区域</li>
          <li>修改原有围栏信息，请直接拖动界面上的方框即可。</li>
          <li>添加或修改后，请点击"提交围栏信息",则可成功提交</li>
        </ul>
      </div>
    </div>
    <!-- 对话框 -->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{dialoginfo.title}}</v-card-title>
        <v-card-text>{{dialoginfo.content}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">我知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 对话框结束 -->
    <button
      class="button-big btn1"
      @click="toggle('polyline')"
    >{{ polyline.editing ? '停止绘制围栏' : '开始绘制围栏' }}</button>
    <button class="button-big btn2" @click="commitPath">提交围栏信息</button>
    <baidu-map
      class="map"
      :center="port.center"
      :zoom="port.zoom"
      :scroll-wheel-zoom="true"
      @mousemove="syncPolyline"
      @click="paintPolyline"
      @rightclick="newPolyline"
      mapType="BMAP_HYBRID_MAP"
      @ready="handleReady"
    >
      <!-- 比例尺 -->
      <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_RIGHT"
      ></bm-map-type>

      <bm-polyline :path="path" :key="JSON.stringify(path[0])" v-for="path of polyline.paths"></bm-polyline>
      <bm-polygon
        :path="path"
        v-for="(path , index) in polyline.abnormalPolygons"
        :key="JSON.stringify(path[0])"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        :editing="true"
        @lineupdate="updatePolygonPath(index,$event)"
        @remove="test"
        @click="removePolygon(index,$event)"
      />
      <floating-button :entity="entity"/>
    </baidu-map>
    
  </div>
</template>
<script>
import { mapState } from "vuex";
import FloatingButton from "../../../../components/port/RetCenter.vue"
/* eslint-disable */
export default {
  data() {
    return {
      polyline: {
        editing: false,
        updating: false,
        paths: [],
        updatingPaths: [],
        abnormalPolygons: []
      },
      dialog: false,
      dialoginfo: {
        title: "提示",
        content: "测试内容"
      },
      entity: {}
    };
  },
  computed: {
    ...mapState(["port"])
  },
  components:{
    FloatingButton
  },
  methods: {
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      this.$set(path, path.length - 1, e.point);
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];
      path.pop();
      if (path.length) {
        paths.push([]);
      }
    },
    paintPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      !paths.length && paths.push([]);
      paths[paths.length - 1].push(e.point);
    },
    commitPath() {
      // console.log(this.polyline.paths);
      this.commit();
    },
    updatePolygonPath(index, e) {
      console.log(index);
      //设置更新识别位
      this.polyline.updating = true;

      /**
       * 这个虽然是一个功能，但是我还是将其归于垃圾代码。try catch看起来好看，但是
       * 造成了性能的损失。
       */
      try {
        for (let i in this.polyline.updatingPaths) {
          if (this.polyline.updatingPaths[i].index == index) {
            //找到了
            throw new Error(i);
          }
        }
        //if Not Found.
        this.polyline.updatingPaths.push({
          index: index,
          path: e.target.getPath()
        });
      } catch (ex) {
        this.polyline.updatingPaths[ex.message] = {
          index: index,
          path: e.target.getPath()
        };
      }
      //先存入

      // this.$store.commit("setOnePath", {
      //   index: index,
      //   path: e.target.getPath()
      // });
    },
    test(e) {
      console.log(e);
    },
    removePolygon(index, e) {
      if (e.button == 2) {
        e.preventDefault();
        console.log("删除动作");
      }
    },
    handleReady(entity) {
      this.entity = entity;
      this.$parent.$parent.show = false;
    },
    showDialog(content, title = "提示") {
      this.dialoginfo = {
        title: title,
        content: content
      };
      //对话窗口使能
      this.dialog = true;
    },
    refresh() {
      this.polyline.abnormalPolygons = this.$store.state.abnormalPolygons;
    },
    commit() {
      /**
       * 提交所有信息
       */

      if (this.polyline.updating == false && this.polyline.paths.length == 0) {
        this.showDialog("您没有添加或修改任何围栏信息！");
        return false;
      }

      //停止编辑
      this.polyline.editing = false;
      //先处理更新
      if (this.polyline.updating) {
        for (let i of this.polyline.updatingPaths) {
          this.$store.commit("setOnePath", {
            index: i.index,
            path: i.path
          });
        }
        //clear
        this.polyline.updatingPaths = [];
        this.polyline.updating = false;
      }

      //处理新线
      this.$store.commit("addpaths", { paths: this.polyline.paths });
      //记得删除原先的线，要不就重复添加了
      this.polyline.paths = [];

      //刷新
      this.refresh();
      this.showDialog("修改成功！");
      //提交到网络
    }
  },
  beforeMount() {
    this.refresh();
  }
};
</script>

<style lang="less" scoped>
.map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
h1 {
  color: #aaaaaa;
  font-size: 3rem;
  text-align: right;
  padding-right: 2rem;
  font-weight: 200;
}
.global-overlay {
  position: fixed;
  top: 4em;
  right: 2em;
  width: 25em;
  height: 20em;
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
  div {
    margin: 0.5em;
  }
  h3 {
    color: #ddd;
  }
  ul {
    color: #ddd;
    font-size: 1rem;
    list-style: circle;
    padding-left: 1.25rem;
    li {
      margin: 0.25rem 0;
    }
  }
}

.button-big {
  width: 8em;
  height: 3em;
  margin: 2rem 0em;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1035;
  color: #ddd;
  font-size: 20px;
  font-weight: 300;
  top: 23rem;
  outline: rgba(0, 0, 0, 0.5) 2px solid;
  transition: all 0.3s;
}

.button-big:active {
  outline: none;
}

.button-big:hover {
  background: rgba(64, 64, 64, 0.5);
}
.btn1 {
  right: 10.75em;
}
.btn2 {
  right: 1.5em;
}

.spliter {
  border: none;
  height: 1px;
  border-radius: 0.5em;
  background: #aaa;
}
</style>

