<template>
  <div>
    <div class="print-title">
      <el-button @click="printPDF"
        id="print-button"
        type="primary">打印</el-button>
      <el-button @click="goBack"
        id="print-button">返回</el-button>
    </div>
    <div ref="pdfDom">
      <h1 style="font-family: DengXian; text-align: center; font-size: 32pt">
        廉情信息报告表
      </h1>
      <div style="text-align: center; margin: 200px auto; width: 500px">
        <p style="
            text-indent: 72pt;
            text-align: justify;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">报 告 人：</span>
          <input name="name"
            style="border: none; border-bottom: 1px solid #000"
            type="text" />
          <span style="font-family: DengXian">（签名）</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: justify;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">&#xa0;</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: justify;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">单 位：</span>
          <input name="name"
            style="width: 222px; border: none; border-bottom: 1px solid #000"
            type="text" />
        </p>
        <p style="
            text-indent: 72pt;
            text-align: center;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">&#xa0;</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: justify;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">报告日期：</span>
          <span style="
              font-family: DengXian;
              text-decoration: underline;
              margin: 10px;
            ">{{ $formatDay(new Date(), 'YYYY') }}</span>
          <span style="font-family: DengXian">年</span>
          <span style="
              font-family: DengXian;
              text-decoration: underline;
              padding: 10px;
            ">{{ $formatDay(new Date(), 'MM') }}</span>
          <span style="font-family: DengXian">月</span>
          <span style="
              font-family: DengXian;
              text-decoration: underline;
              padding: 10px;
            ">{{ $formatDay(new Date(), 'DD') }}</span>
          <span style="font-family: DengXian">日</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: center;
            line-height: 115%;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">&#xa0;</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: justify;
            line-height: 115%;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">审 签 人：</span>
          <input name="name"
            style="border: none; border-bottom: 1px solid #000"
            type="text" />
          <span style="font-family: DengXian">（签名）</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: center;
            line-height: 115%;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">&#xa0;</span>
        </p>
        <p style="
            text-indent: 72pt;
            text-align: justify;
            line-height: 115%;
            widows: 0;
            orphans: 0;
            font-size: 16pt;
          ">
          <span style="font-family: DengXian">审签日期：</span>
          <input name="name"
            style="width: 50px; border: none; border-bottom: 1px solid #000"
            type="text" />
          <span style="font-family: DengXian">年</span>
          <input name="name"
            style="width: 50px; border: none; border-bottom: 1px solid #000"
            type="text" />
          <span style="font-family: DengXian">月</span>
          <input name="name"
            style="width: 50px; border: none; border-bottom: 1px solid #000"
            type="text" />
          <span style="font-family: DengXian">日</span>
        </p>
      </div>
      <p style="
          text-align: center;
          line-height: 115%;
          widows: 0;
          orphans: 0;
          font-size: 12pt;
        ">
        <span style="font-family: DengXian">廉情信息报告表{{ id }}</span>
      </p>
      <p style="
          margin-top: 20pt;
          margin-bottom: 80pt;
          text-align: center;
          line-height: 115%;
          widows: 0;
          orphans: 0;
          font-size: 20pt;
        ">
        <span style="font-family: DengXian">临安区监察委员会</span>
      </p>
      <p style="
          text-align: center;
          line-height: 115%;
          widows: 0;
          orphans: 0;
          font-size: 30pt;
        ">
        <span style="font-family: DengXian">报告人基本情况</span>
      </p>
      <table cellpadding="0"
        cellspacing="0"
        style="border-collapse: collapse; width: 100%">
        <tr style="height: 36.4pt">
          <td align="center"
            style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">姓 名</span>
            </p>
          </td>
          <td align="center"
            style="
              width: 42.8pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.name }}</span>
            </p>
          </td>
          <td style="
              width: 30.2pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">性别</span>
            </p>
          </td>
          <td style="
              width: 29.45pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.gender | filterSelect($utils.gender)
              }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">民族</span>
            </p>
          </td>
          <td style="
              width: 75.95pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.nation | filterSelect($utils.nation)
              }}</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 70pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">政治面貌</span>
            </p>
          </td>
          <td style="
              width: 63.45pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.politicsStatus | filterSelect($utils.politicsStatus)
              }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 41.15pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">身份证号</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.idCard }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">联系电话</span>
            </p>
          </td>
          <td style="
              width: 75.95pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.phone }}</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 70pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">从事或分管工作</span>
            </p>
          </td>
          <td style="
              width: 63.45pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.work }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 43.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">全日制学历</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.fullTimeEducation  | filterSelect($utils.education)
              }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">在职学历</span>
            </p>
          </td>
          <td colspan="4"
            style="
              width: 231pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.onTimeEducation  | filterSelect($utils.education) }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 40.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">工作单位</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.employer
                }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">科室/村社</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 96pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.community }}</span>
            </p>
          </td>
          <td colspan="2"
            rowspan="6"
            style="
              width: 124.2pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">
                <el-image :src="form.imageUrl"
                  class="avatar"
                  fit="fit"
                  v-if="form.imageUrl"></el-image>
              </span>
            </p>
          </td>
        </tr>
        <tr style="height: 40.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">现任职务</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.duty }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">在职状态</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 96pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.workingStatus | filterSelect($utils.workingStatus)
              }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 40.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">入党时间</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.partyTime | dateMonth
              }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">工作年限（年）</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 96pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.workingYears }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 38.05pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">职级</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.grade | filterSelect($utils.grade)
              }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">职位</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 96pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.position | filterSelect($utils.position)
              }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 37.35pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">人员来源</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.personnelSource | filterSelect($utils.personnelSource)
              }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">对象身份</span>
            </p>
          </td>
          <td colspan="2"
            style="
              width: 96pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.objectIdentity | filterSelect($utils.objectIdentity)
              }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 40.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">人员身份</span>
            </p>
          </td>
          <td colspan="6"
            style="
              width: 278.2pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">
                <!-- <el-checkbox-group v-model="form.identity">
                  <el-checkbox
                    :key="i+1"
                    :label="item"
                    v-for="(item,i) in $utils.identity"
                  >☑{{item}}</el-checkbox>
                </el-checkbox-group> -->
                <span :key="i + 1"
                  :label="item"
                  v-for="(item, i) in $utils.identity">{{ form.identity.indexOf(item) > -1 ? '☑' : '□'
                  }}{{ item }}&nbsp;&nbsp;</span>
              </span>
            </p>
          </td>
        </tr>
        <tr style="height: 43.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">户籍地址</span>
            </p>
          </td>
          <td colspan="3"
            style="
              width: 124.05pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.householdRegistration
              }}</span>
            </p>
          </td>
          <td style="
              width: 36.55pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">所在支部</span>
            </p>
          </td>
          <td colspan="4"
            style="
              width: 231pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{ form.branch }}</span>
            </p>
          </td>
        </tr>
        <tr style="height: 40.8pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">现居住地</span>
            </p>
          </td>
          <td colspan="8"
            style="
              width: 413.2pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">{{
                form.currentResidence
              }}</span>
            </p>
          </td>
        </tr>
          <tr style="height: 106.65pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">拥有海外经历</span>
            </p>
          </td>
          <td colspan="8"
            style="
              width: 413.2pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <div style="font-family: DengXian"
              v-for="(item,i) in form.haiWai"
              :key="i">
              <span v-if="item.gx">关系:{{item.gx}};</span>
              <span v-if="item.xm">姓名:{{item.xm}};</span>
              <span v-if="item.sfzh">身份证号:{{item.sfzh}};</span>
              <span v-if="item.hwjl">海外经历:{{item.hwjl}};</span>
              <span v-if="item.qksm">情况说明:{{item.qksm}};</span>
              <br/>
            </div>
          </td>
        </tr>
        <tr style="height: 106.65pt">
          <td style="
              width: 36.1pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <p style="
                text-align: center;
                line-height: 115%;
                widows: 0;
                orphans: 0;
              ">
              <span style="font-family: DengXian">个人简历</span>
            </p>
          </td>
          <td colspan="8"
            style="
              width: 413.2pt;
              border-style: solid;
              border-width: 0.75pt;
              vertical-align: top;
              vertical-align: middle;
            ">
            <div style="font-family: DengXian"
              v-for="(item,i) in form.resume"
              :key="i">
              <span v-if="item.time&&item.time.length">
                {{
                item.startTime | dateMonth
              }}至 {{
                item.endTime | dateMonth
              }}任
              </span>
              {{
                item.unitName
              }}{{
                item.department
              }}{{
                item.job
              }};
            </div>
          </td>
        </tr>
        <tr style="height: 0pt">
          <td style="width: 46.9pt"></td>
          <td style="width: 53.6pt"></td>
          <td style="width: 41pt"></td>
          <td style="width: 40.25pt"></td>
          <td style="width: 47.35pt"></td>
          <td style="width: 86.75pt"></td>
          <td style="width: 20.05pt"></td>
          <td style="width: 60.75pt"></td>
          <td style="width: 74.25pt"></td>
        </tr>
      </table>
      <div>
        <print></print>
        <div class="stl_05 stl_06">
          <div class="stl_01"
            style="text-align: center">
            <span class="stl_10 stl_08 stl_11">本人承诺 &nbsp;</span>
          </div>
          <div class="stl_01"
            style="top: 37.7462em; left: 10.72em">
            <span
              class="stl_18 stl_08 stl_19">《填表须知》和每项表格下方的填表说明，本人已认真阅读。所填的相关内容已与配偶，子女进行了认真核实。我郑重承诺，以上所填内容真实、准确、完整，并自愿接受组织审查。</span>
          </div>
          <div class="stl_01"
            style="
              top: 46.5563em;
              left: 34.31em;
              text-align: right;
              margin-right: 30%;
              margin-top: 100px;
            ">
            <span class="stl_18 stl_08 stl_11">本人签名： &nbsp;</span>
          </div>
          <div class="stl_01"
            style="
              top: 48.3163em;
              left: 36.31em;
              text-align: right;
              margin-right: 30%;
            ">
            <span class="stl_18 stl_08 stl_11">日期： &nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
