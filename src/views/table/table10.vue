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
      label="称谓"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.title"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.familiesType10"
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
      label="是否共同生活"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.isLife"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.livingTogether"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="工作、学习单位"
      width="180"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.work"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="现任职务"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.duty"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="单位性质"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.unitNature"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.unitProperties"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="证件名称"
    >
      <template scope="scope">
        <el-select
          v-model="scope.row.cardName"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.identification10"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="证件号码"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.card"
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
      return this.$store.getters.getPractice
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
        name: '', // 姓名
        IsLife: '', // 是否共同生活
        work: '', // 工作单位
        duty: '', // 现在职务
        UnitNature: '', // 单位性质
        cardName: '', // 证件名称
        card: '' // 证件号码
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
