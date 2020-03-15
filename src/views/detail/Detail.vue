<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick"/>
    <scroll ref="scroll" class="content" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-good-info :detail-info="detailInfo" @goodsImageLoad="goodsImageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTopClick" v-show="isShow"/>
  </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    import DetailNavBar from "./childDetails/DetailNavBar";
    import DetailSwiper from "./childDetails/DetailSwiper";
    import DetailBaseInfo from "./childDetails/DetailBaseInfo";
    import DetailShopInfo from "./childDetails/DetailShopInfo";
    import DetailGoodInfo from "./childDetails/DetailGoodInfo";
    import DetailParamInfo from "./childDetails/DetailParamInfo";
    import DetailCommentInfo from "./childDetails/DetailCommentInfo";
    import DetailRecommendInfo from "./childDetails/DetailRecommendInfo";
    import DetailBottomBar from "./childDetails/DetailBottomBar";

    import {getGoodDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {debounce} from "common/utils";
    import {backTopMixin} from "common/mixin";

    export default {
        name: "Detail",
        mixins:[backTopMixin],
        components:{Scroll,DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailGoodInfo,DetailParamInfo,
          DetailCommentInfo,DetailRecommendInfo,DetailBottomBar},
        data(){
          return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendList:[],
            anchorY:[],
            navTitleIndex:0,
            getAnchorY:()=>{},
            refresh:()=>{}
          }
        },
        created() {
          this.iid = this.$route.params.id
          //请求数据
          this.handleDetailData()
        },

        mounted() {
          this.refresh = debounce(this.$refs.scroll.refreshHeight,500)
          //事件总线  这里要用箭头函数
          this.$bus.$on("detailItemImageLoad",()=>{
            this.refresh()
            this.getAnchorY()
          })
        },
        methods:{
            /*网络请求*/
            handleDetailData(){
              getGoodDetail(this.iid).then(res=>{
                const data = res.result
                console.log(data);
                this.topImages= data.itemInfo.topImages
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                this.shop = new Shop(data.shopInfo)
                this.detailInfo = data.detailInfo,
                this.paramInfo  = new GoodsParam(data.itemParams.info,data.itemParams.rule)
                if (data.rate.cRate !== 0){
                  this.commentInfo = data.rate.list[0]
                }

              }).catch(err=>console.log(err))


              getRecommend(this.iid).then(res=>{
                const data = res.data
                console.log(data.list);
                this.recommendList = data.list
              }).catch(err=>console.log(err))

              // this.$nextTick()  这个方法是每次把数据赋值给组件后 组件需要等待一个周期才能渲染，
              // 把相应操作函数 放在里面作为渲染完成后的回调，这样可以做出相应的操作

              //获取锚点的正确数值  应为里面有图片 所以得每次 load 结束后重新计算 所以 用到这个防抖
              this.getAnchorY = debounce(()=>{

                this.anchorY = []
                this.anchorY.push(0)
                this.$refs.param && this.anchorY.push(this.$refs.param.$el.offsetTop)
                this.$refs.comment && this.anchorY.push(this.$refs.comment.$el.offsetTop)
                this.$refs.recommend && this.anchorY.push(this.$refs.recommend.$el.offsetTop)
                console.log(this.anchorY)
              },1000)
            },
            goodsImageLoad(){

              this.refresh()
              this.getAnchorY()
              // this.$refs.scroll.refreshHeight()
            },
            getGood(){
              return {
                image:this.topImages[0],
                title:this.goods.title,
                desc:this.goods.desc,
                price:this.goods.nowPrice,
                id:this.iid
              }
            },
            titleClick(index){
              this.$refs.scroll.scrollTo(0,-this.anchorY[index],200)
            },
            contentScroll(position){
                const positionY = -position.y
                const anchorY = this.anchorY
                anchorY.push(Number.MAX_SAFE_INTEGER)
                const length = anchorY.length-1
                for (let i=0 ;i<length;i++){
                  if (this.navTitleIndex !== i && (positionY >= anchorY[i] && positionY < anchorY[i+1])){
                      this.navTitleIndex = i
                      this.$refs.nav.currentIndex = i
                  }
                }
              //回到顶部 是否显示
              this.isShow = positionY >1000

            },
            addToCart(){
             const product = this.getGood()
              product.quantity = 1
              this.$store.dispatch('addCart',product).then(data=>{
                
              })
            }
          },
        watch:{
          $route () {
              this.$router.go(0)
          }
        }
    }
</script>

<style scoped>
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
