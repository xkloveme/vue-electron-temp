<template>
  <div>
    <el-table
      :data="tableData"
      v-show="tableStatus !== '2'"
      :border="!this.$attrs.hiddenOptions"
      class="tb-edit"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="操作"
        :width="50"
        prop="agency"
        v-if="!this.$attrs.hiddenOptions"
      >
        <template scope="scope">
          <i
            @click="handleDelete(scope.$index, scope.row)"
            class="el-icon-delete"
            style="color: #f56c6c"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="产权人姓名"
        prop="people"
        :width="this.$attrs.hiddenOptions ? 100 : 130"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.people"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="realEstateCertificate"
        label="不动产权证"
        :width="this.$attrs.hiddenOptions ? 100 : 130"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.realEstateCertificate"
            size="small"
            placeholder="请输入内容"
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
    </el-table-column>-->
      <el-table-column
        label="房产来源"
        prop="whereabouts"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select clearable placeholder="请选择" v-model="scope.row.whereabouts">
            <el-option
              :key="item.key"
              :label="item.value"
              :value="item.key"
              v-for="item in $utils.houseProperty"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.whereabouts | filterSelect($utils.houseProperty)
        }}</template>
      </el-table-column>
      <el-table-column
        label="房产去向"
        prop="organization"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select clearable placeholder="请选择" v-model="scope.row.source">
            <el-option
              :key="item.key"
              :label="item.value"
              :value="item.key"
              v-for="item in $utils.realEstate"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.source | filterSelect($utils.realEstate)
        }}</template>
      </el-table-column>
      <el-table-column
        label="具体地址"
        prop="address"
        :width="this.$attrs.hiddenOptions ? 100 : 130"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.address"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="建筑面积(m²)"
        prop="area"
        :width="this.$attrs.hiddenOptions ? 100 : 130"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            placeholder="请输入"
            size="small"
            style="width: 100%"
            v-model.trim="scope.row.area"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="房产性质和功能类型"
        prop="propertyNature"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select
            clearable
            placeholder="请选择"
            style="width: 100%"
            v-model.trim="scope.row.propertyNature"
          >
            <el-option
              :key="item.key"
              :label="item.value"
              :value="item.key"
              v-for="item in $utils.propertyRight"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.propertyNature | filterSelect($utils.propertyRight)
        }}</template>
      </el-table-column>
      <el-table-column
        label="交易时间"
        prop="transactionTime"
        :width="this.$attrs.hiddenOptions ? 100 : 170"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            placeholder="选择时间"
            style="width: 150px"
            type="month"
            v-model.trim="scope.row.transactionTime"
            value-format="timestamp"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.transactionTime | dateMonth
        }}</template>
      </el-table-column>
      <el-table-column label="交易价格(万元)" prop="transactionPrice">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            placeholder="请输入"
            size="small"
            style="width: 100%"
            v-model.trim="scope.row.transactionPrice"
          />
        </template>
      </el-table-column>
      <div
        @click="handleAddLine"
        slot="append"
        style="cursor: pointer; line-height: 30px; text-align: center"
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
      return this.$store.getters.getHouseSale;
    },
  },
  // 监听 tableData
  watch: {
    tableData: {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "table16");
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
      this.$store.dispatch("updateStatusSubtract", "14");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        houseSale: [
          {
            people: "", // 产权人
            whereabouts: "", //房产来源
            realEstateCertificate: "",
            source: "", // 房产去向
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
          arr.push(item.whereabouts);
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
              "请检查产权人、房产来源、房产去向、具体地址、建筑面积、产权性质、交易时间、交易价格是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "table16");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.$store.dispatch("updateStatus", "table16");
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
        whereabouts: "", //房产来源
        realEstateCertificate: "",
        source: "", // 房产去向
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
