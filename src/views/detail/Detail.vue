<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll ref="scroll" class="content" >
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-good-info :detail-info="detailInfo" @goodsImageLoad="goodsImageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <detail-recommend-info :recommend-list="recommendList"/>
    </scroll>
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

    import {getGoodDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {debounce} from "common/utils";

    export default {
        name: "Detail",
        components:{Scroll,DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailGoodInfo,DetailParamInfo,
          DetailCommentInfo,DetailRecommendInfo},
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
          this.$bus.$on("itemImageLoad",()=>{
            this.refresh()
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
                if (data.rate.list){
                  this.commentInfo = data.rate.list[0]
                }

              }).catch(err=>console.log(err))


              getRecommend(this.iid).then(res=>{
                const data = res.data
                console.log(data.list);
                this.recommendList = data.list
              }).catch(err=>console.log(err))
            },
            goodsImageLoad(){

              this.refresh()
              // this.$refs.scroll.refreshHeight()
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
