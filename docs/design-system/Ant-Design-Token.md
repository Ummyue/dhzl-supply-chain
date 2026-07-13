# Ant Design Token 设计规范

> **项目**: 大河智链 — 现货质押融资监管平台 v1.7.38
> **基础设计系统**: Ant Design v5
> **目标平台**: Web 桌面端 1440px / 平板 768px
> **版本**: 2026-07-13
> **维护**: Mavis

---

## 一、设计语言 (Design Language)

### 1.1 品牌定位
- **行业**: 金融供应链 B 端 SaaS
- **风格关键词**: 专业 / 可信 / 严谨 / 简洁 / 信息密度高
- **设计哲学**: 形式追随数据 — 数据是主角，UI 是支撑

### 1.2 视觉原则
- **克制用色**: 90% 中性色（黑/白/灰），10% 品牌色（蓝）+ 状态色（绿/黄/红）
- **强信息层级**: 标题 / 内容 / 辅助 / 弱化 4 级，对比度清晰
- **数据优先**: 数字 / 金额 / 状态等关键信息用粗体或强调色
- **企业感**: 多用 1-2px 实线 / 浅阴影，避免浮夸渐变

---

## 二、色彩系统 (Color Tokens)

### 2.1 品牌主色 — Blue
| Token | 色值 | 用途 |
|---|---|---|
| `colorPrimary` | `#1677ff` | 主按钮 / 链接 / 激活态 |
| `colorPrimaryHover` | `#4096ff` | 主按钮 hover |
| `colorPrimaryActive` | `#0958d9` | 主按钮 active |
| `colorPrimaryBg` | `#e6f4ff` | 选中态背景 / tag |
| `colorPrimaryBgHover` | `#bae0ff` | hover 浅蓝 |
| `colorPrimaryBorder` | `#91caff` | 边框 / 分割线 |
| `colorPrimaryText` | `#1677ff` | 文字按钮 |
| `colorPrimaryTextHover` | `#4096ff` | 文字按钮 hover |
| `colorPrimaryTextActive` | `#0958d9` | 文字按钮 active |

### 2.2 状态色
| 状态 | Token | 色值 | 用途 |
|---|---|---|---|
| 成功 | `colorSuccess` | `#52c41a` | 通过 / 已完成 |
| | `colorSuccessBg` | `#f6ffed` | 成功背景 |
| | `colorSuccessBorder` | `#b7eb8f` | 成功边框 |
| 警告 | `colorWarning` | `#faad14` | 审核中 / 待补件 |
| | `colorWarningBg` | `#fffbe6` | 警告背景 |
| | `colorWarningBorder` | `#ffe58f` | 警告边框 |
| 错误 | `colorError` | `#f5222d` | 驳回 / 不通过 |
| | `colorErrorBg` | `#fff1f0` | 错误背景 |
| | `colorErrorBorder` | `#ffa39e` | 错误边框 |
| 信息 | `colorInfo` | `#1677ff` | 普通信息（同主色） |
| | `colorInfoBg` | `#e6f4ff` | 信息背景 |

### 2.3 中性色 (Neutral / Greys)
| Token | 色值 | 用途 |
|---|---|---|
| `colorText` | `#000000d9` | 主要文字（87% 不透明黑） |
| `colorTextSecondary` | `#00000073` | 次要文字（45%）|
| `colorTextTertiary` | `#00000040` | 辅助文字（25%）|
| `colorTextQuaternary` | `#00000018` | 占位符 / 禁用（10%）|
| `colorBgContainer` | `#ffffff` | 卡片 / 容器背景 |
| `colorBgElevated` | `#ffffff` | 弹窗 / 下拉 |
| `colorBgLayout` | `#f5f5f5` | 页面背景 |
| `colorBgSpotlight` | `#000000` | 强遮罩（带透明度） |
| `colorBgMask` | `#00000060` | 弹窗遮罩 |
| `colorBorder` | `#d9d9d9` | 默认边框 |
| `colorBorderSecondary` | `#f0f0f0` | 浅边框 / 分割线 |
| `colorSplit` | `#f0f0f0` | 表格分割线 |
| `colorFill` | `#0000000a` | 微弱填充（4%）|
| `colorFillSecondary` | `#0000000f` | 浅填充（6%）|
| `colorFillTertiary` | `#00000014` | 中填充（8%）|
| `colorFillQuaternary` | `#0000001c` | 强填充（11%）|

---

## 三、字体系统 (Typography)

### 3.1 字体族
```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", 
             "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", 
             Helvetica, Arial, sans-serif;
/* 数字字体（金额 / 表格数值）优先用系统等宽数字 */
font-variant-numeric: tabular-nums;
```

