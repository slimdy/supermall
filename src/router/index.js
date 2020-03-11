import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push;

const Home = ()=>import('views/home/Home')
const Category = ()=>import('views/category/Category')
const Cart = ()=>import('views/cart/Cart')
const Profile = ()=>import('views/profile/Profile')
const Detail = ()=>import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home"
  },
  {
    path: "/home",
    component:Home,
    meta:{
      show:true
    }
  },
  {
    path: "/category",
    component:Category,
    meta:{
      show:true
    }
  }
  ,
  {
    path: "/cart",
    component:Cart,
    meta:{
      show:true
    }
  }
  ,
  {
    path: "/profile",
    component:Profile,
    meta:{
      show:true
    }
  },
  {
    path: "/detail/:id",
    component:Detail,
    meta:{
      show:false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
