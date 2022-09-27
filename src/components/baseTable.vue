<template>
    <div>
        <el-table :data="data" style="width: 100%" :height="tableStyle.height" border>
      <template v-for="(item, index) in columns">
        <el-table-column v-if="item.type && item.type === 'index' " :type="item.type" :label="item.label" v-bind="item"></el-table-column>
        <el-table-column v-else-if="!item.type" v-bind="item" :prop="item.prop" :label="item.label"></el-table-column>
        <el-table-column v-else="item.type && item.type=== 'solt' " :label="item.label" v-bind="item">
            <template v-slot="scope">
                <slot :name="item.slot_name" :row="scope.row" ></slot>
            </template>
        </el-table-column>
      </template>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Array,
            default: () => []
        },
        columns:{
            type:Array,
            default: () => []
        },
        page:{
            type:Number,
            default:1
        },
        size:{
            type:Number,
            default:10
        },
        total:{
            type:Number,
            default:0
        },
        tableStyle:{
            type:Object,
            default:() => {}
        }
    },
    methods: {
        handleSizeChange(size){
            this.$emit('size',size)
        },
        handleCurrentChange(page){
            this.$emit('page',page)
        }
    },
}
</script>