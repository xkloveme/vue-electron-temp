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
      <el-table-column
        prop="relationship"
        label="与本人关系"
        :width="this.$attrs.hiddenOptions ? '' : 180"
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
        <template scope="scope" v-else>{{
          scope.row.relationship | filterSelect(list)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        :width="this.$attrs.hiddenOptions ? '' : 180"
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
        :width="this.$attrs.hiddenOptions ? '' : 180"
      >
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.idCard"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="politicsStatus" label="政治面貌">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-select
            v-model="scope.row.politicsStatus"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, i) in $utils.politicsStatus"
              :key="item"
              :label="item"
              :value="i"
            />
          </el-select>
        </template>
        <template scope="scope" v-else>{{
          scope.row.politicsStatus | filterSelect($utils.politicsStatus)
        }}</template>
      </el-table-column>
      <el-table-column prop="work" label="工作单位及职务">
        <template scope="scope" v-if="!this.$attrs.hiddenOptions">
          <el-input
            v-model="scope.row.work"
            size="small"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话">
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
        style="cursor: pointer; line-height: 30px; text-align: center"
        @click="handleAddLine"
        v-if="!this.$attrs.hiddenOptions"
      >
        <i class="el-icon-circle-plus-outline" />
        添加一行
      </div>
    </el-table>
    <el-row type="flex" style="margin: 30px" justify="center" v-if="!this.$attrs.hiddenOptions">
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
      return this.$store.getters.getNetworking
    },
    list() {
      if (this.$store.getters.getUser.gender === '2') {
        return this.$utils.womenRelationship
      } else {
        return this.$utils.manRelationship
      }
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
      this.$store.dispatch('updateStatus', '20')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        networking: [
          {
            relationship: '', // 本人关系
            name: '',
            politicsStatus: '', // 政治面貌
            phone: '',
            work: '',
            idCard: '',
          },
        ],
      })
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === '1') {
        let arr = []
        this.tableData.map((item) => {
          arr.push(item.relationship)
          arr.push(item.name)
          arr.push(item.politicsStatus)
          arr.push(item.phone)
          arr.push(item.work)
          arr.push(isIdentityCard(item.idCard))
        })
        if (!arr.every((x) => x)) {
          return this.$message({
            type: 'error',
            message: '请检查与本人关系、姓名、身份证号、政治面貌、工作单位及职务、联系电话是否有误',
          })
        }
        this.$store.dispatch('updateStatus', '22')
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.$store.dispatch('updateStatus', '22')
      } else if (this.tableStatus === '') {
        return this.$message({
          type: 'error',
          message: '请检查是否选择有无此类情况',
        })
      }
    },
    handleAddLine() {
      this.tableData.push({
        relationship: '', // 本人关系
        name: '',
        politicsStatus: '', // 政治面貌
        phone: '',
        work: '',
        idCard: '',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
