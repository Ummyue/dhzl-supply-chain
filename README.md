# 大河智链供应链金融平台 · 高保真可交互原型

> 一期（T+40 现货质押融资）｜**v1.7.3**（2026-07-09）｜PRD 同版本

## 项目简介

本仓库是「大河智链供应链金融平台」一期（**T+40 现货质押融资**）的**高保真可交互 HTML 原型**，覆盖 5 个核心角色端到端流程：

| 角色 | 一句话职责 | demo 账号 |
|---|---|---|
| **货主方 · 操作人** | 业务操作（创建申请、查看进度） | 陈志强（郑州某冷链）|
| **货主方 · 盖章人** | 仅入库申请的电子签章 | 李雪（郑州某冷链）|
| **监管方（平台）** | 准入/入库/融资审批 + 货值评估 | 李雪（大河智链）|
| **担保方** | 反担保措施审核 | 王建国（中原担保）|
| **资金方** | 放款审核 + 还款回单确认 | 刘敏（民生银行）|
| **仓储方** | 入库验货 + 出库放行 + 盘库 | 赵德昌（物流港二期）|

> 注：李雪同名前缀跨角色（货主方盖章人 + 监管方风控经理），PRD §2.1 角色清单区分。

## 技术栈

- **HTML 5** + **Tailwind CSS**（CDN）+ **原生 JavaScript**（无构建步骤）
- 状态管理：`localStorage` 持久化登录角色
- Mock 数据：`shared/js/mockData.js`（约 950 行，含 8 个数据集合、v1.7 状态机、阴需凭证登记记录）
- 部署：**Vercel**（国际站）/ **Gitee Pages**（国内访问推荐）

## 目录结构

```
dhzl-supply-chain/
├── index.html                        首页入口（自动跳转 /login）
├── login.html                        登录页（5 角色一键切换）
├── dashboard.html                    仪表盘（5 角色共用）
│
├── pages/                            业务页面（按角色分目录）
│   ├── customer/                     货主方（11 页）
│   │   ├── admission.html            准入申请
│   │   ├── admission-seal.html       准入签章（v1.6 准入单次盖章）
│   │   ├── admission-detail.html     准入详情
│   │   ├── inbound.html              入库申请（v1.7.3 盖章人专属视图）
│   │   ├── inbound-detail.html       入库详情（v1.7.3 内嵌盖章工作区）
│   │   ├── financing.html            融资申请（v1.7 3 次盖章核心页）
│   │   ├── financing-detail.html     融资详情
│   │   ├── monitoring.html           在库监控（v1.7 含盘库+追保）
│   │   ├── pledge-list.html          质物清单（v1.7 5 步签章进度）
│   │   ├── outbound.html             解押/出库（v1.7.2 重大重画：先还款后申请）
│   │   ├── bills.html                月度账单
│   │   └── seal-flow.html            多次签章流程（v1.7 新增，?seal=1/2/3）
│   │
│   ├── platform/                     监管方（11 页）
│   │   ├── approval-admission.html   准入审批
│   │   ├── approval-inbound.html     入库审批（v1.7 含货主盖章进度）
│   │   ├── approval-financing.html   融资审核（v1.7 含质押反担保合同）
│   │   ├── approval-outbound.html    解押审批
│   │   ├── monitoring-dashboard.html 在库监控大盘
│   │   └── ...（6 页详情/历史）
│   │
│   ├── bank/                         资金方（7 页）
│   │   ├── approval-loan.html        放款审核（v1.7 含线下打款凭证上传）
│   │   ├── confirm-repayment.html    还款回单确认（v1.7 新增，阴需核心）
│   │   └── ...（5 页详情/历史）
│   │
│   ├── guarantor/                    担保方（3 页）
│   │   ├── approval-financing.html   融资审核（v1.7 出具担保函）
│   │   ├── approval-inbound.html     入库审核（v1.7 新增）
│   │   └── approval-outbound.html    解押审核
│   │
│   └── warehouse/                    仓储方（4 页）
│       ├── inbound.html              入库执行
│       ├── outbound.html             出库执行（v1.7 独立流程）
│       ├── inventory-check.html      盘库记录（v1.7 新增）
│       └── ...（1 页详情）
│
├── shared/                           共享资源
│   ├── css/style.css                 自定义样式
│   └── js/
│       ├── mockData.js               Mock 数据（v1.7.3 含 4 个新数据集合）
│       ├── components.js             通用组件（topbar/sidebar/badge）
│       └── utils.js                  工具函数（含 v1.7 状态机）
│
├── docs/                             PRD 文档
│   ├── PRD.md                        Markdown 版（v1.7.3，13 个 Mermaid 流程图）
│   ├── prd.html                      网页版（集成 mermaid.js 渲染）
│   ├── 大河智链供应链金融平台-PRD-v1.0.docx  Word 版（v1.0 历史版）
│   └── assets/screenshots/           原型图截图占位目录（待 RP 导出）
│
├── .gitignore                        Git 忽略规则
├── package.json                      npm 脚本（dev/deploy）
├── vercel.json                       Vercel 路由配置
└── README.md                         本文件
```

