<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(title,index) in titles" class="title-item" :class="{active:index === currentIndex}"
        @click="titleClick(index)">{{title}}</div>
      </div>
    </nav-bar>
  </div>

</template>

<script>
    import NavBar from "components/common/navBar/NavBar";
    export default {
        name: "DetailNavBar",
        components:{
          NavBar
        },
        data(){
          return {
            titles:["商品","参数","评论","推荐"],
            currentIndex:0,
          }
        },
        methods:{
          titleClick(index){
            this.currentIndex = index
            this.$emit("titleClick",index)
          },
          back(){
            this.$router.push("/home")
          }
        }

    }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
  .title-item{
    flex: 1;
  }
  .back img{
    margin-top: 12px;
  }
  .active{
    color:var(--color-high-text);
  }
</style>
