<template>
  <div>
    <el-table
      :data="tableData"
      class="tb-edit"
      v-show="tableStatus !== '2'"
      :border="!this.$attrs.hiddenOptions"
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="操作" v-if="!this.$attrs.hiddenOptions" :width="80">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="年度"
        prop="time"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.time"
            style="width: 150px"
            type="year"
            value-format="timestamp"
            placeholder="选择年"
          />
        </template>
        <template scope="scope" v-else>{{ scope.row.time | dateYear }}</template>
      </el-table-column>
      <el-table-column
        label="考核情况"
        prop="assessment"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.assessment" placeholder="请选择">
            <el-option
              v-for="item in $utils.assessment"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.assessment | filterSelect($utils.assessment)
        }}</template>
      </el-table-column>
      <!-- <el-table-column prop="agency" label="发文机关"  :width="this.$attrs.hiddenOptions ? 100 : 180">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.agency"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="symbol" label="文号"  :width="this.$attrs.hiddenOptions ? 150 : 180">
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
      return this.$store.getters.getWorkAssessment;
    },
  },
  // 监听 tableData
  watch: {
    tableData: {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "table2");
      },
      deep: true,
    },
  },
  methods: {
    // handleCurrentChange (row, event, column) {
    //   console.log(row, event, column, event.currentTarget)
    // },
    // handleEdit (index, row) {
    //   console.log(index, row)
    // },
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
      this.$store.dispatch("updateStatusSubtract", "0");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        workAssessment: [
          {
            time: "", // 年度
            assessment: "", // 考核情况
            agency: "", // 发文机关
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
          arr.push(item.assessment);
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message: "请检查年度、考核情况是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "table2");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.$store.dispatch("updateStatus", "table2");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        time: "", // 年度
        assessment: "", // 考核情况
        agency: "", // 发文机关
        symbol: "", // 文号
        desc: "", // 备注
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
