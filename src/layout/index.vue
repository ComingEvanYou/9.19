<template>
  <div class="index">
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <app-aside></app-aside>
        </el-aside>
        <el-main>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AppHeader from "./AppHeader";
import AppAside from "./AppAside";
import AppMain from "./AppMain";
export default {
  components: {
    AppHeader,
    AppAside,
    AppMain,
  },
};
</script>
<style lang="scss">
.el-container,.index{
    height: 100%;
}
.el-header {
  background-color: #2d3a4b;
  height: 50px !important ;
  line-height: 50px;
  padding: 0;
}

.el-aside {
  background-color: #545c64;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  height: 100%;
  padding: 10px;
}
</style>