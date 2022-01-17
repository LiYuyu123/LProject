//节流
export   function throttle(fn, delay){
    let canUse = true
    return function(){
        if(canUse){
            fn.apply(this, arguments)
            canUse = false
            setTimeout(()=>canUse = true, delay)
        }
    }
}
//防抖
export  function debounce(fn, delay){
    let timerId = null
    return function(){
        const context = this
        if(timerId){window.clearTimeout(timerId)}
        timerId = setTimeout(()=>{
            fn.apply(context, arguments)
            timerId = null
        },delay)
    }
}