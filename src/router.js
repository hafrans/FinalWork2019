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
            },
            {
              name:"trans",path:"trans",component: () => import('./views/userpanel/functions/trans/Index.vue')
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
           component:() => import("./views/userpanel/control/Index.vue"),
           children:[
            {path:"",redirect:"home"},
            {
              name:"admin_ann",
              path:"announce/:id",
              component: ()=> import("./views/common/items/AnnouncementPanel.vue"),
              props:true
            },{
              name:"user_home",
              path:"home",
              component: () => import("./views/common/items/Home.vue")
            },{
              name:"user_ann_list",
              path:"announcelist",
              component: ()=> import("./views/userpanel/control/items/AnnouncementList.vue")
            }
          ]
        }
      ]
    },{
      name:"admin-index",
      path:"/admin",
      component: () => import("./views/adminpanel/Index.vue"),
      children:[
        {path:"",redirect:"home"},
        {
          name:"adm_user_list",
          path:"userlist",
          component: () => import('./views/adminpanel/items/UserList.vue')
        },
        {
          name:"adm_user_detail",
          path:"user/:type/:id",
          component: () => import('./views/common/items/UserDetail.vue'),
          props:true
        },
        {
          name:"admin_ann_edit",
          path:"announceEdit/:id",
          component: ()=> import("./views/adminpanel/items/AnnounceEdit.vue"),
          props:true,
        },
        {
          name:"admin_ann_create",
          path:"announceCreate",
          component: ()=> import("./views/adminpanel/items/AnnounceEdit.vue"),
          props:true,
        },
        {
          name:"admin_ann",
          path:"announce/:id",
          component: ()=> import("./views/common/items/AnnouncementPanel.vue"),
          props:true
        },{
          name:"admin_home",
          path:"home",
          component: () => import("./views/common/items/Home.vue")
        },{
          name:"admin_ann_list",
          path:"announcelist",
          component: ()=> import("./views/adminpanel/items/AnnouncementList.vue")
        },
        {
          name:"admin_user_add",
          path:"useradd",
          component:()=>import("./views/adminpanel/items/UserCreate.vue")
        }
      ]
    }
  ]
})
