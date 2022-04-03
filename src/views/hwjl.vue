<!--
 * @Author: xkloveme
 * @Date: 2022-04-03 10:38:40
 * @LastEditTime: 2022-04-03 11:08:18
 * @LastEditors: xkloveme
 * @Description: 
 * @FilePath: /wt-jw-client/src/views/hwjl.vue
 * @Copyright © xkloveme
-->
<template>
  <el-table
    :data="tableData"
    class="tb-edit"
    border
    style="width: 100%"
    highlight-current-row
  >
    <el-table-column prop="agency" label="操作">
      <template scope="scope" :width="50" v-if="!this.$attrs.hiddenOptions">
        <i
          style="color: #f56c6c"
          class="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
      <el-table-column
      prop="gx"
      label="关系"
      :width="this.$attrs.hiddenOptions ? '' : 180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.gx"
          filterable
          allow-create
          clearable
          default-first-option
          @change="changeValue($event, scope.row)"
          placeholder="请选择关系"
        >
          <el-option
            v-for="(item, index) in $utils.dwgx"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="xm"
      label="姓名"
      :width="this.$attrs.hiddenOptions ? '' : null"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input clearable v-model.trim="scope.row.xm" size="small" placeholder="请输入姓名" />
      </template>
    </el-table-column>
    <el-table-column
      prop="sfzh"
      label="身份证号"
      :width="this.$attrs.hiddenOptions ? '' : null"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input clearable v-model.trim="scope.row.sfzh" size="small" placeholder="请输入身份证号" />
      </template>
    </el-table-column>
    <el-table-column
      prop="hwjl"
      label="海外经历"
      :width="this.$attrs.hiddenOptions ? '' : 180"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-select
          v-model="scope.row.hwjl"
          filterable
          clearable
          allow-create
          default-first-option
          placeholder="请选择海外经历"
        >
          <el-option
            v-for="(item, index) in $utils.hwjl"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="qksm"
      label="情况说明"
      :width="this.$attrs.hiddenOptions ? '' : null"
    >
      <template scope="scope" v-if="!this.$attrs.hiddenOptions">
        <el-input clearable v-model.trim="scope.row.qksm" size="small" placeholder="请输入情况说明" />
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
</template>

<script>
export default {
  data() {
    return {
      uniNameList: [],
      departmentList: [],
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.getUser.haiWai;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  mounted() {
  },
  methods: {
    handleDelete(index, row) {
      if (this.tableData.length > 1) {
        this.tableData.splice(index, 1);
      } else {
        this.$message({
          type: "info",
          message: "已经是最后一个了,不能再删了",
        });
      }
    },
    changeValue(value,itemtable) {
      console.log(value, itemtable,this.user,"999");
      if(value=='本人'){
        itemtable.xm=this.user.name;
        itemtable.sfzh=this.user.idCard;
      }
    },
    handleAddLine() {
      this.tableData.push({
        gx: "", //'关系',
        xm: "", //'姓名',
        sfzh: "", //'身份证',
        hwjl: "", //'海外经历',
        qksm: "", //'情况说明',
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