### 3.2 字号阶梯
| Token | 字号 px | 字重 | 行高 | 用途 |
|---|---|---|---|---|
| `fontSizeXL` | 20 | 600 | 1.4 | 大标题 / 弹窗标题 |
| `fontSizeLG` | 16 | 600 | 1.5 | 卡片标题 / 区块标题 |
| `fontSizeMD` | 14 | 400 | 1.5 | **正文（默认）** |
| `fontSizeSM` | 13 | 400 | 1.5 | 次要正文 / 表格内容 |
| `fontSizeXS` | 12 | 400 | 1.5 | 辅助文字 / 注释 / 标签 |

> **说明**: Ant Design v5 默认 14px 为基础正文，金融 B 端信息密度高，我们采用 14 / 13 / 12 三级。

### 3.3 字重
| Token | 字重 | 用途 |
|---|---|---|
| `fontWeightNormal` | 400 | 正文 |
| `fontWeightMedium` | 500 | 表格表头 / 强调 |
| `fontWeightSemibold` | 600 | 标题 / 金额 |
| `fontWeightBold` | 700 | 大数字 / 警示 |

---

## 四、间距系统 (Spacing)

### 4.1 基础间距（4 倍数）
| Token | 像素 | 用途 |
|---|---|---|
| `spaceXS` | 4 | 紧凑元素间距（icon + text） |
| `spaceSM` | 8 | 表单字段内 padding / 小间距 |
| `spaceMD` | 12 | 卡片内组件间距 |
| `spaceLG` | 16 | 卡片内区块间距 / 行内元素 |
| `spaceXL` | 24 | 卡片间距 / 区块间距 |
| `space2XL` | 32 | 大区块分隔 |
| `space3XL` | 48 | 页面顶部留白 |
| `space4XL` | 64 | 模态框 padding |

### 4.2 容器 / 布局尺寸
| Token | 像素 | 用途 |
|---|---|---|
| `headerHeight` | 64 | 顶栏高度 |
| `siderWidth` | 200 | 侧边栏宽度（折叠 80） |
| `contentMaxWidth` | 1440 | 桌面端最大宽度 |
| `contentMaxWidthTablet` | 768 | 平板端最大宽度 |
| `cardBorderRadius` | 8 | 卡片圆角 |
| `inputHeightDefault` | 32 | 输入框默认高度 |
| `inputHeightLarge` | 40 | 大尺寸输入框 |
| `buttonHeightDefault` | 32 | 按钮默认高度 |
| `buttonHeightLarge` | 40 | 大尺寸按钮 |
| `footerActionsHeight` | 64 | 底部固定操作栏 |

---

## 五、圆角 (Border Radius)

| Token | 像素 | 用途 |
|---|---|---|
| `borderRadiusXS` | 2 | 标签 / tag |
| `borderRadiusSM` | 4 | 小按钮 / 小卡片 |
| `borderRadius` | 6 | **默认（按钮 / 输入框）** |
| `borderRadiusLG` | 8 | **卡片 / 弹窗** |
| `borderRadiusXL` | 16 | 大卡片 / 容器 |
| `borderRadiusRound` | 9999 | 圆形头像 / tag |

---

## 六、阴影 (Shadow)

| Token | 值 | 用途 |
|---|---|---|
| `boxShadowXS` | `0 1px 2px 0 rgba(0,0,0,0.03)` | 微抬升（标签） |
| `boxShadowSM` | `0 1px 2px 0 rgba(0,0,0,0.06), 0 1px 6px -1px rgba(0,0,0,0.06)` | **卡片** |
| `boxShadow` | `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)` | 下拉 / Popover |
| `boxShadowLG` | `0 12px 32px 0 rgba(0,0,0,0.10), 0 4px 8px 0 rgba(0,0,0,0.05)` | **弹窗** |
| `boxShadowTabs` | `0 1px 0 0 #f0f0f0` | Tab 下划线 |

---

## 七、动效 (Motion)

| Token | 时长 | 用途 |
|---|---|---|
| `motionDurationFast` | 0.1s | 微交互（hover / focus） |
| `motionDurationMid` | 0.2s | **默认**（按钮 / 弹窗进入） |
| `motionDurationSlow` | 0.3s | 抽屉 / 复杂过渡 |
| `motionEaseInOut` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | 默认缓动 |

---

## 八、组件规范（关键组件）

### 8.1 Button 按钮
| 变体 | 用途 | 样式 |
|---|---|---|
| Primary | 主操作（提交 / 保存） | `bg: #1677ff` / `color: #fff` |
| Default | 次操作（取消 / 返回） | `bg: #fff` / `border: #d9d9d9` / `color: #000000d9` |
| Text | 弱操作（更多 / 链接） | `bg: transparent` / `color: #1677ff` |
| Danger | 危险操作（删除 / 驳回） | `bg: #f5222d` / `color: #fff` |
| Ghost | 透明背景 | `border: #1677ff` / `color: #1677ff` |

