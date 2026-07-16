// 大河智链 - 通用组件
// 提供顶栏、侧边栏、面包屑、角色切换器等

const Components = {
  // ============ 顶栏（Topbar）============
  topbar(currentPage = '') {
    const role = Utils.getRole();
    const user = MockData.users[role] || MockData.users.customer;
    const unreadCount = MockData.notifications.filter(n => n.unread).length;
    const currentSub = Utils.getProductLine();
    const currentTop = Utils.resolveProductLine(currentSub);
    const productLines = MockData.productLines || [];

    return `
      <header class="bg-white border-b border-slate-200 h-16 px-6 flex items-center sticky top-0 z-30 shadow-sm">
        <!-- v1.7.85 页面目录入口按钮(嵌在 logo 之前,Axure 风格工具栏) -->
        <button id="pageTreeToggle" onclick="Components.pageTree.toggle()" title="页面目录(全局导航)"
          class="w-9 h-9 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all flex-shrink-0 mr-3">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h6m0 0v6m0-6L4 12m6 0h10M4 18h6m0 0v-6m0 6l-6-6m6 0h10"/>
          </svg>
        </button>
        <div class="flex items-center gap-3 flex-shrink-0">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">大</div>
          <div>
            <div class="font-bold text-slate-800 text-lg leading-tight">大河智链</div>
            <div class="text-xs text-slate-500 leading-tight">${(currentTop && currentTop.subtitle) || '供应链综合服务平台'}</div>
          </div>
        </div>

        <!-- v1.7.28：产品线切换器（按 user 2026-07-10 17:22 截图重做） -->
        <!-- 胶囊按钮（蓝色边框，文字=当前子产品名）→ 抽屉（两列布局：每列一个顶级产品线 + 标题下划线） -->
        <div class="ml-8">
          <div class="relative" id="productSwitcher">
            <button onclick="Components.toggleProductMenu()" class="flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-blue-500 hover:border-blue-600 hover:bg-blue-50 transition text-sm bg-white">
              <span class="font-medium text-blue-700">${currentTop ? currentTop.label : '智慧仓储'}</span>
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>

            <div id="productMenu" class="hidden absolute left-0 top-full mt-3 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50" style="width: 720px;">
              <div class="grid grid-cols-2 gap-8 p-6">
                ${productLines.map(line => `
                  <div>
                    <h3 class="text-base font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">${line.label}</h3>
                    <div class="space-y-1">
                      ${(line.subItems || []).map(sub => {
                        const isCurrent = sub.id === currentSub;
                        return `
                          <button onclick="Components.switchProduct('${sub.id}', '${sub.path || ''}')" class="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left rounded-lg transition ${
                            isCurrent
                              ? 'text-blue-700 font-semibold bg-blue-50/60'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }">
                            <span>${sub.label}</span>
                            ${isCurrent ? '<svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : '<span class="w-3.5 h-3.5"></span>'}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="ml-auto flex items-center gap-3">
          <!-- 角色切换器 -->
          <div class="relative" id="roleSwitcher">
            <button onclick="Components.toggleRoleMenu()" class="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition text-sm">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <span class="font-medium">${Utils.roleLabel(role)}</span>
              <span class="text-xs text-slate-400">${user.name}</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="roleMenu" class="hidden absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              <div class="px-3 py-2 text-xs text-slate-400 border-b border-slate-100">切换演示角色</div>
              ${['customer', 'customer_seal', 'platform', 'guarantor', 'bank'].map(r => `
                <button onclick="Components.switchRole('${r}')" class="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-sm ${role === r ? 'bg-blue-50 text-blue-700' : ''}">
                  <span class="w-2 h-2 rounded-full ${r === 'customer' ? 'bg-emerald-500' : r === 'customer_seal' ? 'bg-emerald-300' : r === 'platform' ? 'bg-blue-500' : r === 'guarantor' ? 'bg-amber-500' : 'bg-violet-500'}"></span>
                  <span class="flex-1">${Utils.roleLabel(r)}</span>
                  <span class="text-xs text-slate-400">${MockData.users[r].name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 搜索 -->
          <button class="p-2 hover:bg-slate-100 rounded-md" title="搜索">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>

          <!-- 通知 -->
          <button onclick="Components.toggleNotifications()" class="p-2 hover:bg-slate-100 rounded-md relative" title="通知">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            ${unreadCount > 0 ? `<span class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">${unreadCount}</span>` : ''}
          </button>

          <!-- 用户头像 -->
          <div class="relative" id="userMenu">
            <button onclick="Components.toggleUserMenu()" class="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-100 rounded-md">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-sm font-medium">${user.avatar}</div>
              <span class="text-sm font-medium text-slate-700 hidden md:inline">${user.name}</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="userDropdown" class="hidden absolute right-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              <div class="px-3 py-2 border-b border-slate-100">
                <div class="font-medium text-sm text-slate-800">${user.name}</div>
                <div class="text-xs text-slate-500">${user.company}</div>
              </div>
              <button class="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">个人中心</button>
              <button class="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">账户设置</button>
              <button class="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">操作日志</button>
              <div class="border-t border-slate-100 my-1"></div>
              <button onclick="Utils.logout()" class="w-full text-left px-3 py-2 hover:bg-red-50 text-sm text-red-600">退出登录</button>
            </div>
          </div>
        </div>
      </header>

      <!-- 通知面板 -->
      <div id="notifPanel" class="hidden fixed top-16 right-4 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-40 max-h-[70vh] overflow-y-auto">
        <div class="p-3 border-b border-slate-100 flex items-center justify-between">
          <span class="font-medium text-sm">通知消息</span>
          <button onclick="Components.markAllRead()" class="text-xs text-blue-600 hover:underline">全部已读</button>
        </div>
        ${MockData.notifications.map(n => `
          <div class="px-3 py-3 border-b border-slate-50 hover:bg-slate-50 ${n.unread ? 'bg-blue-50/50' : ''}">
            <div class="flex items-start gap-2">
              <span class="w-2 h-2 rounded-full mt-1.5 ${
                n.type === 'warn' ? 'bg-yellow-500' :
                n.type === 'success' ? 'bg-green-500' :
                n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
              }"></span>
              <div class="flex-1">
                <div class="text-sm text-slate-800">${n.title}</div>
                <div class="text-xs text-slate-400 mt-0.5">${n.time}</div>
              </div>
              ${n.unread ? '<span class="w-2 h-2 rounded-full bg-red-500 mt-2"></span>' : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // ============ 侧边栏（Sidebar）============
  sidebar(currentPath = '') {
    const role = Utils.getRole();
    // v1.7.27：menus 是 { productLine: { role: [...] } } 二层结构
    const productId = Utils.getProductLine();
    const productMenus = (MockData.menus && MockData.menus[productId]) || {};
    const menu = productMenus[role] || [];

    // 如果当前子产品在这个角色下没有菜单（占位子产品数字供应链/运营管理），
    // 显示一个简洁提示，避免空白页
    if (!menu.length) {
      const product = Utils.resolveProductLine(productId);
      return `
        <aside class="w-60 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex-shrink-0">
          <nav class="py-4">
            <div class="px-4 py-3 text-sm text-slate-500">
              <div class="text-slate-400 text-xs uppercase tracking-wider mb-2">${product ? product.topLine.label : '当前子产品'}</div>
              <div class="font-medium text-slate-800 mb-2">${product ? product.label : '该模块'}</div>
              <div class="text-xs leading-relaxed">当前角色在该子产品下还没有具体功能。点击顶部蓝色按钮可切换到其他子产品。</div>
              <button onclick="Components.toggleProductMenu()" class="mt-4 inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-blue-300 text-blue-700 rounded hover:bg-blue-50">
                <span>切换子产品</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
          </nav>
          <div class="px-4 py-3 mx-2 mb-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div class="text-xs text-blue-700 font-medium mb-1">💡 演示小贴士</div>
            <div class="text-xs text-blue-600 leading-relaxed">点击顶部"角色"切换不同用户视角，所有页面联动变化</div>
          </div>
        </aside>
      `;
    }

    // 图标 SVG 路径
    const icons = {
      home: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
      shield: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      'shield-check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      box: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
      package: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>',
      file: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
      list: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
      upload: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>',
      logistics: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>',
      cash: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>',
      chart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
      alert: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
      log: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>',
      // v1.7.13 视频监控 icons
      video: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
      camera: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
      tree: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6v12M16 6v12"/>',
      treeview: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h6a1 1 0 011 1v8a1 1 0 01-1 1h-6a1 1 0 01-1-1v-8z"/>',
    };

    return `
      <aside class="w-60 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex-shrink-0">
        <nav class="py-4">
          ${menu.map(group => `
            <div class="mb-4">
              <div class="px-4 py-1 text-xs font-medium text-slate-400 uppercase tracking-wider">${group.group}</div>
              ${group.items.map(item => {
                const active = currentPath === item.path || currentPath.startsWith(item.path);
                return `
                  <a href="${Utils.nav(item.path)}" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md transition text-sm ${
                    active
                      ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500 -ml-1 pl-5'
                      : 'text-slate-700 hover:bg-slate-50'
                  }">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icons[item.icon] || icons.box}</svg>
                    <span class="truncate">${item.label}</span>
                  </a>
                `;
              }).join('')}
            </div>
          `).join('')}
        </nav>
        <div class="px-4 py-3 mx-2 mb-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div class="text-xs text-blue-700 font-medium mb-1">💡 演示小贴士</div>
          <div class="text-xs text-blue-600 leading-relaxed">点击顶部"角色"切换不同用户视角，所有页面联动变化</div>
        </div>
      </aside>
    `;
  },

  // ============ 面包屑 ============
  breadcrumb(items = []) {
    return `
      <nav class="flex items-center text-sm text-slate-500 mb-4">
        ${items.map((item, idx) => `
          ${idx > 0 ? '<svg class="w-4 h-4 mx-1 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>' : ''}
          ${idx === items.length - 1
            ? `<span class="text-slate-800 font-medium">${item.label || item}</span>`
            : `<a href="${item.path || '#'}" class="hover:text-blue-600">${item.label || item}</a>`}
        `).join('')}
      </nav>
    `;
  },

  // ============ 状态徽标 ============
  badge(status, withDot = true) {
    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${Utils.statusClass(status)}">
      ${withDot ? '<span class="w-1.5 h-1.5 rounded-full bg-current"></span>' : ''}
      ${Utils.statusText(status)}
    </span>`;
  },

  // ============ 通用页面骨架 ============
  pageShell({ title, breadcrumb = [], content = '', currentPath = '', extra = '' }) {
    return `
      <div class="flex flex-col h-screen overflow-hidden">
        ${this.topbar()}
        <div class="flex flex-1 overflow-hidden">
          ${this.sidebar(currentPath)}
          <main class="flex-1 overflow-y-auto bg-slate-50">
            <div class="p-6 page-enter">
              ${this.breadcrumb(breadcrumb.length ? breadcrumb : [title])}
              <div class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold text-slate-800">${title}</h1>
                ${extra ? `<div class="flex items-center gap-2">${extra}</div>` : ''}
              </div>
              ${content}
            </div>
          </main>
        </div>
      </div>
    `;
  },

  // ============ 行为 ============
  toggleRoleMenu() {
    document.getElementById('roleMenu')?.classList.toggle('hidden');
    document.getElementById('userDropdown')?.classList.add('hidden');
    document.getElementById('notifPanel')?.classList.add('hidden');
    document.getElementById('productMenu')?.classList.add('hidden');
  },
  switchRole(r) {
    Utils.setRole(r);
    Utils.setUser(MockData.users[r]);
    Utils.toast(`已切换到【${Utils.roleLabel(r)}】视角`, 'success');
    setTimeout(() => window.location.reload(), 400);
  },

  // v1.7.26 产品线切换器
  toggleProductMenu() {
    document.getElementById('productMenu')?.classList.toggle('hidden');
    document.getElementById('roleMenu')?.classList.add('hidden');
    document.getElementById('userDropdown')?.classList.add('hidden');
    document.getElementById('notifPanel')?.classList.add('hidden');
  },
  switchProduct(subId, fallbackPath) {
    Utils.setProductLine(subId);
    const productLines = MockData.productLines || [];
    let target = '';
    for (const line of productLines) {
      for (const sub of (line.subItems || [])) {
        if (sub.id === subId) { target = sub; break; }
      }
      if (target) break;
    }
    if (!target) return;
    if (target.status === 'placeholder') {
      Utils.toast(`【${target.label}】即将上线，当前请使用「智慧仓储」`, 'info');
      // 占位子产品 → 跳 portal 占位页（带 sub 信息）
      const targetPath = target.path || `/portal/${subId}`;
      setTimeout(() => window.location.href = `${Utils.nav(targetPath)}?sub=${encodeURIComponent(subId)}`, 600);
      return;
    }
    if (target.path) {
      window.location.href = `${Utils.nav(target.path)}`;
    } else if (fallbackPath) {
      window.location.href = `${Utils.nav(fallbackPath)}`;
    }
  },
  toggleUserMenu() {
    document.getElementById('userDropdown')?.classList.toggle('hidden');
    document.getElementById('roleMenu')?.classList.add('hidden');
    document.getElementById('notifPanel')?.classList.add('hidden');
  },
  toggleNotifications() {
    document.getElementById('notifPanel')?.classList.toggle('hidden');
    document.getElementById('roleMenu')?.classList.add('hidden');
    document.getElementById('userDropdown')?.classList.add('hidden');
  },
  markAllRead() {
    MockData.notifications.forEach(n => n.unread = false);
    Utils.toast('已全部标记为已读', 'success');
    document.getElementById('notifPanel')?.classList.add('hidden');
    setTimeout(() => window.location.reload(), 600);
  },

  // ============ 顶部数据卡（v1.7.9 带问号提示）============
  // 用法：Components.statCard({ label: '在贷余额', value: '¥3.6亿', hint: '在贷余额 = ...', color: 'text-blue-600', gradient: false })
  // hint 显示为问号图标 hover 弹出，描述数据如何计算
  statCard({ label = '', value = '', hint = '', color = 'text-slate-800', gradient = false } = {}) {
    const body = `
      <div class="flex items-center gap-1.5">
        <div class="${gradient ? 'text-blue-100' : 'text-slate-500'} text-xs">${label}</div>
        ${hint ? `
          <span class="stat-hint cursor-help inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full border ${gradient ? 'border-blue-300 text-blue-100 hover:bg-white/10' : 'border-slate-300 text-slate-400 hover:bg-slate-100 hover:text-slate-700'} transition" title="${hint.replace(/"/g, '&quot;')}">?</span>
        ` : ''}
      </div>
      <div class="text-2xl font-bold num-focus mt-1 ${color}">${value}</div>
    `;
    return `
      <div class="${gradient ? 'amount-gradient' : 'bg-white'} rounded-xl p-4 ${gradient ? 'shadow-md' : 'border border-slate-200'}">
        ${body}
      </div>
    `;
  },

  // 全局点击关闭弹层
// ============ 通用分页控件（v1.7.81）============
  // 调用：Components.pagination({ total, page, pageSize, onChange, onPageSize, onJump })
  // 返回：HTML 字符串（需调用方 innerHTML 插入）
  pagination({ total = 0, page = 1, pageSize = 10, onChange = 'window.__noop', onPageSize = 'window.__noop', onJump = 'window.__noop' } = {}) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const cur = Math.min(Math.max(1, page), totalPages);
    // 页码按钮（当前页 ± 2）
    const start = Math.max(1, cur - 2);
    const end = Math.min(totalPages, cur + 2);
    const pageNums = [];
    for (let i = start; i <= end; i++) pageNums.push(i);
    // 总条数（按当前 tab 过滤后）
    return `
      <div class="px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>共 <b class="text-slate-800">${total}</b> 条记录，第 ${cur} / ${totalPages} 页</span>
        <div class="flex items-center gap-1">
          <button onclick="${onChange}(${cur - 1})" class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 ${cur === 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${cur === 1 ? 'disabled' : ''}>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          ${cur - 2 > 1 ? `<button onclick="${onChange}(1)" class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">1</button>${cur - 2 > 2 ? '<span class="px-1">…</span>' : ''}` : ''}
          ${pageNums.map(n => `<button onclick="${onChange}(${n})" class="px-2 py-1 border ${n === cur ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 hover:bg-slate-50'} rounded">${n}</button>`).join('')}
          ${cur + 2 < totalPages ? `${cur + 2 < totalPages - 1 ? '<span class="px-1">…</span>' : ''}<button onclick="${onChange}(${totalPages})" class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">${totalPages}</button>` : ''}
          <button onclick="${onChange}(${cur + 1})" class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 ${cur === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" ${cur === totalPages ? 'disabled' : ''}>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <select onchange="${onPageSize}(this.value)" class="ml-3 px-2 py-1 border border-slate-200 rounded text-xs">
            <option ${pageSize == 5 ? 'selected' : ''}>5</option>
            <option ${pageSize == 10 ? 'selected' : ''}>10</option>
            <option ${pageSize == 20 ? 'selected' : ''}>20</option>
            <option ${pageSize == 50 ? 'selected' : ''}>50</option>
          </select>
          <span class="ml-2">跳至</span>
          <input type="number" min="1" max="${totalPages}" value="${cur}" onkeydown="if(event.key==='Enter'){ ${onJump}(this.value) }" class="w-12 px-2 py-1 border border-slate-200 rounded text-xs text-center">
          <span>页</span>
        </div>
      </div>
    `;
  },
    bindGlobalClose() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#roleSwitcher')) document.getElementById('roleMenu')?.classList.add('hidden');
      if (!e.target.closest('#userMenu')) document.getElementById('userDropdown')?.classList.add('hidden');
      if (!e.target.closest('#productSwitcher')) document.getElementById('productMenu')?.classList.add('hidden');
    });
  },

  // ============ v1.7.82 通用筛选条 (3×3 网格 + 实时刷新 + 抽屉式模糊搜索 + 数据导出) ============
  // 用法: 在 render() 中调用 Components.filterBar({ filters, fields, dataSource, onChange, hasExport, exportCSV, renderTags })
  // - filters: 筛选状态对象(引用,直接修改)
  // - fields: 字段定义数组 [{ key, type, placeholder, options?, suggest?, fromKey?, toKey? }]
  //   - type: 'text' | 'select' | 'dateRange'
  //   - suggest: { primaryKey, secondaryKey } 抽屉式模糊搜索(text only)
  // - dataSource: 数组,用于 suggest 模糊搜索
  // - onChange: 任意字段变化时的回调(字符串,会被 eval 调用,或函数)
  // - hasExport / exportCSV: 数据导出
  // - renderTags: 自定义 tag 行渲染(可选)
  filterBar(opts) {
    const { 
      filters, 
      fields = [], 
      dataSource = [], 
      onChange = 'void(0)', 
      hasExport = false, 
      exportCSV = 'void(0)',
      renderTags = null,
    } = opts;
    // 临时存到 window, suggest 抽屉用
    window.__filterBarState = { filters, fields, dataSource, onChange, hasExport, exportCSV };
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const renderField = (f, i) => {
      const labelHtml = f.label ? `<label class="block text-xs text-slate-500 mb-1">${esc(f.label)}</label>` : '';
      if (f.type === 'text') {
        if (f.suggest) {
          return `<div>
            ${labelHtml}
            <div class="relative">
              <input id="filterInput_${f.key}" type="text" value="${esc(filters[f.key] || '')}"
                oninput="Components.__suggestInput('${f.key}', this.value, ${i})"
                placeholder="${esc(f.placeholder || '')}"
                class="w-full px-3 py-2 text-sm border border-slate-200 rounded text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none placeholder:text-slate-300">
              <div id="filterSuggest_${f.key}" class="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-60 overflow-auto hidden"></div>
            </div>
          </div>`;
        }
        return `<div>
          ${labelHtml}
          <input type="text" value="${esc(filters[f.key] || '')}"
            oninput="updateFilter('${f.key}', this.value); ${onChange}"
            placeholder="${esc(f.placeholder || '')}"
            class="w-full px-3 py-2 text-sm border border-slate-200 rounded text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none placeholder:text-slate-300">
        </div>`;
      }
      if (f.type === 'select') {
        const opts = (f.options || []).map(o =>
          `<option value="${esc(o.value)}" ${filters[f.key] === o.value ? 'selected' : ''}>${esc(o.label)}</option>`
        ).join('');
        return `<div>
          ${labelHtml}
          <select onchange="updateFilter('${f.key}', this.value); ${onChange}"
            class="w-full px-3 py-2 text-sm border border-slate-200 rounded bg-white text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
            ${opts}
          </select>
        </div>`;
      }
      if (f.type === 'dateRange') {
        const fromKey = f.fromKey || (f.key + 'Start');
        const toKey = f.toKey || (f.key + 'End');
        return `<div>
          ${labelHtml}
          <div class="flex items-center gap-2">
            <input type="date" value="${esc(filters[fromKey] || '')}" onchange="updateFilter('${fromKey}', this.value); ${onChange}"
              class="flex-1 min-w-0 px-2 py-2 text-sm border border-slate-200 rounded text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
            <span class="text-slate-400">-</span>
            <input type="date" value="${esc(filters[toKey] || '')}" onchange="updateFilter('${toKey}', this.value); ${onChange}"
              class="flex-1 min-w-0 px-2 py-2 text-sm border border-slate-200 rounded text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none">
          </div>
        </div>`;
      }
      return '<div></div>';
    };
    // 渲染 3x3 grid
    const cells = [];
    for (let i = 0; i < 9; i++) {
      if (i < fields.length) {
        cells.push(renderField(fields[i], i));
      } else {
        cells.push('<div></div>');
      }
    }
    // 最后一格(右下)是数据导出
    if (hasExport) {
      cells[8] = `<div class="flex items-end justify-end">
        <button onclick="${exportCSV}()" class="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          数据导出
        </button>
      </div>`;
    }
    // tag 行
    const tagsHtml = renderTags ? renderTags() : this.__defaultRenderTags(filters, fields, onChange);
    return `
      <div class="bg-white border border-slate-200 rounded-xl p-4 mb-3">
        <div class="flex items-center justify-between mb-3 text-sm">
          <div class="flex items-center flex-wrap gap-1.5 min-h-[24px]">
            <span class="text-slate-500">当前搜索:</span>
            ${tagsHtml}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-6 gap-y-4">
          ${cells.join('\n')}
        </div>
      </div>
    `;
  },
  __defaultRenderTags(filters, fields, onChange) {
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const tags = [];
    fields.forEach(f => {
      if (f.type === 'dateRange') {
        const fromKey = f.fromKey || (f.key + 'Start');
        const toKey = f.toKey || (f.key + 'End');
        if (filters[fromKey] || filters[toKey]) {
          tags.push({ key: '_' + f.key, label: `${f.placeholder || '日期'} ${filters[fromKey] || '不限'} ~ ${filters[toKey] || '不限'}`, isDate: true, fromKey, toKey });
        }
      } else if (filters[f.key]) {
        const opt = (f.options || []).find(o => o.value === filters[f.key]);
        const display = opt ? opt.label : filters[f.key];
        tags.push({ key: f.key, label: `${f.placeholder || f.key}: ${display}` });
      }
    });
    if (!tags.length) return '<span class="text-slate-400 text-xs">（无筛选条件）</span>';
    const hasFilter = tags.length > 0;
    return tags.map(t => `
      <span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded">
        ${esc(t.label)}<button onclick="removeTag('${t.key}'${t.isDate ? `, true` : ''})" class="text-slate-400 hover:text-slate-700">×</button>
      </span>
    `).join('') + (hasFilter ? `<button onclick="resetAllFilters()" class="text-xs text-rose-500 hover:text-rose-700 ml-2">清除全部</button>` : '');
  },
  // 抽屉式模糊搜索全局 handle
  __suggestInput(key, val, fieldIdx) {
    const state = window.__filterBarState;
    if (!state) return;
    const f = state.fields[fieldIdx];
    if (!f || !f.suggest) return;
    state.filters[key] = val;
    const fn = (typeof state.onChange === 'string') ? new Function(`return ${state.onChange}`)() : state.onChange;
    if (typeof fn === 'function') fn();
    const q = (val || '').trim();
    if (!q) {
      document.getElementById(`filterSuggest_${key}`)?.classList.add('hidden');
      return;
    }
    const matches = (state.dataSource || []).filter(item => {
      const v = item[f.suggest.primaryKey] || '';
      return v.includes(q);
    }).slice(0, 8);
    const target = document.getElementById(`filterSuggest_${key}`);
    if (!target) return;
    if (!matches.length) {
      target.classList.add('hidden');
      return;
    }
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const hl = (text) => {
      if (!q) return esc(text);
      const i = text.indexOf(q);
      if (i < 0) return esc(text);
      return esc(text.slice(0, i)) + '<span class="text-blue-600 font-medium">' + esc(text.slice(i, i + q.length)) + '</span>' + esc(text.slice(i + q.length));
    };
    target.innerHTML = matches.map(item => {
      const itemId = (item.id || '').replace(/'/g, "\\'");
      return `<div class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-100 last:border-0"
             onclick="Components.__suggestSelect('${key}', '${itemId}', ${fieldIdx})">
        <div class="text-slate-800 truncate">${hl(item[f.suggest.primaryKey] || '')}</div>
        <div class="text-xs text-slate-400 font-mono mt-0.5">${esc(item[f.suggest.secondaryKey] || '')}</div>
      </div>`;
    }).join('');
    target.classList.remove('hidden');
  },
  __suggestSelect(key, id, fieldIdx) {
    const state = window.__filterBarState;
    if (!state) return;
    const f = state.fields[fieldIdx];
    if (!f || !f.suggest) return;
    const item = (state.dataSource || []).find(x => x.id === id);
    if (!item) return;
    state.filters[key] = item[f.suggest.primaryKey];
    const input = document.getElementById(`filterInput_${key}`);
    if (input) input.value = item[f.suggest.primaryKey];
    document.getElementById(`filterSuggest_${key}`)?.classList.add('hidden');
    const fn = (typeof state.onChange === 'string') ? new Function(`return ${state.onChange}`)() : state.onChange;
    if (typeof fn === 'function') fn();
  },
};

// v1.7.82 全局点击关闭筛选条抽屉
document.addEventListener('click', (e) => {
  document.querySelectorAll('[id^="filterInput_"]').forEach(input => {
    const key = input.id.replace('filterInput_', '');
    if (!e.target.closest(`#filterInput_${key}`) && !e.target.closest(`#filterSuggest_${key}`)) {
      document.getElementById(`filterSuggest_${key}`)?.classList.add('hidden');
    }
  });
});

window.Components = Components;

// ============ v1.7.85 全局页面目录（浮层，Axure Pages 风格）============
// 数据源自动从 MockData.menus 同步，改菜单树/名称自动更新
// 入口：body 左上角小图标
// 浮层：fixed 定位,不挤压原 sidebar
// 关闭：X / 浮层外点击 / ESC
Components.pageTree = function() {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const ROLE_LABEL = { customer: '货主方', platform: '监管方', guarantor: '担保方', bank: '资金方', customer_seal: '货主方盖章员', platform_seal: '监管方盖章员', guarantor_seal: '担保方盖章员', bank_seal: '资金方盖章员' };
  const currentProductLine = Utils.getProductLine ? Utils.getProductLine() : 'warehouse';
  const currentRole = Utils.getRole();

  // 产品线列表
  const productLines = [
    { id: 'warehouse', label: '智慧仓储' },
    { id: 'finance',   label: '供应链金融' },
  ];

  // 入口按钮(嵌进 topbar,logo 左侧)— Axure 风格工具栏入口
  // 不挤压 logo,固定位置永不被内容遮挡
  const toggleBtn = `
    <button id="pageTreeToggle" onclick="Components.pageTree.toggle()" title="页面目录（全局）"
      class="w-9 h-9 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all flex-shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h6m0 0v6m0-6L4 12m6 0h10M4 18h6m0 0v-6m0 6l-6-6m6 0h10"/>
      </svg>
    </button>
  `;

  // 浮层(默认隐藏)
  const panel = `
    <div id="pageTreePanel" class="hidden fixed top-0 left-0 z-40 h-screen w-80 bg-white border-r border-slate-200 shadow-2xl flex flex-col">
      <!-- 顶部:产品线 tabs + 关闭 -->
      <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h6m0 0v6m0-6L4 12m6 0h10M4 18h6m0 0v-6m0 6l-6-6m6 0h10"/>
          </svg>
          <span class="text-sm font-semibold text-slate-800">页面目录</span>
        </div>
        <button onclick="Components.pageTree.toggle()" title="关闭(ESC)" class="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded p-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- 产品线 tabs -->
      <div class="flex border-b border-slate-200 bg-slate-50">
        ${productLines.map(p => `
          <button data-product="${p.id}" onclick="Components.pageTree.switchProduct('${p.id}')"
            class="flex-1 px-3 py-2.5 text-xs font-medium border-b-2 transition pageTree-productTab"
            data-active="${p.id === currentProductLine}">
            ${esc(p.label)}
          </button>
        `).join('')}
      </div>

      <!-- 角色 tabs -->
      <div class="flex border-b border-slate-200 bg-white px-2 py-1.5 gap-1">
        ${Object.keys(ROLE_LABEL).filter(r => r === 'customer' || r === 'platform' || r === 'guarantor' || r === 'bank').map(r => `
          <button data-role="${r}" onclick="Components.pageTree.switchRole('${r}')"
            class="flex-1 px-2 py-1 text-[11px] rounded transition pageTree-roleTab"
            data-active="${r === currentRole}">
            ${esc(ROLE_LABEL[r])}
          </button>
        `).join('')}
      </div>

      <!-- 树(滚动) -->
      <div id="pageTreeBody" class="flex-1 overflow-y-auto py-2 bg-slate-50/30">
        <!-- JS 动态渲染 -->
      </div>

      <!-- 底部:状态信息 -->
      <div class="px-4 py-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span id="pageTreeInfo">--</span>
        <span>共 <span id="pageTreeCount">0</span> 个页面</span>
      </div>
    </div>
  `;

  // 半透明遮罩(浮层外点击关闭)
  const overlay = `<div id="pageTreeOverlay" class="hidden fixed inset-0 z-30 bg-black/30" onclick="Components.pageTree.toggle()"></div>`;

  return toggleBtn + overlay + panel;
};

// 当前选中状态
Components.pageTree._state = { product: 'warehouse', role: 'customer' };

// 从 Utils 同步当前 product/role
Components.pageTree._initState = function() {
  const curProduct = (Utils.getProductLine && Utils.getProductLine()) || 'warehouse';
  // 角色取主角色（去掉 _seal 后缀）
  let curRole = (Utils.getRole && Utils.getRole()) || 'customer';
  if (curRole.endsWith('_seal')) curRole = curRole.replace('_seal', '');
  Components.pageTree._state.product = curProduct;
  Components.pageTree._state.role = curRole;
};

Components.pageTree.toggle = function() {
  const panel = document.getElementById('pageTreePanel');
  const overlay = document.getElementById('pageTreeOverlay');
  const isOpen = !panel.classList.contains('hidden');
  if (isOpen) {
    panel.classList.add('hidden');
    overlay.classList.add('hidden');
  } else {
    Components.pageTree._initState && Components.pageTree._initState();
    panel.classList.remove('hidden');
    overlay.classList.remove('hidden');
    Components.pageTree._refreshTabs && Components.pageTree._refreshTabs();
    Components.pageTree.render();
  }
};

// 同步 tab 高亮（state → DOM）
Components.pageTree._refreshTabs = function() {
  const state = Components.pageTree._state;
  document.querySelectorAll('.pageTree-productTab').forEach(btn => {
    const active = btn.dataset.product === state.product;
    btn.dataset.active = active;
    if (active) {
      btn.classList.add('border-blue-600', 'text-blue-700', 'bg-white');
      btn.classList.remove('border-transparent', 'text-slate-500');
    } else {
      btn.classList.remove('border-blue-600', 'text-blue-700', 'bg-white');
      btn.classList.add('border-transparent', 'text-slate-500');
    }
  });
  document.querySelectorAll('.pageTree-roleTab').forEach(btn => {
    const active = btn.dataset.role === state.role;
    btn.dataset.active = active;
    if (active) {
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });
};

Components.pageTree.switchProduct = function(product) {
  Components.pageTree._state.product = product;
  // 更新 tabs 高亮
  document.querySelectorAll('.pageTree-productTab').forEach(btn => {
    btn.dataset.active = btn.dataset.product === product;
    if (btn.dataset.active === 'true') {
      btn.classList.add('border-blue-600', 'text-blue-700', 'bg-white');
      btn.classList.remove('border-transparent', 'text-slate-500');
    } else {
      btn.classList.remove('border-blue-600', 'text-blue-700', 'bg-white');
      btn.classList.add('border-transparent', 'text-slate-500');
    }
  });
  Components.pageTree.render();
};

Components.pageTree.switchRole = function(role) {
  Components.pageTree._state.role = role;
  document.querySelectorAll('.pageTree-roleTab').forEach(btn => {
    btn.dataset.active = btn.dataset.role === role;
    if (btn.dataset.active === 'true') {
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });
  Components.pageTree.render();
};

Components.pageTree.render = function() {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const state = Components.pageTree._state;
  const menus = (window.MockData && MockData.menus) || {};
  const groups = (menus[state.product] && menus[state.product][state.role]) || [];
  const currentPath = location.pathname;
  const currentKey = `pageTreeState_${state.product}_${state.role}`;
  const collapsedSet = (() => { try { return new Set(JSON.parse(localStorage.getItem(currentKey) || '[]')); } catch(e) { return new Set(); } })();
  let totalCount = 0;

  const treeHtml = groups.length
    ? groups.map((g, gi) => {
        const groupKey = `g_${gi}`;
        const isCollapsed = collapsedSet.has(groupKey);
        // 去 .html 后缀,让 endsWith 匹配生效
        const curPath = currentPath.replace(/\.html$/, '');
        const itemsHtml = (g.items || []).map((it, ii) => {
          totalCount++;
          // 匹配当前路径(去前缀 + 去 .html)
          const itemPath = (it.path || '').replace(/^\//, '').replace(/\.html$/, '');
          const isActive = curPath.endsWith('/' + itemPath) || curPath === itemPath;
          // v1.7.86 修跳转: 用 Utils.nav() 转成完整 URL,避免依赖全局 click 拦截器
          // 这样 middle-click 新标签页/带修饰键点击 也能正确跳转
          const fullHref = (window.Utils && Utils.nav) ? Utils.nav(it.path || '#') : (it.path || '#');
          return `
            <a href="${esc(fullHref)}" data-item="${esc(itemPath)}" data-raw="${esc(it.path || '')}"
              class="pageTree-item flex items-center gap-2 px-3 py-1.5 mx-2 rounded text-xs hover:bg-blue-50 transition ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-700'}"
              style="padding-left: ${1.5 + 0.5 + 0.75}rem;">
              <svg class="w-3 h-3 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="truncate">${esc(it.label || '')}</span>
            </a>
          `;
        }).join('');
        return `
          <div class="mb-0.5">
            <button onclick="Components.pageTree.toggleGroup('${groupKey}')"
              class="pageTree-groupBtn w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition">
              <span class="flex items-center gap-1.5">
                <svg class="w-3 h-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
                ${esc(g.group || '')}
              </span>
              <span class="text-[10px] text-slate-400">${(g.items || []).length}</span>
            </button>
            <div class="pageTree-groupBody ${isCollapsed ? 'hidden' : ''}">
              ${itemsHtml}
            </div>
          </div>
        `;
      }).join('')
    : `<div class="px-4 py-8 text-center text-xs text-slate-400">该角色暂无菜单</div>`;

  const body = document.getElementById('pageTreeBody');
  if (body) body.innerHTML = treeHtml;

  const countEl = document.getElementById('pageTreeCount');
  if (countEl) countEl.textContent = totalCount;
  const infoEl = document.getElementById('pageTreeInfo');
  if (infoEl) {
    const ROLE_LABEL = { customer: '货主方', platform: '监管方', guarantor: '担保方', bank: '资金方' };
    infoEl.textContent = `${state.product === 'warehouse' ? '智慧仓储' : '供应链金融'} · ${ROLE_LABEL[state.role] || state.role}`;
  }
};

Components.pageTree.toggleGroup = function(groupKey) {
  const state = Components.pageTree._state;
  const currentKey = `pageTreeState_${state.product}_${state.role}`;
  let arr = [];
  try { arr = JSON.parse(localStorage.getItem(currentKey) || '[]'); } catch(e) {}
  if (arr.includes(groupKey)) {
    arr = arr.filter(k => k !== groupKey);
  } else {
    arr.push(groupKey);
  }
  localStorage.setItem(currentKey, JSON.stringify(arr));
  Components.pageTree.render();
};

// 初始化:初始产品线/角色高亮 + 全局事件
Components.pageTree.init = function() {
  const state = Components.pageTree._state;
  Components.pageTree.switchProduct(state.product);
  Components.pageTree.switchRole(state.role);
  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const panel = document.getElementById('pageTreePanel');
      if (panel && !panel.classList.contains('hidden')) {
        Components.pageTree.toggle();
      }
    }
  });
};

window.Components = Components;

// 通用初始化
function initPage(currentPath = '') {
  if (!Utils.getUser()) Utils.setUser(MockData.users[Utils.getRole()]);
  // v1.7.85 自动挂载全局页面目录(浮层式,入口由 topbar() 内联生成)
  if (!document.getElementById('pageTreePanel')) {
    // 浮层 + 遮罩挂在 body 顶层
    document.body.insertAdjacentHTML('beforeend', `
      <div id="pageTreeOverlay" class="hidden fixed inset-0 z-30 bg-black/30" onclick="Components.pageTree.toggle()"></div>
      <div id="pageTreePanel" class="hidden fixed top-0 left-0 z-40 h-screen w-80 bg-white border-r border-slate-200 shadow-2xl flex flex-col">
        ${(() => {
          const ROLE_LABEL = { customer: '货主方', platform: '监管方', guarantor: '担保方', bank: '资金方', customer_seal: '货主方盖章员', platform_seal: '监管方盖章员', guarantor_seal: '担保方盖章员', bank_seal: '资金方盖章员' };
          const currentProductLine = Utils.getProductLine ? Utils.getProductLine() : 'warehouse';
          const currentRole = Utils.getRole();
          const productLines = [{ id: 'warehouse', label: '智慧仓储' }, { id: 'finance', label: '供应链金融' }];
          return `
            <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h6m0 0v6m0-6L4 12m6 0h10M4 18h6m0 0v-6m0 6l-6-6m6 0h10"/>
                </svg>
                <span class="text-sm font-semibold text-slate-800">页面目录</span>
              </div>
              <button onclick="Components.pageTree.toggle()" title="关闭(ESC)" class="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div class="flex border-b border-slate-200 bg-slate-50">
              ${productLines.map(p => `
                <button data-product="${p.id}" onclick="Components.pageTree.switchProduct('${p.id}')"
                  class="flex-1 px-3 py-2.5 text-xs font-medium border-b-2 transition pageTree-productTab"
                  data-active="${p.id === currentProductLine}">
                  ${p.label}
                </button>
              `).join('')}
            </div>
            <div class="flex border-b border-slate-200 bg-white px-2 py-1.5 gap-1">
              ${['customer','platform','guarantor','bank'].map(r => `
                <button data-role="${r}" onclick="Components.pageTree.switchRole('${r}')"
                  class="flex-1 px-2 py-1 text-[11px] rounded transition pageTree-roleTab"
                  data-active="${r === currentRole}">
                  ${ROLE_LABEL[r]}
                </button>
              `).join('')}
            </div>
            <div id="pageTreeBody" class="flex-1 overflow-y-auto py-2 bg-slate-50/30"></div>
            <div class="px-4 py-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span id="pageTreeInfo">--</span>
              <span>共 <span id="pageTreeCount">0</span> 个页面</span>
            </div>
          `;
        })()}
      </div>
    `);
    // ESC 关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !document.getElementById('pageTreePanel').classList.contains('hidden')) {
        Components.pageTree.toggle();
      }
    });
    // tab 高亮初始化
    Components.pageTree._refreshTabs && Components.pageTree._refreshTabs();
  }
  // dev: URL 带 _ptOpen=1 自动展开浮层(截图/演示用)
  const sp = new URLSearchParams(location.search);
  if (sp.get('_ptOpen') === '1') {
    setTimeout(() => Components.pageTree && Components.pageTree.toggle(), 100);
  }
}
initPage();