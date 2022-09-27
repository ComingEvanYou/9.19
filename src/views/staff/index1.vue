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
      :data="staffList"
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
import staffApp from "../../api/staff";
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
          lable: "账号",
          prop: "username",
        },
        {
          type: "input",
          lable: "姓名",
          prop: "name",
        },
        {
          type: "input",
          lable: "年龄",
          prop: "age",
        },
        {
          type: "input",
          lable: "电话",
          prop: "mobile",
        },
        {
          type: "input",
          lable: "薪酬",
          prop: "salary",
        },
        {
          type: "input",
          lable: "入职时间",
          prop: "entryDate",
        }
      ],
      dialogForm: {
        name:'',
        username:'',
        age:'',
        mobile:'',
        salary:'',
        entryDate:''
      },
      dialogRules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
      },
      dialogConfig: {
        dialogTitle: "员工新增",
        width: "500px",
        formWidth: "400",
      },
      dialogVisible: false,
      QueryFormParams: {
        name:'',
        username:''
      },
      staffList: [],
      formItem: [
        {
          type: "input",
          placeholder: "账号",
          prop: "username",
        },
        {
          type: "input",
          placeholder: "姓名",
          prop: "name",
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
          prop: "username",
          label: "账号",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "mobile",
          label: "电话",
        },
        {
          prop: "salary",
          label: "薪酬",
        },
        {
          prop: "entryDate",
          label: "入职时间",
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
    async getStaffDate() {
      try {
        const { rows, total } = await staffApp.getStaffList(
          this.page,
          this.size,
          this.QueryFormParams
        );
        this.staffList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    handleSize(size) {
      this.size = size;
      this.getStaffDate();
    },
    handlePage(page) {
      this.page = page;
      this.getStaffDate();
    },
    handleQueryForm() {
      this.page = 1;
      this.getStaffDate();
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
        this.dialogConfig.dialogTitle = "编辑员工";
        return;
      }
      this.dialogConfig.dialogTitle = "新增员工";
    },
    async handleAdd() {
      try {
        const res = await staffApp.addStaff(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getStaffDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const res = await staffApp.editStaff(this.dialogForm.id,this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("修改成功");
        this.getStaffDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const res = await staffApp.findStaff(id)
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
            const res = await staffApp.deleteStaff(id)
            this.$message.success('删除成功')
            this.getStaffDate()
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
    this.getStaffDate();
  },
};
</script>