**尺寸**: SM 24px / MD 32px / LG 40px  
**圆角**: 6px  
**Hover**: 主色加亮 20% / 次色变浅灰背景

### 8.2 Input 输入框
- 高度 32px
- 边框 1px `#d9d9d9`，hover `#4096ff`，focus `#1677ff` + 2px 外阴影
- 圆角 6px
- 占位符 `#00000045`
- 必填项 label 加红色 `*`

### 8.3 Card 卡片
- 背景 `#ffffff`
- 边框 1px `#f0f0f0`（浅）
- 圆角 8px
- 阴影 `boxShadowSM`
- 标题: `fontSizeLG 16px / 600` + 蓝色色块图标（`w-1 h-4 bg-blue-500`）

### 8.4 Table 表格
- 表头: `bg: #fafafa` / `color: #000000d9` / `fontSizeSM 13px` / `fontWeightMedium 500`
- 行高: 48px（默认）/ 40px（紧凑）
- 边框: 行间 1px `#f0f0f0`
- Hover: 行背景 `#fafafa`
- 数字列: 右对齐 + `fontVariantNumeric: tabular-nums`

### 8.5 Tabs 标签页
- 高度: 46px
- 激活下划线: 2px `#1677ff`
- 文字: 默认 `#00000073` / 激活 `#1677ff` / 字重 500
- 间距: tab 间 24px
- 禁用: 灰色 + 不可点击

### 8.6 Tag 标签
| 类型 | 背景 | 文字 | 边框 |
|---|---|---|---|
| Success | `#f6ffed` | `#52c41a` | `#b7eb8f` |
| Warning | `#fffbe6` | `#faad14` | `#ffe58f` |
| Error | `#fff1f0` | `#f5222d` | `#ffa39e` |
| Processing | `#e6f4ff` | `#1677ff` | `#91caff` |
| Default | `#fafafa` | `#00000073` | `#d9d9d9` |

### 8.7 Step 步骤条
- 圆形数字: 32px 直径
- 状态: pending `#fff` 边框 `#d9d9d9` / active `#1677ff` 文字 `#fff` / finish `#1677ff` 文字 `#fff`
- 连接线: 1px `#d9d9d9` / 激活后 `#1677ff`
- 标题: 13px / 完成 `#000000d9` / 进行中 `#1677ff` / 未开始 `#00000073`

---

## 九、断点 (Breakpoints)

| 端 | 最小宽度 | 最大宽度 | 设备 |
|---|---|---|---|
| Mobile | 0 | 767 | 手机 |
| **Tablet** | 768 | 1199 | **平板（本次设计目标）** |
| Desktop | 1200 | 1599 | 笔记本 |
| **Large Desktop** | 1600 | ∞ | **大屏桌面（本次设计目标 1440px）** |

> 本次设计稿针对 **Desktop 1440px** + **Tablet 768px** 双端交付。

---

## 十、Z-Index 层级

| Token | 值 | 用途 |
|---|---|---|
| `zIndexBase` | 0 | 基础 |
| `zIndexDropdown` | 1050 | 下拉菜单 |
| `zIndexSticky` | 1060 | 固定头 |
| `zIndexFixed` | 1070 | 固定按钮 |
| `zIndexModalBackdrop` | 1080 | 弹窗遮罩 |
| `zIndexModal` | 1090 | 弹窗 |
| `zIndexPopover` | 1100 | 气泡 |
| `zIndexTooltip` | 1110 | 提示 |
| `zIndexNotification` | 1200 | 通知 |

---

## 十一、与现有原型一致性

> 现有高保真 HTML 原型（v1.7.36 ~ v1.7.38）已使用 Tailwind 实现的视觉与本 Token 一一对应：

| Tailwind 类 | Ant Design Token |
|---|---|
| `bg-blue-500 / 600` | `colorPrimary / colorPrimaryHover` |
| `bg-slate-50` | `colorBgLayout` |
| `bg-white border-slate-200` | `colorBgContainer + colorBorderSecondary` |
| `text-slate-500/600/700` | `colorTextSecondary/Tertiary/Text` |
| `text-emerald-500 / 600` | `colorSuccess` |
| `text-rose-500` | `colorError` |
| `rounded-xl` (12px) | `borderRadiusLG` (8px) — 略偏大可微调 |
| `shadow-sm` | `boxShadowSM` |

**前端开发建议**:
- 直接安装 `antd` v5.x
- 用 `ConfigProvider` 注入自定义 token（如有品牌调整）
- 不使用 Ant Design Pro / 其他封装层，保持纯净
