<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="home-tab-control" ref="tabControl1" v-show="isTabFixed" :titles="titles" @tabClick="tabClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" @pullingUp="uploadMore">
      <home-swiper :banners="banner" @siwperImageLoad.once="swiperImageLoad"/>
      <home-recommend :recommends="recommend"/>
      <home-feature/>
      <tab-control  ref="tabControl" :titles="titles" @tabClick="tabClick"/>
      <goods-list :goods="goodItem"/>
    </scroll >
    <back-top @click.native="backTopClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";
  import HomeSwiper from "./childcomps/HomeSwiper";
  import HomeRecommend from "./childcomps/HomeRecommend";
  import HomeFeature from "./childcomps/HomeFeature";


  import {getHomeMultidata,getHomeGoodsData} from "network/home";
  import {debounce} from "../../common/utils";


  export default {
        name: "Home",
        data(){
          return{
            currentType:"pop",
            banner:[],
            recommend:[],
            titles:["流行","新款","精选"],
            isShow:false,
            isTabFixed:false,
            goods:{
              pop:{page:0,list:[]},
              new:{page:0,list:[]},
              sell:{page:0,list:[]}
            },
            tabOffsetTop:0,
            saveY:0
          }
        },
        computed:{
            goodItem(){
              return this.goods[this.currentType].list
            }
        },
        components:{
            NavBar,TabControl,Scroll,GoodsList,BackTop,HomeSwiper,HomeRecommend,HomeFeature,
        },
        created() {
           this.handleHomeMultiData()
           this.handleHomeGoodsData("pop")
           this.handleHomeGoodsData("new")
           this.handleHomeGoodsData("sell")
        },
        mounted() {
          const refresh = debounce(this.$refs.scroll.refreshHeight)
          //事件总线  这里要用箭头函数
          this.$bus.$on("itemImageLoad",()=>{
              refresh()
          })
        },
        activated() {
          this.$refs.scroll.scrollTo(0,this.saveY,0)
          this.$refs.scroll.refreshHeight()
        },
        deactivated() {
              this.saveY = this.$refs.scroll.getScrollY()
        },
    methods:{

          /*
          网络请求
          * */
          handleHomeMultiData(){
            getHomeMultidata().then(res=>{
              this.banner = res.data.banner.list
              this.recommend = res.data.recommend.list
            }).catch(err=>err)
          },
          handleHomeGoodsData(type){
            const page = this.goods[type].page + 1
            getHomeGoodsData(type,page).then(res=>{
              let result = res.data.list
              this.goods[type].list.push(...result)
              this.goods[type].page = page
              this.$refs.scroll.finishPullUp()
            }).catch(err=>err)
          },
          /*
          * 事件监听
          * */
          tabClick(index){
            switch (index) {
              case 0:
                this.currentType = "pop"
                break
              case 1:
                this.currentType = "new"
                break
              case 2:
                this.currentType = "sell"
                break

            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl.currentIndex = index
          },
          backTopClick(){
            this.$refs.scroll.scrollTo(0,0)
          },
          contentScroll(position){
            //回到顶部 是否显示
            this.isShow = Math.abs(position.y) >1000
            //tabbar 悬停
            this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
          },
          uploadMore(){
            console.log("上拉加载更多")
            this.handleHomeGoodsData(this.currentType)
          },
          swiperImageLoad(){
            //处理tabbar 悬停
            //$el 获取组件根元素
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          }

        }
  }
</script>

<style scoped>
  #home{

    height: 100vh; /*视口高度*/
    position: relative;
  }
.home-nav{
  background-color: var(--color-high-text);
  color: #ffffff;

}

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .home-tab-control{
    position: relative;
    z-index: 9;
  }
</style>
