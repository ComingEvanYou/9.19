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
      :data="supplierList"
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
import supplierApp from "../../api/supplier";
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
          lable: "供应商名称",
          prop: "name",
        },
        {
          type: "input",
          lable: "联系人",
          prop: "linkman",
        },
        {
          type: "input",
          lable: "联系电话",
          prop: "mobile",
        },
        {
          type: "input",
          lable: "备注",
          prop: "remark",
        },
      ],
      dialogForm: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      dialogRules: {
        name: [
          {
            required: true,
            message: "供应商不能为空",
            trigger: "blur",
          },
        ],
        linkman: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur",
          },
        ],
      },
      dialogConfig: {
        dialogTitle: "供应商新增",
        width: "500px",
        formWidth: "400",
      },
      dialogVisible: false,
      QueryFormParams: {
        linkman: "",
        name: "",
        mobile: "",
      },
      supplierList: [],
      formItem: [
        {
          type: "input",
          placeholder: "供应商名称",
          prop: "name",
        },
        {
          type: "input",
          placeholder: "联系人",
          prop: "linkman",
        },
        {
          type: "input",
          placeholder: "联系电话",
          prop: "mobile",
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
          label: "供应商名称",
        },
        {
          prop: "linkman",
          label: "联系人",
        },
        {
          prop: "mobile",
          label: "联系电话",
        },
        {
          prop: "remark",
          label: "备注",
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
    async getSupplierDate() {
      try {
        const { rows, total } = await supplierApp.getSupplierList(
          this.page,
          this.size,
          this.QueryFormParams
        );
        console.log(rows, "111111111");
        this.supplierList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    handleSize(size) {
      this.size = size;
      this.getSupplierDate();
    },
    handlePage(page) {
      this.page = page;
      this.getSupplierDate();
    },
    handleQueryForm() {
      this.page = 1;
      this.getSupplierDate();
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
        this.dialogConfig.dialogTitle = "编辑供应商";
        return;
      }
      this.dialogConfig.dialogTitle = "新增供应商";
    },
    async handleAdd() {
      try {
        const res = await supplierApp.addSupplier(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getSupplierDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const res = await supplierApp.editSupplier(this.dialogForm.id,this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("修改成功");
        this.getSupplierDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const res = await supplierApp.findSupplier(id)
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
            const res = await supplierApp.deleteSupplier(id)
            this.$message.success('删除成功')
            this.getSupplierDate()
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
    this.getSupplierDate();
  },
};
</script>