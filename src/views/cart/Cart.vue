<template>
<div class="cart">
  <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
  <cart-list/>
  <cart-bottom-bar/>
</div>
</template>

<script>
    import NavBar from "components/common/navBar/NavBar";
    import CartList from "./childcomps/CartList";
    import CartBottomBar from "./childcomps/CartBottomBar";
    import {mapGetters} from 'vuex'
    //这个时mapGetters的实现逻辑
    // const getters = {
    //   a: () => 1,
    //   b: () => 2,
    //   c: () => 3
    // }
    // function fn (keys) {
    //   const data = {}
    //   keys.forEach(key => {
    //     if (getters.hasOwnProperty(key)) {
    //       data[key] = getters[key]
    //     }
    //   });
    //   return data
    // }
    export default {
        name: "Cart",
        components:{NavBar,CartList,CartBottomBar},
        computed:{
          ...mapGetters(["cartLength"]),
        }
    }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #ffffff;
}
  .cart{
    height: 100vh;
  }
</style>
