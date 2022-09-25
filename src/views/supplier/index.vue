<template>
  <div>
    <el-form
      :inline="true"
      :model="supplierQueryParams"
      class="demo-form-inline"
      ref="supplierQueryForm"
    >
      <el-form-item prop="name">
        <el-input
          v-model="supplierQueryParams.name"
          placeholder="供应商名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input
          v-model="supplierQueryParams.linkman"
          placeholder="联系人"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="supplierQueryParams.mobile"
          placeholder="联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="supplierQueryData">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('supplierQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="supplierList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteSupplier(scope.row.id)"
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
        <el-form-item label="供应商名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input
            v-model="dialogFormParams.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model="dialogFormParams.remark"
          ></el-input>
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
import SupplierApp from "../../api/supplier";
export default {
  data() {
    return {
      //供应商列表数据
      supplierList: [],
      //当前页
      page: 1,
      //每页条数
      size: 10,
      //查询要传的信息
      supplierQueryParams: {
       name:'',
       linkman:'',
       mobile:''
      },
      //总条数
      total: 0,
      //弹出框的显示与隐藏
      dialogFormVisible: false,
      //弹出框表单信息
      dialogFormParams: {
       linkman:"",
       mobile:'',
       name:'',
       remark:''
      },
      dialogTitle: "",
      dialogRules: {
        name: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        linkman: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取供应商列表数据
    async getSupplierData() {
      try {
        const { rows, total } = await SupplierApp.getSupplierList(
          this.page,
          this.size,
          this.supplierQueryParams
        );
        this.supplierList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    //每页条数发生改变
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getSupplierData();
    },
    //当前页发生改变
    handleCurrentChange(val) {
      this.page = val;
      this.getSupplierData();
    },
    //供应商查询
    supplierQueryData() {
      this.page = 1;
      this.getSupplierData();
    },
    //表单重置
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    //删除供应商
    deleteSupplier(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await SupplierApp.deleteSupplier(id);
            this.$message.success("删除成功");
            this.getSupplierData();
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
        this.dialogTitle = "编辑供应商";
        this.handleFindSupplier(id);
        return;
      }
      this.dialogTitle = "新增供应商";
      this.handleReset("dialogForm");
    },
    //弹框的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogTitle == "新增供应商"
          ? this.handleAddSupplier()
          : this.handleEditSupplier();
      });
    },
    //新增供应商
    async handleAddSupplier() {
      try {
        const response = await SupplierApp.addSupplier(this.dialogFormParams);
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getSupplierData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑供应商
    async handleEditSupplier() {
      try {
        const res = await SupplierApp.editSupplier(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.dialogFormVisible = false;
        this.$message.success("更新成功");
        this.getSupplierData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //查询单个供应商信息
    async handleFindSupplier(id) {
      try {
        const response = await SupplierApp.findSupplier(id);
        this.dialogFormParams = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  created() {
    this.getSupplierData();
  },
};
</script>