<template>
  <el-table
    :data="tableData"
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
      <template scope="scope" >
        <i
          style="color:#F56C6C"
          class="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="持有人姓名"
      width="180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.name"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="fundName"
      label="基金名称或代码"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.fundName"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="fundNumber"
      label="基金份额"
      width="180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          v-model="scope.row.fundNumber"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="fundMarketValue"
      label="填报前一交易日净值（万元）"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          v-model="scope.row.fundMarketValue"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <div
      slot="append"
      v-if="!this.$attrs.hiddenOptions"
      style="cursor: pointer;line-height: 30px;"
    >
      <div style="text-align:right;border-bottom:1px solid #ebeef5;padding:5px">
        填报前一交易日所有基金的总净值（万元）
        <el-input-number
          v-model="allMarketValue"
          size="small"
          style="width:400px"
          placeholder="请输入内容"
        />
      </div>
      <div
        style="text-align:center;"
        @click="handleAddLine"
      v-if="!this.$attrs.hiddenOptions"
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
      return this.$store.getters.getFund.list
    },
    allMarketValue: {
      get: function () {
        return this.$store.getters.getFund.allMarketValue
      },
      set: function (newValue) {
        this.$store.dispatch('updateFundAllMarketValue', newValue)
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
        fundName: '', // 基金名称
        fundNumber: '', // 基金数量
        fundMarketValue: ''// 基金市值
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
