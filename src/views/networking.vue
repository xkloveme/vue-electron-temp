<template>
  <el-table
    :data="tableData"
v-show="tableStatus !== '2'"
    class="tb-edit"
    border
    style="width: 100%"
    highlight-current-row
  >
    <el-table-column
      prop="agency"
      label="操作"
      
      width="50"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <i
          style="color:#F56C6C"
          class="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="agency"
      label="本人关系"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.relationship"
          placeholder="请选择"
        >
          <el-option
            v-for="item in $utils.relationship"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="agency"
      label="姓名"
      :width="this.$attrs.hiddenOptions?'':180"
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
      prop="agency"
      label="出生年月"
      :width="this.$attrs.hiddenOptions?'':180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-date-picker
          v-model="scope.row.birth"
          style="width:150px"
          type="month"
          value-format="timestamp"
          placeholder="选择年月"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="agency"
      prop="politicsStatus"
      label="政治面貌"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.politicsStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="(item,i) in $utils.politicsStatus"
            :key="item"
            :label="item"
            :value="i"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="agency"
      prop="work"
      label="工作单位及职务"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.work"
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
      return this.$store.getters.getWorkAssessment
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
