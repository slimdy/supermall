<template>
    <div class="wrapper" ref="scroll">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from "better-scroll"
    export default {
        name: "Scroll",
        props:{
          probeType:{
            type:Number,
            default:1
          },
          pullUpLoad:{
            type: Boolean,
            default: true
          }
        },
        data(){
          return {
            scroll:null
          }
        },
        mounted() {
          this.scroll = new BScroll(this.$refs.scroll,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad

          })

          if (this.probeType === 2 || this.probeType === 3) this.probeScroll()
          if (this.pullUpLoad) this.probeScrollLast()

        },
        methods:{
            scrollTo(x,y,time=500){
              this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
              this.scroll.finishPullUp()
            },
            probeScroll(){
              this.scroll.on("scroll",(position) =>{
                this.$emit('scroll',position)
              })
            },
            probeScrollLast(){
              this.scroll.on("pullingUp",()=>{
                this.$emit('pullingUp',this.scroll)

              })
            },
            refreshHeight(){
              console.log("---")
              this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

</style>
