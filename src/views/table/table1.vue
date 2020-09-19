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
      v-if="!!this.$attrs.options"
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
      label="年度"
      width="180"
    >
      <template scope="scope">
        <el-date-picker
          v-model="scope.row.time"
          style="width:150px"
          type="year"
          value-format="timestamp"
          placeholder="选择年"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="考核情况"
      width="180"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.assessment"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.assessment"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="agency"
      label="发文机关"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.agency"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="symbol"
      label="文号"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.symbol"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="agency"
      label="备注"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.desc"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <div
      slot="append"
      style="cursor: pointer;line-height: 30px;text-align:center;"
      @click="handleAddLine"
      v-if="!!this.$attrs.options"
    >
      <i class="el-icon-circle-plus-outline" />
      添加一行
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
      return this.$store.getters.getWorkAssessment
    }
  },
  methods: {
    // handleCurrentChange (row, event, column) {
    //   console.log(row, event, column, event.currentTarget)
    // },
    // handleEdit (index, row) {
    //   console.log(index, row)
    // },
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
        time: '', // 年度
        assessment: '', // 考核情况
        agency: '', // 发文机关
        symbol: '', // 文号
        desc: ''// 备注
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
