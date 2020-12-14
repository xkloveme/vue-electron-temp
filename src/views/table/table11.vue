<template>
  <div>
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
        v-if="!this.$attrs.hiddenOptions"
        width="50"
      >
        <template scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="familiesType" label="称谓">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.title" placeholder="请选择">
            <el-option
              v-for="item in $utils.familiesType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.title | filterSelect($utils.familiesType)
        }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.name"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="被追究时间"
        :width="this.$attrs.hiddenOptions ? '' : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model="scope.row.time"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.time | dateMonth
        }}</template>
      </el-table-column>
      <el-table-column
        prop="reasons"
        label="被追究刑事责任原因"
        :width="this.$attrs.hiddenOptions ? '' : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.reasons"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="处理阶段">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select v-model="scope.row.status" placeholder="请选择">
            <el-option
              v-for="item in $utils.punishStage"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.status | filterSelect($utils.punishStage)
        }}</template>
      </el-table-column>
      <el-table-column prop="result" label="处理结果">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.result"
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
    <el-row type="flex" style="margin: 30px" justify="center">
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
      return this.$store.getters.getCriminal
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
      this.$store.dispatch('updateStatus', '10')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        criminal: [
          {
            title: '', // 称谓
            name: '', // 姓名
            time: '', // 被追究时间
            reasons: '', // 被追究责任原因
            status: '', // 处理阶段
            result: '', // 处理结果
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
          arr.push(item.time)
          arr.push(item.reasons)
          arr.push(item.status)
          arr.push(item.result)
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message:
              '请检查称谓、姓名、被追究时间、被追究责任原因、处理阶段、处理结果是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '12')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '12')
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
        time: '', // 被追究时间
        reasons: '', // 被追究责任原因
        status: '', // 处理阶段
        result: '', // 处理结果
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
