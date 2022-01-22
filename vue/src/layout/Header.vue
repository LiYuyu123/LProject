<!-- 公共头部 -->
<template>
  <div class="header">
     <div></div>
      <div class="user-info">
         <el-dropdown>
           <el-avatar :size="25" :src="state.circleUrl"></el-avatar>
            <div class="user-name">李子杰</div>
           <template #dropdown>
             <el-dropdown-menu>
               <el-dropdown-item>退出</el-dropdown-item>
               </el-dropdown-menu>
           </template>
         </el-dropdown>
      </div>
  </div>
</template>

<script>
import  {reactive} from 'vue'
export default {
 setup(){
   const state = reactive({
     circleUrl:
         'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
   })
   const  exit = () => {

   }
   return {
    state
   }
 }
}
</script>

<style lang="less" scoped>
.header {
  min-width: 1280px;
  background-color: #324053;
  color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 020px;
  font-family: Microsoft YaHei;
  .user-info {
    //display: flex;
    //align-items: center;
    //font-size: 14px;
    //>span {
    //  margin-left: 10px;
    //}
    /deep/ .el-dropdown {
      .el-dropdown--default {
        display: flex;
        align-items: center;
        font-size: 14px;
        .user-name {
          padding-left: 10px;
          color: white;
        }
      }
    }
  }
}
</style>