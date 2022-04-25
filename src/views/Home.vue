/* eslint-disable */
<template>
  <el-tabs class="home-title"
    disabled
    type="card"
    v-model="editableTabsValue">
    <el-tab-pane :key="i++"
      disabled
      :label="item.title"
      :name="item.name"
      v-for="(item, i) in editableTabs">
      <p v-if="item.desc">
        {{ i - 1 }}、{{ item.desc }}
        <el-tooltip v-if="item.note"
          :content="item.note"
          class="item"
          effect="dark">
          <i class="el-icon-question" />
        </el-tooltip>
        <el-radio label="1"
          style="margin-left: 30px"
          v-model="tableStatus[item.content]">有此类情况</el-radio>
        <el-radio label="2"
          v-model="tableStatus[item.content]">无此类情况</el-radio>
      </p>
      <div style="color:red;margin:10px 0px;">
        {{item.note}}
      </div>
      <component :is="item.content"
        :tableStatus="tableStatus[item.content]" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import userInfo from './userInfo'
import table1 from './table/table1'
import table2 from './table/table2'
import table3 from './table/table3'
import table4 from './table/table4'
import table5 from './table/table5'
import table6 from './table/table6'
import table7 from './table/table7'
import table8 from './table/table8'
import table9 from './table/table9'
import table10 from './table/table10'
import table11 from './table/table11'
import table12 from './table/table12'
import table13 from './table/table13'
import table14 from './table/table14'
import table15 from './table/table15'
import table16 from './table/table16'
import table17 from './table/table17'
import table18 from './table/table18'
import table19 from './table/table19'
import table20 from './table/table20'
import table21 from './table/table21'
import table22 from './table/table22'
export default {
  components: {
    userInfo,
    table1,
    table2,
    table3,
    table4,
    table5,
    table6,
    table7,
    table8,
    table9,
    table10,
    table11,
    table12,
    table13,
    table14,
    table15,
    table16,
    table17,
    table18,
    table19,
    table20,
    table21,
     table22,
  },
  data () {
    return {
      // editableTabsValue: '0',
      editableTabs: [
        {
          title: '基本信息',
          content: 'userInfo',
        },
        {
          title: '表1',
          desc: '家庭主要成员及重要社会关系',
          note:
            '填表说明：填报范围包括本人及配偶的父母、子女、子女配偶、兄弟姐妹及其配偶、子女，填报内容需详细准确，确保无遗漏。',
          content: 'table1',
        },
        {
          title: '表2',
          desc: '工作考核情况',
          note:
            '填报说明：本人近3年考核情况',
          content: 'table2',
        },
        {
          title: '表3',
          desc: '评先评优情况',
           note:
            '填报说明：本人曾受到过被评为先进或者优秀情况',
          content: 'table3',
        },
        {
          title: '表4',
          desc: '本人受惩处情况',
           note:
            '填报说明：本人曾受到过的行政、司法、党纪政务、刑事等受惩处情况',
          content: 'table4',
        },
        {
          title: '表5',
          desc: '本人的婚姻情况',
           note:
            '填报说明：本人的婚姻历史变化情况',
          content: 'table5',
        },
        {
          title: '表6',
          desc: '本人持有因私出国（境）证件的情况',
           note:
            '填报说明：填报本人的有效证件，时间精确到“年月日”',
          content: 'table6',
        },
        {
          title: '表7',
          desc: '本人因私出国（境）的情况',
           note:
            '填报说明：本人近3年因私出入国（境）情况',
          content: 'table7',
        },
        {
          title: '表8',
          desc: '子女与外国人、无国籍人通婚的情况',
           note:
            '填报说明：以办理婚姻手续为准',
          content: 'table8',
        },
        {
          title: '表9',
          desc: '子女与港澳及台湾居民通婚的情况',
           note:
            '填报说明：以办理婚姻手续为准',
          content: 'table9',
        },
        {
          title: '表10',
          desc: '配偶、子女移居国（境）外的情况',
           note:
            '填报说明：配偶、子女自愿放弃外国国籍、永久居留资格、长期居留许可，但按照国（境）外法律规定，实际上未能放弃的；配偶、子女普通护照上贴有外国“永久居留”、“长期居留签证”的，属于取得永久居留资格、长期居留许可情形。均需填报。',
          content: 'table10',
        },
        {
          title: '表11',
          desc: '配偶、子女从业情况',
           note:
            '填报说明：在多个单位任职（兼职）的，需逐一填报，因将身份证借与他人注册企业等原因兼任职务的，即使未参与经营、未实际出资、未获利，也需填报。',
          content: 'table11',
        },
        {
          title: '表12',
          desc: '配偶、子女被司法机关追究刑事责任的情况',
           note:
            '填报说明：曾被追究过刑事责任的，虽已处理完毕，仍需填报。',
          content: 'table12',
        },
        {
          title: '表13',
          desc: '本人、配偶、子女的房产情况',
           note:
            '填报说明：只要是登记在本人、配偶、子女名下的房产；除租用外一次性买断所有权或使用权的车库、车位、储藏间等；以出售、赠与、腾退、拆迁等方式处理的房产，尚未办结产权变更手续的；与他人共有的房产、车库、车位、储藏间等；农村自建房为本人、配偶、子女名下的，不论是否办理确权登记的；均需填报',
          content: 'table13',
        },
        {
          title: '表14',
          desc:
            '本人、配偶、子女为所有权人或共有人的未办证房产情况',
             note:
            '填报说明：未取得产权证，但已签订购房合同或网签备案的房产',
          content: 'table14',
        },
        {
          title: '表15',
          desc: '本人、配偶、子女为所有权人或共有人的宅基地情况',
           note:
            '填报说明：填报本人、配偶、子女名下拥有的宅基地，不论是否办理相关权证，是否与他人共有；均需填报。',
          content: 'table15',
        },
        {
          title: '表16',
          desc: '本人、配偶、子女为所有权人或共有人的房产出售情况',
          note:
            '填报说明：原为本人、配偶、子女名下的房产（含农村自建房），现已出售或正在出售并办理网签（签订出售合同）的；均需填报。',
          content: 'table16',
        },
        {
          title: '表17',
          desc: '本人、配偶、子女及其配偶经商办企业的情况',
          note:
            '填报说明：包括国（境）内外注册或投资入股非上市企业的；私募基金、信托产品投资企业的；代持股份或将身份证借与他人注册或投资企业，即使未参与经营也未出资未获利的；已变更或停止经营活动，但市场监管部门未完成变更或注销的；未开展经营活动、已停止经营活动、被吊销营业执照但未办理注销手续的；持有上市或非上市企业股份的；均需填报',
          content: 'table17',
        },
        {
          title: '表18',
          desc: '本人和配偶车辆情况',
          note:
            '填报说明：登记在本人及配偶名下车辆；由本人、配偶出资购买或者与他人合资购买的车辆，不论产权是否登记在本人及配偶名下；均需填报。',
          content: 'table18',
        },
        {
          title: '表19',
          desc: '本人、配偶、子女投资或以其他方式持有股票情况',
          note:
            '填报说明：本人、配偶、子女出资购得的股票，包括流通股、未流通股、流通受限股等；本人、配偶、子女出资由他人持有的股票；他人出资由本人、配偶、子女持有的股票；持有国（境）外股票等；均需填报。',
          content: 'table19',
        },
        {
          title: '表20',
          desc: '本人、配偶、子女投资或以其他方式持有基金情况',
          note:
            '填报说明：不论何种方式购买，凡属于基金的产品，如：支付宝、微信等；证券公司推出的各种形式的集合资产管理计划等；股票账户资金余额自动转购的基金产品；填报前一交易日未了结的在途交易基金；他人出资但在本人、配偶、子女名下的基金；均需填报。',
          content: 'table20',
        },
        {
          title: '表21',
          desc: '本人、配偶、子女投资或以其他方式持有期货情况',
          note:
            '填报说明：不论何种方式购买，凡属于期货的产品，填报前一交易日未了结的在途交易期货；他人出资但在本人、配偶、子女名下的期货；均需填报。',
          content: 'table21',
        },
        {
          title: '其他事项',
           desc: '个人认为需要报告的其他事项',
          note: '填报说明：在上述各事项中尚未完全说明或未能涉及的事项，个人认为需要向组织报告的，可在此栏中详细说明。',
          content: 'table22',
        },
      ],
    }
  },
  computed: {
    tableStatus () {
      return this.$store.getters.getTableStatus
    },
    editableTabsValue: {
      get: function () {
        return String(this.$store.getters.getStatus);
      },
      set: function (value) {
      console.log('🐛 ~ file: Home.vue ~ line 233 ~ value', value)
        // this.$store.commit('setStatus', value)
      },
    },
  },
  methods: {},
}
</script>

<style >
.home-title > .is-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;
}
.home-title > .el-tabs__content {
  margin-top: 50px;
}
</style>
