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
      label="称谓"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.title"
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
    </el-table-column>
    <el-table-column
      label="姓名"
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
      label="市场主体名称"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.marketSubject"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="经营范围(业务范围)"
      width="180"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.businessScope"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="市场主体类型"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.marketSubjectType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.marketEntities"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="资金数额(出资额)(万元)"
      width="160"
    >
      <template scope="scope">
        <el-input-number
          v-model="scope.row.money"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="个人出资额(万)"
      width="160"
    >
      <template scope="scope">
        <el-input-number
          v-model="scope.row.personalContribution"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="出资比例(%)"
      width="160"
    >
      <template scope="scope">
        <el-input-number
          v-model="scope.row.fundedRatio"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <div
      slot="append"
      style="cursor: pointer;line-height: 30px;text-align:center;"
      @click="handleAddLine"
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
      return this.$store.getters.getPartnership
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
        title: '', // 称谓
        name: '',
        marketSubject: '', // 市场主体
        businessScope: '', // 经营范围
        marketSubjectType: '', // 市场主体类型
        money: '', // 资金数额
        personalContribution: '', // 个人出资数额
        fundedRatio: '' // 出资比例
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
