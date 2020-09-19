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
      label="品牌型号"
      width="180"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.brand"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="购买时间"
      width="180"
    >
      <template scope="scope">
        <el-date-picker
          v-model="scope.row.time"
          style="width:150px"
          type="date"
          value-format="timestamp"
          placeholder="选择时间"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="价格(万元)"
    >
      <template scope="scope">
        <el-input-number
          v-model="scope.row.price"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="车牌号码"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.carNumber"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="颜色"
    >
      <template scope="scope">
        <el-input
          v-model="scope.row.color"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
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
      return this.$store.getters.getCar
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
        brand: '', // 品牌
        time: '', // 购买时间
        price: '', // 价格
        carNumber: '', // 车牌号
        color: '',
        desc: '' // 备注
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
