# Figma 设计规范交付包 — 客户准入模块

> **项目**: 大河智链 — 现货质押融资监管平台
> **模块**: 客户准入（货主方）
> **版本**: v1.7.38
> **交付时间**: 2026-07-13
> **维护**: Mavis

---

## 一、交付物清单

| 类别 | 文件 | 用途 |
|---|---|---|
| **Token 规范** | [`Ant-Design-Token.md`](./Ant-Design-Token.md) | 设计系统基础（颜色/字号/间距/圆角/阴影/组件）|
| **页面流转** | [`客户准入-页面流转图.md`](./客户准入-页面流转图.md) | 8 个页面跳转关系 + 5 步状态机 |
| **组件规范** | [`客户准入-组件规范.md`](./客户准入-组件规范.md) | 14 类组件变体 / 状态 / 用法 |
| **桌面端渲染图** | `figma/*-desktop.png` (8 张) | Figma 背景 import（1440x810 2K） |
| **平板端渲染图** | `figma/*-tablet.png` (8 张) | Figma 背景 import（768x432 2K） |
| **高保真原型** | `https://dhzl-supply-chain.pages.dev/customer/admission.html` | 在线交互原型（活页） |

---

## 二、8 个页面 × 2 端 = 16 张图

### 桌面端 1440px (2K)
| # | 页面 | 文件 |
|---|---|---|
| 1 | 准入申请列表 | `figma/admission-list-desktop.png` |
| 2 | 新增准入申请 | `figma/admission-create-desktop.png` |
| 3 | 准入详情-基础信息 | `figma/admission-detail-basic-desktop.png` |
| 4 | 准入详情-资质审核 | `figma/admission-detail-qualification-desktop.png` |
| 5 | 准入详情-现场考察 | `figma/admission-detail-siteInspection-desktop.png` |
| 6 | 准入详情-风险评估 | `figma/admission-detail-riskAssessment-desktop.png` |
| 7 | 准入详情-办结 | `figma/admission-detail-completion-desktop.png` |
| 8 | 企业信息（占位）| `figma/enterprise-info-desktop.png` |

### 平板端 768px (2K)
| # | 页面 | 文件 |
|---|---|---|
| 1 | 准入申请列表 | `figma/admission-list-tablet.png` |
| 2 | 新增准入申请 | `figma/admission-create-tablet.png` |
| 3 | 准入详情-基础信息 | `figma/admission-detail-basic-tablet.png` |
| 4 | 准入详情-资质审核 | `figma/admission-detail-qualification-tablet.png` |
| 5 | 准入详情-现场考察 | `figma/admission-detail-siteInspection-tablet.png` |
| 6 | 准入详情-风险评估 | `figma/admission-detail-riskAssessment-tablet.png` |
| 7 | 准入详情-办结 | `figma/admission-detail-completion-tablet.png` |
| 8 | 企业信息（占位）| `figma/enterprise-info-tablet.png` |

---

## 三、设计系统

- **基础**: Ant Design v5
- **主色**: `#1677ff` (AntD Blue-6)
- **成功**: `#52c41a`
- **警告**: `#faad14`
- **错误**: `#f5222d`
- **字体**: PingFang SC / Microsoft YaHei
- **平台**: Web 1440px / Tablet 768px
- **圆角**: 6px (默认) / 8px (卡片)
- **阴影**: 轻阴影 (boxShadowSM)

详细 token 见 [`Ant-Design-Token.md`](./Ant-Design-Token.md)

---

## 四、Figma 工作流建议

### 4.1 设计师使用流程
1. **打开 Figma** → 新建项目"大河智链 — 客户准入"
2. **设置 Design Token**: 导入 `Ant-Design-Token.md` 中所有 token 到 Figma Variables
3. **搭建组件库**: 参考 `客户准入-组件规范.md` 创建 Button / Input / Card / Table / Tab / Tag / Step / Timeline / Footer 等组件变体
4. **import 渲染图**: 把 `figma/*.png` 当 background 拖入对应 Figma frame
5. **绘制矢量层**: 在 background 上面重新画可编辑的矢量组件层（保留中文真实数据）
6. **标注规范**: 用 Figma 的 Annotation / Specs 工具标注关键 token（间距/颜色/字号）

