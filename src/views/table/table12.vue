<template>
  <el-table :data="tableData" border class="tb-edit" highlight-current-row style="width: 100%">
    <el-table-column label="操作" width="50">
      <template scope="scope">
        <i
          @click="handleDelete(scope.$index, scope.row)"
          class="el-icon-delete"
          style="color:#F56C6C"
        />
      </template>
    </el-table-column>
    <el-table-column label="产权人" width="180">
      <template scope="scope">
        <el-input placeholder="请输入内容" size="small" v-model="scope.row.people" />
      </template>
    </el-table-column>
    <el-table-column label="与本人关系">
      <template scope="scope">
        <el-select placeholder="请选择" v-model="scope.row.relationship">
          <el-option
            :key="item.key"
            :label="item.value"
            :value="item.key"
            v-for="item in $utils.relationshipWithMyself"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="房产来源(去向)" prop="organization">
      <template scope="scope">
        <el-select placeholder="请选择" v-model="scope.row.source">
          <el-option
            :key="item.key"
            :label="item.value"
            :value="item.key"
            v-for="item in $utils.houseProperty"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="具体地址" width="180">
      <template scope="scope">
        <el-input placeholder="请输入内容" size="small" v-model="scope.row.address" />
      </template>
    </el-table-column>
    <el-table-column label="建筑面积(m²)" width="160">
      <template scope="scope">
        <el-input-number  style="width:100%" placeholder="请输入" size="small" v-model="scope.row.area" />
      </template>
    </el-table-column>
    <el-table-column label="产权性质">
      <template scope="scope">
        <el-select placeholder="请选择" v-model="scope.row.propertyNature">
          <el-option
            :key="item.key"
            :label="item.value"
            :value="item.key"
            v-for="item in $utils.propertyRight"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="交易时间" width="180">
      <template scope="scope">
        <el-date-picker
          placeholder="选择时间"
          style="width:150px"
          type="date"
          v-model="scope.row.transactionTime"
          value-format="timestamp"
        />
      </template>
    </el-table-column>
    <el-table-column label="交易价格(万)" width="160">
      <template scope="scope">
        <el-input-number
          placeholder="请输入"
          size="small"
          style="width:100%"
          v-model="scope.row.transactionPrice"
        />
      </template>
    </el-table-column>
    <div
      @click="handleAddLine"
      slot="append"
      style="cursor: pointer;line-height: 30px;text-align:center;"
    >
      <i class="el-icon-circle-plus-outline" />
      添加一行
    </div>
  </el-table>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    tableData() {
      return this.$store.getters.getRecommendation
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
    handleAddLine() {
      this.tableData.push({
        people: '', // 产权人
        relationship: '', // 与本人关系
        source: '', // 房产来源
        address: '', // 具体地址
        area: '', // 建筑面积
        propertyNature: '', // 产权性质
        transactionTime: '', // 交易时间
        transactionPrice: '', // 交易价格
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
