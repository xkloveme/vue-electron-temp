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
        prop="time"
        label="时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.time"
            style="width: 150px"
            type="month"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{ scope.row.time | dateDay }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.name" size="small" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <el-table-column
        prop="organization"
        label="表彰机关"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.organization"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="symbol" label="文号"  :width="this.$attrs.hiddenOptions ? 150 : 180">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.symbol"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column> -->
      <el-table-column prop="desc" label="备注">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input v-model.trim="scope.row.desc" size="small" placeholder="请输入内容" />
        </template>
      </el-table-column>
      <div
        slot="append"
        style="cursor: pointer; line-height: 30px; text-align: center"
        @click="handleAddLine"
        v-if="!this.$attrs.hiddenOptions"
      >
        <i class="el-icon-circle-plus-outline" />
        添加一行
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
      <el-button @click="$exportWt()">导出</el-button>
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
      return this.$store.getters.getRecommendation;
    },
  },
  // 监听 tableData
  watch: {
    tableData: {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "table3");
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
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch("updateStatusSubtract", "1");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        recommendation: [
          {
            time: "",
            name: "",
            organization: "", // 表彰机关
            symbol: "", // 文号
            desc: "", // 备注
          },
        ],
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        let arr = [];
        this.tableData.map((item) => {
          arr.push(item.time);
          arr.push(item.name);
          arr.push(item.organization);
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message: "请检查时间、名称、表彰机关是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "table3");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.$store.dispatch("updateStatus", "table3");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        time: "",
        name: "",
        organization: "", // 表彰机关
        symbol: "", // 文号
        desc: "", // 备注
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
