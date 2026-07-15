// ============ v1.7.8 融资申请/审核列表共享渲染 ============
// 复用：监管方/担保方/资金方【融资审核】页面 = 货主方【融资申请】列表结构
// 复用：10 状态机 tab + 8 项筛选 + 18 列明细 + CSV 导出
// 差异点：操作按钮（按 config.actionRenderer）、顶部 stats（按 config.statsCards）、流程提示文字（按 config.introText）

(function() {
  // 状态机 → 文本映射（默认）
  const DEFAULT_STATUS_LABEL = {
    'pending': { text: '未提交', color: 'text-slate-500' },
    'pending_supervisor_eval': { text: '⏳ 待监管方评估货值', color: 'text-amber-600' },
    'pending_owner_confirm': { text: '⏳ 待融资方确认货值', color: 'text-amber-600' },
    'pending_owner_seal_2': { text: '⏳ 待融资方盖章', color: 'text-amber-600' },
    'pending_supervisor': { text: '⏳ 待监管方盖章', color: 'text-blue-600' },
    'pending_guarantor': { text: '⏳ 待担保方审核', color: 'text-blue-600' },
    'pending_guarantor_seal': { text: '⏳ 待担保方盖章', color: 'text-blue-600' },
    'pending_funding': { text: '⏳ 待资金方审核', color: 'text-blue-600' },
    'pending_disbursement': { text: '⏳ 待放款', color: 'text-violet-600' },
    'released': { text: '✓ 已放款', color: 'text-emerald-600' },
    'rejected': { text: '🔴 驳回', color: 'text-red-600' },
    'voided': { text: '⚫ 作废', color: 'text-slate-500' },
  };

  const FINANCING_TABS = [
    { id: 'all', label: '全部' },
    { id: 'pending_supervisor_eval', label: '待监管方评估货值' },
    { id: 'pending_owner_confirm', label: '待融资方确认货值' },
    { id: 'pending_owner_seal_2', label: '待融资方盖章' },
    { id: 'pending_supervisor', label: '待监管方盖章' },
    { id: 'pending_guarantor', label: '待担保方审核' },
    { id: 'pending_guarantor_seal', label: '待担保方盖章' },
    { id: 'pending_funding', label: '待资金方审核' },
    { id: 'pending_disbursement', label: '待放款' },
    { id: 'released', label: '已放款' },
    { id: 'rejected', label: '驳回', separator: true },
    { id: 'voided', label: '作废' },
  ];

  // v1.7.75：角色 → 默认 tab 映射（演示时进入列表页自动切到该角色该处理的节点）
  const ROLE_DEFAULT_TAB = {
    platform:   'pending_supervisor_eval',  // 监管方：待评估货值
    guarantor:  'pending_guarantor',        // 担保方：待核保
    bank:       'pending_funding',          // 资金方：待审核
    customer:   'pending_supervisor_eval',  // 货主方：自己的申请处于"待监管方评估货值"（与列表汇总口径一致）
  };
  function _getDefaultTab() {
    const role = (typeof Utils !== 'undefined' && Utils.getRole) ? Utils.getRole() : 'platform';
    return ROLE_DEFAULT_TAB[role] || 'all';
  }

  // 公共筛选器结构（金融从业者使用习惯）
  const DEFAULT_FILTER_FIELDS = [
    { key: 'bizNo', label: '融资申请编号', type: 'search' },
    { key: 'applicant', label: '融资方', type: 'select' },
    { key: 'bank', label: '金融机构', type: 'select' },
    { key: 'productName', label: '金融产品', type: 'select' },
    { key: 'guarantor', label: '担保方', type: 'select' },
    { key: 'supervisor', label: '监管方', type: 'select' },
    { key: 'pledgeAssetNo', label: '货押资产编号', type: 'search' },
    { key: 'dateRange', label: '融资期限', type: 'dateRange' }, // 占位，下面单独处理
  ];

  function _unique(field) {
    return [...new Set(MockData.financingList.map(f => f[field]).filter(v => v))];
  }

  function applyFilters(f) {
    const fuzzy = (val, kw) => !kw || (val || '').toLowerCase().includes(kw.toLowerCase().trim());
    const inDateRange = (rec) => {
      if (!f.startDate && !f.endDate) return true;
      if (!rec.startDate) return false;
      if (f.startDate && rec.startDate < f.startDate) return false;
      if (f.endDate && rec.startDate > f.endDate) return false;
      return true;
    };
    return MockData.financingList.filter(rec =>
      fuzzy(rec.bizNo, f.bizNo) &&
      (!f.applicant || rec.applicant === f.applicant) &&
      (!f.bank || rec.bank === f.bank) &&
      (!f.productName || rec.productName === f.productName) &&
      (!f.guarantor || rec.guarantor === f.guarantor) &&
      (!f.supervisor || rec.supervisor === f.supervisor) &&
      fuzzy(rec.pledgeAssetNo, f.pledgeAssetNo) &&
      inDateRange(rec)
    );
  }

  function renderTabs(currentTab, getFilteredCount) {
    const buttons = FINANCING_TABS.map(t => {
      const count = getFilteredCount(t.id);
      const active = t.id === currentTab;
      const sep = t.separator ? '<span class="mx-1 h-4 w-px bg-slate-300"></span>' : '';
      return `
        ${sep}
        <button onclick="window.__FinancingList.switchTab('${t.id}')" class="px-3 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
          active
            ? 'border-blue-600 text-blue-700'
            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'
        }">
          ${t.label}
          <span class="px-1.5 py-0.5 text-xs rounded ${active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}">${count}</span>
        </button>
      `;
    }).join('');
    // 关键：自己包一层 flex 容器，refresh() 整体替换才不会丢横向布局
    return `<div class="flex items-center gap-1 min-w-max">${buttons}</div>`;
  }

  function renderFilterBar(f) {
    const applicants = _unique('applicant');
    const banks = _unique('bank');
    const products = _unique('productName');
    const guarantors = _unique('guarantor');
    const supervisors = _unique('supervisor');
    const activeCount = Object.entries(f).filter(([k, v]) => k !== 'currentTab' && v && String(v).trim()).length;
    return `
      <div class="bg-white rounded-xl border border-slate-200 p-4 mb-3">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2 text-sm font-medium text-slate-700">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
            筛选条件
            ${activeCount > 0 ? `<span class="px-1.5 py-0.5 text-xs rounded bg-blue-100 text-blue-700">${activeCount}</span>` : ''}
          </div>
          <button onclick="window.__FinancingList.resetFilters()" class="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 ${activeCount > 0 ? '' : 'opacity-40 cursor-not-allowed'}" ${activeCount === 0 ? 'disabled' : ''}>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            重置筛选
          </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div>
            <label class="block text-xs text-slate-500 mb-1">融资申请编号</label>
            <input type="text" placeholder="模糊搜索" value="${f.bizNo || ''}" oninput="window.__FinancingList.updateFilter('bizNo', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">融资方</label>
            <select onchange="window.__FinancingList.updateFilter('applicant', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none bg-white">
              <option value="">全部</option>
              ${applicants.map(v => `<option value="${v}" ${f.applicant === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">金融机构</label>
            <select onchange="window.__FinancingList.updateFilter('bank', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none bg-white">
              <option value="">全部</option>
              ${banks.map(v => `<option value="${v}" ${f.bank === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">金融产品</label>
            <select onchange="window.__FinancingList.updateFilter('productName', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none bg-white">
              <option value="">全部</option>
              ${products.map(v => `<option value="${v}" ${f.productName === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">担保方</label>
            <select onchange="window.__FinancingList.updateFilter('guarantor', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none bg-white">
              <option value="">全部</option>
              ${guarantors.map(v => `<option value="${v}" ${f.guarantor === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">监管方</label>
            <select onchange="window.__FinancingList.updateFilter('supervisor', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none bg-white">
              <option value="">全部</option>
              ${supervisors.map(v => `<option value="${v}" ${f.supervisor === v ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">货押资产编号</label>
            <input type="text" placeholder="模糊搜索" value="${f.pledgeAssetNo || ''}" oninput="window.__FinancingList.updateFilter('pledgeAssetNo', this.value)" class="w-full px-2 py-1.5 text-sm border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
          </div>
          <div>
            <label class="block text-xs text-slate-500 mb-1">融资期限</label>
            <div class="flex items-center gap-1">
              <input type="date" value="${f.startDate || ''}" onchange="window.__FinancingList.updateFilter('startDate', this.value)" class="w-full px-1.5 py-1.5 text-xs border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
              <span class="text-slate-400 text-xs">~</span>
              <input type="date" value="${f.endDate || ''}" onchange="window.__FinancingList.updateFilter('endDate', this.value)" class="w-full px-1.5 py-1.5 text-xs border border-slate-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderRows(tabId, f, actionRenderer, statusLabelMap, onRowClick) {
    // 状态机文本：默认 + 调用方覆盖（合并而非替换）
    const statusMap = Object.assign({}, DEFAULT_STATUS_LABEL, statusLabelMap || {});
    const tabFiltered = tabId === 'all'
      ? applyFilters(f)
      : applyFilters(f).filter(rec => rec.status === tabId);
    const list = tabFiltered;
    if (list.length === 0) {
      return `<tr><td colspan="20" class="py-12 text-center text-slate-400 text-sm">📭 当前筛选/状态机下暂无融资记录</td></tr>`;
    }
    return list.map(rec => {
      const s = statusMap[rec.status] || { text: rec.status, color: 'text-slate-500' };
      // v1.7.77：行可点 → 调 window.__FinancingList.gotoDetail(recId)（按钮 stopPropagation 防冒泡）
      const rowAttr = onRowClick ? `onclick="window.__FinancingList.gotoDetail('${rec.id}')" style="cursor:pointer"` : '';
      return `
        <tr class="border-t border-slate-100 hover:bg-blue-50/30" ${rowAttr}>
          <td class="px-3 py-3 font-mono text-xs text-blue-700 whitespace-nowrap">${rec.bizNo}</td>
          <td class="px-3 py-3 whitespace-nowrap">${rec.applicant}</td>
          <td class="px-3 py-3 whitespace-nowrap text-slate-700">${rec.bank || '-'}</td>
          <td class="px-3 py-3 text-slate-600 text-xs">${rec.productName || '-'}</td>
          <td class="px-3 py-3 text-slate-700 text-xs whitespace-nowrap">${rec.guarantor || '-'}</td>
          <td class="px-3 py-3 text-slate-700 text-xs whitespace-nowrap">${rec.supervisor || '-'}</td>
          <td class="px-3 py-3 text-right num-focus font-bold text-blue-700 whitespace-nowrap">${Utils.fmtMoney(rec.applyAmount)}</td>
          <td class="px-3 py-3 text-right num-focus ${rec.disbursedAmount > 0 ? 'text-emerald-700 font-medium' : 'text-slate-300'} whitespace-nowrap">${rec.disbursedAmount > 0 ? Utils.fmtMoney(rec.disbursedAmount) : '—'}</td>
          <td class="px-3 py-3 text-right num-focus whitespace-nowrap">${rec.interestRate ? (rec.interestRate * 100).toFixed(2) + '%' : '-'}</td>
          <td class="px-3 py-3 whitespace-nowrap text-slate-700">${rec.startDate || '—'}</td>
          <td class="px-3 py-3 whitespace-nowrap text-slate-700">${rec.maturityDate || '—'}</td>
          <td class="px-3 py-3 font-mono text-xs whitespace-nowrap">${rec.pledgeAssetNo || '—'}</td>
          <td class="px-3 py-3 text-right num-focus whitespace-nowrap">${rec.pledgeQty > 0 ? Utils.fmtNum(rec.pledgeQty) : '—'}</td>
          <td class="px-3 py-3 whitespace-nowrap text-slate-500 text-xs">${rec.pledgeQty > 0 ? rec.qtyUnit : ''}</td>
          <td class="px-3 py-3 text-right num-focus whitespace-nowrap">${rec.pledgeWeight > 0 ? Utils.fmtNum(rec.pledgeWeight) : '—'}</td>
          <td class="px-3 py-3 whitespace-nowrap text-slate-500 text-xs">${rec.pledgeWeight > 0 ? rec.weightUnit : ''}</td>
          <td class="px-3 py-3 text-right num-focus whitespace-nowrap">${rec.unitPrice ? rec.unitPrice.toFixed(2) : '-'}</td>
          <td class="px-3 py-3 text-right num-focus whitespace-nowrap">${Utils.fmtMoney(rec.pledgeValue)}</td>
          <td class="px-3 py-3 whitespace-nowrap">
            <div class="flex flex-col gap-0.5">
              <span class="text-xs font-medium ${s.color}">${s.text}</span>
              ${rec.status === 'rejected' && rec.rejectedReason ? `<span class="text-[10px] text-red-500">${rec.rejectedBy}：${rec.rejectedReason.slice(0, 16)}${rec.rejectedReason.length > 16 ? '…' : ''}</span>` : ''}
            </div>
          </td>
          <td class="px-3 py-3 text-center whitespace-nowrap">
            <div class="flex items-center justify-center gap-2">${actionRenderer(rec)}</div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function exportCSV(f) {
    const tabId = f.currentTab;
    const tabLabel = FINANCING_TABS.find(t => t.id === tabId)?.label || '全部';
    const filtered = applyFilters(f);
    const list = tabId === 'all'
      ? filtered
      : filtered.filter(rec => rec.status === tabId);
    if (list.length === 0) {
      Utils.toast('当前筛选条件下无数据可导出', 'warning');
      return;
    }
    const headers = [
      '融资申请编号', '融资方', '金融机构', '金融产品', '担保方', '监管方',
      '拟融资金额（元）', '放款金额（元）', '融资利率', '融资起息日', '融资到期日',
      '货押资产编号', '质押数量', '数量单位', '质押重量', '重量单位',
      '评估单价（元/千克）', '质押货值（元）', '状态'
    ];
    const statusCsvLabel = {
      'pending': '未提交', 'pending_supervisor_eval': '待监管方评估货值', 'pending_owner_confirm': '待融资方确认货值',
      'pending_owner_seal_2': '待融资方盖章', 'pending_supervisor': '待监管方盖章', 'pending_guarantor': '待担保方审核',
      'pending_guarantor_seal': '待担保方盖章', 'pending_funding': '待资金方审核',
      'pending_disbursement': '待放款', 'released': '已放款', 'rejected': '驳回', 'voided': '作废',
    };
    const rows = list.map(rec => [
      rec.bizNo, rec.applicant, rec.bank || '', rec.productName || '',
      rec.guarantor || '', rec.supervisor || '',
      rec.applyAmount || 0, rec.disbursedAmount || 0,
      rec.interestRate ? (rec.interestRate * 100).toFixed(2) + '%' : '',
      rec.startDate || '', rec.maturityDate || '',
      rec.pledgeAssetNo || '',
      rec.pledgeQty || 0, rec.pledgeQty > 0 ? rec.qtyUnit : '',
      rec.pledgeWeight || 0, rec.pledgeWeight > 0 ? rec.weightUnit : '',
      rec.unitPrice || 0, rec.pledgeValue || 0,
      statusCsvLabel[rec.status] || rec.status
    ]);
    const csv = [headers, ...rows].map(row =>
      row.map(cell => {
        const v = String(cell == null ? '' : cell);
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(',')
    ).join('\n');
    const csvContent = '\uFEFF' + csv;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `融资列表_${tabLabel}_${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    Utils.toast(`已导出 ${list.length} 条记录（${tabLabel}）`, 'success');
  }

  // ============ 公开 API ============
  // 每个 page 调用一次 render(config) 即可配置出整个列表
  function render(config) {
    // config: {
    //   currentPath, breadcrumb, title,
    //   introText: 可选（流程说明）
    //   actionRenderer: (record) => html string
    //   statsCards: 可选（顶部 stats 卡片 HTML）
    //   statusLabelMap: 可选（覆盖默认状态机文本）
    //   onAction: 可选（点击 row 时回调，例：跳转详情）
    // }
    const state = {
      // v1.7.75：根据登录角色自动切到该角色该处理的 tab（演示时少点一下）
      currentTab: _getDefaultTab(),
      bizNo: '', applicant: '', bank: '', productName: '',
      guarantor: '', supervisor: '', pledgeAssetNo: '',
      startDate: '', endDate: '',
    };

    function refresh() {
      const filtered = applyFilters(state);
      const getCount = (tabId) => tabId === 'all'
        ? filtered.length
        : filtered.filter(r => r.status === tabId).length;

      const tabsHtml = renderTabs(state.currentTab, getCount);
      const filterBarHtml = renderFilterBar(state);
      const rowsHtml = renderRows(state.currentTab, state, config.actionRenderer || defaultActionRenderer, config.statusLabelMap, config.onRowClick);

      // v1.7.8 修复：只更新各自的容器，保留外层布局样式（border / 背景 / 容器）
      const barEl = document.getElementById('financingFilterBarInner');
      const tabsEl = document.getElementById('financingTabsInner');
      const rowsEl = document.getElementById('financingRowsBody');
      if (barEl) barEl.innerHTML = filterBarHtml;
      if (tabsEl) tabsEl.innerHTML = tabsHtml;
      if (rowsEl) rowsEl.innerHTML = rowsHtml;
    }

    function defaultActionRenderer(rec) {
      return `<button onclick="alert('即将查看 ${rec.bizNo} 的详情')" class="text-blue-600 hover:underline text-xs font-medium">详情</button>`;
    }

    // 暴露到 window 用于 inline onclick
    window.__FinancingList = {
      switchTab: (tabId) => { state.currentTab = tabId; refresh(); },
      updateFilter: (key, value) => { state[key] = value; refresh(); },
      resetFilters: () => {
        Object.keys(state).forEach(k => { if (k !== 'currentTab') state[k] = ''; });
        refresh();
        Utils.toast('已重置筛选条件', 'info');
      },
      exportCSV: () => exportCSV(state),
      getState: () => state,
      // v1.7.77：行点击 → 默认详情页（由 page 在 config.onRowClick 里配置）
      gotoDetail: (id) => {
        if (config.onRowClick) {
          const rec = MockData.financingList.find(x => x.id === id);
          if (rec) config.onRowClick(rec);
        }
      },
    };

    // 列表容器 + 顶部 structure（filter + tabs + table）
    // 返回 HTML 字符串（在 pageShell.content 里嵌入）
    return `
      <div id="financingListContainer">
        <!-- 筛选条容器：保留外层间距 + 样式，innerHTML 替换内部 -->
        <div id="financingFilterBarInner">${renderFilterBar(state)}</div>
        <!-- 列表卡片：外层有 border/bg，圆角；内部 tabs 和 table 由各自的 inner 容器管理 -->
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div class="border-b border-slate-200 px-4 bg-slate-50/50 overflow-x-auto" id="financingTabsInner">
            ${renderTabs(state.currentTab, (tabId) => {
              const filtered = applyFilters(state);
              return tabId === 'all' ? filtered.length : filtered.filter(r => r.status === tabId).length;
            })}
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm min-w-[1800px]">
              <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                <tr>
                  <th class="text-left px-3 py-3 whitespace-nowrap">融资申请编号</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">融资方</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">金融机构</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">金融产品</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">担保方</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">监管方</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">拟融资金额（元）</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">放款金额（元）</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">融资利率</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">融资起息日</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">融资到期日</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">货押资产编号</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">质押数量</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">数量单位</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">质押重量</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap">重量单位</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">评估单价（元/千克）</th>
                  <th class="text-right px-3 py-3 whitespace-nowrap">质押货值（元）</th>
                  <th class="text-left px-3 py-3 whitespace-nowrap min-w-[180px]">状态机</th>
                  <th class="text-center px-3 py-3 whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody id="financingRowsBody">${renderRows(state.currentTab, state, config.actionRenderer || defaultActionRenderer, config.statusLabelMap, config.onRowClick)}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ============ 挂在全局 ============
  window.FinancingList = { render };
})();
