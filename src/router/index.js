import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'index',
    redirect:"home",
    component: () => import('../layout'),
    children:[
      {
        path:"home",
        name:"home",
        meta:{
          title:"首页"
        },
        component: () => import ('../views/home')
      },
      {
        path:"member",
        name:"member",
        meta:{
          title:"会员管理"
        },
        component: () => import ('../views/member')
      },
      {
        path:"supplier",
        name:"supplier",
        meta:{
          title:"供应商管理"
        },
        component: () => import ('../views/supplier')
      },
      {
        path:"goods",
        name:"goods",
        meta:{
          title:"商品管理"
        },
        component: () => import ('../views/goods')
      },
      {
        path:"staff",
        name:"staff",
        meta:{
          title:"员工管理"
        },
        component: () => import ('../views/staff')
      },
      {
        path:"staff1",
        name:"staff1",
        meta:{
          title:"员工管理"
        },
        component: () => import ('../views/staff/index1')
      },
      {
        path:"goods1",
        name:"goods1",
        meta:{
          title:"商品管理"
        },
        component: () => import ('../views/goods/index1.vue')
      },
      {
        path:"supplier1",
        name:"supplier1",
        meta:{
          title:"供应商管理"
        },
        component: () => import ('../views/supplier/index1')
      },
      {
        path:"member1",
        name:"member1",
        meta:{
          title:"供应商管理"
        },
        component: () => import ('../views/member/index1')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
