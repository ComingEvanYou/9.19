<template>
  <div class="linkPage">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: activeRoute }" class="txt">
        {{activePage}}
        </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    activeRoute() {
      return this.$route.path;
    },
    activePage() {
      return this.$route.meta.title;
    },
  },
};
</script>
<style lang="scss">
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.txt{
    border-left: 3px solid orange;
    padding-left: 5px;
}
</style>