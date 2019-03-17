import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    animation_enabled: "BMAP_ANIMATION_BOUNCE",
    animation_disabled: "None",
    port: {
      defaultCenter: {
        lng: 119.394079,
        lat: 35.134196
      },
      center: {
        lng: 119.394079,
        lat: 35.134196
      },
      zoom: 17,
      defaultZoom: 17,
      statShow:true,
      show_control:false,
    },
    abnormalPolygons: [],
    abnormalPoints: [{
      serialId: 25215,
      device: "肩灯",
      user: "第二区施工队-张三",
      description: "默认",
      lng: 119.394079,
      lat: 35.134196,
      show: false,
      animation: "None",
      trackType:1,
      paths: [{
        lng: 119.394079,
        lat: 35.134196
      },
      {
        lng: 119.394179,
        lat: 35.134296
      },
      {
        lng: 119.395379,
        lat: 35.134496
      },
      {
        lng: 119.394479,
        lat: 35.134596
      },
      {
        lng: 119.394079,
        lat: 35.134196,
      }]
    },
    {
      serialId: 25216,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      lng: 119.396179,
      lat: 35.134196,
      show: false,
      trackType:1,
      paths: [{
        lng: 119.394079,
        lat: 35.134196
      },
      {
        lng: 119.394179,
        lat: 35.134296
      },
      {
        lng: 119.395379,
        lat: 35.134496
      },
      {
        lng: 119.394479,
        lat: 35.134596
      },
      {
        lng: 119.396179,
        lat: 35.134196,
      }]
    },
    {
      serialId: 25255,
      device: "肩灯",
      user: "第二区施工队-张三",
      description: "默认",
      trackType:0,
      lng: 119.394279,
      lat: 35.134196,
      show: false, paths: []
    },
    {
      serialId: 25235,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      trackType:1,
      lng: 119.396379,
      lat: 35.134196,
      show: false, paths: []
    },
    {
      serialId: 252152,
      device: "肩灯",
      user: "第二区施工队-张三",
      description: "默认",
      trackType:1,
      lng: 119.394379,
      lat: 35.134296,
      show: false, paths: []
    },
    {
      serialId: 252162,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      trackType:0,
      lng: 119.393079,
      lat: 35.134396,
      show: false, paths: []
    },
    {
      serialId: 252553,
      device: "肩灯",
      user: "第二区施工队-张三",
      description: "默认",
      trackType:1,
      lng: 119.394479,
      lat: 35.134296,
      show: false, paths: []
    },
    {
      serialId: 252353,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      trackType:0,
      lng: 119.396279,
      lat: 35.134096,
      show: false, paths: []
    }
    ]
  },
  mutations: {
    setcenter(state, payload) {
      state.port.center = payload;
      state.port.zoom = 19;
    },
    restorecenter(state) {
      state.port.center = state.port.defaultCenter;
      state.port.zoom = state.port.defaultZoom;
    },
    setpaths(state, payload) {
      state.abnormalPolygons = payload.paths;
    },
    addpaths(state, payload) {
      // eslint-disable-next-line
      for (let path of payload.paths) {
        // eslint-disable-next-line
        if (path.length > 0) {
          state.abnormalPolygons.push(path);
        }

      }

    },
    setOnePath(state, payload = { index: 0, path: [] }) {
      // eslint-disable-next-line
      console.log(payload.index);
      if (payload.path.length > 0) {
        state.abnormalPolygons[payload.index] = payload.path;
      }
    }
  },
  actions: {
    animationstart(context, payload) {
      context.state.abnormalPoints[payload.index].show = true;
      setTimeout(function () {
        context.state.abnormalPoints[payload.index].show = false;
      }, 3000);
    }
  },
  getters: {
    /**
     * getter 获取非正常人员信息
     * @param {*} state 
     */
    abnormalInfos(state) {
      let infos = state.abnormalPoints;
      let list = 0;
      let ret = [];
      for (let i of infos) {

        ret.push(Object.assign({ index: list++ }, i));
      }
      return ret;

    }
  }
})