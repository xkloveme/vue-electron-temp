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
      prop="relationship"
      label="与本人关系"
      width="180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.relationship"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in list"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.relationship | filterSelect(list)}}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180"
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
      prop="idCard"
      label="身份证号"
      width="180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.idCard"
          size="small"
          placeholder="请输入内容"
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="politicsStatus"
      label="政治面貌"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.politicsStatus"
          style="width:100%"
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
      <template scope="scope" v-else>{{scope.row.politicsStatus | filterSelect($utils.politicsStatus)}}</template>
    </el-table-column>
    <el-table-column
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
    <el-table-column
      prop="phone"
      label="联系电话"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input
          v-model="scope.row.phone"
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
      return this.$store.getters.getNetworking
    },
    list () {
      if (this.$store.getters.getUser.gender === '2') {
        return this.$utils.womenRelationship
      } else {
        return this.$utils.manRelationship
      }
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
        relationship: '', // 本人关系
        name: '',
        politicsStatus: '', // 政治面貌
        phone: '',
        work: '',
        idCard: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