## 一期核心流程（v1.7.3 状态）

```
准入(adm) → 入库(in) → 融资(fn) → 在库监控(mon) → 解押/出库(out)
```

### v1.7 关键业务规则（重大修正）

| 模块 | 关键变更 | 章节 |
|---|---|---|
| **入库流程** | 新增担保方审核 + 货主方盖章 | PRD §4.2 |
| **融资流程** | 3 次货主方盖章 + 质押反担保合同 + 质物清单 | PRD §4.3 |
| **在库监控** | 含盘库记录 + 追保跳转 | PRD §4.4 |
| **解押流程** | **重大重画**：先还款登记（阶段A）→ 再解押申请（阶段B） | PRD §4.5 |
| **质物清单** | **新增**：5 步签章（监管→货主①→担保→货主②→资金方） | PRD §4.6 |
| **出库申请** | **新增**：独立于解押的出库流程 | PRD §4.7 |
| **状态机** | **新增**：20+ 状态统一规范 | PRD §4.9 |

### 阴需规则（v1.6 锁定）

> **当前系统无实际线上扣/打款能力**，所有资金流转都是**线下完成 + 系统流程化登记**。

- 货主方 → 资金方（还款 / 追保还款 / 解押还款）：**线下转账** + 发起方上传凭证（实际金额 + 图片/PDF）
- 资金方 → 货主方（放款 / 受托支付）：**线下打款** + 资金方上传放款证明 + 电子回单
- 系统试算金额 ≠ 实际还款金额（试算仅作参考）
- 不存在"银行扣款失败 / 补足余额 / 账户异常"等线上假设分支

## 本地运行

### 方式 1：使用 Python（推荐，无需安装任何依赖）

```bash
cd dhzl-supply-chain
python3 -m http.server 3000
# 浏览器访问 http://localhost:3000
```

### 方式 2：使用 Node.js `serve`

```bash
cd dhzl-supply-chain
npx serve -l 3000 .
# 或全局安装后：serve -l 3000 .
```

### 方式 3：使用 VSCode Live Server 插件

右键 `index.html` → "Open with Live Server"

> ⚠️ **不能直接 file:// 打开 HTML**！因为 `/shared/js/` 是绝对路径，必须走 HTTP 服务器。

## 部署

### 国际访问：Vercel（默认）

```bash
npm i -g vercel
vercel --prod
```

部署后访问：`https://<your-project>.vercel.app`

### 国内访问（领导演示推荐）：Gitee Pages

