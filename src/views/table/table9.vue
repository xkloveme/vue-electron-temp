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
      prop="title"
      label="称谓"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.title"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.familiesType"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.title | filterSelect($utils.familiesType)}}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
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
      prop="country"
      :width="this.$attrs.hiddenOptions?'':180"
      label="移居国家(地区)"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.country"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="city"
      label="现居住城市"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.city"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="card"
      :width="this.$attrs.hiddenOptions?'':180"
      label="移居国家证件号码"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.card"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="移居类别"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.migrate"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.type | filterSelect($utils.migrate)}}</template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="移居时间"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-date-picker
          v-model="scope.row.time"
          style="width:150px"
          type="date"
          value-format="timestamp"
          placeholder="选择时间"
        />
      </template>
      <template scope="scope" v-else>{{scope.row.time | dateMonth}}</template>
    </el-table-column>
    <el-table-column
      prop="desc"
      label="备注"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
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
      return this.$store.getters.getChildMoved
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
        country: '', // 移居国家
        city: '', // 居住城市
        card: '', // 移居国家证件号码
        time: '', // 移居时间
        desc: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
