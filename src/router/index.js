import Vue from 'vue'
import VueRouter from 'vue-router'
import Exchange from '../views/Exchange.vue'
import PlayerJoin from '../views/PlayerJoin.vue'
import DmControl from '../views/DmControl.vue'
import Register from '../views/ExchangeRegister.vue'
import Login from '../views/DmLogin.vue'
import playerLogin from '../views/PlayerLogin.vue'
import notFound from '../views/404.vue'
import videoTest from '../views/videoTest.vue'
import chat from '../views/chat.vue'
// import chatDetail from '../views/chatDetail.vue'
import event from '../views/event.vue'
import thread from '../views/thread.vue'
import others from '../views/others.vue'
import Player from '../views/Player.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'checkId',
    component: notFound
  },
  {
    path: '/video',
    name: 'videoTest',
    component: videoTest
  },
  {
    path: '/home',
    name: 'home',
    component: Exchange
  },
  {
    path: '/home/:id',
    name: 'home',
    component: Exchange
  },
  {
    path: '/playerJoin/:roomid',
    name: 'playerJoin',
    component: PlayerJoin
  },
  {
    path: '/controlCenter/:roomid',
    name: 'controlCenter',
    component: DmControl
  },
  {
    path: '/register/:id',
    name: 'register',
    component: Register
  },
  {
    path: '/dmlogin/:id',
    name: 'login',
    component: Login
  },
  {
    path: '/playerLogin/:id',
    name: 'playerLogin',
    component: playerLogin
  },
  {
    path: '/player/:id',
    name: 'player',
    component: Player,
    redirect: to => {
      return '/chat/' + to.params.id;
    },
    children: [
      {
        path: '/thread/:id',
        name: 'thread',
        component: thread,
      },
      {
        path: '/event/:id',
        name: 'event',
        component: event,
      },
      {
        path: '/chat/:id',
        name: 'chat',
        component: chat,
      },
      {
        path: '/others/:id',
        name: 'others',
        component: others,
      },
      // {
      //   path: '/chatDetail/:id',
      //   name: 'chatDetail',
      //   component: chatDetail,
      // },
    ]
  },
  
  
  
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: bottle,
  // },
  // {
  //   path: '/main',
  //   name: 'Main',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  // },
  // // {
  // //   path: '/about',
  // //   name: 'About',
  // //   // route level code-splitting
  // //   // this generates a separate chunk (about.[hash].js) for this route
  // //   // which is lazy-loaded when the route is visited.
  // //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // // },
  // {
  //   path: '/script/register/:id',
  //   name: 'register',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  // },
  // {
  //   path: '/registerInfo/:id',
  //   name: 'RegisterInfo',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/RegisterInfo.vue')
  // },
  // {
  //   path: '/ActiveSuccess',
  //   name: 'ActiveSuccess',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ActiveSuccess.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  // },
  // {
  //   path: '/bottle',
  //   name: 'bottle',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/bottle.vue')
  // },
  // {
  //   path: '*',
  //   name: '404',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
