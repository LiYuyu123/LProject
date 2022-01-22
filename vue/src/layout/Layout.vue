<template>
  <Header/>
   <div class="main-wrapper">
     <LeftNav/>
     <div class="main-content">
       <div class="content-wrapper">
         <router-view></router-view>
       </div>
       <div class="bottom">
         <div class="copyright">版权所有：LZJ 技术支持：LZJ</div>
       </div>
     </div>
   </div>
</template>
<script>
import LeftNav from "./LeftNav";
import {factorMonitor} from "../assets/js/router";
import Header from "./Header";
export default {
  components: {Header, LeftNav},
  setup(){
    return {factorMonitor}
  }
}



</script>
<style lang="less" scoped>
.main-wrapper {
  width: 100vw;
  display: flex;
  .main-content {
     flex: 1;
     min-width: calc(100vw - 200px);
     padding: 0 20px;
     display: flex;
     flex-direction: column;
     .content-wrapper {
        border: 1px solid red;
        height: 100%;
     }
  }
}
.copyright {
  font-size: 12px;
  color: #667486;
  padding: 9px 0;
  text-align: center;
}
</style>