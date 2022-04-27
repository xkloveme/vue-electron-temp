<template>
  <div id="pdf-path" style="text-align: center">
    <h2>
      报告人基本情况
      <el-tooltip
        class="item"
        content="说明：①工作年限以年为单位。②身份证号码应填写18位公民身份号码。③领导岗位填分管工作，非领导岗位填从事的主要工作。④海外情况包括港澳台"
        effect="dark"
      >
        <i class="el-icon-question" />
      </el-tooltip>
    </h2>
    <div>
      <el-form :model="form" :rules="rules" label-width="120px" ref="form">
        <el-row :gutter="0">
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="gender">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                v-model.trim="form.gender"
              >
                <el-option
                  :key="item"
                  :label="item"
                  :value="i"
                  v-for="(item, i) in $utils.gender"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="民族">
              <el-select placeholder="请选择" v-model="form.nation">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in $utils.nation"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌" prop="politicsStatus">
              <el-select placeholder="请选择" v-model="form.politicsStatus">
                <el-option
                  :key="item"
                  :label="item"
                  :value="i"
                  v-for="(item, i) in $utils.politicsStatus"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model.trim="form.idCard" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model.trim="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="从事或分管工作">
              <el-input v-model.trim="form.work" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="全日制学历">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                style="width: 100%"
                v-model.trim="form.fullTimeEducation"
              >
                <el-option
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                  v-for="item in $utils.education"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在职学历">
              <el-select
                clearable
                filterable
                placeholder="请选择"
                style="width: 100%"
                v-model.trim="form.onTimeEducation"
              >
                <el-option
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                  v-for="item in $utils.education"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-col :span="12">
              <el-form-item label="工作单位" prop="employer">
                <el-select
                  @change="handleChangeNeedCommunity"
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.employer"
                >
                  <el-option
                    v-for="(item, index) in uniNameList"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科室/村社" label-width="120px" prop="community">
                <el-select
                  clearable
                  filterable
                  allow-create
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.community"
                >
                  <el-option
                    v-for="(item, index) in obj[form.employer]"
                    :key="index"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="现任职务">
                <el-input v-model.trim="form.duty" />
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="现任职务">
                <el-input v-model.trim="form.duty" />
              </el-form-item>
              <!-- <el-form-item label="工作部门">
                <el-input v-model.trim="form.department" />
              </el-form-item> -->
              <el-form-item label="入党时间">
                <el-date-picker
                  placeholder="选择年月"
                  style="width: 100%"
                  type="month"
                  v-model.trim="form.partyTime"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="在职状态" prop="workingStatus">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.workingStatus"
                >
                  <el-option
                    :key="item"
                    :label="item"
                    :value="i"
                    v-for="(item, i) in $utils.workingStatus"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="本岗位工作年限(年)" prop="workingYears">
                <el-input placeholder="本岗位工作年限(年)" v-model.trim="form.workingYears" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职级" prop="grade">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.grade"
                >
                  <el-option
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                    v-for="item in $utils.grade"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位" prop="position">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.position"
                >
                  <el-option
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                    v-for="item in $utils.position"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人员来源" prop="personnelSource">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.personnelSource"
                >
                  <el-option
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                    v-for="item in $utils.personnelSource"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对象身份" prop="objectIdentity">
                <el-select
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                  v-model.trim="form.objectIdentity"
                >
                  <el-option
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                    v-for="item in $utils.objectIdentity"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="人员身份" prop="identity">
                <el-checkbox-group @change="handleChange" v-model.trim="form.identity">
                  <el-checkbox
                    :disabled="item.disabled"
                    :key="i + 1"
                    :label="item.value"
                    v-for="(item, i) in identityList"
                  />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="4">
            <input
              @change="handleAvatarSuccess"
              accept="image/*"
              ref="input"
              style="display: none"
              type="file"
            />
            <div @click="$refs.input.click()" class="avatar-uploader">
              <el-image
                :src="form.imageUrl"
                @click="$refs.input.click()"
                class="avatar"
                fit="fit"
                v-if="form.imageUrl"
              >
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
              <i @click="$refs.input.click()" class="el-icon-plus" v-else />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="户籍地址">
              <el-input v-model.trim="form.householdRegistration" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在支部">
              <el-input v-model.trim="form.branch" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="现居住地">
          <el-input v-model.trim="form.currentResidence" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input
                :type="passType ? 'password' : 'text'"
                autocomplete="off"
                v-model.trim="form.password"
              >
                <el-button
                  @click="passType = !passType"
                  icon="el-icon-view"
                  slot="append"
                />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input
                :type="checkPassType ? 'password' : 'text'"
                autocomplete="off"
                v-model.trim="form.checkPassword"
              >
                <el-button
                  @click="checkPassType = !checkPassType"
                  icon="el-icon-view"
                  slot="append"
                />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="个人简历">
          <el-input
            :autosize="{ minRows: 4, maxRows: 6 }"
            type="textarea"
            v-model="form.personalResume"
          />
        </el-form-item> -->
        <el-form-item label="拥有海外经历" prop="hwjl">
          <hwjl :hiddenOptions="false" />
        </el-form-item>
        <el-form-item label="工作简历" prop="resume">
          <resume :hiddenOptions="false" />
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">打印预览</el-button>
          <el-button @click="handleGoNextPage">下一项</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import resume from "./resume";
