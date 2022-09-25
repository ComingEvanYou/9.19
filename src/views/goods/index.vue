<template>
  <div>
    <el-form
      :inline="true"
      :model="goodsQueryParams"
      class="demo-form-inline"
      ref="goodsQueryForm"
    >
      <el-form-item prop="name">
        <el-input
          v-model="goodsQueryParams.name"
          placeholder="商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="goodsQueryParams.code"
          placeholder="商品编号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          v-model="goodsQueryParams.supplierName"
          placeholder="选择供应商"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goodsQueryData">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('goodsQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="goodsList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="code" label="商品编码"> </el-table-column>
      <el-table-column prop="spec" label="商品规格"> </el-table-column>
      <el-table-column prop="retailPrice" label="零售价" width="120">
      </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storage" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteGoods(scope.row.id)"
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
        <el-form-item label="商品名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input
            v-model="dialogFormParams.code"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input
            v-model="dialogFormParams.spec"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input
            v-model="dialogFormParams.retailPrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input
            v-model="dialogFormParams.purchasePrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input
            v-model="dialogFormParams.storageNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            v-model="dialogFormParams.supplierName"
            autocomplete="off"
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
import GoodsApp from "../../api/goods";
export default {
  data() {
    return {
      //商品列表数据
      goodsList: [],
      //当前页
      page: 1,
      //每页条数
      size: 10,
      //查询要传的信息
      goodsQueryParams: {
        code:'',
        name:'',
        supplierName:''
      },
      //总条数
      total: 0,
      //弹出框的显示与隐藏
      dialogFormVisible: false,
      //弹出框表单信息
      dialogFormParams: {
        name:'',
        code:'',
        retailPrice:'',
        purchasePrice:'',
        spec:'',
        storageNum:'',
        supplierName:''
      },
      dialogTitle: "",
      dialogRules: {
        code: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        retailPrice: [{ required: true, message: "类型不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取商品列表数据
    async getGoodsData() {
      try {
        const { rows, total } = await GoodsApp.getGoodsList(
          this.page,
          this.size,
          this.goodsQueryParams
        );
        this.goodsList = rows;
        this.total = total;
      } catch (e) {
        console.log(e.message);
      }
    },
    //每页条数发生改变
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getGoodsData();
    },
    //当前页发生改变
    handleCurrentChange(val) {
      this.page = val;
      this.getGoodsData();
    },
    //商品查询
    goodsQueryData() {
      this.page = 1;
      this.getGoodsData();
    },
    //表单重置
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    //删除商品
    deleteGoods(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await GoodsApp.deleteGoods(id);
            this.$message.success("删除成功");
            this.getGoodsData();
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
        this.dialogTitle = "编辑商品";
        this.handleFindGoods(id);
        return;
      }
      this.dialogTitle = "新增商品";
      this.handleReset("dialogForm");
    },
    //弹框的提交方法
    handleSubmit() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogTitle == "新增商品"
          ? this.handleAddGoods()
          : this.handleEditGoods();
      });
    },
    //新增商品
    async handleAddGoods() {
      try {
        const response = await GoodsApp.addGoods(this.dialogFormParams);
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        this.getGoodsData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑商品
    async handleEditGoods() {
      try {
        const res = await GoodsApp.editGoods(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.dialogFormVisible = false;
        this.$message.success("更新成功");
        this.getGoodsData();
      } catch (e) {
        console.log(e.message);
      }
    },
    //查询单个商品信息
    async handleFindGoods(id) {
      try {
        const response = await GoodsApp.findGoods(id);
        this.dialogFormParams = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  created() {
    this.getGoodsData();
  },
};
</script>