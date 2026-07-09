// 大河智链 - 真实感 Mock 数据
// 数据规范：所有数据真实风格，不用占位符

// ========== v1.7 状态机定义（按 PRD §4.9） ==========
const STATUS_LABELS = {
  // 通用
  draft: '草稿',
  pending_submit: '待提交',
  rejected: '驳回',
  voided: '作废',
  invalid: '无效',
  // 货主方盖章
  pending_owner_seal: '待货主方盖章',
  pending_owner_seal_2: '待货主方二次盖章',
  // 担保方
  pending_guarantor: '待担保方审核',
  pending_guarantor_seal: '待担保方盖章',
  // 监管方
  pending_platform: '待监管方审核',
  pending_platform_seal: '待监管方盖章',
  // 资金方
  pending_funding: '待资金方审核',
  pending_funding_seal: '待资金方盖章',
  pending_funding_payment: '待放款',
  // 入库/出库
  pending_inbound: '待入库',
  pending_outbound: '待出库',
  inbound_completed: '已入库',
  outbound_completed: '已出库',
  // 还款/放款
  repaid: '已还款',
  released: '已放款',
  pending_repayment: '待还款',
  // 兼容旧值
  pending: '待审核',
  reviewing: '审核中',
  approved: '已通过',
  inbound: '已入库',
  financing: '融资中',
  warning: '提醒',
  danger: '熔断',
  completed: '已完成',
  running: '进行中',
  resolved: '已处理',
  processing: '处理中',
  notifying: '通知中',
  failed: '已失败',
};

const STATUS_COLORS = {
  draft: 'gray', pending_submit: 'gray', rejected: 'red', voided: 'gray', invalid: 'gray',
  pending_owner_seal: 'yellow', pending_owner_seal_2: 'yellow',
  pending_guarantor: 'blue', pending_guarantor_seal: 'blue',
  pending_platform: 'purple', pending_platform_seal: 'purple',
  pending_funding: 'orange', pending_funding_seal: 'orange', pending_funding_payment: 'orange',
  pending_inbound: 'purple', pending_outbound: 'purple',
  inbound_completed: 'green', outbound_completed: 'green',
  repaid: 'green', released: 'green', pending_repayment: 'orange',
  // 兼容旧值
  pending: 'blue', reviewing: 'blue', approved: 'green',
  inbound: 'green', financing: 'blue', warning: 'yellow', danger: 'red',
  completed: 'green', running: 'blue', resolved: 'green', processing: 'yellow', notifying: 'yellow', failed: 'red',
};

const STATUS_LABELS_EN = {
  draft: 'Draft', pending_submit: 'Pending Submit', rejected: 'Rejected', voided: 'Voided', invalid: 'Invalid',
  pending_owner_seal: 'Pending Owner Seal', pending_owner_seal_2: 'Pending Owner 2nd Seal',
  pending_guarantor: 'Pending Guarantor', pending_guarantor_seal: 'Pending Guarantor Seal',
  pending_platform: 'Pending Platform', pending_platform_seal: 'Pending Platform Seal',
  pending_funding: 'Pending Funding', pending_funding_seal: 'Pending Funding Seal', pending_funding_payment: 'Pending Payment',
  pending_inbound: 'Pending Inbound', pending_outbound: 'Pending Outbound',
  inbound_completed: 'Inbound Done', outbound_completed: 'Outbound Done',
  repaid: 'Repaid', released: 'Released', pending_repayment: 'Pending Repayment',
  pending: 'Pending', reviewing: 'Reviewing', approved: 'Approved', inbound: 'Inbound', financing: 'Financing',
  warning: 'Warning', danger: 'Danger', completed: 'Completed', running: 'Running', resolved: 'Resolved',
  processing: 'Processing', notifying: 'Notifying', failed: 'Failed',
};

