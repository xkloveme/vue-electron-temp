<template>
  <el-table :data="tableData" border class="tb-edit" highlight-current-row style="width: 100%">
    <el-table-column label="操作" prop="agency" v-if="!this.$attrs.hiddenOptions" width="50">
      <template scope="scope">
        <i
          @click="handleDelete(scope.$index, scope.row)"
          class="el-icon-delete"
          style="color:#F56C6C"
        />
      </template>
    </el-table-column>
    <el-table-column label="称谓" prop="title">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select placeholder="请选择" v-model="scope.row.title">
          <el-option
            :key="item.key"
            :label="item.value"
            :value="item.key"
            v-for="item in $utils.relationshipWithMyself"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.title | filterSelect($utils.relationshipWithMyself)}}</template>
    </el-table-column>
    <el-table-column label="姓名" prop="name">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input placeholder="请输入内容" size="small" v-model="scope.row.name" />
      </template>
    </el-table-column>
    <el-table-column label="市场主体名称" prop="marketSubject">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input placeholder="请输入内容" size="small" v-model="scope.row.marketSubject" />
      </template>
    </el-table-column>
    <el-table-column label="经营范围(业务范围)" prop="businessScope" :width="this.$attrs.hiddenOptions?'':180">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input placeholder="请输入内容" size="small" v-model="scope.row.businessScope" />
      </template>
    </el-table-column>
    <el-table-column label="市场主体类型" prop="marketSubjectType">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select placeholder="请选择" v-model="scope.row.marketSubjectType">
          <el-option
            :key="item.key"
            :label="item.value"
            :value="item.key"
            v-for="item in $utils.marketEntities"
          />
        </el-select>
      </template>
      <template scope="scope" v-else>{{scope.row.marketSubjectType | filterSelect($utils.marketEntities)}}</template>
    </el-table-column>
    <el-table-column label="资金数额(出资额)(万元)" prop="money" width="160">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          placeholder="请输入"
          size="small"
          style="width:100%"
          v-model="scope.row.money"
        />
      </template>
    </el-table-column>
    <el-table-column label="个人出资额(万)" prop="personalContribution" width="160">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          placeholder="请输入"
          size="small"
          style="width:100%"
          v-model="scope.row.personalContribution"
        />
      </template>
    </el-table-column>
    <el-table-column label="出资比例(%)" prop="fundedRatio" width="160">
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input-number
          placeholder="请输入"
          size="small"
          style="width:100%"
          v-model="scope.row.fundedRatio"
        />
      </template>
    </el-table-column>
    <div
      @click="handleAddLine"
      slot="append"
      style="cursor: pointer;line-height: 30px;text-align:center;"
      v-if="!this.$attrs.hiddenOptions"
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
      return this.$store.getters.getPartnership
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
        title: '', // 称谓
        name: '',
        marketSubject: '', // 市场主体
        businessScope: '', // 经营范围
        marketSubjectType: '', // 市场主体类型
        money: '', // 资金数额
        personalContribution: '', // 个人出资数额
        fundedRatio: '', // 出资比例
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
