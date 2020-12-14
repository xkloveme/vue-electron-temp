<template>
  <div>
    <el-table
      :data="tableData"
      v-show="tableStatus !== '2'"
      class="tb-edit"
      border
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column
        prop="agency"
        label="操作"
        v-if="!this.$attrs.hiddenOptions"
        width="50"
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
        prop="name"
        label="持有人姓名"
        :width="this.$attrs.hiddenOptions ? '' : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.name"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="stockName" label="股票名称或代码">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.stockName"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="stockNumber"
        label="持股数量"
        :width="this.$attrs.hiddenOptions ? '' : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model="scope.row.stockNumber"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="stockMarketValue"
        label="填报前一交易日市值（万元）"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model="scope.row.stockMarketValue"
            size="small"
            @change="inputChange"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <div
        slot="append"
        v-if="!this.$attrs.hiddenOptions"
        style="cursor: pointer; line-height: 30px"
      >
        <div
          style="
            text-align: right;
            border-bottom: 1px solid #ebeef5;
            padding: 5px;
          "
        >
          填报前一交易日所有股票的总市值（万元）
          <el-input-number
            v-model="allMarketValue"
            @change="inputChange"
            size="small"
            style="width: 400px"
            placeholder="请输入内容"
          />
        </div>
        <div
          style="
            text-align: right;
            border-bottom: 1px solid #ebeef5;
            padding: 5px;
          "
        >
          备注
          <el-input
            v-model="desc"
            size="small"
            style="width: 400px"
            placeholder="请输入内容"
          />
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
    <el-row type="flex" style="margin: 30px" justify="center">
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
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    tableData() {
      return this.$store.getters.getStock.list
    },
    allMarketValue: {
      get: function () {
        return this.$store.getters.getStock.allMarketValue
      },
      set: function (newValue) {
        this.$store.dispatch('updateStockAllMarketValue', newValue)
      },
    },
    desc: {
      get: function () {
        return this.$store.getters.getStock.desc
      },
      set: function (newValue) {
        this.$store.dispatch('updateStockDesc', newValue)
      },
    },
  },
  methods: {
    handleDelete(index, row) {
      if (this.tableData.length > 1) {
        this.tableData.splice(index, 1)
      } else {
        this.$message({
          type: 'info',
          message: '已经是最后一个了,不能再删了',
        })
      }
    },
    inputChange(currentValue, oldValue) {
      if(currentValue>100){
        this.$alert('单位为万元,请仔细核对', '⚠️注意⚠️', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: `请您再次检查,您输入值的单位为万元`,
            })
          },
        })
      }
    },
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch('updateStatus', '17')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        stock: {
          desc: '',
          allMarketValue: '', // 总市值
          list: [
            {
              name: '',
              stockName: '', // 股票名称
              stockNumber: '', // 股票数量
              stockMarketValue: '', // 股票市值
            },
          ],
        },
      })
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === '1') {
        let arr = []
        this.tableData.map((item) => {
          arr.push(item.name)
          arr.push(item.stockName)
          arr.push(item.stockNumber)
          arr.push(item.stockMarketValue)
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message: '请检查持有人姓名、股票名称、持股数量、股票市值是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '19')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '19')
      } else if (this.tableStatus === '') {
        return this.$message({
          type: 'error',
          message: '请检查是否选择有无此类情况',
        })
      }
    },
    handleAddLine() {
      this.tableData.push({
        name: '',
        stockName: '', // 股票名称
        stockNumber: '', // 持股数量
        stockMarketValue: '', // 股票市值
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