// import electronVuePrinter from 'electron-vue-printer'
import print from './print.vue'
export default {
  data () {
    return {
      page: 3,
    }
  },
  components: { print },
  mounted () {
    console.log(this.$route)
  },
  computed: {
    form () {
      return this.$store.getters.getUser
    },
    id () {
      return (
        this.$formatDay(new Date(), 'YYYYMMDDHHmmss') +
        this.form.idCard.slice(-8)
      )
    },
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'Home' })
    },
    //  webviewReady() {
    //     this.$refs.electronVuePrinter.print('https://cdn.pixabay.com/photo/2017/06/10/07/29/printer-2389244_960_720.png');
    //   },
    printPDF () {
      // let newDomHtml = this.$refs.pdfDom.innerHTML
      // //将要打印的html赋给本页面
      // window.document.body.innerHTML = newDomHtml
      // //调用windos的打印接口
      // window.print()
      // window.location.reload() //解决打印之后按钮失效的问题，刷新页面
      // return false
      window.print()
      // this.ExportSavePdf()
      // const domElement = document.getElementById('pdf-print')
      // html2canvas(domElement, {
      //   onclone: (document) => {
      //     document.getElementById('print-button').style.visibility = 'hidden'
      //   },
      // }).then((canvas) => {
      //   var contentWidth = canvas.width
      //   var contentHeight = canvas.height

      //   //一页pdf显示html页面生成的canvas高度;
      //   var pageHeight = (contentWidth / 592.28) * 841.89
      //   //未生成pdf的html页面高度
      //   var leftHeight = contentHeight
      //   //页面偏移
      //   var position = 0
      //   //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      //   var imgWidth = 595.28
      //   var imgHeight = (592.28 / contentWidth) * contentHeight

      //   var pageData = canvas.toDataURL('image/jpeg', 2.0)
      //   console.log(
      //     '🐛:: printPDF -> pageData',
      //     leftHeight,
      //     pageHeight,
      //     leftHeight < pageHeight
      //   )

      //   var pdf = new jsPdf('', 'pt', 'a4')

      //   //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //   //当内容未超过pdf一页显示的范围，无需分页
      //   if (leftHeight < pageHeight) {
      //     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      //   } else {
      //     while (leftHeight > 0) {
      //       pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      //       leftHeight -= pageHeight
      //       console.log('🐛:: printPDF -> leftHeight', leftHeight)
      //       position -= 841.89
      //       //避免添加空白页
      //       if (leftHeight > 0) {
      //         pdf.addPage()
      //       }
      //     }
      //   }
      //   pdf.save('廉情信息报告表.pdf')
      // })
    },
    exportPdf () {
      var element = document.getElementById('pdf-print')
      html2canvas(element, {
        logging: false,
      }).then(function (canvas) {
        var pdf = new jsPdf('p', 'mm', 'a4') //A4纸，纵向
        var ctx = canvas.getContext('2d'),
          a4w = 190,
          a4h = 277, //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
          imgHeight = Math.floor((a4h * canvas.width) / a4w), //按A4显示比例换算一页图像的像素高度
          renderedHeight = 0

        while (renderedHeight < canvas.height) {
          var page = document.createElement('canvas')
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight) //可能内容不足一页

          //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page
            .getContext('2d')
            .putImageData(
              ctx.getImageData(
                0,
                renderedHeight,
                canvas.width,
                Math.min(imgHeight, canvas.height - renderedHeight)
              ),
              0,
              0
            )
          pdf.addImage(
            page.toDataURL('image/jpeg', 1.0),
            'JPEG',
            10,
            10,
            a4w,
            Math.min(a4h, (a4w * page.height) / page.width)
          ) //添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) pdf.addPage() //如果后面还有内容，添加一个空页
          // delete page
        }
        pdf.save('content.pdf')
      })
    },
    ExportSavePdf () {
      const element = document.getElementById('pdf-print')
      html2canvas(element, {
        logging: false,
      }).then(function (canvas) {
        const pdf = new jsPdf('p', 'mm', 'a4') // A4纸，纵向
        const ctx = canvas.getContext('2d')
        const a4w = 210
        const a4h = 297 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
        const imgHeight = Math.floor((a4h * canvas.width) / a4w) // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0

        while (renderedHeight < canvas.height) {
          console.log(
            '🐛:: ExportSavePdf -> canvas.height',
            canvas.height,
            imgHeight
          )
          const page = document.createElement('canvas')
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight) // 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page
            .getContext('2d')
            .putImageData(
              ctx.getImageData(
                0,
                renderedHeight,
                canvas.width,
                Math.min(imgHeight, canvas.height - renderedHeight)
              ),
              0,
              0
            )
          pdf.addImage(
            page.toDataURL('image/jpeg', 1.0),
            'JPEG',
            0,
            0,
            a4w,
            Math.min(a4h, (a4w * page.height) / page.width)
          ) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) {
            pdf.addPage()
          } // 如果后面还有内容，添加一个空页
          // delete page;
        }
        pdf.save('ExportSavePdf.pdf')
      })
    },
  },
}
</script>

