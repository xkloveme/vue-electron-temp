/**
 * checkPassword,是对password的校验,
 * other,是其他项类似备注的,
 * tableStatus是表的标示,有无此类情况格式类似tableStatus:{table1:1,table2:0},1为有2为没有
 */
const db = {
  uid:'', // 生成数据表唯一id
  version: '', // 版本号
  name: '', // 姓名
  gender: '', // 性别
  idCard: '', // 身份证号
  workingStatus: '',
  fullTimeEducation:"",//全日制学历
  onTimeEducation:"",//在职学历
  nation: '', // 民族
  politicsStatus: '', // 政治面貌
  work: '', // 分管工作
  employer: '', // 工作单位
  community:'',// 村社区
  workingYears:'', // 工作年限
  phone: '', // 联系电话
  duty: '', // 现任职务
  grade:'', // 职级
  position:'', // 职位
  personnelSource:'', // 人员来源
  objectIdentity:'', // 对象身份
  department: '', // 部门
  partyTime: '', // 入党时间
  branch:'', // 所在支部
  identity: [], // 人员身份 枚举
  householdRegistration: '', // 户籍地址
  currentResidence: '', // 现居住地
  personalResume: '', // 个人简历
  resume:[{
    time:[],
    startTime:'',//开始时间
    endTime:'',//结束时间
    unitName:'',//单位
    department: '', // 科室
    job: ''// 职务
  }], // 工作简历
  password: '',
  checkPassword: '',
  imageUrl: '', // 照片
  other: '', // 超长字符串,类似备注
  tableStatus: {},
  checkStatus: {},// 填写完成状态{table1:1,table2:0},1为有2为没有
  // 海外经历
  haiWai:[
  //   {
  //   'gx':"",//'关系',
  //   'xm':"",//'姓名',
  //   'sfzh':"",//'身份证',
  //   'hwjl':"",//'海外经历',
  //   'qksm':"",//'情况说明',
  // }
],
  // 本人、配偶、共同生活子女为所有权人或共有人的房屋出售情况
  houseSale: [{
    people: '', // 产权人
    whereabouts: '', // 房产来源
    realEstateCertificate: '', // 不动产权证号
    source: '', // 房产去向
    address: '', // 具体地址
    area: '', // 建筑面积
    propertyNature: '', // 产权性质
    transactionTime: '', // 交易时间
    transactionPrice: '' // 交易价格
  }],
  // 未办证产权
  notRushEstate: [{
    people: '', // 产权人
    relationship: '', // 与本人关系
    caseNo:'',    // 网签合同编号或网签备案号
    source: '', // 房产来源
    address: '', // 具体地址
    area: '', // 建筑面积
    propertyNature: '', // 产权性质
    transactionTime: '', // 交易时间
    transactionPrice: '' // 交易价格
  }],
  // 宅基地
  homestead: [{
    people: '', // 产权人
    realEstateCertificate:'',//不动产权证
    // relationship: '', // 与本人关系
    source: '', // 房产来源
    address: '', // 具体地址
    area: '', // 建筑面积
    // propertyNature: '', // 产权性质
    transactionTime: '', // 交易时间
    transactionPrice: '' // 交易价格
  }],
  // 股票
  stock: {
    desc: '',
    allMarketValue: '', // 总市值
    list: [{
      name: '',
      stockName: '', // 股票名称
      stockNumber: '', // 股票数量
      stockMarketValue: ''// 股票市值
    }]
  },
  // 基金
  fund: {
    desc:'',
    allMarketValue: '', // 总市值
    list: [{
      name: '',
      fundName: '', // 基金名称
      fundNumber: '', // 基金数量
      fundMarketValue: '',// 基金市值
    }]
  },
  // 期货
  futures: {
    desc:'',
    allMarketValue: '', // 总市值
    list: [{
      name: '',
      futuresName: '', // 期货名称
      futuresNumber: '', // 期货数量
      futuresMarketValue: '',// 期货市值
    }]
  },
  workingList: [
    {
      // employer: '', // 工作单位
      duty: '' // 现任职务
      // phone: '' // 联系电话
    }
  ],
  // 人脉关系
  networking: [
    {
      relationship: '', // 本人关系
      name: '',
      gmlx:'',// 公民类型中国国籍、非中国国籍
      idCard: '',
      politicsStatus: '', // 政治面貌
      phone: '',
      work: ''
    }
  ],
  // 工作考核情况
  workAssessment: [
    {
      time: '', // 年度
      assessment: '', // 考核情况
      agency: '', // 发文机关
      symbol: '', // 文号
      desc: ''// 备注
    }
  ],
  // 评先评优
  recommendation: [
    {
      time: '',
      name: '',
      organization: '', // 表彰机关
      symbol: '', // 文号
      desc: ''// 备注
    }
  ],
  // 搜惩处情况
  punishment: [{
    time: '',
    disposition: '', // 所受处分
    dispositionReasons: '', // 所受处分原因
    dispositionOrgans: '', // 惩处机关
    symbol: '', // 文号
    desc: ''
  }],
  // 婚姻情况
  marriage: [{
    change: '', // 变化情况
    time: '',
    reasons: ''
  }],
  // 出国证件情况
  travelDocuments: [{
    name: '', // 证件名称
    number: '', // 证件号码
    licensing: '', // 发证机关
    time: '', // 发证时间
    validity: '', // 有效期
    custodyInstitutions: ''// 保管机构
  }],
  // 出国情况
  travelAbroad: [{
    startTime: '',
    endTime: '',
    country: '',
    reasons: '', // 出国事由
    approvalAuthority: '', // 审批机构
    agency: ''// 代办机构
  }],
  // 子女与无国籍外国人婚姻情况
  childMarriageForeigners: [{
    title: '', // 称谓
    name: '', // 姓名
    spouseName: '', // 配偶姓名
    spouseCountry: '', // 配偶姓名国籍
    spouseWork: '', // 配偶单位
    spouseDuty: '', // 配偶职位
    time: ''// 登记时间
  }],
  // 子女与台湾婚姻情况
  childMarriageTaiwan: [{
    title: '', // 称谓
    name: '', // 姓名
    spouseName: '', // 配偶姓名
    spouseCountry: '', // 配偶姓名国籍
    spouseWork: '', // 配偶单位
    spouseDuty: '', // 配偶职位
    time: ''// 登记时间
  }],
  // 配偶子女移居海外
  childMoved: [{
    title: '', // 称谓
    name: '', // 姓名
    country: '', // 移居国家
    city: '', // 居住城市
    card: '', // 移居国家证件号码
    type: '', // 移居类别
    time: '', // 移居时间
    desc: ''
  }],
  // 配偶子女从业情况
  practice: [{
    title: '', // 称谓
    name: '', // 姓名
    isLife: '', // 是否共同生活
    work: '', // 工作单位
    duty: '', // 现在职务
    unitNature: '', // 单位性质
    cardName: '', // 证件名称
    card: '' // 证件号码
  }],
  // 配偶子女刑事责任情况
  criminal: [{
    title: '', // 称谓
    name: '', // 姓名
    time: '', // 被追究时间
    reasons: '', // 被追究责任原因
    status: '', // 处理阶段
    result: '' // 处理结果
  }],
  // 配偶子女房产情况----本人、配偶、子女的房产情况
  realEstate: [{
    people: '', // 产权人
    relationship: '', // 与本人关系
    source: '', // 房产来源
    realEstateCertificate:'', // 不动产权证
    address: '', // 具体地址
    area: '', // 建筑面积
    propertyNature: '', // 产权性质
    transactionTime: '', // 交易时间
    transactionPrice: '', // 交易价格
    desc:''
  }],
  // 本人配偶注册工商户,个人独资企业或合伙企业
  partnership: [{
    title: '', // 称谓
    name: '',
    creditCode:'', // 统一社会信用代码
    marketSubject: '', // 市场主体
    businessScope: '', // 经营范围
    marketSubjectType: '', // 市场主体类型
    money: '', // 资金数额
    personalContribution: '', // 个人出资数额
    fundedRatio: '' // 出资比例
  }],
  // 本人配偶车辆情况
  car: [{
    brand: '', // 品牌
    time: '', // 购买时间
    price: '', // 价格
    carNumber: '', // 车牌号
    color: '',
    desc: '' // 备注
  }]
}
module.exports = db
