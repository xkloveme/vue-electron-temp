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
        prop="name"
        label="持有人姓名"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.name"
            size="small"
            placeholder="请输入内容"
          />
        </template>
         <template scope="scope" v-else>
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fundName" label="基金名称或代码" :width="this.$attrs.hiddenOptions ? 200 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.fundName"
            size="small"
            placeholder="请输入内容"
          />
        </template>
         <template scope="scope" v-else>
          <span >{{ scope.row.fundName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fundNumber"
        label="基金份额"
        :width="this.$attrs.hiddenOptions ? 200 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.fundNumber"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
         <template scope="scope" v-else>
          <span >{{ scope.row.fundNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fundMarketValue"
        label="填报前一交易日净值（万元）"
        :width="this.$attrs.hiddenOptions ? 200 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            v-model.trim="scope.row.fundMarketValue"
            @change="inputChange"
            size="small"
            style="width: 100%"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" v-else>
        <span >{{scope.row.fundMarketValue}}</span>
        </template>
      </el-table-column>
      <div
        slot="append"
        style="cursor: pointer; line-height: 30px"
      >
        <div
          style="
            text-align: right;
            border-bottom: 1px solid #ebeef5;
            padding: 5px;
          "
        >
          填报前一交易日所有基金的总净值（万元）
          <el-input-number
            v-model.trim="allMarketValue"
            v-if="!this.$attrs.hiddenOptions"
            size="small"
            @change="inputChange"
            style="width: 400px"
            placeholder="请输入内容"
          />
           <span v-else>{{allMarketValue}}</span>
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
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    tableData() {
      return this.$store.getters.getFund.list
    },
    allMarketValue: {
      get: function () {
        return this.$store.getters.getFund.allMarketValue
      },
      set: function (newValue) {
        this.$store.dispatch('updateFundAllMarketValue', newValue)
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
      if (currentValue > 100) {
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
      this.$store.dispatch('updateStatus', '18')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        fund: {
          allMarketValue: '', // 总市值
          list: [
            {
              name: '',
              fundName: '', // 基金名称
              fundNumber: '', // 基金数量
              fundMarketValue: '', // 基金市值
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
          arr.push(item.fundName)
          arr.push(item.fundNumber > 0)
          arr.push(item.fundMarketValue > 0)
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message: '请检查持有人姓名、基金名称、基金数量、基金市值是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '20')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '20')
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
        fundName: '', // 基金名称
        fundNumber: '', // 基金数量
        fundMarketValue: '', // 基金市值
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