### 4.2 前端开发使用流程
1. **安装依赖**:
   ```bash
   npm install antd
   # 或
   pnpm add antd
   ```
2. **配置 Provider**:
   ```jsx
   import { ConfigProvider } from 'antd';
   import zhCN from 'antd/locale/zh_CN';
   
   <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#1677ff' } }}>
     <App />
   </ConfigProvider>
   ```
3. **组件映射**:
   | Tailwind | AntD 组件 |
   |---|---|
   | `<button class="bg-blue-600 text-white">` | `<Button type="primary">` |
   | `<input class="border-slate-200">` | `<Input />` |
   | `<div class="bg-white rounded-xl shadow-sm">` | `<Card />` |
   | `<table class="w-full">` | `<Table />` |
   | `<div class="flex border-b">` (5 tab) | `<Tabs items={[]} />` |

---

## 五、当前已完成的 HTML 高保真原型

| 页面 | 路径 | 状态 |
|---|---|---|
| 准入申请列表 | `pages/customer/admission.html` | ✅ 7 条 mock + 4 筛选 + 6 列表 |
| 新增准入申请 | `pages/customer/admission-create.html` | ✅ 5 区块 + 自动带入 + 必填校验 |
| 准入详情（5 tab）| `pages/customer/admission-detail.html` | ✅ 5 步 + 办结总结 |
| 企业信息（占位）| `pages/customer/enterprise-info.html` | ✅ 占位版 |

部署 URL: https://dhzl-supply-chain.pages.dev

---

## 六、注意事项

### 6.1 关于 Figma 渲染图
- `image_synthesize` 生成的 PNG **包含示例数据**（英文公司名/英文菜单）— Figma 重画时**替换为真实中文业务数据**
- 渲染图是 2K 16:9 = 2560x1440 像素（在 1440px 视口下放大 1.78 倍，可缩放使用）
- 颜色已经校准为 AntD 主色 #1677ff，**不要修改主色**
- 圆角 / 阴影 / 间距 已按 token 规范

### 6.2 与现有原型的差异
- HTML 原型用的是 **白底 header**（更符合当前项目风格）
- 渲染图部分用了**蓝渐变 header**（更标准 AntD 风格）— 设计师选用其一
- HTML 原型中**6 类附件**用蓝色"选择文件"按钮 + 文件名链接
- 渲染图中**附件**用蓝色 Upload 按钮 + Required 标识 — **风格一致**

### 6.3 平板端适配要点
- 侧边栏折叠到 64px（仅图标）
- 表单字段从 3 列改成 1 列
- 表格横向滚动
- 步骤条圆圈缩小到 24×24
- 卡片间距收紧到 12px

---

## 七、变更记录

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.7.38 | 2026-07-13 | 首版交付（8 页 × 2 端 = 16 张图 + 3 份规范文档） |

---

## 八、下一步

1. **设计师**: 在 Figma 重建矢量组件层 + 替换中文业务数据
2. **前端**: 引入 antd v5 + ConfigProvider 配置 token
3. **联调**: 用 Figma 组件库标注的尺寸 / 间距 / 颜色逐像素还原
4. **扩展**: 其他模块（入库/库存/融资/账单）复用本设计系统

---

## 九、配套 PRD（设计决策依据）

- `docs/大河智链PRD汇总/客户准入/客户准入-设计文档.md` （如需补充）
- `docs/design-system/Ant-Design-Token.md`
- `docs/design-system/客户准入-页面流转图.md`
- `docs/design-system/客户准入-组件规范.md`

---

**有任何问题或调整需求，告诉我。**
