<!-- 公共头部 -->
<template>
  <div class="header">
     <div></div>
      <div class="user-info">
         <el-dropdown>
           <el-avatar :size="25" :src="state.circleUrl"></el-avatar>
            <div class="user-name">{{name}}</div>
           <template #dropdown>
             <el-dropdown-menu>
               <el-dropdown-item @click="exit">退出</el-dropdown-item>
               </el-dropdown-menu>
           </template>
         </el-dropdown>
      </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from 'vue'
import * as cookies from "../assets/cookies";
import {useRouter} from "vue-router";
import jwt from "jsonwebtoken";
export default {
 setup(){

   const router = useRouter()
   const state = reactive({
     circleUrl:
         'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
   })
   //用户名字
   const name = jwt.decode(cookies.getToken()).name
   const  exit = () => {
     ElMessageBox.confirm('确定退出吗','退出',{
       confirmButtonText:'确定',
       cancelButtonText:'取消',
       type:'warning'
     }).then(()=>{
       cookies.removeToken()
       router.push('/login')
     })
   }
   onMounted(()=>{
     console.log(name.value)
   })
   return {
    state,
     name,
     exit
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