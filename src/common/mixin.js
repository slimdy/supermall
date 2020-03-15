import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components:{BackTop},
  data(){
    return{
      isShow:false,
    }
  },
  methods:{
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}
