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
      <el-table-column
        prop="agency"
        label="操作"
        v-if="!this.$attrs.hiddenOptions"
      >
        <template scope="scope">
          <i
            style="color: #f56c6c"
            class="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="起止日期(起)"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.startTime"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.startTime | dateDay
        }}</template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="起止日期(止)"
        :width="this.$attrs.hiddenOptions ? 100 : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-date-picker
            v-model.trim="scope.row.endTime"
            style="width: 150px"
            type="date"
            value-format="timestamp"
            placeholder="选择时间"
          />
        </template>
        <template scope="scope" v-else>{{
          scope.row.endTime | dateDay
        }}</template>
      </el-table-column>
      <el-table-column prop="country" label="所到国家(地区)" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.country"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="reasons" label="出国(境)事由" :width="this.$attrs.hiddenOptions ? 150 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.reasons"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="approvalAuthority" label="审批机构" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.approvalAuthority"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="agency" label="委托代办机构" :width="this.$attrs.hiddenOptions ? 100 : null">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model.trim="scope.row.agency"
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
      return this.$store.getters.getTravelAbroad
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
      this.$store.dispatch('updateStatus', '5')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        travelAbroad: [
          {
            startTime: '',
            endTime: '',
            country: '',
            reasons: '', // 出国事由
            approvalAuthority: '', // 审批机构
            agency: '', // 代办机构
          },
        ],
      })
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === '1') {
        let arr = []
        this.tableData.map((item) => {
          arr.push(item.startTime)
          arr.push(item.endTime)
          arr.push(item.country)
          arr.push(item.reasons)
          arr.push(item.approvalAuthority)
          arr.push(item.agency)
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message:
              '请检查日期、所到国家、出境事由、审批机构、委托代办机构是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '7')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '7')
      } else if (this.tableStatus === '') {
        return this.$message({
          type: 'error',
          message: '请检查是否选择有无此类情况',
        })
      }
    },
    handleAddLine() {
      this.tableData.push({
        startTime: '',
        endTime: '',
        country: '',
        reasons: '', // 出国事由
        approvalAuthority: '', // 审批机构
        agency: '', // 代办机构
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
