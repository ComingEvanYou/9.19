<template>
  <div>
    <el-form :inline="true" :model="value" class="demo-form-inline" ref="form">
      <template v-for="(item,index) in formItem">
        <el-form-item v-if="item.type === 'input'" :prop="item.prop">
        <el-input v-model="value[item.prop]" :placeholder="item.placeholder"></el-input>
      </el-form-item>
      <el-form-item v-if="item.type === 'solt'">
        <slot :name="item.solt_name"></slot>
      </el-form-item>
      </template>
      
    </el-form>
  </div>
</template>
<script>
export default {
    props:{
        formItem:{
            type:Array,
            default: () => []
        },
        value:{
            type:Object,
            default: () => {}
        }
    },
    methods: {
        handleResetForm(){
            this.$refs['form'].resetFields()
        }
    },
}
</script>