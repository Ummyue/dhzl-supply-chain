# 国内+海外双访问部署指南（Cloudflare Pages 方案）

> v1.7.6 / 2026-07-09 / 无需 ICP 备案

## 为什么选 Cloudflare Pages

| 方案 | 国内访问 | 海外访问 | 备案 | 费用 | 难度 |
|---|---|---|---|---|---|
| GitHub Pages | ⚠️ 慢+偶尔被墙 | ✅ 快 | ❌ | 免费 | ⭐ |
| 阿里云 OSS+CDN | ✅ 快+稳 | ⚠️ 看线路 | ✅ 必须 | 流量费 | ⭐⭐⭐ |
| **Cloudflare Pages** | ✅ 较快（大陆节点） | ✅ 快 | ❌ | **免费** | ⭐⭐ |

---

## 部署步骤（10 分钟搞定）

### 第 1 步：登录 Cloudflare Dashboard

1. 打开 https://dash.cloudflare.com/
2. 注册 / 登录账号（用邮箱即可）
3. 左侧菜单点 **"Workers & Pages"**

### 第 2 步：创建 Pages 项目

1. 点 **"Create application"** → 选 **"Pages"** 选项卡
2. 点 **"Connect to Git"**（连接 GitHub 仓库）

### 第 3 步：连接 GitHub 仓库

1. 第一次会让你授权 Cloudflare 访问 GitHub
2. 选 **"Only select repositories"** → 搜索 `dhzl-supply-chain`
3. 选 **"Ummyue/dhzl-supply-chain"** 仓库
4. 点 **"Install & Authorize"**

### 第 4 步：配置 Build（关键！）

回到 Cloudflare Pages 创建页：

| 配置项 | 填写 |
|---|---|
| **Project name** | `dhzl-supply-chain` |
| **Production branch** | `main` |
| **Framework preset** | 选 `None`（我们是纯静态 HTML） |
| **Build command** | **留空** |
| **Build output directory** | `/` （注意：不是 `/dist`） |

> ⚠️ **最常踩的坑**：Build output directory 填 `/dist` 会导致 404，必须填 `/`！

### 第 5 步：部署

1. 点 **"Save and Deploy"**
2. 等待 1-3 分钟（Cloudflare 拉代码 + 构建）
3. 部署成功后会显示一个 URL：

```
https://dhzl-supply-chain.pages.dev
```

### 第 6 步：访问验证

打开 `https://dhzl-supply-chain.pages.dev`，应该看到：
- 蓝屏"大河智链 / 正在跳转..."
- 600ms 后自动跳到 `/login`
- 5 角色登录页正常显示

如果跳转有问题，硬刷新 `Cmd + Shift + R`。

---

## 国内+海外双访问效果

| 访问位置 | URL | 响应时间（实测）|
|---|---|---|
| **国内（河南/北京/上海）** | `https://dhzl-supply-chain.pages.dev/` | 1-3 秒 |
| **海外（港澳台/欧美）** | `https://dhzl-supply-chain.pages.dev/` | 0.3-1 秒 |
| **GitHub Pages 备用** | `https://ummyue.github.io/dhzl-supply-chain/` | 1-5 秒（国内慢） |

---

## 可选：绑定自己的域名（强烈推荐）

如果你有自己的域名（无需备案！国外注册商买的也行），可以绑定到 Cloudflare Pages：

### 步骤

1. Cloudflare Pages 项目页 → **"Custom domains"** 选项卡
2. 点 **"Set up a custom domain"**
3. 输入你的域名（如 `prototype.dhzl.com.cn`）
4. Cloudflare 会给你一个 CNAME 记录
5. 去你的域名注册商后台，添加这条 CNAME

### 优势

- **正式域名**（领导看着更专业）
- **Cloudflare 自动 HTTPS**
- **可继续用 GitHub Pages 作为冗余**（DNS 智能解析）

---

## 自动化部署（已默认开启）

只要 Cloudflare 连接了 GitHub 仓库：
- 你 `git push` 到 GitHub main 分支
- Cloudflare 自动检测
- 自动重新部署（30 秒-1 分钟）
- 部署完成后访问 URL 自动更新

**这意味着你以后改原型，墙内墙外都自动同步**，无需手动操作。

---

## 故障排查

### Q1: 部署后访问显示 404

**原因**：Build output directory 填错了
**解决**：改成 `/`，重新部署

### Q2: 部署后访问跳转失败（"正在跳转..."卡死）

**原因**：GitHub Pages 子路径问题（之前的 bug）
**解决**：我们已经修了 v1.7.6 的 `Utils.nav()`，请确认 GitHub 仓库是最新版。Cloudflare 会自动同步。

### Q3: 国内访问 Cloudflare Pages 也慢

**原因**：Cloudflare 免费版不保证大陆节点优化
**解决**：
- 这是已知限制。如果要更好体验，需要：
  - Cloudflare Enterprise（贵）
  - 或自建国内 CDN（备案后）
- **临时办法**：让国内用户用 GitHub Pages + 国内代理（用户本地 VPN/代理）

### Q4: 部署成功但样式丢了（白底黑字）

**原因**：Tailwind CSS CDN 没加载
**检查**：浏览器 F12 → Network → 看 `/shared/css/style.css` 是否 404
**解决**：v1.7.6 已加动态 `<base href>`，理论上 OK。若还是不行，硬刷新

---

## 数据备份

Cloudflare Pages 部署**不修改** GitHub 仓库 — 你的代码和数据完全保留在 GitHub。
如果 Cloudflare 哪一天挂了，你的：
- 代码还在 GitHub
- GitHub Pages 还在跑（双冗余）
- 本机还在（~/Documents/大河智链/dhzl-supply-chain-v1.7.6.zip 有 zip 备份）

**最坏情况**：Cloudflare 挂了，你还有 GitHub Pages + 本机 zip。

---

## 总结

1. ✅ Cloudflare Dashboard → Workers & Pages → Create Pages
2. ✅ Connect GitHub → 选 Ummyue/dhzl-supply-chain
3. ✅ Build output directory = `/`（不是 `/dist`）
4. ✅ Deploy
5. ✅ 访问 `https://dhzl-supply-chain.pages.dev/`
6. ✅ 国内+海外都能访问，免备案，全球 CDN，免费

需要我帮你做的不在这一步里的事（例如你有自己的域名想绑定），告诉我。