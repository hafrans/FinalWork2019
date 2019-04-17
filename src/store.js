import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8088"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default new Vuex.Store({


  /////
  //// FCK,后悔没用module了，耦合严重，导致翻车，不能瞎改。
  state: {

    annoucements: [
      {
        id: 1,
        user: "superadmin",
        time: "2019-03-16 12:34:56",
        title: "系统发送的第一个公告",
        content: `<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est ligula, pretium ac velit at, aliquam bibendum mi. Curabitur tristique felis eu sapien placerat, sed interdum ex lacinia. Curabitur accumsan commodo sapien, in mattis enim commodo vitae. Quisque tristique accumsan velit, sit amet ornare ipsum iaculis vel. Praesent pharetra et metus sit amet sollicitudin. Etiam rhoncus euismod erat. Fusce auctor aliquam dolor nec ornare. Cras aliquam eget leo nec tristique. Curabitur nec aliquam libero. Donec vel est et odio tincidunt hendrerit nec quis nisi. Maecenas hendrerit tellus in urna facilisis fermentum non vel erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nec accumsan nulla, eu vulputate diam. Vivamus id velit accumsan augue faucibus fringilla. Suspendisse sed mi turpis.
        </p>
        <p>
        Quisque ultrices felis ac lacus sollicitudin, eget ultrices tellus aliquam. Mauris nunc nulla, commodo ac dictum a, aliquam ac ex. Donec blandit eros tortor, at sodales diam laoreet sit amet. Phasellus mollis eget lorem eu viverra. Maecenas suscipit vitae lorem nec maximus. Ut vehicula pharetra dolor. Phasellus nec ornare sem, nec malesuada felis.
        </p>
        <p>
        Morbi ut ante purus. Vestibulum varius ornare felis quis imperdiet. Fusce accumsan sapien eu varius tincidunt. Cras tincidunt accumsan massa eu tincidunt. Cras scelerisque varius mauris, eget dignissim libero lacinia nec. Cras finibus, massa eget ultrices tristique, urna massa consectetur nunc, eu consequat nisl magna eget magna. Nunc tempor euismod sem vitae porttitor. Cras placerat, ipsum ac sagittis varius, velit magna bibendum urna, eu bibendum turpis dui et lectus. In hac habitasse platea dictumst. Praesent vestibulum porta elit, tincidunt egestas arcu aliquet eget. Mauris a quam massa. Aenean orci turpis, euismod id justo et, vestibulum aliquam leo. Nam non malesuada sapien, nec sollicitudin nisi.
        </p>
        <p>
        Quisque felis mauris, hendrerit ac nibh a, bibendum aliquet nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris non tempor diam. Sed ut nisi maximus, luctus erat eu, dignissim neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan erat lacinia, posuere velit quis, vulputate mauris. Cras arcu lacus, egestas sit amet tellus a, pulvinar faucibus sapien. Vestibulum convallis erat in eros consectetur condimentum. Praesent luctus tortor vitae eros efficitur consectetur. Nulla ultrices lacus ut sollicitudin tempus. Vivamus ut consectetur tellus, id pellentesque libero. Praesent vel nisi eu dui molestie bibendum. Nullam eget eleifend tellus. In eget sagittis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
        <p>
        Maecenas convallis dapibus libero a bibendum. In rhoncus rutrum felis id imperdiet. Vestibulum ac faucibus lacus. Aliquam a sagittis orci. Cras lobortis mollis cursus. Donec viverra cursus urna sit amet semper. Sed a placerat dolor.
        </p>`,
        show: true
      }
    ],
    //person
    users: [
    ],

    //user
    user: {
      username: "倪伏琴"
    },

    system: {

    },

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
      statShow: true,
      show_control: false,
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
      trackType: 1,
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
      trackType: 1,
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
      trackType: 0,
      lng: 119.394279,
      lat: 35.134196,
      show: false, paths: []
    },
    {
      serialId: 25235,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      trackType: 1,
      lng: 119.396379,
      lat: 35.134196,
      show: false, paths: []
    },
    {
      serialId: 252152,
      device: "肩灯",
      user: "第二区施工队-张三",
      description: "默认",
      trackType: 1,
      lng: 119.394379,
      lat: 35.134296,
      show: false, paths: []
    },
    {
      serialId: 252162,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      trackType: 0,
      lng: 119.393079,
      lat: 35.134396,
      show: false, paths: []
    },
    {
      serialId: 252553,
      device: "肩灯",
      user: "第二区施工队-张三",
      description: "默认",
      trackType: 1,
      lng: 119.394479,
      lat: 35.134296,
      show: false, paths: []
    },
    {
      serialId: 252353,
      device: "肩灯",
      user: "主管-王五",
      description: "默认",
      trackType: 0,
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
    },
    fetchAnnouncementById(context, payload = { id: 0 }) {
      //TODO 判断使用是什么身份
      return new Promise((resolve, reject) => {
        if (payload.id == 0) {
          reject("invalid request.");
        }
        //请求
        for (let i of context.state.annoucements) {
          if (i.id == payload.id) {
            resolve(i);
          }
        }
      });
    },
    async syncAnnounce(context) {
      context.state.annoucements = [];
      let arr = (await axios.get("/announce/list")).data.data;
      //eslint-disable-next-line
      context.state.annoucements = arr;

      return true;
    },
    async commitAnnounce(context, payload = { id: 0 }) {
      // return new Promise((res, rej) => {
      if (payload.id == 0 && payload.mode != 'create') {
        throw new Error("invalid request.");
      } //

      //TODO 向服务器提交数据
      if (payload.mode == 'create') {//新建数据
        //TODO 先提交后拉

        //模拟

        let date = new Date();
        //payload.id = payload.body.id = context.state.annoucements[context.state.annoucements.length - 1].id + 1;
        payload.time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        //服务器推送
        let result = await axios.post("/announce/commit", payload.body);
        await context.dispatch('syncAnnounce');
        if (result.data.code == 1) {
          //context.state.annoucements.push(payload.body);
          return true;
        } else {
          throw new Error("create announce failed.");
        }

      } else {//修改数据
        //TODO 先发数据库
        let result = await axios.patch("/announce/commit", payload.body);
        if (result.data.code == 1) {
          for (let i in context.state.annoucements) {
            if (context.state.annoucements[i].id == payload.id) {
              context.state.annoucements[i] = payload.body;
              break;
            }
          }
        } else {
          throw new Error("update announce failed.");
        }

      }

      return true;

      // });
    },
    async enableAnnounce(context, payload = { id: [] }) {
      if (typeof payload.id == 'undefined' || payload.id.length == 0) {
        throw new Error("您请求的为空！")
      }
      let form = new URLSearchParams();
      for (let i of payload.id) {
        form.append("id[]", i.id);
      }
      let result = await axios.post("/announce/show", form);
      if (result.data.code == 1) {
        return true;
      } else {
        throw new Error("批量更新失败");
      }
    },
    async disableAnnounce(context, payload = { id: [] }) {
      if (typeof payload.id == 'undefined' || payload.id.length == 0) {
        throw new Error("您请求的为空！")
      }
      let form = new URLSearchParams();
      for (let i of payload.id) {
        form.append("id[]", i.id);
        //eslint-disable-next-line
      }
      let result = await axios.post("/announce/hide", form);
      if (result.data.code == 1) {
        return true;
      } else {
        throw new Error("批量更新失败");
      }
    },
    async removeAnnounce(context, payload = { id: [] }) {
      if (typeof payload.id == 'undefined' || payload.id.length == 0) {
        throw new Error("您请求的为空！")
      }
      let form = new URLSearchParams();
      for (let i of payload.id) {
        form.append("id[]", i.id);
      }
      let result = await axios.post("/announce/delete", form);
      if (result.data.code == 1) {
        return true;
      } else {
        await context.dispatch('syncAnnounce');
        throw new Error("批量删除失败");
      }

    },
    async syncUsers(context) {
      context.state.user = [];
      let result = await axios.get("/user/list");
      context.state.users = result.data.data;
      return true;
    },
    async fetchUserById(context, payload = { id: 0 }) {
      //return new Promise((resolve, reject) => {
        if (payload.id == 0) {
          throw new Error("invalid request.");
        } //
        if(context.state.users.length == 0){
          await context.dispatch("syncUsers");
        }
        //请求
        for (let i of context.state.users) {

          if (i.id == payload.id) {
            return(i);
          }
        }

      //});
    },
    async syncSelf(context,payload = {router:null}){
        let result = await axios.get("/user");
        if(result.data.status == 4){
          context.state.user = result.data.data;
          return true;
        }else{
          if(typeof payload.router != 'undefined'){
            payload.router.push("/login")
            return true;
          }else{
            return false;
          }
        }
        
    },
    async commitUser(context, payload = { id: 0 }) {
      // return new Promise((res, rej) => {
      if (payload.id == 0 && payload.mode != 'create') {
        throw new Error("invalid request.");
      } //

      //TODO 向服务器提交数据
      if (payload.mode == 'create') {//新建数据
        //TODO 先提交后拉

        //模拟

        let date = new Date();
        payload.id = payload.body.id = context.state.users[context.state.users.length - 1].id + 1;
        payload.register_time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        let result = await axios.post(payload.body);
        if (result.data.code == 1) {
          await context.dispatch('asyncUsers');
          return true;
        } else {
          throw new Error("添加失败");
        }

        // context.state.users.push(payload.body);
      } else {//修改数据
        //TODO 先发数据库
        let result = await axios.patch(payload.body);
        if (result.data.code == 1) {
          //we need not to sync user information.
          for (let i in context.state.users) {
            if (context.state.users[i].id == payload.id) {
              context.state.users[i] = payload.body;
              break;
            }
          }
          return true;
        } else {
          throw new Error("添加失败");
        }

      }

      // });
    },
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