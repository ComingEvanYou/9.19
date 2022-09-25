<template>
  <div>
    <el-form
      :inline="true"
      :model="staffQueryParams"
      class="demo-form-inline"
      ref="staffQueryForm"
    >
      <el-form-item prop="username">
        <el-input
          v-model="staffQueryParams.username"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="staffQueryParams.name"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="staffQueryData">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('staffQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="staffList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteStaff(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :model="dialogFormParams"
        label-width="100px"
        ref="dialogForm"
        :rules="dialogRules"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="dialogFormParams.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="dialogFormParams.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input
            v-model="dialogFormParams.salary"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            v-model="dialogFormParams.entryDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import StaffApp from "../../api/staff";
export default {
  data() {
    return {
      //员工列表数据
      staffList: [],
      //当前页
      page: 1,
      //每页条数
      size: 10,
      //查询要传的信息
      staffQueryParams: {
       name:'',
       username:''
      },
      //总条数
      total: 0,
      //弹出框的显示与隐藏
      dialogFormVisible: false,
      //弹出框表单信息
      dialogFormParams: {
        username:'',
        name:'',
        age:'',
        mobile:'',
        salary:'',
        entryDate:''
      },
      dialogTitle: "",
      dialogRules: {
        username: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      },
    };
  },
  methods: {
    //获取员工列表数据
    async getStaffData() {
      try {
        const { rows, total } = await StaffApp.getStaffList(
          this.page,
          this.size,
          this.staffQueryParams
        );
        this.staffList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    //每页条数发生改变
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getStaffData();
    },
    //当前页发生改变
    handleCurrentChange(val) {
      this.page = val;
      this.getStaffData();
    },
    //员工查询
    staffQueryData() {
      this.page = 1;
      this.getStaffData();
    },
    //表单重置
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    //删除员工
    deleteStaff(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await StaffApp.deleteStaff(id);
            this.$message.success("删除成功");
            this.getStaffData();
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //打开弹窗
    handleOpenDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.dialogTitle = "编辑员工";
        this.handleFindStaff(id);
        return;
      }
      this.dialogTitle = "新增员工";
      this.handleReset("dialogForm");
    },
    //弹框的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogTitle == "新增员工"
          ? this.handleAddStaff()
          : this.handleEditStaff();
      });
    },
    //新增员工
    async handleAddStaff() {
      try {
        const response = await StaffApp.addStaff(this.dialogFormParams);
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getStaffData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑员工
    async handleEditStaff() {
      try {
        const res = await StaffApp.editStaff(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.dialogFormVisible = false;
        this.$message.success("更新成功");
        this.getStaffData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //查询单个员工信息
    async handleFindStaff(id) {
      try {
        const response = await StaffApp.findStaff(id);
        this.dialogFormParams = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  created() {
    this.getStaffData();
  },
};
</script>