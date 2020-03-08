<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:currentIndex===index}"
      @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
      data(){
          return {
            currentIndex :0
          }
      },
      methods:{
          itemClick(index){
            this.currentIndex = index
            this.$emit('tabClick',index)
          }
      },
        props:{
          titles:{
            type:Array,
            default(){
              return []
            },
            require:true
          }
        }
    }
</script>

<style scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #ffffff;
}
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active span{
    color:var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
