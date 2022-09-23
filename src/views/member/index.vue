<template>
  <div>
    <el-form :inline="true" :model="memberQuery" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="memberQuery.cardNum" placeholder="会员卡号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="memberQuery.name" placeholder="会员名字"></el-input>
  </el-form-item>
  <el-form-item>
    <el-select v-model="memberQuery.payType" placeholder="支付类型">
      <el-option v-for="(item,index) in payType" :key="index" :label="item.name" :value="item.type"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
   <el-date-picker v-model="memberQuery.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="memberQueryData">查询</el-button>
    <el-button type="primary">新增</el-button>
    <el-button type="primary">重置</el-button>
  </el-form-item>
</el-form>
    <el-table :data="memberList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120"> </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | memberPayTyoe }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
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
      :total="total">
    </el-pagination>
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
      memberQuery: {
        birthday: "",
        cardNum: "",
        name: "",
        payType: "",
      },
      payType: MemberEnum.payType,
      //总条数
      total: 0,
    };
  },
  methods: {
    //获取会员列表数据
    async getMemberData() {
      const { rows, total } = await MemberApp.getMenberList(
        this.page,
        this.size,
        this.memberQuery
      );
      this.memberList = rows;
      this.total = total;
      console.log(this.memberList);
    },
    //每页条数发生改变
    handleSizeChange(val){
        this.page = 1
        this.size = val
        this.getMemberData()
    },
    //当前页发生改变
    handleCurrentChange(val){
        this.page = val
        this.getMemberData()
    },
    //会员查询
    memberQueryData(){
        this.page = 1
        this.getMemberData()
    }
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