const MockData = {
  // ========== 当前登录用户（按角色切换） ==========
  users: {
    warehouse: {
      id: 'u_wh_001',
      name: '赵德昌',
      role: 'warehouse',
      company: '物流港二期大河智链监管库',
      department: '仓储运营部',
      title: '仓库主管',
      phone: '139 0000 2222',
      avatar: '赵',
    },
    customer: {
      id: 'u_cust_001',
      name: '陈志强',
      role: 'customer',
      userRole: 'operator',       // 操作人：仅可保存草稿
      sealPermission: false,      // 无电子签章权限
      sealScope: [],              // 可用印章列表（空）
      company: '郑州某冷链贸易有限公司',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '陈志强',
      phone: '138 0000 6688',
      avatar: '陈',
    },
    // 客户方-盖章人（独立演示账号）：拥有电子签章权限
    customer_seal: {
      id: 'u_cust_002',
      name: '李雪',
      role: 'customer',           // 业务角色仍是货主方
      userRole: 'sealUser',       // 盖章人
      sealPermission: true,       // 有电子签章权限
      sealScope: ['company_seal', 'finance_seal', 'legal_seal'], // 可用印章
      company: '郑州某冷链贸易有限公司',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '陈志强',
      department: '财务部',
      title: '财务总监',
      phone: '139 0000 6666',
      avatar: '李',
    },
    platform: {
      id: 'u_plat_001',
      name: '李雪',
      role: 'platform',
      company: '大河智链物流股份有限公司',
      department: '风控运营部',
      title: '风控经理',
      phone: '139 0000 1234',
      avatar: '李',
    },
    guarantor: {
      id: 'u_guar_001',
      name: '王建国',
      role: 'guarantor',
      company: '中原信用担保有限公司',
      department: '业务一部',
      title: '业务总监',
      phone: '136 0000 8888',
      avatar: '王',
    },
    bank: {
      id: 'u_bank_001',
      name: '刘敏',
      role: 'bank',
      company: '中国民生银行股份有限公司郑州分行',
      department: '供应链金融部',
      title: '客户经理',
      phone: '135 0000 6666',
      avatar: '刘',
    },
  },

  // ========== 印章库（图片盖章，PNG 模拟） ==========
  seals: [
    { id: 'company_seal', name: '公司公章', color: 'red', preview: '郑州某冷链贸易有限公司' },
    { id: 'finance_seal', name: '财务专用章', color: 'red', preview: '财务专用章' },
    { id: 'legal_seal', name: '法人章', color: 'blue', preview: '陈志强印' },
    { id: 'contract_seal', name: '合同专用章', color: 'red', preview: '合同专用章' },
  ],

  // ========== 角色菜单配置 ==========
  menus: {
    customer: [
      { group: '工作台', items: [
        { icon: 'home', label: '首页概览', path: '/dashboard' },
      ]},
      { group: '客户准入', items: [
        { icon: 'shield', label: '准入申请', path: '/customer/admission' },
      ]},
      { group: '货物管理', items: [
        { icon: 'box', label: '入库申请', path: '/customer/inbound' },
        { icon: 'package', label: '在库货物', path: '/customer/monitoring' },
      ]},
      { group: '融资管理', items: [
        { icon: 'file', label: '融资申请', path: '/customer/financing' },
        { icon: 'list', label: '质物清单', path: '/customer/pledge-list' },
      ]},
      { group: '出库与还款', items: [
        { icon: 'logistics', label: '解押/出库', path: '/customer/outbound' },
        { icon: 'cash', label: '月度账单', path: '/customer/bills' },
      ]},
    ],
    platform: [
      { group: '工作台', items: [
        { icon: 'home', label: '首页概览', path: '/dashboard' },
      ]},
      { group: '准入审批', items: [
        { icon: 'shield-check', label: '准入审批', path: '/platform/approval-admission' },
      ]},
      { group: '货物管理', items: [
        { icon: 'box', label: '入库审批', path: '/platform/approval-inbound' },
        { icon: 'package', label: '在库监控', path: '/platform/monitoring-dashboard' },
      ]},
      { group: '融资管理', items: [
        { icon: 'file', label: '融资审核', path: '/platform/approval-financing' },
        { icon: 'list', label: '质物清单', path: '/customer/pledge-list' },
      ]},
      { group: '出库审批', items: [
        { icon: 'logistics', label: '解押/出库审批', path: '/platform/approval-outbound' },
      ]},
      { group: '数据中心', items: [
        { icon: 'alert', label: '风险预警', path: '/platform/risk-alerts' },
        { icon: 'cash', label: '追保管理', path: '/platform/supplementary' },
        { icon: 'list', label: '还款管理', path: '/platform/loan-repayment' },
        { icon: 'package', label: '资产管理', path: '/platform/asset-management' },
        { icon: 'chart', label: '综合统计', path: '/platform/data-statistics' },
      ]},
    ],
    guarantor: [
      { group: '工作台', items: [
        { icon: 'home', label: '首页概览', path: '/dashboard' },
      ]},
      { group: '融资审核', items: [
        { icon: 'shield-check', label: '融资审核', path: '/guarantor/approval-financing' },
      ]},
      { group: '质押管理', items: [
        { icon: 'list', label: '质押货物台账', path: '/guarantor/pledge-ledger' },
        { icon: 'alert', label: '风险监控', path: '/guarantor/risk-monitoring' },
      ]},
    ],
    bank: [
      { group: '工作台', items: [
        { icon: 'home', label: '首页概览', path: '/dashboard' },
      ]},
      { group: '授信与放款', items: [
        { icon: 'shield-check', label: '授信录入', path: '/bank/approval-credit' },
        { icon: 'cash', label: '放款审核', path: '/bank/approval-loan' },
      ]},
      { group: '贷后管理', items: [
        { icon: 'list', label: '质押货物台账', path: '/bank/pledge-ledger' },
        { icon: 'cash', label: '放还款记录', path: '/bank/loan-records' },
        { icon: 'alert', label: '到期预警', path: '/bank/due-alerts' },
        { icon: 'chart', label: '额度管理', path: '/bank/limit-management' },
      ]},
    ],
    warehouse: [
      { group: '工作台', items: [
        { icon: 'home', label: '首页概览', path: '/dashboard' },
      ]},
      { group: '入库作业', items: [
        { icon: 'box', label: '入库执行', path: '/warehouse/inbound' },
      ]},
      { group: '出库作业', items: [
        { icon: 'logistics', label: '出库执行', path: '/warehouse/outbound' },
      ]},
      { group: '在库管理', items: [
        { icon: 'package', label: '库存台账', path: '/warehouse/inventory' },
      ]},
    ],
  },

  // ========== 货品 SKU 库（来自真实盯市台账） ==========
  products: [
    { id: 'MNG_SNJ_3191397', name: '熟牛腱', country: '蒙古', factory: '3191397', unit: '千克', currentPrice: 76.77, priceChange: 3.74 },
    { id: 'MNG_SZNRQq_3191397', name: '水煮牛肉Qq', country: '蒙古', factory: '3191397', unit: '千克', currentPrice: 78.79, priceChange: 3.67 },
    { id: 'MNG_SZNRQh_3191397', name: '水煮牛肉Qh', country: '蒙古', factory: '3191397', unit: '千克', currentPrice: 78.79, priceChange: 3.67 },
    { id: 'AU_QGNXG_1265', name: '去骨牛心管', country: '澳洲', factory: '1265', unit: '千克', currentPrice: 74.74, priceChange: 6.77 },
    { id: 'AU_DGNRNXGG_1265', name: '带骨牛肉牛膝盖骨', country: '澳洲', factory: '1265', unit: '千克', currentPrice: 26.26, priceChange: 5.04 },
    { id: 'AU_NHGM_1265', name: '牛横膈膜', country: '澳洲', factory: '1265', unit: '千克', currentPrice: 34.00, priceChange: 0.00 },
    { id: 'AU_NBG_3085', name: '牛脖骨', country: '澳洲', factory: '3085', unit: '千克', currentPrice: 16.16, priceChange: -4.94 },
    { id: 'AU_HGM_3085', name: '横膈膜', country: '澳洲', factory: '3085', unit: '千克', currentPrice: 42.93, priceChange: 1.01 },
    { id: 'AU_NJG_243', name: '牛颈骨', country: '澳洲', factory: '243', unit: '千克', currentPrice: 23.73, priceChange: -3.14 },
    { id: 'AU_NXGG_1265', name: '牛膝盖骨', country: '澳洲', factory: '1265', unit: '千克', currentPrice: 26.00, priceChange: 0.00 },
    { id: 'NZ_DGGYRAG_YJG_137', name: '带骨羔羊肉鞍骨（羊脊骨）', country: '新西兰', factory: '137', unit: '千克', currentPrice: 25.00, priceChange: 0.00 },
    { id: 'NZ_LDDGMYYJP_50', name: '冷冻带骨绵羊腰脊排', country: '新西兰', factory: '50', unit: '千克', currentPrice: 46.00, priceChange: 0.00 },
    { id: 'NZ_LDDGGYRGYGG_86', name: '冷冻带骨羔羊肉羔羊股骨', country: '新西兰', factory: '86', unit: '千克', currentPrice: 22.50, priceChange: 0.00 },
    { id: 'MNG_SZSYR_BWS', name: '水煮山羊肉', country: '蒙古', factory: 'BWS', unit: '千克', currentPrice: 63.00, priceChange: 0.00 },
  ],

  // ========== 仓库 ==========
  warehouses: [
    { id: 'wh_001', name: '物流港二期大河智链监管库', type: '自有仓', address: '郑州市惠济区大河惠济国际食品贸易港', manager: '赵德昌', phone: '139 0000 2222', capacity: 5000 },
    { id: 'wh_002', name: '郑州融万冷链库', type: '第三方', address: '郑州市中牟县万邦物流园A区', manager: '孙浩', phone: '137 0000 4444', capacity: 8000 },
    { id: 'wh_003', name: '天津港国际冷链基地', type: '第三方', address: '天津市东疆保税港区', manager: '钱志远', phone: '136 0000 6666', capacity: 12000 },
  ],

  // ========== 真实业务记录（基于盯市台账 + 实际业务编号） ==========
  bizList: [
    {
      bizNo: 'DHZL_JMY_2025120101',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      productId: 'MNG_SNJ_3191397',
      productName: '熟牛腱',
      produceDate: 45959,
      inboundDate: 45992,
      batchNo: '25-10B78',
      loanNo: 'LN30XXXXXXXXXXXX',
      loanDate: 45994,
      dueDate: 46114,
      warehouse: '郑州融万冷链库',
      pieces: 1100,
      weight: 22000,
      evaluatePrice: 74,
      evaluateValue: 1628000,
      loanAmount: 1130000,
      repaidAmount: 0,
      remainingDebt: 1130000,
      currentPrice: 76.77,
      priceChangeRate: 3.74,
      pledgeRatio: 0.8,
      status: 'financing',
      remark: '',
    },
    {
      bizNo: 'DHZL_JMY_2025120901',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      productId: 'MNG_SZNRQq_3191397',
      productName: '水煮牛肉Qq',
      produceDate: 45961,
      inboundDate: 46000,
      batchNo: 'ZXT20251129002',
      loanNo: 'LN30XXXXXXXXXXXX',
      loanDate: 46004,
      dueDate: 46124,
      warehouse: '郑州融万冷链库',
      pieces: 425,
      weight: 8500,
      evaluatePrice: 76,
      evaluateValue: 646000,
      loanAmount: 450000,
      repaidAmount: 0,
      remainingDebt: 450000,
      currentPrice: 78.79,
      priceChangeRate: 3.67,
      pledgeRatio: 0.8,
      status: 'financing',
    },
    {
      bizNo: 'DHZL_JMY_2026012601',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      productId: 'AU_QGNXG_1265',
      productName: '去骨牛心管',
      produceDate: 46048,
      inboundDate: 46048,
      batchNo: 'LN30XXXXXXXXXXXX',
      loanNo: 'LN30XXXXXXXXXXXX',
      loanDate: 46049,
      dueDate: 45804,
      warehouse: '天津港国际冷链基地',
      pieces: 113,
      weight: 3073.6,
      evaluatePrice: 70,
      evaluateValue: 215152,
      loanAmount: 2030000,
      repaidAmount: 0,
      remainingDebt: 0,
      currentPrice: 74.74,
      priceChangeRate: 6.77,
      pledgeRatio: 0.8,
      status: 'warning', // -5% 预警
    },
    {
      bizNo: 'DHZL_JMY_2026052501',
      customer: '郑州某冷链物流有限公司',
      customerCode: 'GL',
      productId: 'AUTO_MULTI',
      productName: '冷冻去骨牛7件套',
      produceDate: '2025-09',
      inboundDate: 46166,
      batchNo: 'CGMU5711540/MSWU0105564',
      loanNo: 'LN30XXXXXXXXXXXX',
      loanDate: 46168,
      dueDate: 46288,
      warehouse: '物流港二期大河智链监管库',
      pieces: 1716,
      weight: 39853.96,
      evaluatePrice: 55.5,
      evaluateValue: 2211894.56,
      loanAmount: 1760000,
      repaidAmount: 0,
      remainingDebt: 1760000,
      currentPrice: 55.50,
      priceChangeRate: 0,
      pledgeRatio: 0.8,
      status: 'released',
    },
    {
      bizNo: 'DHZL_JMY_2026013101',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      productId: 'AU_NJG_243',
      productName: '牛颈骨',
      produceDate: 46053,
      inboundDate: 46053,
      batchNo: 'MNDU9228587',
      loanNo: 'LN30XXXXXXXXXXXX',
      loanDate: 46056,
      dueDate: 46176,
      warehouse: '天津港国际冷链基地',
      pieces: 1153,
      weight: 19031.21,
      evaluatePrice: 24.5,
      evaluateValue: 466264.55,
      loanAmount: 320000,
      repaidAmount: 0,
      remainingDebt: 320000,
      currentPrice: 23.73,
      priceChangeRate: -3.14, // -5% 提醒
      pledgeRatio: 0.8,
      status: 'running',
    },
    {
      bizNo: 'DHZL_JMY_2026042701',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      productId: 'MIX_Multi_Product',
      productName: '羔羊肉+牛心管+牛膝盖骨',
      produceDate: 45930,
      inboundDate: 46137,
      batchNo: 'MNBU4081581/BURU8881272/SEGU9763888',
      loanNo: 'LN30XXXXXXXXXXXX',
      loanDate: 46140,
      dueDate: 46260,
      warehouse: '天津港国际冷链基地',
      pieces: 1850,
      weight: 32400,
      evaluatePrice: 32,
      evaluateValue: 1100000,
      loanAmount: 720000,
      repaidAmount: 0,
      remainingDebt: 720000,
      currentPrice: 32.00,
      priceChangeRate: 0,
      pledgeRatio: 0.8,
      status: 'financing',
    },
  ],

  // ========== 客户准入申请（待办） ==========
  admissionList: [
    // ----- 草稿状态（操作人保存，未提交）-----
    {
      id: 'adm_004',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '陈志强',
      registeredCap: '3000万元',
      established: '2019-06-10',
      bizScope: '冻品批发零售；进口贸易',
      applyDate: '2026-07-08',
      status: 'draft',
      currentApprover: null,
      progress: 0,
      totalSteps: 4,
      attachments: ['营业执照.pdf', '财务报表2025.pdf'], // 材料未补全
      drafter: '陈志强',
      remark: '草稿状态：完税证明与征信报告待补充',
    },
    {
      id: 'adm_005',
      customer: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '陈志强',
      registeredCap: '3000万元',
      established: '2019-06-10',
      bizScope: '冻品批发零售；进口贸易',
      applyDate: '2026-07-07',
      status: 'draft',
      currentApprover: null,
      progress: 0,
      totalSteps: 4,
      attachments: ['营业执照.pdf'],
      drafter: '陈志强',
      remark: '新建空草稿，待填写完整信息',
    },
    // ----- 待审核 -----
    {
      id: 'adm_001',
      customer: '郑州某冷链物流有限公司',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '吴建波',
      registeredCap: '5000万元',
      established: '2018-03-15',
      bizScope: '冷链物流服务；冻品批发零售；供应链管理服务',
      applyDate: '2026-07-05',
      status: 'pending',
      currentApprover: 'platform',
      progress: 1,
      totalSteps: 5,  // 增加签章节点
      attachments: ['营业执照.pdf', '财务报表2025.pdf', '完税证明.pdf'],
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: true,
    },
    // ----- 审核中 -----
    {
      id: 'adm_002',
      customer: '河南某冷链股份有限公司',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '韩志远',
      registeredCap: '1亿元',
      established: '2015-08-22',
      bizScope: '冷链仓储、冻品贸易、国际货运代理',
      applyDate: '2026-07-02',
      status: 'reviewing',
      currentApprover: 'platform',
      progress: 2,
      totalSteps: 5,
      attachments: ['营业执照.pdf', '财报2025.pdf', '征信报告.pdf'],
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: true,
    },
    // ----- 已通过 -----
    {
      id: 'adm_003',
      customer: '郑州某冷链贸易有限公司',
      creditCode: '91XXXXXXXXMAXXXXXXXX',
      legalRep: '陈志强',
      registeredCap: '3000万元',
      established: '2019-06-10',
      bizScope: '冻品批发零售；进口贸易',
      applyDate: '2025-11-15',
      status: 'approved',
      currentApprover: null,
      progress: 5,
      totalSteps: 5,
      creditLimit: 50000000,
      attachments: ['全部已归档'],
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: true,
    },
    // ----- 已驳回示例 -----
    {
      id: 'adm_006',
      customer: '洛阳冷联食品贸易有限公司',
      creditCode: '91410300MA8X2RT5P',
      legalRep: '张明远',
      registeredCap: '800万元',
      established: '2020-09-18',
      bizScope: '冷链运输、冻品零售',
      applyDate: '2026-06-28',
      status: 'rejected',
      currentApprover: null,
      progress: 2,
      totalSteps: 5,
      attachments: ['营业执照.pdf', '财报2025.pdf'],
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: true,
      rejectReason: '近 12 个月存在 3 起诉讼，且注册资本低于准入门槛（建议 ≥ 1000 万元）',
    },
  ],

  // ========== 入库申请 ==========
  inboundList: [
    {
      id: 'in_001',
      bizNo: 'IN_20260705001',
      applicant: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      warehouse: '物流港二期大河智链监管库',
      vehicleNo: '豫A·F8829',
      driver: '张大伟',
      driverPhone: '138 0000 5678',
      products: [
        { id: 'MNG_SZSYR_BWS', name: '水煮山羊肉', pieces: 1190, weight: 23800, evaluatePrice: 63, evaluateValue: 1499400 },
      ],
      totalValue: 1499400,
      expectedLoan: 1190000,
      applyDate: '2026-07-05',
      inboundDate: '2026-07-06',
      status: 'reviewing',
      currentApprover: 'platform',
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: false,
      creator: '陈志强',
      creatorUserRole: 'operator',
    },
    {
      id: 'in_002',
      bizNo: 'IN_20260702001',
      applicant: '郑州某冷链物流有限公司',
      customerCode: 'GL',
      warehouse: '物流港二期大河智链监管库',
      vehicleNo: '豫A·H5521',
      driver: '李明',
      driverPhone: '139 0000 4321',
      products: [
        { id: 'AUTO_MULTI', name: '冷冻去骨牛7件套', pieces: 1716, weight: 39853.96, evaluatePrice: 55.5, evaluateValue: 2211894.56 },
      ],
      totalValue: 2211894.56,
      expectedLoan: 1760000,
      applyDate: '2026-05-23',
      inboundDate: '2026-05-25',
      status: 'inbound',
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: true,
      creator: '陈志强',
      creatorUserRole: 'operator',
    },
    // v1.7.3 新增：演示给盖章人李雪待盖章的入库申请
    {
      id: 'in_003',
      bizNo: 'IN_20260709001',
      applicant: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      warehouse: '天津港国际冷链基地',
      vehicleNo: '豫A·K3318',
      driver: '王建国',
      driverPhone: '138 0000 7788',
      products: [
        { id: 'MNG_SZNRQq_3191397', name: '蒙古水煮牛肉Qq', pieces: 480, weight: 9600, evaluatePrice: 78, evaluateValue: 748800 },
      ],
      totalValue: 748800,
      expectedLoan: 599040,
      applyDate: '2026-07-09',
      inboundDate: '2026-07-11',
      status: 'pending_owner_seal',
      currentApprover: 'customer_seal',
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: false,
      creator: '陈志强',
      creatorUserRole: 'operator',
    },
    {
      id: 'in_004',
      bizNo: 'IN_20260708001',
      applicant: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      warehouse: '物流港二期大河智链监管库',
      vehicleNo: '豫A·L9201',
      driver: '刘海涛',
      driverPhone: '139 0000 4455',
      products: [
        { id: 'MNG_QGNXG', name: '去骨牛心管', pieces: 850, weight: 17000, evaluatePrice: 74, evaluateValue: 1258000 },
      ],
      totalValue: 1258000,
      expectedLoan: 1006400,
      applyDate: '2026-07-08',
      inboundDate: '2026-07-10',
      status: 'pending_owner_seal',
      currentApprover: 'customer_seal',
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: false,
      creator: '李雪',
      creatorUserRole: 'sealUser',
    },
    {
      id: 'in_005',
      bizNo: 'IN_20260706001',
      applicant: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      warehouse: '物流港二期大河智链监管库',
      vehicleNo: '豫A·M7152',
      driver: '赵建斌',
      driverPhone: '136 0000 1234',
      products: [
        { id: 'MNG_NJG', name: '牛颈骨', pieces: 660, weight: 13200, evaluatePrice: 24.5, evaluateValue: 323400 },
      ],
      totalValue: 323400,
      expectedLoan: 258720,
      applyDate: '2026-07-06',
      inboundDate: '2026-07-08',
      status: 'rejected',
      currentApprover: null,
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: false,
      creator: '陈志强',
      creatorUserRole: 'operator',
      rejectReason: '货值评估下浮比例超出业务规则上限（建议 5%-10%），当前 12% 过高，请重新提交并调整下浮比例至 8%。',
      rejectTime: '2026-07-07 16:45',
    },
    {
      id: 'in_006',
      bizNo: 'IN_20260705002',
      applicant: '郑州某冷链贸易有限公司',
      customerCode: 'JMY',
      warehouse: '郑州融万冷链库',
      vehicleNo: '豫A·N8846',
      driver: '陈大壮',
      driverPhone: '135 0000 3344',
      products: [
        { id: 'MNG_GPYR', name: '羔羊肉', pieces: 320, weight: 6400, evaluatePrice: 56, evaluateValue: 358400 },
      ],
      totalValue: 358400,
      expectedLoan: 286720,
      applyDate: '2026-07-05',
      inboundDate: '2026-07-07',
      status: 'rejected',
      currentApprover: null,
      drafter: '陈志强',
      sealUser: '李雪',
      sealCompleted: false,
      creator: '陈志强',
      creatorUserRole: 'operator',
      rejectReason: '随附单据不完整：缺少《入境货物检验检疫证明》，请补充后重新提交。',
      rejectTime: '2026-07-06 14:20',
    },
    // ========== v1.7.5 新增：可质押货物（已入库待融资，inbound_completed） ==========
    {
      id: 'in_p_001', bizNo: 'IN_20231010001', applicant: '郑州某冷链贸易有限公司', customerCode: 'JMY',
      warehouse: '大河物流园二期', warehouseCode: 'wh_001', storageLocation: '冻品一区-A 仓-01 货位',
      vehicleNo: '豫A·H8821', driver: '张大伟', driverPhone: '138 0000 5678',
      products: [{ id: 'MNG_SZSYR_BWS_001', name: '保乐肩-巴西-4490', pieces: 140, weight: 3000, evaluatePrice: 75, evaluateValue: 225000 }],
      totalValue: 225000, applyDate: '2023-10-01', inboundDate: '2023-10-10 12:33:34',
      status: 'inbound_completed', availablePieces: 140, availableWeight: 3000, pledgedPieces: 0, pledgedWeight: 0,
    },
    {
      id: 'in_p_002', bizNo: 'IN_20231010002', applicant: '郑州某冷链贸易有限公司', customerCode: 'JMY',
      warehouse: '大河物流园二期', warehouseCode: 'wh_001', storageLocation: '冻品一区-A 仓-02 货位',
      vehicleNo: '豫A·H8821', driver: '张大伟', driverPhone: '138 0000 5678',
      products: [{ id: 'MNG_SZSYR_BWS_002', name: '保乐肩-巴西-4490', pieces: 140, weight: 3000, evaluatePrice: 75, evaluateValue: 225000 }],
      totalValue: 225000, applyDate: '2023-10-01', inboundDate: '2023-10-10 12:33:34',
      status: 'inbound_completed', availablePieces: 140, availableWeight: 3000, pledgedPieces: 0, pledgedWeight: 0,
    },
    {
      id: 'in_p_003', bizNo: 'IN_20231010003', applicant: '郑州某冷链贸易有限公司', customerCode: 'JMY',
      warehouse: '大河物流园二期', warehouseCode: 'wh_001', storageLocation: '冻品一区-A 仓-03 货位',
      vehicleNo: '豫A·H8821', driver: '张大伟', driverPhone: '138 0000 5678',
      products: [{ id: 'MNG_SZSYR_BWS_003', name: '保乐肩-巴西-4490', pieces: 140, weight: 3000, evaluatePrice: 75, evaluateValue: 225000 }],
      totalValue: 225000, applyDate: '2023-10-01', inboundDate: '2023-10-10 12:33:34',
      status: 'inbound_completed', availablePieces: 140, availableWeight: 3000, pledgedPieces: 0, pledgedWeight: 0,
    },
    {
      id: 'in_p_004', bizNo: 'IN_20231215001', applicant: '郑州某冷链贸易有限公司', customerCode: 'JMY',
      warehouse: '大河物流园二期', warehouseCode: 'wh_001', storageLocation: '冻品二区-B 仓-05 货位',
      vehicleNo: '豫A·L3318', driver: '李明', driverPhone: '138 0000 4321',
      products: [{ id: 'MNG_QGNXG_001', name: '去骨牛心管', pieces: 280, weight: 6000, evaluatePrice: 74, evaluateValue: 444000 }],
      totalValue: 444000, applyDate: '2023-12-15', inboundDate: '2023-12-18 09:15:00',
      status: 'inbound_completed', availablePieces: 280, availableWeight: 6000, pledgedPieces: 0, pledgedWeight: 0,
    },
    {
      id: 'in_p_005', bizNo: 'IN_20240110001', applicant: '郑州某冷链贸易有限公司', customerCode: 'JMY',
      warehouse: '天津港国际冷链基地', warehouseCode: 'wh_003', storageLocation: '冻品三区-C 仓-12 货位',
      vehicleNo: '豫A·K9201', driver: '王建国', driverPhone: '138 0000 7788',
      products: [{ id: 'MNG_NJG_001', name: '牛颈骨', pieces: 100, weight: 2000, evaluatePrice: 24.5, evaluateValue: 49000 }],
      totalValue: 49000, applyDate: '2024-01-10', inboundDate: '2024-01-15 14:20:00',
      status: 'inbound_completed', availablePieces: 100, availableWeight: 2000, pledgedPieces: 0, pledgedWeight: 0,
    },
    {
      id: 'in_p_006', bizNo: 'IN_20240320001', applicant: '郑州某冷链贸易有限公司', customerCode: 'JMY',
      warehouse: '郑州融万冷链库', warehouseCode: 'wh_002', storageLocation: '冻品一区-A 仓-08 货位',
      vehicleNo: '豫A·M7152', driver: '赵建斌', driverPhone: '138 0000 1234',
      products: [{ id: 'MNG_GPYR_001', name: '羔羊肉', pieces: 200, weight: 4000, evaluatePrice: 56, evaluateValue: 224000 }],
      totalValue: 224000, applyDate: '2024-03-20', inboundDate: '2024-03-22 10:00:00',
      status: 'inbound_completed', availablePieces: 200, availableWeight: 4000, pledgedPieces: 0, pledgedWeight: 0,
    },
  ],

  // ========== 融资申请 ==========
  financingList: [
    {
      id: 'fn_001',
      bizNo: 'FN_20260705001',
      applicant: '郑州某冷链贸易有限公司',
      inboundBizNo: 'IN_20260705001',
      pledgeBizNo: 'PLEDGE_20260708001',
      evaluateValue: 1499400,
      pledgeRatio: 0.8,
      applyAmount: 1190000,
      duration: 120,
      status: 'pending',
      currentApprover: 'platform',
      applyDate: '2026-07-08',
      products: [
        { name: '水煮山羊肉', pieces: 1190, weight: 23800, evaluatePrice: 63, evaluateValue: 1499400 },
      ],
    },
  ],

  // ========== 价格预警记录 ==========
  priceAlerts: [
    {
      id: 'pa_001',
      bizNo: 'DHZL_JMY_2026012601',
      productName: '去骨牛心管',
      customer: '郑州某冷链贸易有限公司',
      priceChangeRate: 6.77,
      threshold: 5,
      level: 'warning',
      alertTime: '2026-07-08 09:30:00',
      status: 'pending',
      suggestedAction: '补充质押物 ¥152,000 或提前还款 ¥80,000',
    },
    {
      id: 'pa_002',
      bizNo: 'DHZL_JMY_2026013101',
      productName: '牛颈骨',
      customer: '郑州某冷链贸易有限公司',
      priceChangeRate: -3.14,
      threshold: 5,
      level: 'warning',
      alertTime: '2026-07-08 09:30:00',
      status: 'pending',
      suggestedAction: '建议客户关注后续价格走势',
    },
  ],

  // ========== 系统通知 ==========
  notifications: [
    { id: 'n1', type: 'warn', title: '价格预警：去骨牛心管上涨 6.77%', time: '2026-07-08 09:30', unread: true },
    { id: 'n2', type: 'info', title: '入库申请 IN_20260705001 待您审批', time: '2026-07-08 09:15', unread: true },
    { id: 'n3', type: 'success', title: '融资申请 FN_20260705001 已通过', time: '2026-07-08 08:42', unread: false },
    { id: 'n4', type: 'info', title: '还款提醒：DHZL_JMY_2025120101 还有 7 天到期', time: '2026-07-08 08:00', unread: false },
  ],

  // ========== 月度账单（5月份样本） ==========
  bills: [
    {
      id: 'bill_202605_jmy',
      customer: '郑州某冷链贸易有限公司',
      period: '2026-05',
      supervisionFee: 18230.50,
      guaranteeFee: 14250.00,
      storageFee: 32480.00,
      handlingFee: 8330.00, // 70元/吨 × 119吨
      total: 73290.50,
      status: 'pending',
    },
  ],

  // ========== 监管方 Dashboard 数据 ==========
  platformStats: {
    activeCustomers: 12,
    inStockValue: 85620000,    // 8,562 万
    financingBalance: 68500000, // 6,850 万
    monthlyNewLoans: 4,
    pendingApprovals: 7,
    riskAlerts: 2,
    warehouseUtilization: 78,
  },

  // ========== 货主方 Dashboard 数据 ==========
  customerStats: {
    creditLimit: 50000000,     // 5,000 万授信
    creditUsed: 42100000,      // 4,210 万已用
    creditAvailable: 7900000,  // 790 万可用
    activeFinancing: 3,        // 在贷融资笔数
    totalStock: 36500,         // 在库总重（千克）
    stockValue: 3215000,       // 在库总货值
    monthlyRepayment: 1820000, // 本月应还
    expiringLoans: 1,         // 7天内到期
  },

  // ========== 风险预警中心（监管方） ==========
  riskAlerts: [
    { id: 'ra_001', bizNo: 'DHZL_JMY_2026012601', customer: '郑州某冷链', product: '去骨牛心管', warehouse: '天津港国际', level: 'warning', priceChange: 6.77, currentPrice: 74.74, evaluatePrice: 70, remainingDebt: 2030000, suggestedAction: '补充质押 ¥80,000 或提前还款', alertTime: '2026-07-08 09:30', status: 'pending', handler: null },
    { id: 'ra_002', bizNo: 'DHZL_JMY_2026013101', customer: '郑州某冷链', product: '牛颈骨', warehouse: '天津港国际', level: 'warning', priceChange: -3.14, currentPrice: 23.73, evaluatePrice: 24.5, remainingDebt: 320000, suggestedAction: '持续关注价格走势', alertTime: '2026-07-08 09:30', status: 'pending', handler: null },
    { id: 'ra_003', bizNo: 'DHZL_JMY_2026042701', customer: '郑州某冷链', product: '羔羊肉+牛心管+牛膝盖骨', warehouse: '天津港国际', level: 'danger', priceChange: -12.5, currentPrice: 28.00, evaluatePrice: 32.00, remainingDebt: 720000, suggestedAction: '熔断！客户须 3 个工作日内补货 ¥25万 或提前还款', alertTime: '2026-07-07 14:15', status: 'processing', handler: '李雪' },
    { id: 'ra_004', bizNo: 'DHZL_GL_2026052501', customer: '郑州固联', product: '冷冻去骨牛7件套', warehouse: '物流港二期大河智链监管库', level: 'warning', priceChange: 5.20, currentPrice: 58.40, evaluatePrice: 55.50, remainingDebt: 1760000, suggestedAction: '建议补保 ¥95,000', alertTime: '2026-07-06 10:00', status: 'resolved', handler: '王建国' },
  ],

  // ========== 追保记录（监管方） ==========
  supplementaryRecords: [
    { id: 'sp_001', bizNo: 'DHZL_GL_2026052501', customer: '郑州固联', product: '冷冻去骨牛7件套', triggerTime: '2026-07-06 10:00', triggerReason: '价格上涨 5.20% 触发预警', requiredAmount: 95000, status: 'completed', completeTime: '2026-07-06 18:30', method: '补充质押 8500kg 冷冻去骨牛7件套' },
    { id: 'sp_002', bizNo: 'DHZL_JMY_2026012601', customer: '郑州某冷链', product: '去骨牛心管', triggerTime: '2026-07-08 09:30', triggerReason: '价格上涨 6.77% 触发预警', requiredAmount: 80000, status: 'notifying', method: '' },
    { id: 'sp_003', bizNo: 'DHZL_JMY_2026042701', customer: '郑州某冷链', product: '羔羊肉+牛心管', triggerTime: '2026-07-07 14:15', triggerReason: '价格下跌 12.5% 触发熔断', requiredAmount: 250000, status: 'pending', method: '' },
  ],

  // ========== 资产包（数字资产 · 监管方） ==========
  assetPackages: [
    { id: 'ap_001', bizNo: 'DHZL_JMY_2026050901', customer: '郑州某冷链', packageType: '仓单质押', totalValue: 1499400, loanAmount: 1190000, contractCount: 5, transportDoc: 3, inboundDoc: 2, inventoryDoc: 1, status: 'verified', verifyTime: '2026-07-02 16:00', verifier: '系统自动' },
    { id: 'ap_002', bizNo: 'DHZL_JMY_2026012601', customer: '郑州某冷链', packageType: '仓单质押', totalValue: 4252000, loanAmount: 2030000, contractCount: 8, transportDoc: 5, inboundDoc: 3, inventoryDoc: 2, status: 'verified', verifyTime: '2026-06-15 11:30', verifier: '系统自动' },
    { id: 'ap_003', bizNo: 'DHZL_GL_2026052501', customer: '郑州固联', packageType: '仓单质押', totalValue: 2211895, loanAmount: 1760000, contractCount: 6, transportDoc: 4, inboundDoc: 2, inventoryDoc: 1, status: 'pending', verifyTime: null, verifier: null },
  ],

  // ========== 还款记录（监管方 + 资金方） ==========
  repaymentRecords: [
    { id: 'rp_001', bizNo: 'DHZL_JMY_2026050901', customer: '郑州某冷链', loanNo: 'LN30XXXXXXXXXXXX', repayDate: '2026-05-28', repayType: '部分还款', repayAmount: 196560, remainingDebt: 993440, status: 'completed' },
    { id: 'rp_002', bizNo: 'DHZL_JMY_2026012701', customer: '郑州某冷链', loanNo: 'LN30XXXXXXXXXXXX', repayDate: '2026-06-15', repayType: '部分还款', repayAmount: 32082, remainingDebt: 0, status: 'completed' },
    { id: 'rp_003', bizNo: 'DHZL_JMY_2026042701', customer: '郑州某冷链', loanNo: 'LN30XXXXXXXXXXXX', repayDate: '2026-08-10', repayType: '到期还本付息', repayAmount: 738600, remainingDebt: 720000, status: 'pending', dueIn: 33 },
    { id: 'rp_004', bizNo: 'DHZL_JMY_2025120101', customer: '郑州某冷链', loanNo: 'LN30XXXXXXXXXXXX', repayDate: '2026-07-15', repayType: '到期还本付息', repayAmount: 1163900, remainingDebt: 1130000, status: 'pending', dueIn: 7 },
  ],

  // ========== 额度管理（资金方） ==========
  creditLimits: [
    { id: 'cl_001', customer: '郑州某冷链贸易有限公司', creditCode: '91XXXXXXXXMAXXXXXXXX', totalLimit: 50000000, usedLimit: 42100000, availableLimit: 7900000, validFrom: '2025-11-16', validTo: '2026-11-15', interestRate: '4.35%', status: 'active', bizCount: 4 },
    { id: 'cl_002', customer: '郑州某冷链物流有限公司', creditCode: '91XXXXXXXXMAXXXXXXXX', totalLimit: 30000000, usedLimit: 17600000, availableLimit: 12400000, validFrom: '2026-03-20', validTo: '2027-03-19', interestRate: '4.55%', status: 'active', bizCount: 2 },
    { id: 'cl_003', customer: '河南某冷链股份有限公司', creditCode: '91XXXXXXXXMAXXXXXXXX', totalLimit: 20000000, usedLimit: 0, availableLimit: 20000000, validFrom: '2026-06-01', validTo: '2027-05-31', interestRate: '4.75%', status: 'active', bizCount: 0 },
  ],

  // ========== 平台方（冻品在线交易平台）数据 ==========
  // 平台方 = 大河智链的 B2B 电商交易平台身份，与监管方是同一公司不同业务场景
  platformTradeStats: {
    listedProducts: 156,        // 在售商品数
    activeOrders: 28,           // 进行中订单
    monthlyGMV: 12800000,       // 本月 GMV
    monthlyGrowth: 18,          // 同比增长 %
    activeBuyers: 32,           // 活跃买方
    activeSellers: 18,           // 活跃卖方
  },

  // 商品列表（商城大厅）
  products_market: [
    { id: 'PM001', title: '蒙古水煮牛肉Qq 优质货源 大量现货', category: '牛肉', country: '蒙古', productId: 'MNG_SZNRQq_3191397', weight: 5000, unitPrice: 78.50, totalPrice: 392500, pieces: 250, seller: '郑州某冷链贸易有限公司', sellerId: 'u_cust_001', images: 5, salesCount: 12, inventory: 25000, status: 'on_sale', publishDate: '2026-07-01', certType: '已检疫', deliveryMethod: '全国冷链配送', minOrder: 500 },
    { id: 'PM002', title: '澳洲去骨牛心管 进口报关齐全', category: '牛肉', country: '澳洲', productId: 'AU_QGNXG_1265', weight: 3073.6, unitPrice: 75.00, totalPrice: 230520, pieces: 113, seller: '郑州某冷链物流有限公司', sellerId: 'u_cust_002', images: 4, salesCount: 8, inventory: 3073.6, status: 'on_sale', publishDate: '2026-07-03', certType: '已检疫', deliveryMethod: '天津港直发', minOrder: 1000 },
    { id: 'PM003', title: '新西兰羔羊肉鞍骨 高端餐饮渠道', category: '羊肉', country: '新西兰', productId: 'NZ_DGGYRAG_YJG_137', weight: 7139.4, unitPrice: 26.50, totalPrice: 189194, pieces: 379, seller: '郑州某冷链贸易有限公司', sellerId: 'u_cust_001', images: 6, salesCount: 5, inventory: 7139.4, status: 'on_sale', publishDate: '2026-07-05', certType: '已检疫', deliveryMethod: '冷链直送', minOrder: 500 },
    { id: 'PM004', title: '蒙古熟牛腱 工厂直供 量大从优', category: '牛肉', country: '蒙古', productId: 'MNG_SNJ_3191397', weight: 22000, unitPrice: 75.00, totalPrice: 1650000, pieces: 1100, seller: '郑州某冷链贸易有限公司', sellerId: 'u_cust_001', images: 5, salesCount: 18, inventory: 22000, status: 'on_sale', publishDate: '2026-06-28', certType: '已检疫', deliveryMethod: '郑州本地配送', minOrder: 2000 },
    { id: 'PM005', title: '蒙古水煮山羊肉 清真认证', category: '羊肉', country: '蒙古', productId: 'MNG_SZSYR_BWS', weight: 23800, unitPrice: 64.00, totalPrice: 1523200, pieces: 1190, seller: '郑州某冷链贸易有限公司', sellerId: 'u_cust_001', images: 4, salesCount: 9, inventory: 20800, status: 'on_sale', publishDate: '2026-06-30', certType: '已检疫', deliveryMethod: '冷链配送', minOrder: 1000 },
    { id: 'PM006', title: '冷冻去骨牛7件套 大宗批发', category: '牛肉', country: '澳洲', productId: 'AUTO_MULTI', weight: 39854, unitPrice: 56.00, totalPrice: 2231824, pieces: 1716, seller: '郑州某冷链物流有限公司', sellerId: 'u_cust_002', images: 8, salesCount: 3, inventory: 39854, status: 'on_sale', publishDate: '2026-07-02', certType: '已检疫', deliveryMethod: '全国配送', minOrder: 5000 },
    { id: 'PM007', title: '澳洲牛颈骨 高品质低价', category: '牛肉', country: '澳洲', productId: 'AU_NJG_243', weight: 19031, unitPrice: 24.50, totalPrice: 466264, pieces: 1153, seller: '郑州某冷链贸易有限公司', sellerId: 'u_cust_001', images: 4, salesCount: 6, inventory: 19031, status: 'on_sale', publishDate: '2026-07-04', certType: '已检疫', deliveryMethod: '全国配送', minOrder: 1000 },
    { id: 'PM008', title: '澳洲牛膝盖骨 工厂直销', category: '牛肉', country: '澳洲', productId: 'AU_NXGG_1265', weight: 7579.05, unitPrice: 26.50, totalPrice: 200845, pieces: 408, seller: '郑州某冷链物流有限公司', sellerId: 'u_cust_002', images: 3, salesCount: 4, inventory: 7579, status: 'on_sale', publishDate: '2026-07-06', certType: '已检疫', deliveryMethod: '冷链配送', minOrder: 500 },
  ],

  // 供求信息
  supplyDemands: [
    { id: 'SD001', type: '集采', title: '【集采需求】5 吨熟牛腱（蒙古）', company: '河南某冷链股份有限公司', productId: 'MNG_SNJ_3191397', quantity: 5000, maxPrice: 76.00, validTo: '2026-07-31', delivery: '郑州', paymentMethod: '货到付款', contact: '韩志远 138 0000 1111', status: 'recruiting', participantCount: 5, publishTime: '2026-07-06' },
    { id: 'SD002', type: '求购', title: '【求购】澳洲去骨牛心管 2 吨', company: '洛阳冷联食品贸易有限公司', productId: 'AU_QGNXG_1265', quantity: 2000, maxPrice: 75.00, validTo: '2026-07-20', delivery: '洛阳', paymentMethod: '银行转账', contact: '张明远 137 0000 2222', status: 'active', publishTime: '2026-07-07' },
    { id: 'SD003', type: '集采', title: '【平台集采】羔羊肉+牛心管 8吨', company: '大河智链平台', productId: 'MIX_Multi', quantity: 8000, maxPrice: 32.00, validTo: '2026-07-25', delivery: '物流港二期', paymentMethod: '30 天账期', contact: '平台运营 - 王经理 139 0000 3333', status: 'recruiting', participantCount: 3, publishTime: '2026-07-05' },
    { id: 'SD004', type: '寄售', title: '【寄售】蒙古水煮牛肉 Qq 3 吨', company: '郑州某冷链贸易有限公司', productId: 'MNG_SZNRQq_3191397', quantity: 3000, maxPrice: 78.00, validTo: '2026-08-15', delivery: '郑州', paymentMethod: '销售后结算', contact: '陈志强 138 0000 6688', status: 'active', publishTime: '2026-07-04' },
    { id: 'SD005', type: '求购', title: '【紧急求购】新西兰羊排 1 吨', company: '郑州思念食品有限公司', productId: 'NZ_LDDGMYYJP_50', quantity: 1000, maxPrice: 47.00, validTo: '2026-07-15', delivery: '郑州', paymentMethod: '现款现货', contact: '王采购 136 0000 4444', status: 'urgent', publishTime: '2026-07-08' },
  ],

  // 订单
  tradeOrders: [
    { id: 'TO001', orderNo: 'TO20260705001', productTitle: '蒙古水煮牛肉Qq 优质货源', buyer: '河南某冷链股份有限公司', seller: '郑州某冷链贸易有限公司', productId: 'PM001', quantity: 1500, unitPrice: 78.50, totalAmount: 117750, status: 'paid', orderType: 'normal', tradeType: '一口价', createTime: '2026-07-05 14:30', payTime: '2026-07-05 15:00', deliveryTime: null },
    { id: 'TO002', orderNo: 'TO20260704001', productTitle: '澳洲去骨牛心管 进口报关齐全', buyer: '洛阳冷联食品贸易有限公司', seller: '郑州某冷链物流有限公司', productId: 'PM002', quantity: 2000, unitPrice: 75.00, totalAmount: 150000, status: 'shipping', orderType: 'normal', tradeType: '议价', createTime: '2026-07-04 10:15', payTime: '2026-07-04 11:00', deliveryTime: '2026-07-08' },
    { id: 'TO003', orderNo: 'TO20260703001', productTitle: '蒙古熟牛腱 工厂直供', buyer: '郑州思念食品有限公司', seller: '郑州某冷链贸易有限公司', productId: 'PM004', quantity: 2000, unitPrice: 75.00, totalAmount: 150000, status: 'completed', orderType: 'normal', tradeType: '一口价', createTime: '2026-07-03 09:00', payTime: '2026-07-03 09:30', deliveryTime: '2026-07-04' },
    { id: 'TO004', orderNo: 'TO20260702001', productTitle: '【平台集采】羔羊肉+牛心管 8吨', buyer: '大河智链平台', seller: '郑州某冷链贸易有限公司', productId: 'SD003', quantity: 3000, unitPrice: 32.00, totalAmount: 96000, status: 'pending', orderType: 'groupbuy', tradeType: '集采', createTime: '2026-07-02 11:00', payTime: null, deliveryTime: null },
    { id: 'TO005', orderNo: 'TO20260701001', productTitle: '蒙古水煮山羊肉 清真认证', buyer: '郑州哈力牧业', seller: '郑州某冷链贸易有限公司', productId: 'PM005', quantity: 1000, unitPrice: 64.00, totalAmount: 64000, status: 'cancelled', orderType: 'normal', tradeType: '一口价', createTime: '2026-07-01 16:00', payTime: null, deliveryTime: null },
    { id: 'TO006', orderNo: 'TO20260630001', productTitle: '新西兰羔羊肉鞍骨 高端餐饮', buyer: '上海鼎泰丰', seller: '郑州某冷链贸易有限公司', productId: 'PM003', quantity: 500, unitPrice: 26.50, totalAmount: 13250, status: 'completed', orderType: 'normal', tradeType: '一口价', createTime: '2026-06-30 13:00', payTime: '2026-06-30 14:00', deliveryTime: '2026-07-02' },
  ],

  // ========== 仓库方数据 ==========
  warehouseStats: {
    totalInbound: 28,        // 本月入库单数
    totalOutbound: 12,      // 本月出库单数
    inStockValue: 56800000, // 在库货值
    utilizationRate: 78,    // 利用率
    pendingInbound: 3,      // 待入库
    pendingOutbound: 2,     // 待出库
    dailyHandling: 156,     // 日均处理件数
  },

  warehouseInboundList: [
    { id: 'win_001', orderNo: 'IN_20260705001', applicant: '郑州某冷链', vehicleNo: '豫A·F8829', driver: '张大伟', product: '水煮山羊肉', pieces: 1190, weight: 23800, warehouse: '物流港二期大河智链监管库', plannedTime: '2026-07-06 09:00', actualTime: null, status: 'pending' },
    { id: 'win_002', orderNo: 'IN_20260703001', applicant: '郑州固联', vehicleNo: '豫A·H5521', driver: '李明', product: '冷冻去骨牛7件套', pieces: 1716, weight: 39854, warehouse: '物流港二期大河智链监管库', plannedTime: '2026-07-04 10:00', actualTime: '2026-07-04 10:25', status: 'completed' },
    { id: 'win_003', orderNo: 'IN_20260702001', applicant: '郑州某冷链', vehicleNo: '豫A·J6688', driver: '王晓东', product: '水煮牛肉Qq', pieces: 425, weight: 8500, warehouse: '物流港二期大河智链监管库', plannedTime: '2026-07-02 14:00', actualTime: '2026-07-02 14:30', status: 'completed' },
  ],

  warehouseOutboundList: [
    { id: 'wout_001', orderNo: 'OUT_20260708001', applicant: '郑州某冷链', vehicleNo: '豫A·K7723', driver: '赵刚', product: '冷冻带骨绵羊腰脊排', pieces: 70, weight: 1073, warehouse: '天津港国际冷链基地', plannedTime: '2026-07-08 14:00', actualTime: null, status: 'pending', instruction: '已收到监管方出库指令，可放行' },
    { id: 'wout_002', orderNo: 'OUT_20260528001', applicant: '郑州某冷链', vehicleNo: '豫A·B1122', driver: '刘强', product: '水煮山羊肉', pieces: 150, weight: 3000, warehouse: '物流港二期大河智链监管库', plannedTime: '2026-05-28 10:00', actualTime: '2026-05-28 10:45', status: 'completed' },
  ],

  // ========== 到期预警（资金方） ==========
  dueAlerts: [
    { id: 'da_001', bizNo: 'DHZL_JMY_2025120101', customer: '郑州某冷链', loanAmount: 1130000, dueDate: '2026-07-15', daysLeft: 7, status: 'urgent' },
    { id: 'da_002', bizNo: 'DHZL_JMY_2026042701', customer: '郑州某冷链', loanAmount: 720000, dueDate: '2026-08-10', daysLeft: 33, status: 'warning' },
    { id: 'da_003', bizNo: 'DHZL_GL_2026052501', customer: '郑州固联', loanAmount: 1760000, dueDate: '2026-08-25', daysLeft: 48, status: 'normal' },
  ],

  // ========== 担保方 / 资金方视图专用：质押货物台账（统一数据源） ==========
  // 各角色根据自己的 bizList 渲染台账视图
  pledgeLedger: [
    { bizNo: 'DHZL_JMY_2025120101', customer: '郑州某冷链', customerCode: 'JMY', product: '熟牛腱', productId: 'MNG_SNJ_3191397', warehouse: '郑州融万冷链库', warehouseId: 'wh_002', pieces: 1100, weight: 22000, evaluatePrice: 74, evaluateValue: 1628000, loanAmount: 1130000, repaidAmount: 0, remainingDebt: 1130000, currentPrice: 76.77, priceChangeRate: 3.74, pledgeRatio: 0.8, status: 'financing', dueDate: 46114, signStatus: 'completed', isOverdue: false },
    { bizNo: 'DHZL_JMY_2025120901', customer: '郑州某冷链', customerCode: 'JMY', product: '水煮牛肉Qq+Qh', productId: 'MNG_SZNR_*', warehouse: '郑州融万冷链库', warehouseId: 'wh_002', pieces: 890, weight: 17800, evaluatePrice: 76, evaluateValue: 1352800, loanAmount: 940000, repaidAmount: 490000, remainingDebt: 450000, currentPrice: 78.79, priceChangeRate: 3.67, pledgeRatio: 0.8, status: 'financing', dueDate: 46124, signStatus: 'completed', isOverdue: false },
    { bizNo: 'DHZL_JMY_2026012601', customer: '郑州某冷链', customerCode: 'JMY', product: '去骨牛心管', productId: 'AU_QGNXG_1265', warehouse: '天津港国际冷链基地', warehouseId: 'wh_003', pieces: 113, weight: 3073.6, evaluatePrice: 70, evaluateValue: 215152, loanAmount: 2030000, repaidAmount: 0, remainingDebt: 2030000, currentPrice: 74.74, priceChangeRate: 6.77, pledgeRatio: 0.8, status: 'warning', dueDate: 45804, signStatus: 'completed', isOverdue: true },
    { bizNo: 'DHZL_JMY_2026013101', customer: '郑州某冷链', customerCode: 'JMY', product: '牛颈骨', productId: 'AU_NJG_243', warehouse: '天津港国际冷链基地', warehouseId: 'wh_003', pieces: 1153, weight: 19031, evaluatePrice: 24.5, evaluateValue: 466264, loanAmount: 320000, repaidAmount: 0, remainingDebt: 320000, currentPrice: 23.73, priceChangeRate: -3.14, pledgeRatio: 0.8, status: 'running', dueDate: 46176, signStatus: 'completed', isOverdue: false },
    { bizNo: 'DHZL_JMY_2026042701', customer: '郑州某冷链', customerCode: 'JMY', product: '羔羊肉+牛心管+牛膝盖骨', productId: 'MIX_001', warehouse: '天津港国际冷链基地', warehouseId: 'wh_003', pieces: 1850, weight: 32400, evaluatePrice: 32, evaluateValue: 1100000, loanAmount: 720000, repaidAmount: 0, remainingDebt: 720000, currentPrice: 28.00, priceChangeRate: -12.5, pledgeRatio: 0.8, status: 'danger', dueDate: 46260, signStatus: 'completed', isOverdue: false },
    { bizNo: 'DHZL_JMY_2026050901', customer: '郑州某冷链', customerCode: 'JMY', product: '水煮山羊肉', productId: 'MNG_SZSYR_BWS', warehouse: '物流港二期大河智链监管库', warehouseId: 'wh_001', pieces: 1040, weight: 20800, evaluatePrice: 63, evaluateValue: 1302840, loanAmount: 1190000, repaidAmount: 196560, remainingDebt: 993440, currentPrice: 63.00, priceChangeRate: 0, pledgeRatio: 0.8, status: 'partial', dueDate: 46273, signStatus: 'completed', isOverdue: false },
    { bizNo: 'DHZL_GL_2026052501', customer: '郑州固联', customerCode: 'GL', product: '冷冻去骨牛7件套', productId: 'AUTO_MULTI', warehouse: '物流港二期大河智链监管库', warehouseId: 'wh_001', pieces: 1716, weight: 39854, evaluatePrice: 55.5, evaluateValue: 2211895, loanAmount: 1760000, repaidAmount: 0, remainingDebt: 1760000, currentPrice: 58.40, priceChangeRate: 5.20, pledgeRatio: 0.8, status: 'released', dueDate: 46288, signStatus: 'completed', isOverdue: false },
  ],

  // ========== v1.7 新增：还款登记记录（货主上传电子回单） ==========
  repaymentRecords: [
    { id: 'rr_001', bizNo: 'DHZL_JMY_2026012601', customer: '郑州某冷链', customerCode: 'JMY', product: '去骨牛心管', repayAmount: 215152, systemEstimate: 215152, offLineAmount: 215000, offLineMethod: '银行转账', payAccount: '6222 XXXX XXXX 1234 567', recvAccount: '中国民生银行 6225 XXXX XXXX 5678', repayDate: '2026-07-08', voucherCount: 2, voucherFiles: ['民生银行回单20260708.pdf', '电子签购单.png'], registeredBy: '陈志强', registeredAt: '2026-07-08 14:32', fundingConfirmed: true, confirmedBy: '王建国', confirmedAt: '2026-07-08 15:10', status: 'confirmed' },
    { id: 'rr_002', bizNo: 'DHZL_JMY_2025120901', customer: '郑州某冷链', customerCode: 'JMY', product: '水煮牛肉Qq+Qh', repayAmount: 450000, systemEstimate: 450000, offLineAmount: 450000, offLineMethod: '银行转账', payAccount: '6222 XXXX XXXX 1234 567', recvAccount: '中国民生银行 6225 XXXX XXXX 5678', repayDate: '2026-06-25', voucherCount: 1, voucherFiles: ['还款回单20260625.pdf'], registeredBy: '陈志强', registeredAt: '2026-06-25 10:15', fundingConfirmed: true, confirmedBy: '王建国', confirmedAt: '2026-06-25 11:00', status: 'confirmed' },
    { id: 'rr_003', bizNo: 'DHZL_GL_2026052501', customer: '郑州固联', customerCode: 'GL', product: '冷冻去骨牛7件套', repayAmount: 1500000, systemEstimate: 1500000, offLineAmount: 1500000, offLineMethod: '银行转账', payAccount: '6217 XXXX XXXX 6666 999', recvAccount: '中国民生银行 6225 XXXX XXXX 9999', repayDate: '2026-07-05', voucherCount: 1, voucherFiles: ['固联还款回单.pdf'], registeredBy: '吴建波', registeredAt: '2026-07-05 16:20', fundingConfirmed: false, status: 'pending_confirm' },
  ],

  // ========== v1.7 新增：盖章记录（图片签章） ==========
  sealRecords: [
    { id: 'sr_001', bizNo: 'DHZL_JMY_2026050901', docType: '入库申请单', sealUser: '李雪', sealRole: '公司公章', sealTime: '2026-07-05 14:32', status: 'completed' },
    { id: 'sr_002', bizNo: 'DHZL_JMY_2026050901', docType: '质物清单', sealUser: '李雪', sealRole: '公司公章', sealTime: '2026-07-06 10:15', status: 'completed' },
    { id: 'sr_003', bizNo: 'DHZL_JMY_2025120101', docType: '质物清单', sealUser: '李雪', sealRole: '公司公章', sealTime: '2025-12-02 11:00', status: 'completed' },
    { id: 'sr_004', bizNo: 'DHZL_JMY_2026012601', docType: '融资申请', sealUser: '李雪', sealRole: '公司公章', sealTime: '2026-01-27 09:30', status: 'completed' },
    { id: 'sr_005', bizNo: 'DHZL_JMY_2026012601', docType: '质押反担保合同', sealUser: '李雪', sealRole: '公司公章', sealTime: '2026-01-28 14:20', status: 'completed' },
    { id: 'sr_006', bizNo: 'DHZL_JMY_2026012601', docType: '质物清单（担保审核通过后）', sealUser: '李雪', sealRole: '公司公章', sealTime: '2026-01-30 10:45', status: 'completed' },
    { id: 'sr_007', bizNo: 'DHZL_JMY_2026012601', docType: '质物清单（资金方审核通过后）', sealUser: '李雪', sealRole: '公司公章', sealTime: '2026-02-01 16:30', status: 'completed' },
  ],

  // ========== v1.7 新增：盘库记录（仓库方定期巡库） ==========
  inventoryCheckRecords: [
    { id: 'ic_001', warehouseId: 'wh_001', bizNo: 'DHZL_JMY_2026050901', checkTime: '2026-07-07 10:00', checker: '赵德昌', actualPieces: 1040, actualWeight: 20800, expectedWeight: 20800, weightDiff: 0, status: 'normal', remark: '库存与系统一致' },
    { id: 'ic_002', warehouseId: 'wh_001', bizNo: 'DHZL_GL_2026052501', checkTime: '2026-07-05 14:30', checker: '赵德昌', actualPieces: 1716, actualWeight: 39854, expectedWeight: 39854, weightDiff: 0, status: 'normal', remark: '库存与系统一致' },
    { id: 'ic_003', warehouseId: 'wh_003', bizNo: 'DHZL_JMY_2026012601', checkTime: '2026-07-06 09:00', checker: '钱志远', actualPieces: 113, actualWeight: 3040, expectedWeight: 3073.6, weightDiff: -33.6, status: 'abnormal', remark: '短少 33.6 公斤，已通知货主核实' },
  ],

  // ========== v1.7 新增：放款凭证记录（资金方上传） ==========
  loanVoucherRecords: [
    { id: 'lv_001', bizNo: 'DHZL_JMY_2026012601', loanAmount: 1624000, offLineMethod: '银行转账', payAccount: '民生银行 6225 XXXX XXXX 5678', recvAccount: '6222 XXXX XXXX 1234 567', loanDate: '2026-02-01', voucherCount: 2, voucherFiles: ['放款通知单.pdf', '电子回单.png'], uploadedBy: '王建国', uploadedAt: '2026-02-01 17:30', status: 'verified' },
    { id: 'lv_002', bizNo: 'DHZL_JMY_2026050901', loanAmount: 1190000, offLineMethod: '银行转账', payAccount: '民生银行 6225 XXXX XXXX 5678', recvAccount: '6222 XXXX XXXX 1234 567', loanDate: '2026-05-10', voucherCount: 2, voucherFiles: ['放款通知单.pdf', '电子回单.png'], uploadedBy: '王建国', uploadedAt: '2026-05-10 16:45', status: 'verified' },
  ],

  // ========== v1.7.5 新增：金融产品（决定利率/质押率/期限/监管方/担保方 5 个联动字段） ==========
  financeProducts: [
    { id: 'fp_001', name: '冷链现货质押融资', industry: '冷链/冻品', pledgeRatio: 0.70, interestRate: 0.023, duration: 180, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '针对进口冻品、肉类、水产的现货质押融资，监管仓位于天津港/郑州', active: true },
    { id: 'fp_002', name: '粮食仓单质押融资', industry: '粮食/农资', pledgeRatio: 0.65, interestRate: 0.024, duration: 270, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '小麦/玉米/大豆等粮食仓单质押', active: true },
    { id: 'fp_003', name: '钢铁库存质押融资', industry: '钢铁/有色金属', pledgeRatio: 0.65, interestRate: 0.030, duration: 180, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '钢材、铝材、铜材等大宗工业品库存质押', active: true },
    { id: 'fp_004', name: '煤炭监管仓融资', industry: '能源/煤炭', pledgeRatio: 0.60, interestRate: 0.032, duration: 150, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '中原信用担保股份有限公司', description: '动力煤、焦煤等煤炭监管仓质押融资', active: true },
    { id: 'fp_005', name: '物流港口仓单质押', industry: '港口/物流', pledgeRatio: 0.70, interestRate: 0.026, duration: 240, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '中原信用担保股份有限公司', description: '港口/物流园区货物仓单质押', active: true },
    { id: 'fp_006', name: '标准化仓单质押（期货标准）', industry: '通用/期货', pledgeRatio: 0.75, interestRate: 0.024, duration: 360, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '符合期货交割标准的仓单质押融资', active: true },
    { id: 'fp_007', name: '农产品预售融资（订单）', industry: '农业/订单', pledgeRatio: 0.50, interestRate: 0.035, duration: 90, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '基于已签订单的农产品预售融资', active: true },
    { id: 'fp_008', name: '应收账款保理（核心企业）', industry: '制造业/保理', pledgeRatio: 0.85, interestRate: 0.038, duration: 120, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '中原信用担保股份有限公司', description: '核心企业确权的应收账款保理融资', active: true },
    { id: 'fp_009', name: '设备动产质押融资', industry: '装备制造', pledgeRatio: 0.50, interestRate: 0.040, duration: 365, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '机械设备、车辆等动产质押融资', active: true },
    { id: 'fp_010', name: '电子仓单质押（标准仓）', industry: '通用/标准仓', pledgeRatio: 0.70, interestRate: 0.025, duration: 180, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '电子化标准仓单质押融资', active: true },
    { id: 'fp_011', name: '进口冻品冷链质押', industry: '冷链/进口', pledgeRatio: 0.65, interestRate: 0.027, duration: 240, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '进口冻品的冷链仓单质押融资', active: true },
    { id: 'fp_012', name: '化肥仓单质押融资', industry: '农资/化肥', pledgeRatio: 0.60, interestRate: 0.028, duration: 200, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '中原信用担保股份有限公司', description: '化肥、农药等农资仓单质押', active: true },
    { id: 'fp_013', name: '木材仓单质押融资', industry: '建材/木材', pledgeRatio: 0.65, interestRate: 0.031, duration: 180, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '某省级农业担保股份有限公司', description: '原木、板材等木材仓单质押', active: true },
    { id: 'fp_014', name: '化工原料质押融资', industry: '化工', pledgeRatio: 0.60, interestRate: 0.033, duration: 180, supervisor: '国信仓单监管股份有限公司（demo）', guarantor: '中原信用担保股份有限公司', description: 'PE、PVC 等化工原料仓单质押', active: true },
    { id: 'fp_015', name: '综合仓单质押（普适）', industry: '通用', pledgeRatio: 0.65, interestRate: 0.029, duration: 240, supervisor: '大河智链物流股份有限公司（demo）', guarantor: '中原信用担保股份有限公司', description: '通用型仓单质押融资方案', active: true },
  ],

  // ========== v1.7.5 新增：借款用途预设（10 项） ==========
  loanPurposes: [
    { id: 'lp_001', name: '采购原材料', description: '用于采购生产所需的原材料、辅料' },
    { id: 'lp_002', name: '支付货款', description: '支付上游供应商的货款' },
    { id: 'lp_003', name: '经营周转', description: '日常经营性资金周转' },
    { id: 'lp_004', name: '季节性储备', description: '应对季节性需求的存货储备' },
    { id: 'lp_005', name: '扩大生产规模', description: '扩产所需设备/场地/人员投入' },
    { id: 'lp_006', name: '偿还银行贷款', description: '置换/偿还他行贷款' },
    { id: 'lp_007', name: '设备采购', description: '采购生产设备、检测设备、运输工具' },
    { id: 'lp_008', name: '物流仓储费用', description: '支付物流运输费、仓储费、装卸费' },
    { id: 'lp_009', name: '工资发放', description: '员工工资/社保发放' },
    { id: 'lp_010', name: '其他', description: '其他合法经营用途（请在备注中说明）' },
  ],

  // ========== v1.7.5 新增：货主方公户信息（多账户，下拉选择） ==========
  customerAccounts: [
    { id: 'acc_001', customer: '郑州某冷链贸易有限公司', bankName: '民生银行郑州分行', branch: '郑州分行营业部', accountNo: '6222 XXXX XXXX 1234 567', accountAlias: '基本户', isDefault: true, verifiedAt: '2026-01-15', status: 'active' },
    { id: 'acc_002', customer: '郑州某冷链贸易有限公司', bankName: '中信银行郑州分行', branch: '郑州花园路支行', accountNo: '6225 XXXX XXXX 5678', accountAlias: '一般户', isDefault: false, verifiedAt: '2026-03-20', status: 'active' },
    { id: 'acc_003', customer: '郑州某冷链贸易有限公司', bankName: '工商银行郑州分行', branch: '郑州金水支行', accountNo: '6217 XXXX XXXX 6666 999', accountAlias: '结算户', isDefault: false, verifiedAt: '2026-05-10', status: 'active' },
    { id: 'acc_004', customer: '河南某冷链股份有限公司', bankName: '建设银行郑州金水支行', branch: '郑州金水支行', accountNo: '6217 XXXX XXXX 8888 777', accountAlias: '基本户', isDefault: true, verifiedAt: '2026-02-01', status: 'active' },
    { id: 'acc_005', customer: '河南某冷链股份有限公司', bankName: '招商银行郑州分行', branch: '郑州分行', accountNo: '6225 XXXX XXXX 3333 222', accountAlias: '一般户', isDefault: false, verifiedAt: '2026-04-15', status: 'active' },
  ],
};

// ========== 状态机辅助函数 ==========
MockData.getStatusLabel = (status) => STATUS_LABELS[status] || status;
MockData.getStatusColor = (status) => STATUS_COLORS[status] || 'gray';
MockData.getStatusLabelEn = (status) => STATUS_LABELS_EN[status] || status;
MockData.STATUS_LABELS = STATUS_LABELS;
MockData.STATUS_COLORS = STATUS_COLORS;

window.MockData = MockData;