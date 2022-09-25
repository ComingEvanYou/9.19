<template>
  <div>
    <el-form
      :inline="true"
      :model="memberQueryParams"
      class="demo-form-inline"
      ref="memberQueryForm"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员名字"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="memberQueryParams.payType" placeholder="支付类型">
          <el-option
            v-for="(item, index) in payType"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="memberQueryParams.birthday"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="memberQueryData">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('memberQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="memberList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | memberPayTyoe }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteMember(scope.row.id)"
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
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input
            v-model="dialogFormParams.cardNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="dialogFormParams.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="dialogFormParams.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input
            v-model="dialogFormParams.money"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input
            v-model="dialogFormParams.integral"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="dialogFormParams.payType" placeholder="支付类型">
            <el-option
              v-for="(item, index) in payType"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            type="textarea"
            v-model="dialogFormParams.address"
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
import MemberApp from "../../api/member";
import MemberEnum from "../../enum/member";
export default {
  data() {
    return {
      //会员列表数据
      memberList: [],
      //当前页
      page: 1,
      //每页条数
      size: 10,
      //查询要传的信息
      memberQueryParams: {
        birthday: "",
        cardNum: "",
        name: "",
        payType: "",
      },
      payType: MemberEnum.payType,
      //总条数
      total: 0,
      //弹出框的显示与隐藏
      dialogFormVisible: false,
      //弹出框表单信息
      dialogFormParams: {
        cardNum: "",
        name: "",
        payType: "",
        address: "",
        money: "",
        integral: "",
        phone: "",
        birthday: "",
      },
      dialogTitle: "",
      dialogRules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [{ required: true, message: "类型不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取会员列表数据
    async getMemberData() {
      try {
        const { rows, total } = await MemberApp.getMemberList(
          this.page,
          this.size,
          this.memberQueryParams
        );
        this.memberList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    //每页条数发生改变
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getMemberData();
    },
    //当前页发生改变
    handleCurrentChange(val) {
      this.page = val;
      this.getMemberData();
    },
    //会员查询
    memberQueryData() {
      this.page = 1;
      this.getMemberData();
    },
    //表单重置
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    //删除会员
    deleteMember(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await MemberApp.deleteMember(id);
            this.$message.success("删除成功");
            this.getMemberData();
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
        this.dialogTitle = "编辑会员";
        this.handleFindMember(id);
        return;
      }
      this.dialogTitle = "新增会员";
      this.handleReset("dialogForm");
    },
    //弹框的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogTitle == "新增会员"
          ? this.handleAddMember()
          : this.handleEditMember();
      });
    },
    //新增会员
    async handleAddMember() {
      try {
        const response = await MemberApp.addMember(this.dialogFormParams);
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getMemberData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑会员
    async handleEditMember() {
      try {
        const res = await MemberApp.editMember(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.dialogFormVisible = false;
        this.$message.success("更新成功");
        this.getMemberData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //查询单个会员信息
    async handleFindMember(id) {
      try {
        const response = await MemberApp.findMember(id);
        this.dialogFormParams = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  filters: {
    //过滤付款类型
    memberPayTyoe(value) {
      const item = MemberEnum.payType.find((item) => item.type == value);
      return item.name;
    },
  },
  created() {
    this.getMemberData();
  },
};
</script>