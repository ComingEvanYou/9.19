<template>
  <div>
    <el-dialog :title="dialogConfig.dialogTitle" :width="dialogConfig.width" :visible.sync="visible">
      <el-form :model="value" :label-width="lableWidth" :rules="dialogRules" ref="dialogForm">
        <template v-for="(item,index) in dialogFormItem" >
            <el-form-item :label="item.lable"  v-bind="item" :style="{ width:`${dialogConfig.formWidth}px`}">
          <el-input v-model="value[item.prop]" autocomplete="off"></el-input>
        </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleReset">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    props:{
        dialogFormItem:{
            type:Array,
            default:() => []
        },
        lableWidth:{
            type:String,
            default: ''
        },
        dialogVisible:{
            type:Boolean,
            default: false
        },
        value:{
            type:Object,
            default: () => {}
        },
        dialogConfig:{
            type:Object,
            default: () => {}
        },
        dialogRules:{
            type:Object,
            default: () => {}
        }
    },
    computed:{
        visible:{
            get(){
                return this.dialogVisible
            },
            set(val){
                this.$emit('update:dialogVisible',val)
            }
        }
    },
    methods: {
        handleReset(){
            this.$refs['dialogForm'].validate(valid => {
                if(!valid) return
                this.$emit('submit')
            })
        }
    },
}
</script>