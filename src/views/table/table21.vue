<template>
  <div>
    <el-table
      :data="tableData"
      v-show="tableStatus !== '2'"
      class="tb-edit"
      :border="!this.$attrs.hiddenOptions"
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="操作" v-if="!this.$attrs.hiddenOptions" :width="80">
        <template scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="持有人姓名"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.name" size="small" placeholder="请输入内容" />
        </template>
        <template scope="scope" v-else>
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="futuresName"
        label="期货名称或代码"
        :width="this.$attrs.hiddenOptions ? 200 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.futuresName"
            size="small"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" v-else>
          <span>{{ scope.row.futuresName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="futuresNumber"
        label="份额"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.futuresNumber"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" v-else>
          <span>{{ scope.row.futuresNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="futuresMarketValue" label="填报前一交易日净值（万元）">
        <template slot="header">
          <span>填报前一交易日净值<span style="color: red">（万元）</span></span>
        </template>
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.futuresMarketValue"
            @change="inputChange"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" v-else>
          <span>{{ scope.row.futuresMarketValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="desc">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入"
            size="small"
            style="width: 100%"
            v-model.trim="scope.row.desc"
          />
        </template>
      </el-table-column>
      <div slot="append" style="cursor: pointer; line-height: 30px">
        <div style="text-align: right; border-bottom: 1px solid #ebeef5; padding: 5px">
          填报前一交易日所有期货的总净值<span style="color: red">（万元）</span>
          <el-input-number
            v-model.trim="allMarketValue"
            @change="inputChange"
            size="small"
            style="width: 400px"
            placeholder="请输入内容"
            v-if="!this.$attrs.hiddenOptions"
          />
          <span v-else>{{ allMarketValue }}</span>
        </div>
        <div
          style="text-align: center"
          @click="handleAddLine"
          v-if="!this.$attrs.hiddenOptions"
        >
          <i class="el-icon-circle-plus-outline" />
          添加一行
        </div>
      </div>
    </el-table>
    <el-row
      type="flex"
      style="margin: 30px"
      justify="center"
      v-if="!this.$attrs.hiddenOptions"
    >
      <el-button @click="handleGoPrevPage">上一项</el-button>
      <el-button @click="handleEmpty" type="primary">重置</el-button>
      <el-button @click="handleGoNextPage">下一项</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tableStatus: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    tableData() {
      return this.$store.getters.getFutures.list;
    },
    allMarketValue: {
      get: function () {
        return this.$store.getters.getFutures.allMarketValue;
      },
      set: function (newValue) {
        this.$store.dispatch("updateFuturesAllMarketValue", newValue);
      },
    },
    desc: {
      get: function () {
        return this.$store.getters.getFutures.desc;
      },
      set: function (newValue) {
        this.$store.commit("setFuturesDesc", newValue);
      },
    },
  },
  // 监听 tableData
  watch: {
    tableData: {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "table21");
      },
      deep: true,
    },
  },
  methods: {
    handleDelete(index, row) {
      if (this.tableData.length > 1) {
        this.tableData.splice(index, 1);
      } else {
        this.$message({
          type: "info",
          message: "已经是最后一个了,不能再删了",
        });
      }
    },
    inputChange(currentValue, oldValue) {
      if (currentValue > 100) {
        this.$alert("单位为万元,请仔细核对", "⚠️注意⚠️", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `请您再次检查,您输入值的单位为万元`,
            });
          },
        });
      }
    },
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch("updateStatusSubtract", "19");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        futures: {
          desc: "",
          allMarketValue: "", // 总市值
          list: [
            {
              name: "",
              futuresName: "", // 期货名称
              futuresNumber: "", // 期货数量
              futuresMarketValue: "", // 期货市值
            },
          ],
        },
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        let arr = [];
        this.tableData.map((item) => {
          arr.push(item.name);
          arr.push(item.futuresName);
          arr.push(item.futuresNumber > 0);
          arr.push(item.futuresMarketValue > 0);
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message: "请检查持有人姓名、期货名称、期货数量、期货市值是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "table21");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.$store.dispatch("updateStatus", "table21");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        name: "",
        futuresName: "", // 期货名称
        futuresNumber: "", // 期货数量
        futuresMarketValue: "", // 期货市值
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
