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
      <el-table-column
        prop="agency"
        :width="50"
        label="操作"
        v-if="!this.$attrs.hiddenOptions"
      >
        <template scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="people"
        label="产权人姓名"
        :width="this.$attrs.hiddenOptions ? 100 : 150"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.people"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="网签合同编号或网签备案号"
        prop="caseNo"
        :width="this.$attrs.hiddenOptions ? 80 : 150"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.caseNo"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column
      prop="agency"
      label="与本人关系"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model.trim="scope.row.relationship"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.relationshipWithMyself"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column> -->
      <el-table-column
        prop="source"
        label="房产来源"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.source" clearable placeholder="请选择">
            <el-option
              v-for="item in $utils.houseProperty"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.source | filterSelect($utils.houseProperty)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="具体地址"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.address"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="area"
        label="建筑面积(m²)"
        :width="this.$attrs.hiddenOptions ? 100 : 135"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.area"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="propertyNature"
        label="房产性质和功能类型"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select
            v-model.trim="scope.row.propertyNature"
            clearable
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in $utils.propertyRight"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.propertyNature | filterSelect($utils.propertyRight)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="transactionTime"
        label="交易时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.transactionTime"
            style="width: 150px"
            type="month"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.transactionTime | dateMonth
        }}</template>
      </el-table-column>
      <el-table-column
        prop="transactionPrice"
        label="交易价格(万元)"
        :width="this.$attrs.hiddenOptions ? 100 : 135"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.transactionPrice"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
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
      return this.$store.getters.getNotRushEstate;
    },
  },
  // 监听 tableData
  watch: {
    tableData: {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "table14");
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
      this.$store.dispatch("updateStatusSubtract", "15");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        notRushEstate: [
          {
            people: "", // 产权人
            relationship: "", // 与本人关系
            caseNo: "", //网签合同编号或网签备案号
            source: "", // 房产来源
            address: "", // 具体地址
            area: "", // 建筑面积
            propertyNature: "", // 产权性质
            transactionTime: "", // 交易时间
            transactionPrice: "", // 交易价格
          },
        ],
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        let arr = [];
        this.tableData.map((item) => {
          arr.push(item.people);
          arr.push(item.source);
          arr.push(item.address);
          arr.push(item.area >= 0);
          arr.push(item.propertyNature);
          arr.push(item.transactionTime);
          arr.push(item.transactionPrice >= 0);
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message:
              "请检查产权人、房产来源、具体地址、建筑面积、产权性质、交易时间、交易价格是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "table14");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.$store.dispatch("updateStatus", "table14");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        people: "", // 产权人
        relationship: "", // 与本人关系
        caseNo: "", //网签合同编号或网签备案号
        source: "", // 房产来源
        address: "", // 具体地址
        area: "", // 建筑面积
        propertyNature: "", // 产权性质
        transactionTime: "", // 交易时间
        transactionPrice: "", // 交易价格
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
