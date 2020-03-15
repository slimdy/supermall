import Vue from 'vue'
import Vuex from 'vuex'
import {ADD_CART_COUNT,ADD_CART_OBJ} from "./mutaitionConst";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      cartList: {},
    },
    mutations: {
    [ADD_CART_COUNT](state,payload){
      state.cartList[payload].quantity ++
    },
    [ADD_CART_OBJ](state,payload){
      const id = payload.id
      payload.checked = false
      console.log(payload)
      Vue.set(state.cartList,id,payload)
    },
    changeChecked(state,payload){
      const id = payload.id
      const checked = payload.checked
      state.cartList[id].checked = checked||!state.cartList[id].checked
    }

  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        const id = payload.id

        if (context.state.cartList.hasOwnProperty(id)){
          context.commit(ADD_CART_COUNT,id)
          resolve(id+"的数量加1")
        }else{
          context.commit(ADD_CART_OBJ,payload)
          resolve("添加新商品进入购物车成功")
        }
      })


    },
  },
  getters:{
    cartLength(state){
      return Object.keys(state.cartList).length
    },
    cartList(state){
      return Object.values(state.cartList)

    }
  },
  modules: {
  }
})
