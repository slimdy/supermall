//防抖函数  还有一个是节流函数
export function debounce(func,delay=300){
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
