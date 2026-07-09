// 大河智链 - 通用组件
// 提供顶栏、侧边栏、面包屑、角色切换器等

const Components = {
  // ============ 顶栏（Topbar）============
  topbar(currentPage = '') {
    const role = Utils.getRole();
    const user = MockData.users[role] || MockData.users.customer;
    const unreadCount = MockData.notifications.filter(n => n.unread).length;

    return `
      <header class="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">大</div>
          <div>
            <div class="font-bold text-slate-800 text-lg leading-tight">大河智链</div>
            <div class="text-xs text-slate-500 leading-tight">供应链综合服务平台</div>
          </div>
        </div>

        <div class="flex items-center gap-3">
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
              ${['customer', 'platform', 'guarantor', 'bank'].map(r => `
                <button onclick="Components.switchRole('${r}')" class="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-sm ${role === r ? 'bg-blue-50 text-blue-700' : ''}">
                  <span class="w-2 h-2 rounded-full ${r === 'customer' ? 'bg-emerald-500' : r === 'platform' ? 'bg-blue-500' : r === 'guarantor' ? 'bg-amber-500' : 'bg-violet-500'}"></span>
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
    const menu = MockData.menus[role] || [];

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
            ? `<span class="text-slate-800 font-medium">${item}</span>`
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
  },
  switchRole(r) {
    Utils.setRole(r);
    Utils.setUser(MockData.users[r]);
    Utils.toast(`已切换到【${Utils.roleLabel(r)}】视角`, 'success');
    setTimeout(() => window.location.reload(), 400);
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

  // 全局点击关闭弹层
  bindGlobalClose() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#roleSwitcher')) document.getElementById('roleMenu')?.classList.add('hidden');
      if (!e.target.closest('#userMenu')) document.getElementById('userDropdown')?.classList.add('hidden');
    });
  },
};

window.Components = Components;

// 通用初始化
function initPage(currentPath = '') {
  if (!Utils.getUser()) Utils.setUser(MockData.users[Utils.getRole()]);
}
initPage();