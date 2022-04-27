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
    <el-row
      type="flex"
      style="margin: 30px; flex-direction: column; align-items: center"
      justify="center"
      v-if="!this.$attrs.hiddenOptions"
    >
      <h1>本人承诺</h1>
      <div style="color: red">
        每项表格下方的填表说明，本人已认真阅读并按要求填报。所填相关内容已与配偶、子女进行认真核实。我郑重承诺，以上所填内容真实、准确、完整，如有存在瞒报、漏报、虚报情形，自愿接受组织审查和处理。
      </div>
      <el-checkbox v-model="checked">我已知晓,并同意</el-checkbox>
    </el-row>

    <el-row
      type="flex"
      style="margin: 30px"
      justify="center"
      v-if="!this.$attrs.hiddenOptions"
    >
      <el-button @click="goPdf">打印预览</el-button>
      <el-button @click="handleGoPrevPage">上一项</el-button>
      <el-button @click="handleEmpty" type="primary">重置</el-button>
      <el-button @click="handleGoNextPage">导出</el-button>
    </el-row>
  </div>
  <!-- <el-button @click="onSubmit" type="primary">提交</el-button> -->
</template>

<script>
var JSZip = require("jszip");
// const fs = require('fs')
export default {
  props: {
    tableStatus: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    form() {
      return this.$store.getters.getUser;
    },
    id() {
      return this.$formatDay(new Date(), "YYYYMMDDHHmmss") + this.form.idCard.slice(-8);
    },
    other: {
      get: function () {
        return this.$store.getters.getOther;
      },
      set: function (newValue) {
        this.$store.dispatch("updateOther", newValue);
      },
    },
  },
  // 监听 tableData
  watch: {
    checked: {
      handler(val) {
        if (val) {
          this.$store.dispatch("updateStatus", "table22");
        } else {
          this.$store.commit("setcheckStatusDisabled", "table22");
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit("setcheckStatusDisabled", "table22");
  },
  methods: {
    goPdf() {
      // const { href } = this.$router.resolve({
      //   name: 'Pdf',
      // })
      // window.open(href, '_blank')
      this.$router.push({ name: "Pdf" });
    },
    onSubmit() {
      if (!this.checked) {
        return this.$message({
          type: "error",
          message: "请勾选本人承诺",
        });
      }
      if (
        Object.values(this.form.checkStatus).length < 23 ||
        !Object.values(this.form.checkStatus).every((x) => x)
      ) {
        return this.$message({
          type: "error",
          message: "请检查是否全部表填写完整",
        });
      }

      // this.$emit('onSubmit')
      const self = this;
      // 初始化一个zip打包对象
      var zip = new JSZip();
      this.$store.dispatch("updateUid", this.id);
      this.$store.dispatch("updateVersion", this.$version);
      // 创建一个被用来打包的文件
      zip.file("user.json", JSON.stringify(this.form));
      if (this.form.password) {
        zip.file("password", this.form.password);
      }
      // 创建一个名为images的新的文件目录
      // var img = zip.folder('images')
      // 这个images文件目录中创建一个base64数据为imgData的图像，图像名是smile.gif
      // img.file('smile.gif', imgData, { base64: true })
      // 把打包内容异步转成blob二进制格式
      zip.generateAsync({ type: "blob" }).then(function (content) {
        var filename = self.form.name + self.form.idCard + ".wt";
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";
        // 下载内容转变成blob地址
        eleLink.href = URL.createObjectURL(content);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
        localStorage.clear();
      });
    },
    // 上一项
    handleGoPrevPage() {
      this.$store.dispatch("updateStatusSubtract", "21");
    },
    // 清空
    handleEmpty() {
      this.$store.dispatch("updateUser", {
        other: "",
      });
    },
    // 下一项
    handleGoNextPage() {
      if (this.tableStatus === "1") {
        if (!this.other) {
          return this.$message({
            type: "error",
            message: "请检查填写内容是否有误",
          });
        }
        this.onSubmit();
        console.log(this.tableStatus);
      } else if (this.tableStatus === "2") {
        this.onSubmit();
      } else if (this.tableStatus === "") {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
