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
      <el-table-column
        prop="name"
        label="证件名称"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.name" placeholder="请选择">
            <el-option
              v-for="item in $utils.identification"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.name | filterSelect($utils.identification)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="证件号码"
        :width="this.$attrs.hiddenOptions ? 150 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.number"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="licensing" label="发证机关" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.licensing"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="发证时间"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.time"
            style="width: 100%"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.time | dateDay
        }}</template>
      </el-table-column>
      <el-table-column
        prop="validity"
        label="有效期"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.validity"
            style="width: 100%"
            type="date"
            value-format="timestamp"
            placeholder="请输入内容"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.validity | dateDay
        }}</template>
      </el-table-column>
      <el-table-column prop="custodyInstitutions" label="保管机构" :width="this.$attrs.hiddenOptions ? 200 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.custodyInstitutions"
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
import { isIdentityCard } from '../../common.js'
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
      return this.$store.getters.getTravelDocuments
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
      this.$store.dispatch('updateStatusSubtract', '4')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        travelDocuments: [
          {
            name: '', // 证件名称
            number: '', // 证件号码
            licensing: '', // 发证机关
            time: '', // 发证时间
            validity: '', // 有效期
            custodyInstitutions: '', // 保管机构
          },
        ],
      })
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === '1') {
        let arr = []
        this.tableData.map((item) => {
          arr.push(item.name)
          arr.push(item.licensing)
          arr.push(item.time)
          arr.push(item.validity)
          arr.push(item.custodyInstitutions)
          arr.push(item.number)
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message:
              '请检查证件名称、证件号码、发证机关、发证时间、有效期、保管机构是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '6')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '6')
      } else if (this.tableStatus === '') {
        return this.$message({
          type: 'error',
          message: '请检查是否选择有无此类情况',
        })
      }
    },
    handleAddLine() {
      this.tableData.push({
        name: '', // 证件名称
        number: '', // 证件号码
        licensing: '', // 发证机关
        time: '', // 发证时间
        validity: '', // 有效期
        custodyInstitutions: '', // 保管机构
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
