// 大河智链 - 通用工具函数

const Utils = {
  // 金额格式化（千分位 + 2 位小数 + ¥）
  fmtMoney(v, withSymbol = true) {
    if (v == null || v === '') return '-';
    const n = Number(v);
    if (isNaN(n)) return '-';
    const formatted = n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return withSymbol ? `¥${formatted}` : formatted;
  },

  // 数字（千分位，无小数）
  fmtNum(v) {
    if (v == null || v === '') return '-';
    return Number(v).toLocaleString('zh-CN');
  },

  // 数字 + 单位（千克/件/吨）
  fmtWithUnit(v, unit = '') {
    if (v == null || v === '') return '-';
    return `${Number(v).toLocaleString('zh-CN', { maximumFractionDigits: 2 })}${unit}`;
  },

  // 日期格式化（Excel 序列号 → YYYY-MM-DD）
  fmtDate(v) {
    if (!v) return '-';
    if (typeof v === 'number') {
      // Excel 日期序列号
      const date = new Date((v - 25569) * 86400 * 1000);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return v;
  },

  // 银行卡号脱敏（中间打码）
  maskBankCard(no) {
    if (!no) return '-';
    const s = String(no);
    if (s.length < 8) return s;
    return `${s.slice(0, 4)} **** **** ${s.slice(-4)}`;
  },

  // 身份证脱敏
  maskIdCard(no) {
    if (!no) return '-';
    const s = String(no);
    if (s.length < 10) return s;
    return `${s.slice(0, 3)}***********${s.slice(-4)}`;
  },

  // 百分比
  fmtPercent(v, decimals = 2) {
    if (v == null) return '-';
    const n = Number(v);
    if (isNaN(n)) return '-';
    return `${n.toFixed(decimals)}%`;
  },

  // 状态映射（v1.7 扩展：按 PRD §4.9 状态机表）
  statusText(s) {
    const map = {
      'draft': '草稿',
      'pending': '待审核',
      'pending_submit': '待提交',
      'pending_owner_seal': '待货主方盖章',
      'pending_owner_seal_2': '待货主方二次盖章',
      'pending_guarantor': '待担保方审核',
      'pending_guarantor_seal': '待担保方盖章',
      'pending_platform': '待监管方审核',
      'pending_platform_seal': '待监管方盖章',
      'pending_funding': '待资金方审核',
      'pending_funding_seal': '待资金方盖章',
      'pending_funding_payment': '待放款',
      'pending_inbound': '待入库',
      'pending_outbound': '待出库',
      'pending_repayment': '待还款',
      'inbound_completed': '已入库',
      'outbound_completed': '已出库',
      'repaid': '已还款',
      'released': '已放款',
      'running': '进行中',
      'approved': '已通过',
      'rejected': '已驳回',
      'voided': '作废',
      'invalid': '无效',
      'completed': '已完成',
      'cancelled': '已取消',
      'warning': '预警',
      'danger': '熔断',
      'submitted': '已提交',
      'reviewing': '审核中',
      'inbound': '已入库',
      'pledged': '已质押',
      'financing': '融资中',
      'released': '已放款',
      'partial': '部分还款',
      'cleared': '已结清',
      'expired': '已到期',
      'pre_inbound': '待入库',
      'pre_outbound': '待出库',
      'pre_release': '待放货',
      'pre_signing': '待签约',
      'pending_confirm': '待确认',
      'confirmed': '已确认',
      'verified': '已核验',
      'abnormal': '异常',
      'normal': '正常',
    };
    return map[s] || s;
  },

  // 状态颜色类（v1.7 扩展）
  statusClass(s) {
    const map = {
      'draft': 'bg-gray-100 text-gray-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'pending_submit': 'bg-gray-100 text-gray-700',
      'pending_owner_seal': 'bg-amber-100 text-amber-700',
      'pending_owner_seal_2': 'bg-amber-100 text-amber-700',
      'pending_guarantor': 'bg-blue-100 text-blue-700',
      'pending_guarantor_seal': 'bg-blue-100 text-blue-700',
      'pending_platform': 'bg-purple-100 text-purple-700',
      'pending_platform_seal': 'bg-purple-100 text-purple-700',
      'pending_funding': 'bg-orange-100 text-orange-700',
      'pending_funding_seal': 'bg-orange-100 text-orange-700',
      'pending_funding_payment': 'bg-orange-100 text-orange-700',
      'pending_inbound': 'bg-sky-100 text-sky-700',
      'pending_outbound': 'bg-sky-100 text-sky-700',
      'pending_repayment': 'bg-orange-100 text-orange-700',
      'inbound_completed': 'bg-emerald-100 text-emerald-700',
      'outbound_completed': 'bg-emerald-100 text-emerald-700',
      'repaid': 'bg-emerald-100 text-emerald-700',
      'released': 'bg-green-100 text-green-700',
      'reviewing': 'bg-blue-100 text-blue-700',
      'approved': 'bg-green-100 text-green-700',
      'rejected': 'bg-red-100 text-red-700',
      'voided': 'bg-gray-100 text-gray-500',
      'invalid': 'bg-gray-100 text-gray-500',
      'completed': 'bg-emerald-100 text-emerald-700',
      'cancelled': 'bg-gray-100 text-gray-500',
      'warning': 'bg-amber-100 text-amber-700',
      'danger': 'bg-rose-100 text-rose-700',
      'running': 'bg-blue-100 text-blue-700',
      'submitted': 'bg-indigo-100 text-indigo-700',
      'inbound': 'bg-cyan-100 text-cyan-700',
      'pledged': 'bg-violet-100 text-violet-700',
      'financing': 'bg-purple-100 text-purple-700',
      'released': 'bg-green-100 text-green-700',
      'partial': 'bg-orange-100 text-orange-700',
      'cleared': 'bg-emerald-100 text-emerald-700',
      'expired': 'bg-red-100 text-red-700',
      'pre_inbound': 'bg-sky-100 text-sky-700',
      'pre_outbound': 'bg-sky-100 text-sky-700',
      'pre_release': 'bg-sky-100 text-sky-700',
      'pre_signing': 'bg-sky-100 text-sky-700',
      'pending_confirm': 'bg-yellow-100 text-yellow-700',
      'confirmed': 'bg-emerald-100 text-emerald-700',
      'verified': 'bg-emerald-100 text-emerald-700',
      'abnormal': 'bg-rose-100 text-rose-700',
      'normal': 'bg-emerald-100 text-emerald-700',
    };
    return map[s] || 'bg-gray-100 text-gray-700';
  },

  // 角色标识
  roleLabel(r) {
    return { 'customer': '货主方', 'platform': '监管方', 'guarantor': '担保方', 'bank': '资金方' }[r] || r;
  },

  // 计算融资规模（货值 × 质押率）
  calcLoanAmount(evaluateValue, ratio = 0.8) {
    return Math.round(Number(evaluateValue) * ratio * 100) / 100;
  },

  // 计算监管费（年化 1.16‰，按日计）
  calcSupervisionFee(dailyValue, days, rate = 0.00116) {
    return Number((dailyValue * rate / 365 * days).toFixed(2));
  },

  // 跳转到页面
  go(path) {
    window.location.href = path;
  },

  // Toast 提示
  toast(msg, type = 'success') {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warn: 'bg-yellow-500',
      info: 'bg-blue-500',
    };
    const t = document.createElement('div');
    t.className = `toast text-white ${colors[type] || colors.info}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 2500);
  },

  // 模拟 Loading
  loading(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span> 处理中...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 800);
  },

  // 获取当前角色
  getRole() {
    return localStorage.getItem('dhzl_role') || 'customer';
  },
  setRole(r) {
    localStorage.setItem('dhzl_role', r);
  },

  // 当前顶层子产品 id（v1.7.26 起：多产品线切换）
  // warehouse 智慧仓储 / digital 数字供应链 / finance 供应链金融 / ops 运营管理
  getProductLine() {
    return localStorage.getItem('dhzl_product') || 'warehouse';
  },
  setProductLine(p) {
    localStorage.setItem('dhzl_product', p);
  },
  // 根据 id 解析 productLine 配置（含父级 line 信息）
  resolveProductLine(id) {
    const productLines = (typeof MockData !== 'undefined' && MockData.productLines) || [];
    for (const line of productLines) {
      for (const sub of (line.subItems || [])) {
        if (sub.id === id) return { ...sub, topLine: line };
      }
    }
    return null;
  },
  // productLine 的展示标签（按子产品 id 返回）
  productLineLabel(id) {
    const p = this.resolveProductLine(id);
    return p ? p.label : id;
  },

  // 当前登录用户
  getUser() {
    return JSON.parse(localStorage.getItem('dhzl_user') || 'null');
  },
  setUser(u) {
    localStorage.setItem('dhzl_user', JSON.stringify(u));
  },
  logout() {
    localStorage.removeItem('dhzl_user');
    window.location.href = '/login';
  },

  // 相对时间
  relativeTime(d) {
    if (!d) return '-';
    const date = typeof d === 'number' ? new Date((d - 25569) * 86400 * 1000) : new Date(d);
    const diff = Date.now() - date.getTime();
    const day = 86400000;
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff/60000)} 分钟前`;
    if (diff < day) return `${Math.floor(diff/3600000)} 小时前`;
    if (diff < day * 7) return `${Math.floor(diff/day)} 天前`;
    return this.fmtDate(d);
  },

  // 业务编号生成（DHZL_<客户简称>_YYYYMMDDXX）
  genBizNo(customerCode = 'JMY') {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 90) + 10);
    return `DHZL_${customerCode}_${y}${m}${day}${rand}`;
  },

  // 生成借据号
  genLoanNo() {
    return `LN3019202${String(Math.floor(Math.random() * 9e9) + 1e9).slice(0, 9)}`;
  },

  // 随机真实感中文姓名
  randomName() {
    const surnames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '林', '郭', '何', '高', '罗'];
    const names = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '霞', '平'];
    return surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)];
  },

  // 真实感电话号码
  randomPhone() {
    const prefixes = ['138', '139', '150', '151', '152', '158', '186', '188'];
    return prefixes[Math.floor(Math.random() * prefixes.length)] + String(Math.floor(Math.random() * 1e8)).padStart(8, '0');
  },

  // v1.7.7 升级：导航 URL 拼接（兼容 GitHub Pages 子路径 + Cloudflare Pages/Vercel 根路径）
  // 用法：window.location.href = Utils.nav('/customer/inbound')
  // - 根级页面（/dashboard, /login, /）：保持不变
  // - 子目录页面（/customer/xxx, /platform/xxx 等）：自动补 /pages/ 前缀
  // - 已含 /shared/ /pages/ 的资源路径：原样返回
  // GitHub Pages 上：返回 '/dhzl-supply-chain/pages/customer/inbound'
  // Cloudflare Pages 上：返回 '/pages/customer/inbound'
  nav(path) {
    if (typeof path !== 'string') return path;
    // 完整 URL / 协议相对 URL：原样返回
    if (/^https?:\/\//.test(path) || path.startsWith('//')) return path;
    const p = window.location.pathname;
    const base = p.indexOf('/dhzl-supply-chain/') === 0 ? '/dhzl-supply-chain' : '';
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    // 已含 /pages/ 或 /shared/ 或 /docs/：原样返回（这些是顶层目录，不是角色子目录）
    if (cleanPath.startsWith('/pages/') || cleanPath.startsWith('/shared/') || cleanPath.startsWith('/docs/')) {
      return base + cleanPath;
    }
    // 根级页面：保持不变
    const rootPages = ['/dashboard', '/login', '/', '/index.html'];
    if (rootPages.includes(cleanPath)) {
      return base + cleanPath;
    }
    // 角色子目录页面（customer/platform/bank/warehouse/guarantor）：自动补 /pages/
    return base + '/pages' + cleanPath;
  },
};

window.Utils = Utils;

// v1.7.7 全局拦截硬编码角色子目录链接（避免在 Cloudflare Pages 上 404 后回首页）
// 适用范围：dashboard.html、docs/prd.html 等用硬编码 href="/customer/xxx" 的页面
// 通过捕获阶段拦截，自动用 Utils.nav() 重写 URL
// 注意：跳过非左键点击（middle-click/右键）和带修饰键的点击，让浏览器正常处理新标签页打开
document.addEventListener('click', function(e) {
  if (e.button !== 0) return; // 只处理左键
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // 带修饰键的交给浏览器
  const a = e.target.closest && e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href) return;
  // 只拦截硬编码角色子目录链接（不带 /pages/ 前缀的）
  if (/^\/(customer|platform|bank|warehouse|guarantor)(\/|$)/.test(href)) {
    e.preventDefault();
    window.location.href = Utils.nav(href);
  }
}, true);