1. 在 [Gitee](https://gitee.com) 创建仓库 `dhzl-supply-chain`（设为公开）
2. 推送代码：`git push gitee main`
3. 在仓库页面 → 服务 → Gitee Pages → 启动 → 选择 `main` 分支
4. 访问：`https://<your-username>.gitee.io/dhzl-supply-chain`

> 国内访问速度比 Vercel 快很多（无 dns 污染），适合给领导演示。

### 其他方案

| 平台 | 国内速度 | 配置难度 | 备注 |
|---|---|---|---|
| Vercel | ⭐⭐⭐ 中等 | 极简 | 国际站，国内偶尔慢 |
| Gitee Pages | ⭐⭐⭐⭐⭐ 极快 | 简单 | 需 Gitee 账号 |
| 阿里云 OSS + CDN | ⭐⭐⭐⭐⭐ 极快 | 中等 | 需备案域名 |
| Netlify | ⭐⭐ 较慢 | 极简 | 国际站 |

## Demo 账号（一键切换）

打开 `login.html` 直接点击对应角色卡片即可登录，无需密码。

| 角色 | 姓名 | 公司 | 部门 | 权限 |
|---|---|---|---|---|
| 货主方·操作人 | 陈志强 | 郑州某冷链贸易 | - | 无电子签章权（仅保存草稿）|
| 货主方·盖章人 | 李雪 | 郑州某冷链贸易 | 财务部 | 有盖章权（3 个印章）|
| 监管方 | 李雪 | 大河智链物流股份（demo）| 风控运营部 | 准入/入库/融资/出库审批 |
| 担保方 | 王建国 | 中原信用担保 | 业务一部 | 反担保措施审核 |
| 资金方 | 刘敏 | 中国民生银行郑州分行 | 供应链金融部 | 放款审核 + 还款回单确认 |
| 仓储方 | 赵德昌 | 物流港二期大河智链监管库 | 仓储运营部 | 入库验货 + 出库放行 |

## v1.7.3 关键页面演示路径

### 路径 1：货主方·操作人端到端流程
```
登录(陈志强)
  → 准入申请 → 草稿 → 盖章(admission-seal)
  → 入库申请 → 草稿(inbound.html) → 提交
  → 融资申请(3 次盖章) → 担保审核 → 监管审核 → 资金方审核 → 已放款
  → 在库监控(盯市预警)
  → 解押/出库(先还款 → 再解押 → 资金方确认 → 出库)
```

### 路径 2：货主方·盖章人专属路径（v1.7.3 新增）
```
登录(李雪 盖章人账号)
  → 自动跳转入库申请页(inbound.html)
  → 顶部橙色徽标"货主方·盖章人·李雪"
  → 列表过滤：仅 JMY 企业 + 待盖章/已驳回状态
  → 操作列只有"查看详情"
  → 点击进入详情页(inbound-detail.html)
  → 下半部分内嵌盖章工作区
  → 印章选择(3 个，排除合同章) + 单据预览 + 法律声明 + 提交
```

### 路径 3：资金方·回单确认（阴需核心）
```
登录(刘敏 资金方)
  → dashboard 看到"📑 待确认还款回单"卡片
  → 进入 bank/confirm-repayment.html
  → 查看货主方上传的银行转账凭证(实际金额 + PDF)
  → 系统试算金额 ≠ 实际还款金额 → 手动核对
  → 确认 → 通知客户 → 系统登记
```

## PRD 与原型对应关系

| PRD 章节 | 原型页面 |
|---|---|
| §4.2 入库流程 | `pages/customer/inbound.html` + `pages/customer/inbound-detail.html` |
| §4.3 融资流程 | `pages/customer/financing.html` + `pages/customer/financing-detail.html` |
| §4.5 解押流程 | `pages/customer/outbound.html`（v1.7.2 重大重画）|
| §4.6 质物清单 | `pages/customer/pledge-list.html` |
| §6 页面级说明 | `docs/PRD.md`（含 v1.7.3 字段规则 + 交互说明 + 状态机）|

## 修订记录

| 版本 | 日期 | 关键变更 |
|---|---|---|
| v1.0 | 2026-06-xx | 35 页基础原型 |
| v1.6 | 2026-07-07 | 阴需规则（资金线下流转）|
| v1.7 | 2026-07-08 | 按甲方 drawio v3 重画 6 个流程图，新增 4 页 |
| v1.7.1 | 2026-07-08 | §4.3 流程图从 LR 改为 TB 上下布局 |
| v1.7.2 | 2026-07-08 | outbound.html 重大重画（先还款后申请）|
| **v1.7.3** | **2026-07-09** | **盖章人专属视图（§6.5.11）**：dashboard 跳转 + 入库列表过滤 + 详情页内嵌盖章工作区 |

## License

仅供大河智链内部使用，未经授权不得外传。