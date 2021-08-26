<template>
  <div>
    <el-table
      :data="tableData"
      v-show="tableStatus !== '2'"
      class="tb-edit"
      :border="!this.$attrs.hiddenOptions"
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="操作" v-if="!this.$attrs.hiddenOptions" :width="80">
        <template scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="称谓" :width="this.$attrs.hiddenOptions ? 50 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.title" placeholder="请选择">
            <el-option
              v-for="item in $utils.familiesType10"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.title | filterSelect($utils.familiesType10)
        }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" :width="this.$attrs.hiddenOptions ? 50 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.name"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="isLife" label="是否共同生活" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.isLife" placeholder="请选择">
            <el-option
              v-for="item in $utils.livingTogether"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.isLife | filterSelect($utils.livingTogether)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="work"
        label="工作、学习单位"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.work"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="duty" label="现任职务" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.duty"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="unitNature" label="单位性质" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.unitNature" placeholder="请选择">
            <el-option
              v-for="item in $utils.unitProperties"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.unitNature | filterSelect($utils.unitProperties)
        }}</template>
      </el-table-column>
      <el-table-column prop="cardName" label="证件名称" :width="this.$attrs.hiddenOptions ? 80 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.cardName" placeholder="请选择">
            <el-option
              v-for="item in $utils.identification10"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.cardName | filterSelect($utils.identification10)
        }}</template>
      </el-table-column>
      <el-table-column prop="card" label="证件号码" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.card"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <div
        slot="append"
        style="cursor: pointer; line-height: 30px; text-align: center"
        @click="handleAddLine"
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
import { isIdentityCard } from '@/common.js'
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
      return this.$store.getters.getPractice
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
      this.$store.dispatch('updateStatusSubtract', '9')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        practice: [
          {
            title: '', // 称谓
            name: '', // 姓名
            isLife: '', // 是否共同生活
            work: '', // 工作单位
            duty: '', // 现在职务
            unitNature: '', // 单位性质
            cardName: '', // 证件名称
            card: '', // 证件号码
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
          arr.push(item.isLife)
          arr.push(item.work)
          arr.push(item.duty)
          arr.push(item.unitNature)
          arr.push(item.cardName)
          if (item.cardName === '01') {
            arr.push(isIdentityCard(item.card))
          } else {
            arr.push(item.card)
          }
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message:
              '请检查称谓、姓名、是否共同生活、工作单位、现在职务、单位性质、证件名称、证件号码是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '11')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '11')
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
        name: '', // 姓名
        isLife: '', // 是否共同生活
        work: '', // 工作单位
        duty: '', // 现在职务
        unitNature: '', // 单位性质
        cardName: '', // 证件名称
        card: '', // 证件号码
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
