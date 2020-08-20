<template>
  <el-table
    :data="tableData"
    class="tb-edit"
    border
    style="width: 100%"
    highlight-current-row
  >
    <el-table-column
      label="操作"
      width="50"
    >
      <template scope="scope">
        <i
          style="color:#F56C6C"
          class="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="持有人姓名"
      width="180"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.name"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="organization"
      label="股票名称或代码"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.stockName"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="持股数量"
      width="180"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.stockNumber"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="填报前一交易日市值（万元）"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.stockMarketValue"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <div
      slot="append"
      style="cursor: pointer;line-height: 30px;"
    >
      <div style="text-align:right;border-bottom:1px solid #ebeef5;padding:5px">
        填报前一交易日所有股票的总市值（万元）
        <el-input
          v-model="allMarketValue"
          size="small"
          style="width:400px"
          placeholder="请输入内容"
        />
      </div>
      <div style="text-align:right;border-bottom:1px solid #ebeef5;padding:5px">
        备注
        <el-input
          v-model="desc"
          size="small"
          style="width:400px"
          placeholder="请输入内容"
        />
      </div>
      <div
        style="text-align:center;"
        @click="handleAddLine"
      >
        <i class="el-icon-circle-plus-outline" />
        添加一行
      </div>
    </div>
  </el-table>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    tableData () {
      return this.$store.getters.getStock.list
    },
    allMarketValue: {
      get: function () {
        return this.$store.getters.getStock.allMarketValue
      },
      set: function (newValue) {
        this.$store.dispatch('updateStockAllMarketValue', newValue)
      }
    },
    desc: {
      get: function () {
        return this.$store.getters.getStock.desc
      },
      set: function (newValue) {
        this.$store.dispatch('updateStockDesc', newValue)
      }
    }
  },
  methods: {
    handleDelete (index, row) {
      if (this.tableData.length > 1) {
        this.tableData.splice(index, 1)
      } else {
        this.$message({
          type: 'info',
          message: '已经是最后一个了,不能再删了'
        })
      }
    },
    handleAddLine () {
      this.tableData.push({
        name: '',
        stockName: '', // 股票名称
        stockNumber: '', // 股票名称
        stockMarketValue: ''// 股票市值
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
