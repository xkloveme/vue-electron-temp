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
      <el-table-column prop="agency" label="操作" v-if="!this.$attrs.hiddenOptions">
        <template scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="brand"
        label="品牌型号"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.brand"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="购买时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.time"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{ scope.row.time | dateDay }}</template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(万元)"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.price"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="carNumber"
        label="车牌号码"
        :width="this.$attrs.hiddenOptions ? 100 : 250"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.carNumber"
            size="small"
            type="text"
            disabled
            placeholder="请输入内容"
          >
            <template slot="prepend">
              <LicenseKeyboard
                v-model="scope.row.carNumber"
                keyBorderColor="#409eff"
                title="点击"
              />
            </template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="color"
        label="颜色"
        :width="this.$attrs.hiddenOptions ? 100 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.color"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
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
    </el-row>
  </div>
</template>

<script>
import { isLicensePlate } from "../../common.js";
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
      return this.$store.getters.getCar;
    },
  },
  // 监听 tableData
  watch: {
    tableData: {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "table18");
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
      this.$store.dispatch("updateStatusSubtract", "13");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        car: [
          {
            brand: "", // 品牌
            time: "", // 购买时间
            price: "", // 价格
            carNumber: "", // 车牌号
            color: "",
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
          arr.push(item.brand);
          arr.push(item.time);
          arr.push(item.price >= 0);
          arr.push(isLicensePlate(item.carNumber));
        });
        if (!arr.every((x) => x)) {
          return this.$message({
            type: "error",
            message: "请检查品牌、购买时间、价格、车牌号是否有误",
          });
        }
        this.$store.dispatch("updateStatus", "table18");
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.$store.dispatch("updateStatus", "table18");
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
    handleAddLine() {
      this.tableData.push({
        brand: "", // 品牌
        time: "", // 购买时间
        price: "", // 价格
        carNumber: "", // 车牌号
        color: "",
        desc: "", // 备注
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
