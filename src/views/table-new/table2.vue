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
      prop="people"
      label="产权人姓名"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.people"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <!-- <el-table-column
      prop="agency"
      label="与本人关系"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.relationship"
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
    </el-table-column> -->
    <el-table-column
      prop="source"
      label="房产来源(去向)"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.source"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.houseProperty"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.source | filterSelect($utils.houseProperty)}}</template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="具体地址"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.address"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="area"
      label="建筑面积(m²)"
      width="160"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          v-model="scope.row.area"
          size="small"
          style="width:100%"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="propertyNature"
      label="房产性质和功能类型"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.propertyNature"
          clearable
          style="width:100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.propertyRight"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.propertyNature | filterSelect($utils.propertyRight)}}</template>
    </el-table-column>
    <el-table-column
      prop="transactionTime"
      label="交易时间"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-date-picker
          v-model="scope.row.transactionTime"
          style="width:150px"
          type="month"
          value-format="timestamp"
          placeholder="选择时间"
        />
      </template>
      <template scope="scope" v-else>{{scope.row.transactionTime | dateMonth}}</template>
    </el-table-column>
    <el-table-column
      prop="transactionPrice"
      label="交易价格(万元)"
      width="160"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          v-model="scope.row.transactionPrice"
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
      v-if="!this.$attrs.hiddenOptions"
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
      return this.$store.getters.getNotRushEstate
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
        people: '', // 产权人
        relationship: '', // 与本人关系
        source: '', // 房产来源
        address: '', // 具体地址
        area: '', // 建筑面积
        propertyNature: '', // 产权性质
        transactionTime: '', // 交易时间
        transactionPrice: '' // 交易价格
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
