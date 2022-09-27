<template>
  <div>
    <i-query
      :formItem="formItem"
      v-model.sync="QueryFormParams"
      ref="queryForm"
    >
      <template v-slot:query>
        <el-button type="primary" @click="handleQueryForm">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </i-query>
    <i-table
      :data="goodsList"
      :tableStyle="tableStyle"
      :columns="columns"
      :page="page"
      :size="size"
      :total="total"
      @size="handleSize"
      @page="handlePage"
    >
      <template v-slot:opteration="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleOpenDialog(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </i-table>
    <i-dialog
      :dialogFormItem="dialogFormItem"
      lable-width="120px"
      :dialogVisible.sync="dialogVisible"
      v-model.sync="dialogForm"
      :dialogConfig="dialogConfig"
      :dialogRules="dialogRules"
      @submit="handleSubmit"
    ></i-dialog>
  </div>
</template>
<script>
import goodsApp from "../../api/goods";
export default {
  components: {
    "i-table": () => import("../../components/baseTable.vue"),
    "i-query": () => import("../../components/queryForm.vue"),
    "i-dialog": () => import("../../components/dialog.vue"),
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      dialogFormItem: [
        {
          type: "input",
          lable: "商品名称",
          prop: "name",
        },
        {
          type: "input",
          lable: "商品编码",
          prop: "code",
        },
        {
          type: "input",
          lable: "商品规格",
          prop: "spec",
        },
        {
          type: "input",
          lable: "零售价",
          prop: "purchasePrice",
        },
        {
          type: "input",
          lable: "进货价",
          prop: "retailPrice",
        },
        {
          type: "input",
          lable: "库存数量",
          prop: "storageNum",
        },
        {
          type: "input",
          lable: "供应商",
          prop: "supplierName",
        }
      ],
      dialogForm: {
        
        code:'',
        name:'',
        spec:'',
        purchasePrice:'',
        retailPrice:'',
        storageNum:'',
        supplierName:''
      },
      dialogRules: {
        name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "商品编码不能为空",
            trigger: "blur",
          },
        ],
        purchasePrice: [
          {
            required: true,
            message: "零售价不能为空",
            trigger: "blur",
          },
        ],
      },
      dialogConfig: {
        dialogTitle: "商品新增",
        width: "500px",
        formWidth: "400",
      },
      dialogVisible: false,
      QueryFormParams: {
        code:'',
        name:'',
        supplierName:'',
      },
      goodsList: [],
      formItem: [
        {
          type: "input",
          placeholder: "商品名称",
          prop: "name",
        },
        {
          type: "input",
          placeholder: "商品编码",
          prop: "code",
        },
        {
          type: "input",
          placeholder: "选择供应商",
          prop: "supplierName",
        },
        {
          type: "solt",
          solt_name: "query",
        },
      ],
      columns: [
        {
          type: "index",
          label: "序号",
          width: "60",
        },
        {
          prop: "name",
          label: "商品名称",
        },
        {
          prop: "code",
          label: "商品编码",
        },
        {
          prop: "spec",
          label: "商品规格",
        },
        {
          prop: "purchasePrice",
          label: "零售价",
        },
        {
          prop: "retailPrice",
          label: "进货价",
        },
        {
          prop: "storageNum",
          label: "库存数量",
        },
        {
          prop: "supplierName",
          label: "供应商",
        },
        {
          label: "操作",
          slot_name: "opteration",
          type: "slot",
        },
      ],
      tableStyle: {
        height: 380,
      },
    };
  },
  methods: {
    async getGoodsDate() {
      try {
        const { rows, total } = await goodsApp.getGoodsList(
          this.page,
          this.size,
          this.QueryFormParams
        );
        console.log(rows, "111111111");
        this.goodsList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    handleSize(size) {
      this.size = size;
      this.getGoodsDate();
    },
    handlePage(page) {
      this.page = page;
      this.getGoodsDate();
    },
    handleQueryForm() {
      this.page = 1;
      this.getGoodsDate();
    },
    handleReset() {
      this.$refs["queryForm"].handleResetForm();
    },
    handleSubmit() {
      if (this.dialogForm.id) {
        this.handleEdit();
      } else {
        this.handleAdd();
      }
    },
    handleOpenDialog(id) {
      this.dialogVisible = true;
      if (typeof id === "number") {
        this.handleFind(id);
        this.dialogConfig.dialogTitle = "编辑商品";
        return;
      }
      this.dialogConfig.dialogTitle = "新增商品";
    },
    async handleAdd() {
      try {
        const res = await goodsApp.addGoods(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getGoodsDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const res = await goodsApp.editGoods(this.dialogForm.id,this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("修改成功");
        this.getGoodsDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const res = await goodsApp.findGoods(id)
        this.dialogForm = res
      } catch (e) {
        console.log(e.message);
      }
    },
    handleDelete(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          try{
            const res = await goodsApp.deleteGoods(id)
            this.$message.success('删除成功')
            this.getGoodsDate()
          }catch(e){
            console.log(e.message)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created() {
    this.getGoodsDate();
  },
};
</script>