import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: "hello-login",
          component: () => import("./views/Login.vue")
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      name: "login",
      path: "/login",
      component: () => import("./views/Login.vue")
    },
    {
      name: "user-panel",
      path: "/user",
      component: () => import("./views/userpanel/Index.vue"),
      children: [
        {
          /**
           * paths:
           *  /user/dashboard/
           */
          name: "dashboard",
          path: "dashboard",
          component: () => import("./views/userpanel/functions/Index.vue"),
          children: [
            {
              /**
               * paths:
               *  /user/dashboard/
               */
              name: "port", path: "port", component: () => import("./views/userpanel/functions/port/Index.vue"),
              children: [
                /**
                 * paths:
                 * /user/dashboard/index
                 * /user/dashboard/edit
                 */
                { name: "default", path: "", redirect: "index" },
                { name: "portindex", path: "index", component: () => import("./views/userpanel/functions/port/UserMap.vue") },
                { name: "edit", path: "edit", component: () => import("./views/userpanel/functions/port/AreaEdit.vue") }
              ]
            }
          ]
        },{
          /**
           * 
           * paths:
           *  /user/controlpanel
           */
           name:"user_controlpanel",
           path:"cp",
           component:() => import("./views/userpanel/control/Index.vue")
        }
      ]
    },{
      name:"admin-index",
      path:"/admin",
      component: () => import("./views/adminpanel/Index.vue"),
      children:[
        
      ]
    }
  ]
})