<style lang="less">
@media print {
  body {
    background: none;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 22px;
  }
.print-title{
  display:none;
}
  .nav,
  button,
  .demo-box:before,
  header p {
    display: none;
  }

  .demo-box,
  h2,
  pre,
  code {
    padding: 0 !important;
    margin: 0 !important;
  }

  header {
    padding: 0 0 10px 0;
  }

  code,
  .support {
    font-size: 10px;
  }
  table,
  tbody,
  thead {
    width: 100% !important;
    table-layout: fixed;WORD-BREAK: break-all; WORD-WRAP: break-word
  }

  colgroup {
    position: absolute;
    width: 100% !important;
  }
  table {
  font-family: Arial, sans-serif;
  font-size: 14px;
  background-color: #f0f2f5;
  border-collapse: collapse;
  color: #454545;
  table-layout: auto;
  width: 100%;
  text-align: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #dadcde;
  thead {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #dadcde;
    line-height: 40px;
    font-weight: bold;
    color: #454c70;
  }
  tr {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #dadcde;
    line-height: 23px;
  }
  td{
    padding: 5px 10px;
    font-size: 14px;
    font-family: Verdana;
    width: 100px;
    word-break: break-all;
  }
  tr:nth-child(even) {
    background: #F5F7F9;
  }
  tr:nth-child(odd) {
    background: #FFF;
  }
}
}
.footer {
  text-align: center;
}

.stl_05 {
  border: 1px solid #ccc;
  margin: 30px auto;
  padding: 20px;
  height: 300px;
  text-align: left;
}
</style>