<template>
  <div>
    <el-table
      :data="tableData"
      v-show="tableStatus !== '2'"
      :border="!this.$attrs.hiddenOptions"
      class="tb-edit"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="操作"
        prop="agency"
        v-if="!this.$attrs.hiddenOptions"
      >
        <template scope="scope">
          <i
            @click="handleDelete(scope.$index, scope.row)"
            class="el-icon-delete"
            style="color: #f56c6c"
          />
        </template>
      </el-table-column>
      <el-table-column label="称谓" prop="title" :width="this.$attrs.hiddenOptions ? 50 : null">
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
        <template scope="scope" v-else>{{
          scope.row.title | filterSelect($utils.relationshipWithMyself)
        }}</template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" :width="this.$attrs.hiddenOptions ? 80 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.name"
          />
        </template>
      </el-table-column>
      <el-table-column label="统一社会信用代码" prop="creditCode" :width="this.$attrs.hiddenOptions ? 80 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.creditCode"
          />
        </template>
      </el-table-column>
      <el-table-column label="市场主体名称" prop="marketSubject" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.marketSubject"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="经营范围(业务范围)"
        prop="businessScope"
        :width="this.$attrs.hiddenOptions ? 80 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model.trim="scope.row.businessScope"
          />
        </template>
      </el-table-column>
      <el-table-column label="市场主体类型" prop="marketSubjectType" :width="this.$attrs.hiddenOptions ? 100 : null">
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
        <template scope="scope" v-else>{{
          scope.row.marketSubjectType | filterSelect($utils.marketEntities)
        }}</template>
      </el-table-column>
      <el-table-column label="资金数额(出资额)(万元)" prop="money" :width="this.$attrs.hiddenOptions ? 80 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            placeholder="请输入"
            size="small"
            style="width: 100%"
            v-model.trim="scope.row.money"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="个人出资额(万)"
        prop="personalContribution"
        :width="this.$attrs.hiddenOptions ? 80 : null"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            placeholder="请输入"
            size="small"
            style="width: 100%"
            v-model.trim="scope.row.personalContribution"
          />
        </template>
      </el-table-column>
      <el-table-column label="出资比例(%)" prop="fundedRatio" :width="this.$attrs.hiddenOptions ? 80 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input-number
            placeholder="请输入"
            size="small"
            style="width: 100%"
            v-model.trim="scope.row.fundedRatio"
          />
        </template>
      </el-table-column>
      <div
        @click="handleAddLine"
        slot="append"
        style="cursor: pointer; line-height: 30px; text-align: center"
        v-if="!this.$attrs.hiddenOptions"
      >
        <i class="el-icon-circle-plus-outline" />
        添加一行
      </div>
    </el-table>
    <el-row
      type="flex"
      style="margin: 30px"
      justify="center"
      v-if="!this.$attrs.hiddenOptions"
    >
      <el-button @click="handleGoPrevPage">上一项</el-button>
      <el-button @click="handleEmpty" type="primary">重置</el-button>
      <el-button @click="handleGoNextPage">下一项</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tableStatus: {
      type: String,
      default: '',
    },
  },
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
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch('updateStatusSubtract', '12')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        partnership: [
          {
            title: '', // 称谓
            name: '',
            creditCode:'', // 统一社会信用代码
            marketSubject: '', // 市场主体
            businessScope: '', // 经营范围
            marketSubjectType: '', // 市场主体类型
            money: '', // 资金数额
            personalContribution: '', // 个人出资数额
            fundedRatio: '', // 出资比例
          },
        ],
      })
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === '1') {
        let arr = []
        this.tableData.map((item) => {
          arr.push(item.title)
          arr.push(item.name)
          arr.push(item.creditCode)
          arr.push(item.marketSubject)
          arr.push(item.businessScope)
          arr.push(item.marketSubjectType)
          arr.push(item.money > 0)
          arr.push(item.personalContribution > 0)
          arr.push(item.fundedRatio > 0)
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message:
              '请检查称谓、姓名、统一社会信用代码、市场主体、经营范围、市场主体类型、资金数额、个人出资数额、出资比例是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '14')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '14')
      } else if (this.tableStatus === '') {
        return this.$message({
          type: 'error',
          message: '请检查是否选择有无此类情况',
        })
      }
    },
    handleAddLine() {
      this.tableData.push({
        title: '', // 称谓
        name: '',
        creditCode:'', // 统一社会信用代码
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
