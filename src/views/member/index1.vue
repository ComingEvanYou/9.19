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
      :data="memberList"
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
import memberApp from "../../api/member";
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
          lable: "会员卡号",
          prop: "cardNum",
        },
        {
          type: "input",
          lable: "会员姓名",
          prop: "name",
        },
        {
          type: "input",
          lable: "会员生日",
          prop: "birthday",
        },
        {
          type: "input",
          lable: "手机号码",
          prop: "phone",
        },
        {
          type: "input",
          lable: "开卡金额",
          prop: "money",
        },
        {
          type: "input",
          lable: "可用积分",
          prop: "integral",
        },
        {
          type: "input",
          lable: "支付类型",
          prop: "payType",
        },
        {
          type: "input",
          lable: "会员地址",
          prop: "address",
        }
      ],
      dialogForm: {
       address:'',
       birthday:'',
       cardNum:'',
       integral:'',
       money:'',
       name:'',
       payType:'',
       phone:''
      },
      dialogRules: {
        name: [
          {
            required: true,
            message: "会员不能为空",
            trigger: "blur",
          },
        ],
        cardNum: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur",
          },
        ],
        payType: [
          {
            required: true,
            message: "联系人不能为空",
            trigger: "blur",
          },
        ]
      },
      dialogConfig: {
        dialogTitle: "会员新增",
        width: "500px",
        formWidth: "400",
      },
      dialogVisible: false,
      QueryFormParams: {
        birthday:'',
        cardNum:'',
        name:'',
        payType:''
      },
      memberList: [],
      formItem: [
        {
          type: "input",
          placeholder: "会员卡号",
          prop: "cardNum",
        },
        {
          type: "input",
          placeholder: "会员名字",
          prop: "name",
        },
        {
          type: "input",
          placeholder: "支付类型",
          prop: "payType",
        },
        {
          type: "input",
          placeholder: "选择日期",
          prop: "birthday",
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
          prop: "cardNum",
          label: "会员卡号",
        },
        {
          prop: "name",
          label: "会员姓名",
        },
        {
          prop: "birthday",
          label: "会员生日",
        },
        {
          prop: "phone",
          label: "手机号码",
        },
        {
          prop: "integral",
          label: "可用积分",
        },
        {
          prop: "money",
          label: "开卡金额",
        },
        {
          prop: "payType",
          label: "支付类型",
        },
        {
          prop: "address",
          label: "会员地址",
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
    async getMemberDate() {
      try {
        const { rows, total } = await memberApp.getMemberList(
          this.page,
          this.size,
          this.QueryFormParams
        );
        this.memberList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    handleSize(size) {
      this.size = size;
      this.getMemberDate();
    },
    handlePage(page) {
      this.page = page;
      this.getMemberDate();
    },
    handleQueryForm() {
      this.page = 1;
      this.getMemberDate();
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
        this.dialogConfig.dialogTitle = "编辑会员";
        return;
      }
      this.dialogConfig.dialogTitle = "新增会员";
    },
    async handleAdd() {
      try {
        const res = await memberApp.addMember(this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("新增成功");
        this.getMemberDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleEdit() {
      try {
        const res = await memberApp.editMember(this.dialogForm.id,this.dialogForm);
        this.dialogVisible = false;
        this.$message.success("修改成功");
        this.getMemberDate();
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleFind(id) {
      try {
        const res = await memberApp.findMember(id)
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
            const res = await memberApp.deleteMember(id)
            this.$message.success('删除成功')
            this.getMemberDate()
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
    this.getMemberDate();
  },
};
</script>