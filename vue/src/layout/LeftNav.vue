<template>
  <div class="left-nav">
    <el-menu
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="defaultActive "
        text-color="#fff"
    >
      <div v-for="(i,index) in router" :key="index">
        <el-sub-menu :index="String(index)">
          <template #title>
            <el-icon></el-icon>
            <span>{{ i.name }}</span>
          </template>
          <el-menu-item
              v-for="(j,i) in i.childrenData "
              :key="index" :index="String(i)"
              :route="{name:j.routeName}"
          >
            {{ j.name }}
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {factorMonitor} from "../assets/js/router";

const defaultActive = ref('0')
const menuSelect = ref('')
const router = factorMonitor.children

const menuOpen = (index) => {
  menuSelect.value = router[index].name
}

// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }
</script>
<style lang="less" scoped>
.left-nav {
  width: auto;
  height: calc(100vh - 50px);
  background-color: #545c64;
  .show-and-close {
    padding-top: 17px;
    padding-left: 20px;
    padding-bottom: 10px;
    width: 60px;
    box-sizing: border-box;
    /deep/ .el-icon-s-fold .el-icon-s-unfold {
      width: 16px;
      height: 16px;
    }
    /deep/ .el-icon-s-fold:before {
      color: #324053;
    }
    /deep/ .el-icon-s-unfold:before {
      color: #324053;
    }
  }
  .el-menu-vertical-demo {
    width: 200px;
    .menu-icon {
      margin-right: 10px;
    }
  }
  /deep/ .el-menu-item, .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }
  /deep/ .el-menu {
    border: unset;
  }
  /deep/ .el-menu-item {
    padding-left: 17px !important;
    //color: #324053;
    // margin-bottom: 10px;
  }
  //鼠标悬浮
  ///deep/ .el-menu-item:hover {
  //  background-color: #F2F6FA;
  //}
  /deep/ .is-active {
    color: #1890FF;
    background-color: #F2F6FA;
  }
  /deep/ .el-tooltip {
    padding-left: 17px !important;
  }
  /deep/ .el-icon-setting {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}
</style>