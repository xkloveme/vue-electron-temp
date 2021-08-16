<template>
  <div>
    <el-input
      v-model.trim="other"
      type="textarea"
      :rows="20"
      maxlength="1000"
      show-word-limit
      placeholder="请输入内容"
    />
    <el-row type="flex" style="margin: 30px" justify="center" v-if="!this.$attrs.hiddenOptions">
      <el-button @click="handleGoPrevPage">上一项</el-button>
      <el-button @click="handleEmpty" type="primary">重置</el-button>
      <el-button @click="handleGoNextPage">导出</el-button>
    </el-row>
  </div>
  <!-- <el-button @click="onSubmit" type="primary">提交</el-button> -->
</template>

<script>
var JSZip = require('jszip')
// const fs = require('fs')
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
    form() {
      return this.$store.getters.getUser
    },
    id() {
      return (
        this.$formatDay(new Date(), 'YYYYMMDDHHmmss') +
        this.form.idCard.slice(-8)
      )
    },
    other: {
      get: function () {
        return this.$store.getters.getOther
      },
      set: function (newValue) {
        this.$store.dispatch('updateOther', newValue)
      },
    },
  },
  methods: {
    onSubmit() {
      // this.$emit('onSubmit')
      const self = this
      // 初始化一个zip打包对象
      var zip = new JSZip()
      this.$store.dispatch('updateUid', this.id)
      // 创建一个被用来打包的文件
      zip.file('user.json', JSON.stringify(this.form))
      if (this.form.password) {
        zip.file('password', this.form.password)
      }
      // 创建一个名为images的新的文件目录
      // var img = zip.folder('images')
      // 这个images文件目录中创建一个base64数据为imgData的图像，图像名是smile.gif
      // img.file('smile.gif', imgData, { base64: true })
      // 把打包内容异步转成blob二进制格式
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        var filename = self.form.name + self.form.idCard + '.wt'
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        // 下载内容转变成blob地址
        eleLink.href = URL.createObjectURL(content)
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      })
    },
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch('updateStatusSubtract', '21')
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch('updateUser', {
        other: '',
      })
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === '1') {
        if (!this.other) {
          return this.$message({
            type: 'error',
            message: '请检查填写内容是否有误',
          })
        }
        this.onSubmit()
        console.log(this.tableStatus)
      } else if (this.tableStatus === '2') {
        this.onSubmit()
      } else if (this.tableStatus === '') {
        return this.$message({
          type: 'error',
          message: '请检查是否选择有无此类情况',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