import hwjl from "./hwjl";
import { isIdentityCard, isLicensePlate } from "./../common.js";
var JSZip = require("jszip");
const fs = require("fs");
export default {
  components: { resume, hwjl },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passType: true,
      checkPassType: true,
      disabled: false,
      needCommunity: false,
      communityType: [],
      obj: {},
      uniNameList: [],
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        employer: [{ required: true, message: "请填写工作单位", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "change" }],
        politicsStatus: [
          { required: true, message: "请选择政治面貌", trigger: "change" },
        ],
        idCard: [
          { required: true, message: "请填写身份证号", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
          {
            pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: "请填写正确的联系电话",
            trigger: "blur",
          },
        ],
        community: [{ required: true, message: "请选择村(社区)", trigger: "change" }],
        workingStatus: [{ required: true, message: "请选择在职状态", trigger: "change" }],
        grade: [{ required: true, message: "请选择职级", trigger: "change" }],
        position: [{ required: true, message: "请选择职级", trigger: "change" }],
        personnelSource: [
          { required: true, message: "请选择人员来源", trigger: "change" },
        ],
        objectIdentity: [
          { required: true, message: "请选择对象身份", trigger: "change" },
        ],
        identity: [{ required: true, message: "请选择人员身份", trigger: "blur" }],
        workingYears: [
          {
            pattern: /^[0-9]?\d+(\.\d{1,3})?$/,
            message: "请填写正确的工作年限",
            trigger: "blur",
          },
        ],
        resume: [{ required: true }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {
    form() {
      return this.$store.getters.getUser;
    },
    id() {
      return this.$formatDay(new Date(), "YYYYMMDDHHmmss") + this.form.idCard.slice(-8);
    },
    tableStatus() {
      return this.$store.getters.getTableStatus;
    },
    getResume() {
      return this.$store.getters.getResume;
    },
    identityList() {
      const arr = [];
      for (const key in this.$utils.identity) {
        if (this.$utils.identity.hasOwnProperty(key)) {
          arr.push({
            value: this.$utils.identity[key],
            label: this.$utils.identity[key],
            disabled: Number(key) === 6 ? false : this.disabled,
          });
        }
      }
      return arr;
    },
  },
  // 深度监听
  watch: {
    form: {
      handler(val) {
        localStorage.setItem("db", JSON.stringify(val));
      },
      deep: true,
    },
    "form.name": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.employer": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.gender": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.politicsStatus": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.idCard": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.phone": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.community": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.workingStatus": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.grade": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.position": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.personnelSource": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.objectIdentity": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.identity": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
    "form.workingYears": {
      handler(val) {
        this.$store.commit("setcheckStatusDisabled", "userInfo");
      },
      deep: true,
    },
  },
  mounted() {
    this.handleUniNameList();
    // 监听与主进程的通信
    this.$ipc.on("action", (event, arg) => {
      switch (arg) {
        case "open": // 打开文件
          console.log("open");
          this.loadAsyncZip();
          break;
        case "about": // 关于
          console.log("about");
          break;
        case "save": // 保存
          this.downloadZip();
          break;
        case "new": // 新建
          this.openNew();
          console.log("new");
          break;
         case "clear": // 清空缓存
          console.log("clear");
          localStorage.clear();
          break;
      }
    });
  },
  methods: {
    handleUniNameList() {
      const arr = [];
      const obj = {};
      this.$utils.unitNamelist.map((res) => {
        arr.push(res.key);
        obj[res.key] = res.value;
      });
      this.obj = obj;
      this.uniNameList = arr;
      console.log(this.uniNameList, this.obj, "this.uniNameList");
    },
    // 下一项
    handleGoNextPage() {
      let arrhw = [];
      if (this.form.haiWai.length) {
        this.form.haiWai.map((item) => {
          arrhw.push(item.gx);
          arrhw.push(item.xm);
          arrhw.push(item.sfzh);
          arrhw.push(item.hwjl);
          arrhw.push(item.qksm);
        });
        if (!arrhw.every((x) => x)) {
          this.$message({
            type: "error",
            message: "请检查海外经历是否有误",
          });
          return false;
        }
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.imageUrl) {
            if (this.getResume && this.getResume.length) {
              let arr = [];
              this.getResume.map((item) => {
                arr.push(item.startTime);
                arr.push(item.endTime);
                arr.push(item.unitName);
                arr.push(item.department);
                arr.push(item.job);
              });
              if (!arr.every((x) => x)) {
                this.$message({
                  type: "error",
                  message: "请检查个人简历是否有误",
                });
                return false;
              }
            }
            this.$store.dispatch("updateStatus", "userInfo");
          } else {
            this.$message({
              type: "error",
              message: "请检查照片是否传入",
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请检查是否有误",
          });
          return false;
        }
      });
    },
    // 人员身份逻辑
    handleChange(val) {
      if (val.join(",").indexOf("其他") > -1) {
        this.form.identity = ["其他"];
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // 工作单位逻辑
    handleChangeNeedCommunity(val) {
      console.log(
        "🐛 ~ file: userInfo.vue ~ line 596 ~ handleChangeNeedCommunity ~ val",
        val
      );
      // let obj = {};
      // this.$utils.communityType.map((comm) => {
      //   obj[comm.key] = comm.value;
      // });
      // this.needCommunity = !!obj[val];
      // this.communityType = obj[val];
      // this.form.community = "";
    },
    openDialogByIpc() {
      this.$ipc.send("showDialog", `<${this.$t("a message")}>`);
    },
    openNew() {
      this.$store.dispatch("updateStatus", "0");
      this.$store.dispatch("updateUser", null);
    },
    onSubmit() {
      // const { href } = this.$router.resolve({
      //   name: 'Pdf',
      // })
      // window.open(href, '_blank')
      this.$router.push({ name: "Pdf" });
    },
    // 图片上传
    handleAvatarSuccess(e) {
      var file = e.target.files[0]; // 获取图片资源
      const self = this;
      // 只选择图片文件
      if (!file.type.match("image.*")) {
        return false;
      }

      var reader = new FileReader();

      reader.readAsDataURL(file); // 读取文件

      // 渲染文件
      reader.onload = function (arg) {
        console.log(arg.target.result);
        self.form.imageUrl = arg.target.result;
      };
    },
    downloadZip() {
      console.log("🐛:: downloadZip -> this.$refs.form", this.$refs.form);
      let arr = [];
      // 添加全局正则,检验车牌号和身份证号
      this.form.car.map((item) => {
        if (item.carNumber) {
          arr.push(isLicensePlate(item.carNumber));
        }
      });
      this.form.networking.map((item) => {
        if (item.idCard) {
          arr.push(isIdentityCard(item.idCard));
        }
      });
      if (!arr.every((x) => x)) {
        return this.$message({
          type: "error",
          message: "请检查车牌号和身份证号是否有误",
        });
      }
      if (Object.keys(this.tableStatus).length !== 22) {
        return this.$message({
          type: "error",
          message: "请检查是否选择有无此类情况",
        });
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
        } else {
          this.$message({
            type: "error",
            message: "请检查是否有误",
          });
          return false;
        }
      });
    },
    loadAsyncZip(defaultpath, callback) {
      const self = this;
      const files = this.$dialog.showOpenDialog({
        filters: [{ name: "WT", extensions: ["wt"] }],
        properties: ["openFile"],
      });
      if (files) {
        files.then((res) => {
          // const buf = Buffer.alloc(1024)
          const path = res.filePaths[0];
          fs.readFile(path, function (err, data) {
            if (err) throw err;
            JSZip.loadAsync(data).then(function (zip) {
              console.log("🐛:: loadAsyncZip -> zip", zip, zip.files);
              if (zip.files && zip.files.password) {
                zip.files.password.async("text").then((pwd) => {
                  self
                    .$prompt("请输入文件密码", "密码输入", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                    })
                    .then(({ value }) => {
                      if (String(value) === String(pwd)) {
                        self.$message({
                          type: "success",
                          message: "密码正确",
                        });
                        zip.files["user.json"].async("text").then((res) => {
                          self.getJson(res);
                        });
                      } else {
                        self.$message({
                          type: "error",
                          message: "密码错误",
                        });
                      }
                    })
                    .catch(() => {
                      self.$message({
                        type: "info",
                        message: "取消输入",
                      });
                    });
                });
              } else {
                zip.files["user.json"].async("text").then((res) => {
                  self.getJson(res);
                });
              }
            });
          });
        });
      }
    },
    getJson(text) {
      if (text) {
        const jsonData = JSON.parse(text);
        console.log(jsonData);
        this.$store.dispatch("updateUser", jsonData);
      }
    },
  },
};
</script>

<style>
.home-button {
  background-color: #263238;
  opacity: 1;
  border-radius: 4px;
  cursor: pointer;
  height: 45px;
  width: 150px;
  margin: 10px 10px;
  text-align: center;
  line-height: 45px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 260px;
  line-height: 260px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  display: block;
}
</style>
