<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banner"/>
    <home-recommend :recommends="recommend"/>
    <home-feature/>
    <tab-control class="home-tab-control" :titles="titles" @tabClick="tabClick"/>
    <goods-list :goods="goodItem"/>
    <ul>
      <li>呵呵1</li>
      <li>呵呵2</li>
      <li>呵呵3</li>
      <li>呵呵4</li>
      <li>呵呵5</li>
      <li>呵呵6</li>
      <li>呵呵7</li>
      <li>呵呵8</li>
      <li>呵呵9</li>
      <li>呵呵10</li>
      <li>呵呵11</li>
      <li>呵呵12</li>
      <li>呵呵13</li>
      <li>呵呵14</li>
      <li>呵呵15</li>
      <li>呵呵16</li>
      <li>呵呵17</li>
      <li>呵呵18</li>
      <li>呵呵19</li>
      <li>呵呵20</li>
      <li>呵呵21</li>
      <li>呵呵22</li>
      <li>呵呵23</li>
      <li>呵呵24</li>
      <li>呵呵25</li>
      <li>呵呵26</li>
      <li>呵呵27</li>
      <li>呵呵28</li>
      <li>呵呵29</li>
      <li>呵呵30</li>
      <li>呵呵31</li>
      <li>呵呵32</li>
      <li>呵呵33</li>
      <li>呵呵34</li>
      <li>呵呵35</li>
      <li>呵呵36</li>
      <li>呵呵37</li>
      <li>呵呵38</li>
      <li>呵呵39</li>
      <li>呵呵40</li>
      <li>呵呵41</li>
      <li>呵呵42</li>
      <li>呵呵43</li>
      <li>呵呵44</li>
      <li>呵呵45</li>
      <li>呵呵46</li>
      <li>呵呵47</li>
      <li>呵呵48</li>
      <li>呵呵49</li>
      <li>呵呵50</li>
      <li>呵呵51</li>
      <li>呵呵52</li>
      <li>呵呵53</li>
      <li>呵呵54</li>
      <li>呵呵55</li>
      <li>呵呵56</li>
      <li>呵呵57</li>
      <li>呵呵58</li>
      <li>呵呵59</li>
      <li>呵呵60</li>
      <li>呵呵61</li>
      <li>呵呵62</li>
      <li>呵呵63</li>
      <li>呵呵64</li>
      <li>呵呵65</li>
      <li>呵呵66</li>
      <li>呵呵67</li>
      <li>呵呵68</li>
      <li>呵呵69</li>
      <li>呵呵70</li>
      <li>呵呵71</li>
      <li>呵呵72</li>
      <li>呵呵73</li>
      <li>呵呵74</li>
      <li>呵呵75</li>
      <li>呵呵76</li>
      <li>呵呵77</li>
      <li>呵呵78</li>
      <li>呵呵79</li>
      <li>呵呵80</li>
      <li>呵呵81</li>
      <li>呵呵82</li>
      <li>呵呵83</li>
      <li>呵呵84</li>
      <li>呵呵85</li>
      <li>呵呵86</li>
      <li>呵呵87</li>
      <li>呵呵88</li>
      <li>呵呵89</li>
      <li>呵呵90</li>
      <li>呵呵91</li>
      <li>呵呵92</li>
      <li>呵呵93</li>
      <li>呵呵94</li>
      <li>呵呵95</li>
      <li>呵呵96</li>
      <li>呵呵97</li>
      <li>呵呵98</li>
      <li>呵呵99</li>
      <li>呵呵100</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import HomeSwiper from "./childcomps/HomeSwiper";
  import HomeRecommend from "./childcomps/HomeRecommend";
  import HomeFeature from "./childcomps/HomeFeature";

  import {getHomeMultidata,getHomeGoodsData} from "network/home";


  export default {
        name: "Home",
        data(){
          return{
            currentType:"pop",
            banner:[],
            recommend:[],
            titles:["流行","新款","精选"],
            goods:{
              pop:{page:0,list:[]},
              new:{page:0,list:[]},
              sell:{page:0,list:[]}
            }
          }
        },
        computed:{
            goodItem(){
              return this.goods[this.currentType].list
            }
        },
        components:{
            NavBar,TabControl,GoodsList,HomeSwiper,HomeRecommend,HomeFeature,
        },
        created() {
           this.handleHomeMultiData()
           this.handleHomeGoodsData("pop")
           this.handleHomeGoodsData("new")
           this.handleHomeGoodsData("sell")

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
              console.log(result);
              this.goods[type].list.push(...result)
              this.goods[type].page = page
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
          }

        }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
.home-nav{
  background-color: var(--color-high-text);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
  .home-tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
