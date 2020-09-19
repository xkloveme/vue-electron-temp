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
      label="证件名称"
      width="180"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.name"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.identification"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="证件号码"
      width="180"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.number"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="发证机关"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.licensing"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="发证时间"
      width="180"
    >
      <template scope="scope">
        <el-date-picker
          v-model="scope.row.time"
          style="width:100%"
          type="date"
          value-format="timestamp"
          placeholder="选择时间"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="有效期"
      width="180"
    >
      <template scope="scope">
        <el-date-picker
          v-model="scope.row.validity"
          style="width:100%"
          type="date"
          value-format="timestamp"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="保管机构"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.custodyInstitutions"
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
      return this.$store.getters.getTravelDocuments
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
        name: '', // 证件名称
        number: '', // 证件号码
        licensing: '', // 发证机关
        time: '', // 发证时间
        validity: '', // 有效期
        custodyInstitutions: ''// 保管机构
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
