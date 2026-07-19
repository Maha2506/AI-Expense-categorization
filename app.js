/* ============================================
   EXPENSEAI - MAIN APPLICATION
   ============================================ */

'use strict';

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
  currentPage: 'landing',
  isAuthenticated: false,
  theme: localStorage.getItem('theme') || 'light',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  expenses: JSON.parse(localStorage.getItem('expenses') || 'null'),
  budgets: JSON.parse(localStorage.getItem('budgets') || 'null'),
  notifications: [],
  sidebarOpen: false,
  charts: {},
};

// Initialize sample data if none exists
if (!AppState.expenses) {
  AppState.expenses = generateSampleExpenses();
  localStorage.setItem('expenses', JSON.stringify(AppState.expenses));
}
if (!AppState.budgets) {
  AppState.budgets = generateSampleBudgets();
  localStorage.setItem('budgets', JSON.stringify(AppState.budgets));
}
if (!AppState.user) {
  AppState.user = {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@gmail.com',
    phone: '+91 98765 43210',
    occupation: 'Software Engineer',
    monthlyIncome: 120000,
    joinDate: '2024-01-15',
    avatar: 'AS',
  };
}
AppState.notifications = generateNotifications();

// ============================================
// SAMPLE DATA GENERATORS
// ============================================
function generateSampleExpenses() {
  const categories = [
    { name: 'Food', icon: '🍕', color: '#EF4444', bg: '#FEF2F2' },
    { name: 'Travel', icon: '🚗', color: '#F59E0B', bg: '#FFFBEB' },
    { name: 'Shopping', icon: '🛍️', color: '#8B5CF6', bg: '#F5F3FF' },
    { name: 'Medical', icon: '💊', color: '#10B981', bg: '#ECFDF5' },
    { name: 'Entertainment', icon: '🎬', color: '#06B6D4', bg: '#ECFEFF' },
    { name: 'Utilities', icon: '⚡', color: '#F59E0B', bg: '#FFFBEB' },
    { name: 'Education', icon: '📚', color: '#4F46E5', bg: '#EEF2FF' },
    { name: 'Groceries', icon: '🛒', color: '#10B981', bg: '#ECFDF5' },
    { name: 'Finance', icon: '💳', color: '#3B82F6', bg: '#EFF6FF' },
    { name: 'Others', icon: '📦', color: '#94A3B8', bg: '#F8FAFC' },
  ];

  const merchants = [
    ['Swiggy', 'Zomato', 'McDonald\'s', 'Dominos', 'KFC'],
    ['Uber', 'Ola', 'IRCTC', 'MakeMyTrip', 'Rapido'],
    ['Amazon', 'Flipkart', 'Myntra', 'Nykaa', 'Meesho'],
    ['Apollo Pharmacy', 'Fortis', 'MedPlus', 'PharmEasy', 'NetMeds'],
    ['Netflix', 'Spotify', 'BookMyShow', 'Hotstar', 'Prime Video'],
    ['BESCOM', 'BWSSB', 'Airtel', 'Jio', 'Tata Sky'],
    ['Coursera', 'Udemy', 'BYJU\'s', 'Unacademy', 'edX'],
    ['BigBasket', 'Blinkit', 'Zepto', 'DMart', 'Spencer\'s'],
    ['HDFC Bank', 'SBI Card', 'Groww', 'Zerodha', 'CRED'],
    ['Maintenance', 'Donation', 'Gift', 'Miscellaneous', 'Subscription'],
  ];

  const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Wallet'];
  const expenses = [];
  let id = 1;

  for (let m = 4; m >= 0; m--) {
    const date = new Date();
    date.setMonth(date.getMonth() - m);
    const numExpenses = m === 0 ? 18 : 12 + Math.floor(Math.random() * 8);

    for (let i = 0; i < numExpenses; i++) {
      const catIdx = Math.floor(Math.random() * categories.length);
      const cat = categories[catIdx];
      const merchant = merchants[catIdx][Math.floor(Math.random() * 5)];
      const expDate = new Date(date.getFullYear(), date.getMonth(), Math.floor(Math.random() * 28) + 1);
      const amount = Math.floor(Math.random() * 8000) + 100;

      expenses.push({
        id: id++,
        name: merchant,
        merchant,
        amount,
        category: cat.name,
        categoryIcon: cat.icon,
        categoryColor: cat.color,
        categoryBg: cat.bg,
        date: expDate.toISOString().split('T')[0],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        notes: '',
        aiPredicted: true,
        receipt: null,
      });
    }
  }

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateSampleBudgets() {
  return {
    monthly: 80000,
    categories: [
      { name: 'Food', icon: '🍕', color: '#EF4444', limit: 15000 },
      { name: 'Travel', icon: '🚗', color: '#F59E0B', limit: 10000 },
      { name: 'Shopping', icon: '🛍️', color: '#8B5CF6', limit: 12000 },
      { name: 'Medical', icon: '💊', color: '#10B981', limit: 5000 },
      { name: 'Entertainment', icon: '🎬', color: '#06B6D4', limit: 8000 },
      { name: 'Utilities', icon: '⚡', color: '#F59E0B', limit: 6000 },
      { name: 'Education', icon: '📚', color: '#4F46E5', limit: 8000 },
      { name: 'Groceries', icon: '🛒', color: '#10B981', limit: 10000 },
    ],
  };
}

function generateNotifications() {
  return [
    { id: 1, type: 'warning', icon: '⚠️', bg: '#FFFBEB', iconColor: '#F59E0B', title: 'Budget Alert: Shopping', body: 'You have used 85% of your Shopping budget (₹10,200 / ₹12,000). Consider slowing down on shopping expenses.', time: '2 hours ago', unread: true },
    { id: 2, type: 'danger', icon: '🔴', bg: '#FEF2F2', iconColor: '#EF4444', title: 'Large Expense Detected', body: 'An expense of ₹8,500 was recorded at Amazon. This is significantly higher than your average shopping spend.', time: '5 hours ago', unread: true },
    { id: 3, type: 'success', icon: '✅', bg: '#ECFDF5', iconColor: '#10B981', title: 'Monthly Report Ready', body: 'Your July 2025 financial report is ready. You saved ₹24,500 this month — 28% better than last month!', time: 'Yesterday', unread: true },
    { id: 4, type: 'info', icon: '🤖', bg: '#EEF2FF', iconColor: '#4F46E5', title: 'AI Recommendation', body: 'Based on your spending patterns, you could save ₹3,500 next month by reducing Food delivery orders by 30%.', time: '2 days ago', unread: false },
    { id: 5, type: 'warning', icon: '📅', bg: '#FFFBEB', iconColor: '#F59E0B', title: 'Upcoming Bill: BESCOM', body: 'Your electricity bill of approximately ₹2,400 is due in 3 days. Make sure to keep sufficient balance.', time: '3 days ago', unread: false },
    { id: 6, type: 'success', icon: '🎯', bg: '#ECFDF5', iconColor: '#10B981', title: 'Savings Goal Achieved!', body: 'Congratulations! You\'ve reached your monthly savings goal of ₹20,000. Keep up the excellent financial discipline!', time: '5 days ago', unread: false },
  ];
}

// ============================================
// AI CATEGORY PREDICTION ENGINE
// ============================================
const AI_CATEGORIES = {
  food: { keywords: ['swiggy', 'zomato', 'mcdonald', 'domino', 'kfc', 'pizza', 'burger', 'biryani', 'restaurant', 'cafe', 'barbeque', 'hotel', 'food', 'meals', 'lunch', 'dinner', 'breakfast', 'taste', 'cuisine', 'eatery', 'dine', 'canteen', 'mess', 'dhaba', 'subway', 'starbucks', 'chai', 'bakery'], category: 'Food', icon: '🍕', color: '#EF4444', bg: '#FEF2F2' },
  travel: { keywords: ['uber', 'ola', 'irctc', 'makemytrip', 'rapido', 'metro', 'bus', 'taxi', 'flight', 'airline', 'indigo', 'air india', 'spicejet', 'train', 'cab', 'travel', 'petrol', 'fuel', 'parking', 'toll', 'auto', 'rickshaw', 'bike', 'travel agency', 'goibibo', 'yatra'], category: 'Travel', icon: '🚗', color: '#F59E0B', bg: '#FFFBEB' },
  shopping: { keywords: ['amazon', 'flipkart', 'myntra', 'nykaa', 'meesho', 'ajio', 'shoppers', 'shopping', 'clothes', 'shoes', 'fashion', 'apparel', 'garment', 'store', 'mall', 'market', 'purchase', 'buy', 'order', 'delivery', 'lifestyle', 'max', 'h&m', 'zara'], category: 'Shopping', icon: '🛍️', color: '#8B5CF6', bg: '#F5F3FF' },
  medical: { keywords: ['apollo', 'fortis', 'medplus', 'pharmeasy', 'netmeds', 'doctor', 'hospital', 'clinic', 'medicine', 'pharmacy', 'medical', 'health', 'wellness', 'lab', 'test', 'scan', 'consultation', '1mg', 'practo', 'diagnostic', 'surgery', 'physiotherapy', 'dental', 'eye'], category: 'Medical', icon: '💊', color: '#10B981', bg: '#ECFDF5' },
  entertainment: { keywords: ['netflix', 'spotify', 'bookmyshow', 'hotstar', 'prime', 'youtube', 'disney', 'gaming', 'game', 'steam', 'entertainment', 'movies', 'cinema', 'theatre', 'concert', 'event', 'fun', 'leisure', 'recreation', 'club', 'party', 'music', 'subscription', 'gaana', 'jio music'], category: 'Entertainment', icon: '🎬', color: '#06B6D4', bg: '#ECFEFF' },
  utilities: { keywords: ['bescom', 'bwssb', 'airtel', 'jio', 'tata sky', 'electricity', 'water', 'bill', 'internet', 'broadband', 'wifi', 'recharge', 'mobile', 'phone', 'gas', 'lpg', 'cable', 'dth', 'utility', 'maintenance', 'society', 'rent', 'taxes', 'emi'], category: 'Utilities', icon: '⚡', color: '#F59E0B', bg: '#FFFBEB' },
  education: { keywords: ['coursera', 'udemy', 'byjus', 'unacademy', 'edx', 'school', 'college', 'university', 'tuition', 'coaching', 'education', 'course', 'class', 'training', 'workshop', 'seminar', 'book', 'stationery', 'study', 'learning', 'certification', 'degree', 'fees'], category: 'Education', icon: '📚', color: '#4F46E5', bg: '#EEF2FF' },
  groceries: { keywords: ['bigbasket', 'blinkit', 'zepto', 'dmart', 'spencer', 'grocery', 'vegetables', 'fruits', 'dairy', 'milk', 'eggs', 'rice', 'wheat', 'supermarket', 'fresh', 'organic', 'ration', 'household', 'daily needs', 'provisions', 'kirana'], category: 'Groceries', icon: '🛒', color: '#10B981', bg: '#ECFDF5' },
  finance: { keywords: ['hdfc', 'sbi', 'icici', 'axis', 'kotak', 'groww', 'zerodha', 'cred', 'bank', 'insurance', 'lic', 'mutual fund', 'investment', 'sip', 'loan', 'emi', 'credit', 'debit', 'fd', 'ppf', 'tax', 'income tax', 'gst', 'finance'], category: 'Finance', icon: '💳', color: '#3B82F6', bg: '#EFF6FF' },
};

function predictCategory(name) {
  if (!name || name.length < 2) return null;
  const lower = name.toLowerCase();
  for (const [key, data] of Object.entries(AI_CATEGORIES)) {
    for (const kw of data.keywords) {
      if (lower.includes(kw)) {
        return { ...data, confidence: Math.floor(Math.random() * 15 + 85) };
      }
    }
  }
  return { category: 'Others', icon: '📦', color: '#94A3B8', bg: '#F8FAFC', confidence: 65 };
}

// ============================================
// THEME MANAGER
// ============================================
function applyTheme(theme) {
  AppState.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  applyTheme(AppState.theme === 'light' ? 'dark' : 'light');
  showToast('Theme changed', `Switched to ${AppState.theme} mode`, AppState.theme === 'dark' ? 'info' : 'success');
}

applyTheme(AppState.theme);

// ============================================
// ROUTER
// ============================================
function navigate(page, params = {}) {
  AppState.currentPage = page;
  AppState.navParams = params;

  // Destroy all existing charts
  Object.values(AppState.charts).forEach(chart => { try { chart.destroy(); } catch(e) {} });
  AppState.charts = {};

  const app = document.getElementById('app');
  app.style.opacity = '0';
  app.style.transform = 'translateY(8px)';
  app.style.transition = 'opacity 0.2s, transform 0.2s';

  setTimeout(() => {
    renderPage(page);
    app.style.opacity = '1';
    app.style.transform = 'translateY(0)';

    const fab = document.getElementById('fab-btn');
    const dashboardPages = ['dashboard', 'analytics', 'expense-history', 'budget', 'notifications', 'profile', 'settings', 'add-expense'];
    fab.classList.toggle('show', dashboardPages.includes(page) && page !== 'add-expense');

    window.scrollTo(0, 0);
  }, 150);
}

function renderPage(page) {
  const app = document.getElementById('app');
  const pages = {
    'landing': renderLanding,
    'login': renderLogin,
    'signup': renderSignup,
    'dashboard': renderDashboard,
    'add-expense': renderAddExpense,
    'expense-history': renderExpenseHistory,
    'analytics': renderAnalytics,
    'budget': renderBudget,
    'notifications': renderNotifications,
    'profile': renderProfile,
    'settings': renderSettings,
  };

  const renderer = pages[page] || renderLanding;
  app.innerHTML = renderer();

  setTimeout(() => {
    initPageScripts(page);
  }, 50);
}

function initPageScripts(page) {
  switch (page) {
    case 'landing': initLanding(); break;
    case 'login': initAuth('login'); break;
    case 'signup': initAuth('signup'); break;
    case 'dashboard': initDashboard(); break;
    case 'add-expense': initAddExpense(); break;
    case 'expense-history': initExpenseHistory(); break;
    case 'analytics': initAnalytics(); break;
    case 'budget': initBudget(); break;
    case 'notifications': initNotifications(); break;
    case 'profile': initProfile(); break;
    case 'settings': initSettings(); break;
  }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(title, message, type = 'info') {
  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button onclick="this.parentElement.remove()" style="border:none;background:none;cursor:pointer;color:var(--text-muted);font-size:1.1rem;padding:4px;">✕</button>
    <div class="toast-bar" style="--target-width:0%"></div>
  `;
  container.appendChild(toast);

  // Animate progress bar
  requestAnimationFrame(() => {
    const bar = toast.querySelector('.toast-bar');
    bar.style.setProperty('--target-width', '100%');
    bar.style.width = '100%';
    bar.style.transition = 'width 3s linear';
    setTimeout(() => { bar.style.width = '0%'; }, 50);
  });

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const ripple = document.createElement('span');
  ripple.className = 'btn-ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px;`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el, target, prefix = '', suffix = '', duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const isFloat = target % 1 !== 0;

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const val = parseFloat(el.getAttribute('data-counter'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    animateCounter(el, val, prefix, suffix);
  });
}

// ============================================
// SIDEBAR HELPERS
// ============================================
function getSidebarHTML(active) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'add-expense', icon: '➕', label: 'Add Expense' },
    { id: 'expense-history', icon: '📋', label: 'Expense History' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'budget', icon: '🎯', label: 'Budget' },
  ];
  const navItems2 = [
    { id: 'notifications', icon: '🔔', label: 'Notifications', badge: AppState.notifications.filter(n => n.unread).length },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const renderNav = (items) => items.map(item => `
    <button class="nav-item ${active === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
    </button>
  `).join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div>
          <div class="logo-text">ExpenseAI</div>
          <div class="logo-sub">Smart Finance</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main</div>
        ${renderNav(navItems)}
        <div class="nav-section-label" style="margin-top:8px">Account</div>
        ${renderNav(navItems2)}
        <button class="nav-item" onclick="handleLogout()" style="color:var(--danger);margin-top:auto">
          <span class="nav-icon" style="color:var(--danger)">🚪</span>
          <span>Logout</span>
        </button>
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-user" onclick="navigate('profile')">
          <div class="sidebar-user-avatar">${(AppState.user?.avatar || 'U')}</div>
          <div>
            <div class="sidebar-user-name">${AppState.user?.name || 'User'}</div>
            <div class="sidebar-user-email">${AppState.user?.email || ''}</div>
          </div>
        </div>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleSidebar()"></div>
  `;
}

function getTopbarHTML(title, subtitle) {
  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="hamburger" id="hamburger-btn" onclick="toggleSidebar()">
          <span></span><span></span><span></span>
        </button>
        <div>
          <div class="topbar-title">${title}</div>
          ${subtitle ? `<div class="topbar-subtitle">${subtitle}</div>` : ''}
        </div>
      </div>
      <div class="topbar-right">
        <div class="topbar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search expenses..." id="topbar-search-input" />
        </div>
        <button class="icon-btn" onclick="toggleTheme()" title="Toggle Theme">
          ${AppState.theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button class="icon-btn" onclick="navigate('notifications')" title="Notifications">
          🔔
          ${AppState.notifications.some(n => n.unread) ? '<span class="dot"></span>' : ''}
        </button>
        <button class="icon-btn" onclick="navigate('profile')" title="Profile">
          <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:white;font-size:0.72rem;font-weight:700">${AppState.user?.avatar || 'U'}</div>
        </button>
      </div>
    </header>
  `;
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburger-btn');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.style.display = sidebar?.classList.contains('open') ? 'block' : 'none';
  if (hamburger) hamburger.classList.toggle('open');
}

function handleLogout() {
  AppState.isAuthenticated = false;
  showToast('Logged out', 'See you soon!', 'info');
  setTimeout(() => navigate('landing'), 500);
}

// ============================================
// HELPER: Get month expenses
// ============================================
function getMonthExpenses(monthsAgo = 0) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
  return AppState.expenses.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === target.getFullYear() && d.getMonth() === target.getMonth();
  });
}

function getTotalAmount(expenses) {
  return expenses.reduce((s, e) => s + e.amount, 0);
}

function getCategoryTotals(expenses) {
  const totals = {};
  expenses.forEach(e => {
    if (!totals[e.category]) totals[e.category] = { amount: 0, count: 0, icon: e.categoryIcon, color: e.categoryColor, bg: e.categoryBg };
    totals[e.category].amount += e.amount;
    totals[e.category].count++;
  });
  return Object.entries(totals).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.amount - a.amount);
}

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ============================================
// LANDING PAGE
// ============================================
function renderLanding() {
  return `
  <!-- NAVBAR -->
  <nav class="landing-navbar" id="landing-nav">
    <a class="logo" onclick="navigate('landing')">
      <div class="logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      </div>
      <div>
        <div class="logo-text">ExpenseAI</div>
      </div>
    </a>
    <div class="nav-links">
      <a class="nav-link" onclick="scrollToSection('features')">Features</a>
      <a class="nav-link" onclick="scrollToSection('workflow')">How it Works</a>
      <a class="nav-link" onclick="scrollToSection('analytics-section')">Analytics</a>
      <a class="nav-link" onclick="scrollToSection('testimonials')">Reviews</a>
      <a class="nav-link" onclick="scrollToSection('faq')">FAQ</a>
      <a class="nav-link" onclick="scrollToSection('contact')">Contact</a>
    </div>
    <div class="nav-actions">
      <button class="icon-btn" onclick="toggleTheme()" title="Toggle Theme" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);color:white">
        ${AppState.theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button class="btn btn-outline" onclick="navigate('login')" style="color:white;border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.08)">Login</button>
      <button class="btn btn-primary" onclick="navigate('signup')">Get Started</button>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero-bg"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="hero-content">
      <div class="hero-badge">
        <span>🤖</span>
        <span>Powered by Advanced AI</span>
      </div>
      <h1 class="hero-title">
        Transform Your Spending with
        <span class="gradient-text">AI-Powered Expense Intelligence</span>
      </h1>
      <p class="hero-subtitle">
        Automatically categorize expenses, monitor your spending habits, track budgets, receive personalized AI recommendations, and gain complete financial control.
      </p>
      <div class="hero-cta">
        <button class="btn btn-primary btn-lg" onclick="navigate('signup')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          Get Started Free
        </button>
        <button class="btn btn-lg" onclick="navigate('dashboard')" style="background:rgba(255,255,255,0.12);color:white;border:1.5px solid rgba(255,255,255,0.25);backdrop-filter:blur(10px)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Live Demo
        </button>
      </div>
      <div class="hero-stats">
        <div>
          <div class="hero-stat-value" data-counter="50000" data-prefix="" data-suffix="+" id="hstat1">50,000+</div>
          <div class="hero-stat-label">Active Users</div>
        </div>
        <div>
          <div class="hero-stat-value" data-counter="98" data-suffix="%" id="hstat2">98%</div>
          <div class="hero-stat-label">AI Accuracy</div>
        </div>
        <div>
          <div class="hero-stat-value" data-counter="2.5" data-prefix="₹" data-suffix="Cr+" id="hstat3">₹2.5Cr+</div>
          <div class="hero-stat-label">Expenses Tracked</div>
        </div>
      </div>
    </div>

    <!-- Hero Illustration (SVG Dashboard Mockup) -->
    <div class="hero-illustration" style="position:absolute;right:80px;top:50%;transform:translateY(-50%);z-index:1;width:480px;animation:float 4s ease-in-out infinite;">
      ${getDashboardMockupSVG()}
    </div>
  </section>

  <!-- WHY CHOOSE -->
  <section class="section" id="why-choose">
    <div class="section-header">
      <div class="section-label">Why ExpenseAI</div>
      <h2 class="section-title">The Smartest Way to<br>Manage Your Money</h2>
      <p class="section-desc">Built with cutting-edge AI technology to give you unparalleled insights into your financial life</p>
    </div>
    <div class="feature-grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
      ${[
        { icon: '🤖', grad: 'linear-gradient(135deg,#4F46E5,#818CF8)', title: 'AI-Powered Categorization', desc: 'Our advanced AI automatically categorizes every expense with 98% accuracy. Zero manual effort required.' },
        { icon: '📊', grad: 'linear-gradient(135deg,#06B6D4,#0E7490)', title: 'Real-time Analytics', desc: 'Beautiful, interactive charts and graphs that transform complex data into clear, actionable insights.' },
        { icon: '🎯', grad: 'linear-gradient(135deg,#10B981,#059669)', title: 'Smart Budget Tracking', desc: 'Set category-wise budgets and get intelligent alerts before you overspend, keeping you always on track.' },
        { icon: '💡', grad: 'linear-gradient(135deg,#F59E0B,#D97706)', title: 'Personalized AI Insights', desc: 'Receive tailored financial recommendations based on your unique spending patterns and goals.' },
        { icon: '🔒', grad: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', title: 'Bank-Grade Security', desc: '256-bit AES encryption with zero-knowledge architecture ensures your financial data stays private.' },
        { icon: '📱', grad: 'linear-gradient(135deg,#EC4899,#BE185D)', title: 'Multi-Device Sync', desc: 'Access your financial data seamlessly across all devices with real-time synchronization.' },
      ].map(f => `
        <div class="feature-card card-hover">
          <div class="feature-icon" style="background:${f.grad}">
            <span style="font-size:1.5rem">${f.icon}</span>
          </div>
          <div class="feature-title">${f.title}</div>
          <div class="feature-desc">${f.desc}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- FEATURES -->
  <section class="section section-alt" id="features">
    <div class="section-header">
      <div class="section-label">Features</div>
      <h2 class="section-title">Everything You Need for<br>Financial Freedom</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1200px;margin:0 auto">
      <div style="display:flex;flex-direction:column;gap:24px">
        ${[
          { icon: '⚡', title: 'Instant Categorization', desc: 'Type any expense name and watch AI predict the perfect category in real-time with confidence scores.' },
          { icon: '📈', title: 'Spending Trends', desc: 'Visualize your spending patterns over time with interactive charts that reveal hidden trends.' },
          { icon: '🔔', title: 'Smart Alerts', desc: 'Never exceed your budget again. Receive timely notifications before you hit your spending limits.' },
          { icon: '📄', title: 'One-Click Reports', desc: 'Export detailed financial reports in PDF/CSV format for accounting, tax filing, or personal review.' },
        ].map(f => `
          <div style="display:flex;align-items:flex-start;gap:16px;padding:20px;background:var(--surface);border-radius:var(--radius-md);border:1px solid var(--border-light);box-shadow:var(--shadow-sm);transition:var(--transition);cursor:default" onmouseenter="this.style.transform='translateX(8px)'" onmouseleave="this.style.transform='translateX(0)'">
            <div style="width:48px;height:48px;border-radius:var(--radius);background:linear-gradient(135deg,rgba(79,70,229,0.15),rgba(6,182,212,0.1));display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${f.icon}</div>
            <div>
              <div style="font-size:0.98rem;font-weight:700;margin-bottom:6px">${f.title}</div>
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6">${f.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="position:relative">
        ${getFeatureMockupHTML()}
      </div>
    </div>
  </section>

  <!-- AI WORKFLOW -->
  <section class="section" id="workflow">
    <div class="section-header">
      <div class="section-label">AI Workflow</div>
      <h2 class="section-title">How ExpenseAI Works</h2>
      <p class="section-desc">Our intelligent pipeline processes your expenses in milliseconds</p>
    </div>
    <div class="workflow-steps">
      ${[
        { num: '01', icon: '📝', title: 'Enter Expense', desc: 'Simply type the merchant name or expense description. Our interface is designed for speed.' },
        { num: '02', icon: '🤖', title: 'AI Analyzes', desc: 'Our NLP engine instantly analyzes the input against millions of transaction patterns.' },
        { num: '03', icon: '🏷️', title: 'Auto Categorize', desc: 'ExpenseAI predicts the most likely category with a confidence score in milliseconds.' },
        { num: '04', icon: '💡', title: 'Get Insights', desc: 'Receive personalized recommendations and insights based on your spending behavior.' },
      ].map(s => `
        <div class="workflow-step">
          <div class="workflow-step-num">${s.num}</div>
          <div style="font-size:2rem;margin-bottom:12px">${s.icon}</div>
          <div style="font-size:1rem;font-weight:700;margin-bottom:10px">${s.title}</div>
          <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- DASHBOARD PREVIEW -->
  <section class="section section-alt" id="dashboard-preview">
    <div class="section-header">
      <div class="section-label">Dashboard Preview</div>
      <h2 class="section-title">Your Financial Command Center</h2>
      <p class="section-desc">A beautifully designed dashboard that gives you instant clarity about your finances</p>
    </div>
    <div style="max-width:900px;margin:0 auto;border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-xl);border:1px solid var(--border-light)">
      ${getDashboardPreviewHTML()}
    </div>
  </section>

  <!-- SMART ANALYTICS -->
  <section class="section" id="analytics-section">
    <div class="section-header">
      <div class="section-label">Smart Analytics</div>
      <h2 class="section-title">Intelligent Insights at a Glance</h2>
      <p class="section-desc">Transform raw data into beautiful visualizations that make financial decisions easy</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;max-width:1200px;margin:0 auto">
      ${getAnalyticsPreviewCards()}
    </div>
  </section>

  <!-- AI RECOMMENDATIONS -->
  <section class="section section-alt" id="ai-reco">
    <div class="section-header">
      <div class="section-label">AI Recommendations</div>
      <h2 class="section-title">Your Personal AI Financial Advisor</h2>
      <p class="section-desc">Get tailored recommendations that help you save more and spend smarter</p>
    </div>
    <div style="max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:16px">
      ${[
        { icon: '📉', text: 'You spent <strong>42% more on Food</strong> this month compared to last month. Consider meal prepping at home to save up to ₹4,500 monthly.', type: 'warning' },
        { icon: '🛍️', text: '<strong>Shopping expenses exceeded your budget</strong> by ₹2,300. Your recent Amazon and Myntra purchases accounted for 68% of overspend.', type: 'danger' },
        { icon: '💰', text: 'You can save <strong>₹3,500 next month</strong> by reducing entertainment subscriptions. You have 6 active subscriptions — consider consolidating.', type: 'success' },
        { icon: '⚡', text: 'Your <strong>utility bills are 18% below average</strong> — great job! Your energy-efficient habits are saving you ₹1,200/month.', type: 'success' },
      ].map(r => `
        <div class="ai-insight" style="padding:20px;border-radius:var(--radius-md)">
          <div class="ai-insight-icon" style="width:44px;height:44px;font-size:1.2rem">${r.icon}</div>
          <div>
            <div class="ai-insight-label">AI Insight</div>
            <div class="ai-insight-text" style="font-size:0.92rem">${r.text}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section" id="testimonials">
    <div class="section-header">
      <div class="section-label">Testimonials</div>
      <h2 class="section-title">Loved by Thousands of Users</h2>
    </div>
    <div class="testimonial-grid">
      ${[
        { name: 'Priya Mehta', role: 'Product Manager, Bangalore', text: 'ExpenseAI completely transformed how I manage money. The AI categorization is frighteningly accurate — it knew my Swiggy order was food before I even finished typing!', stars: '⭐⭐⭐⭐⭐', color: '#4F46E5', initials: 'PM' },
        { name: 'Rahul Gupta', role: 'Startup Founder, Mumbai', text: 'I\'ve tried 10+ expense apps. ExpenseAI is leagues ahead. The insights are actually intelligent — it told me I was spending 35% more on fuel after I changed my office location.', stars: '⭐⭐⭐⭐⭐', color: '#10B981', initials: 'RG' },
        { name: 'Ananya Singh', role: 'Data Scientist, Hyderabad', text: 'As someone who loves data, the analytics section is *chef\'s kiss*. The charts are beautiful and actually tell a story about your spending. Saved ₹18K in 3 months!', stars: '⭐⭐⭐⭐⭐', color: '#EC4899', initials: 'AS' },
        { name: 'Vikram Nair', role: 'Finance Manager, Chennai', text: 'The budget tracking feature with category-wise limits is exactly what I needed. The AI alerts me before I overspend — not after. Game changer for personal finance.', stars: '⭐⭐⭐⭐⭐', color: '#F59E0B', initials: 'VN' },
        { name: 'Shreya Kapoor', role: 'Freelance Designer, Delhi', text: 'Beautiful UI, powerful features. It feels like having a personal financial advisor in my pocket. The dark mode is gorgeous and the animations are so smooth!', stars: '⭐⭐⭐⭐⭐', color: '#8B5CF6', initials: 'SK' },
        { name: 'Aryan Bose', role: 'Software Engineer, Pune', text: 'Migrated from another app and the difference is night and day. ExpenseAI\'s receipt upload + AI extraction saves me 20 minutes every week. Absolutely love it!', stars: '⭐⭐⭐⭐⭐', color: '#06B6D4', initials: 'AB' },
      ].map(t => `
        <div class="testimonial-card card-hover">
          <div class="testimonial-stars">${t.stars}</div>
          <div class="testimonial-text">"${t.text}"</div>
          <div class="testimonial-author">
            <div class="testimonial-avatar" style="background:${t.color}">${t.initials}</div>
            <div>
              <div class="testimonial-name">${t.name}</div>
              <div class="testimonial-role">${t.role}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- FAQ -->
  <section class="section section-alt" id="faq">
    <div class="section-header">
      <div class="section-label">FAQ</div>
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-list">
      ${[
        { q: 'How accurate is the AI categorization?', a: 'Our AI achieves 98.2% accuracy on expense categorization, trained on millions of real-world transaction patterns from Indian merchants and services. It continuously learns from your corrections to improve over time.' },
        { q: 'Is my financial data secure?', a: 'Absolutely. We use 256-bit AES encryption for data at rest and TLS 1.3 for data in transit. We operate with a zero-knowledge architecture, meaning we never sell or share your data. Your privacy is our highest priority.' },
        { q: 'Can I import expenses from my bank statements?', a: 'Yes! ExpenseAI supports CSV import from all major Indian banks including HDFC, SBI, ICICI, Axis, and Kotak. We also support PDF statement parsing with our AI-powered document reader.' },
        { q: 'What payment methods does ExpenseAI track?', a: 'ExpenseAI tracks all payment methods: UPI, Credit Cards, Debit Cards, Net Banking, Cash, Digital Wallets (Paytm, PhonePe, Google Pay), and EMI purchases.' },
        { q: 'Is there a free plan available?', a: 'Yes! Our free plan includes up to 100 expense entries per month, basic AI categorization, and core analytics. Premium plans unlock unlimited entries, advanced AI insights, and priority support.' },
        { q: 'How do AI recommendations work?', a: 'Our recommendation engine analyzes your 6-month spending history, compares it with your income and budget goals, identifies inefficiencies, and generates personalized, actionable savings suggestions using pattern recognition and financial best practices.' },
      ].map((f, i) => `
        <div class="faq-item" onclick="toggleFAQ(this)">
          <div class="faq-q">
            <span>${f.q}</span>
            <svg class="faq-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-a">${f.a}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- CONTACT -->
  <section class="section" id="contact">
    <div class="section-header">
      <div class="section-label">Contact</div>
      <h2 class="section-title">Get In Touch</h2>
      <p class="section-desc">Have questions? Our team is here to help you 24/7</p>
    </div>
    <div class="contact-grid">
      <div>
        <div style="display:flex;flex-direction:column;gap:20px">
          ${[
            { icon: '📧', title: 'Email Us', val: 'hello@expenseai.com' },
            { icon: '📞', title: 'Call Us', val: '+91 1800-ExpenseAI' },
            { icon: '💬', title: 'Live Chat', val: 'Available 24/7 on the app' },
            { icon: '📍', title: 'Office', val: 'Koramangala, Bangalore, Karnataka' },
          ].map(c => `
            <div style="display:flex;align-items:center;gap:16px;padding:18px;background:var(--surface);border-radius:var(--radius-md);border:1px solid var(--border-light);box-shadow:var(--shadow-sm)">
              <div style="width:48px;height:48px;border-radius:var(--radius);background:linear-gradient(135deg,rgba(79,70,229,0.1),rgba(6,182,212,0.1));display:flex;align-items:center;justify-content:center;font-size:1.3rem">${c.icon}</div>
              <div>
                <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">${c.title}</div>
                <div style="font-size:0.92rem;font-weight:600">${c.val}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="background:var(--surface);border-radius:var(--radius-lg);padding:36px;border:1px solid var(--border-light);box-shadow:var(--shadow-md)">
        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:24px">Send us a Message</h3>
        <form id="contact-form" onsubmit="handleContact(event)" style="display:flex;flex-direction:column;gap:16px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-input" placeholder="Arjun" required /></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" placeholder="Sharma" required /></div>
          </div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="arjun@gmail.com" required /></div>
          <div class="form-group"><label class="form-label">Subject</label><input class="form-input" placeholder="How can we help?" required /></div>
          <div class="form-group"><label class="form-label">Message</label><textarea class="form-input" rows="4" placeholder="Tell us more..." required style="resize:vertical"></textarea></div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Send Message 🚀</button>
        </form>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="logo" style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <div class="logo-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
          <div class="logo-text" style="font-size:1.2rem">ExpenseAI</div>
        </div>
        <div class="footer-desc">India's most intelligent personal finance platform. Powered by AI, built for everyone.</div>
        <div class="footer-social" style="margin-top:20px">
          ${['𝕏', '📘', '💼', '📸', '▶'].map(s => `<div class="footer-social-btn">${s}</div>`).join('')}
        </div>
      </div>
      <div>
        <div class="footer-title">Product</div>
        <ul class="footer-links">
          <li><a>Features</a></li><li><a>Pricing</a></li><li><a>Integrations</a></li><li><a>Changelog</a></li><li><a>Roadmap</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-title">Company</div>
        <ul class="footer-links">
          <li><a>About Us</a></li><li><a>Blog</a></li><li><a>Careers</a></li><li><a>Press</a></li><li><a>Partners</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-title">Legal</div>
        <ul class="footer-links">
          <li><a>Privacy Policy</a></li><li><a>Terms of Service</a></li><li><a>Cookie Policy</a></li><li><a>Security</a></li><li><a>Compliance</a></li>
        </ul>
      </div>
    </div>
    <hr class="footer-divider" />
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 ExpenseAI Technologies Pvt. Ltd. All rights reserved. Made with ❤️ in Bangalore, India.</div>
      <div style="display:flex;gap:16px;font-size:0.8rem;color:rgba(255,255,255,0.4)">
        <span>🇮🇳 India</span><span>•</span><span>English</span><span>•</span><span>INR ₹</span>
      </div>
    </div>
  </footer>
  `;
}

function getDashboardMockupSVG() {
  return `
  <div style="background:linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04));border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:20px;backdrop-filter:blur(20px)">
    <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.1)">
      <div style="color:rgba(255,255,255,0.5);font-size:0.7rem;margin-bottom:4px">TOTAL EXPENSES</div>
      <div style="color:white;font-size:1.8rem;font-weight:800">₹42,800</div>
      <div style="color:#10B981;font-size:0.72rem;margin-top:4px">↓ 12% from last month</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      ${['Budget Left', 'Saved'].map((l, i) => `
        <div style="background:rgba(255,255,255,0.06);border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,0.08)">
          <div style="color:rgba(255,255,255,0.45);font-size:0.65rem;margin-bottom:4px">${l}</div>
          <div style="color:white;font-size:1.1rem;font-weight:700">${i === 0 ? '₹37,200' : '₹24,500'}</div>
        </div>
      `).join('')}
    </div>
    <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:14px;border:1px solid rgba(255,255,255,0.08)">
      <div style="color:rgba(255,255,255,0.5);font-size:0.7rem;margin-bottom:12px">MONTHLY SPENDING</div>
      <div style="display:flex;align-items:flex-end;gap:6px;height:70px">
        ${[40,65,50,80,60,90,45,70,55,85,65,75].map((h, i) => `
          <div style="flex:1;border-radius:4px 4px 0 0;background:${i === 11 ? 'linear-gradient(180deg,#818CF8,#4F46E5)' : 'rgba(255,255,255,0.15)'};height:${h}%;transition:height 0.5s"></div>
        `).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:6px">
        ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => `<span style="color:rgba(255,255,255,0.3);font-size:0.55rem">${m}</span>`).join('')}
      </div>
    </div>
  </div>`;
}

function getFeatureMockupHTML() {
  return `
  <div style="background:var(--surface);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-xl);border:1px solid var(--border-light)">
    <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:16px">🤖 AI Category Prediction</div>
    <div style="background:var(--bg-secondary);border-radius:var(--radius);padding:14px 16px;margin-bottom:12px;border:1.5px solid var(--primary)">
      <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:4px">Expense Name</div>
      <div style="font-weight:600">Swiggy Order</div>
    </div>
    <div style="background:linear-gradient(135deg,rgba(79,70,229,0.08),rgba(6,182,212,0.05));border:1.5px solid rgba(79,70,229,0.2);border-radius:var(--radius-md);padding:16px;margin-bottom:16px">
      <div style="font-size:0.7rem;color:var(--primary);font-weight:700;text-transform:uppercase;margin-bottom:6px">🤖 AI Predicted Category</div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:10px;background:#FEF2F2;display:flex;align-items:center;justify-content:center;font-size:1.2rem">🍕</div>
          <div>
            <div style="font-weight:700;font-size:0.92rem">Food</div>
            <div style="font-size:0.72rem;color:var(--text-muted)">Confidence: 97%</div>
          </div>
        </div>
        <span style="background:rgba(16,185,129,0.12);color:#10B981;padding:4px 10px;border-radius:99px;font-size:0.72rem;font-weight:700">✓ Accurate</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        { m: 'Uber', c: '🚗 Travel', pct: '95%', bg: '#FFFBEB', cl: '#F59E0B' },
        { m: 'Netflix', c: '🎬 Entertainment', pct: '99%', bg: '#ECFEFF', cl: '#06B6D4' },
        { m: 'Apollo', c: '💊 Medical', pct: '92%', bg: '#ECFDF5', cl: '#10B981' },
      ].map(r => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:var(--bg-secondary);border-radius:var(--radius)">
          <span style="font-size:0.82rem;font-weight:600">${r.m}</span>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="background:${r.bg};color:${r.cl};padding:3px 8px;border-radius:99px;font-size:0.72rem;font-weight:600">${r.c}</span>
            <span style="font-size:0.72rem;color:var(--text-muted)">${r.pct}</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function getDashboardPreviewHTML() {
  return `
  <div style="background:#0d1117;padding:0">
    <div style="background:#161b22;padding:12px 20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
      <div style="width:10px;height:10px;border-radius:50%;background:#EF4444"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:#F59E0B"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:#10B981"></div>
      <div style="flex:1;background:rgba(255,255,255,0.06);border-radius:99px;padding:4px 12px;margin-left:8px;font-size:0.7rem;color:rgba(255,255,255,0.3)">app.expenseai.com/dashboard</div>
    </div>
    <div style="display:grid;grid-template-columns:200px 1fr;min-height:400px">
      <div style="background:#0d1117;border-right:1px solid rgba(255,255,255,0.05);padding:16px 12px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;padding:8px">
          <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#4F46E5,#06B6D4);display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:white;font-weight:700">AI</div>
          <span style="color:white;font-weight:700;font-size:0.9rem">ExpenseAI</span>
        </div>
        ${['📊 Dashboard','➕ Add Expense','📋 History','📈 Analytics','🎯 Budget'].map((item, i) => `
          <div style="padding:8px 10px;border-radius:8px;font-size:0.75rem;color:${i===0?'white':'rgba(255,255,255,0.4)'};background:${i===0?'rgba(79,70,229,0.3)':'transparent'};margin-bottom:4px">${item}</div>
        `).join('')}
      </div>
      <div style="padding:20px;background:#0f1117">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">
          ${[
            { l:'Total Expenses', v:'₹42,800', c:'#EF4444', i:'📉' },
            { l:'Monthly Budget', v:'₹80,000', c:'#4F46E5', i:'🎯' },
            { l:'Remaining', v:'₹37,200', c:'#10B981', i:'💰' },
            { l:'Savings', v:'₹24,500', c:'#06B6D4', i:'🏦' },
          ].map(s => `
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px">
              <div style="font-size:1rem;margin-bottom:6px">${s.i}</div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);margin-bottom:4px">${s.l}</div>
              <div style="font-size:1rem;font-weight:700;color:${s.c}">${s.v}</div>
            </div>
          `).join('')}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:14px">
            <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);margin-bottom:10px">EXPENSE DISTRIBUTION</div>
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:80px;height:80px;border-radius:50%;background:conic-gradient(#EF4444 0% 30%,#F59E0B 30% 52%,#8B5CF6 52% 68%,#10B981 68% 80%,#06B6D4 80% 100%);flex-shrink:0"></div>
              <div style="display:flex;flex-direction:column;gap:4px">
                ${[['Food','#EF4444','30%'],['Travel','#F59E0B','22%'],['Shopping','#8B5CF6','16%'],['Medical','#10B981','12%']].map(c => `
                  <div style="display:flex;align-items:center;gap:6px"><div style="width:6px;height:6px;border-radius:50%;background:${c[1]}"></div><span style="font-size:0.6rem;color:rgba(255,255,255,0.5)">${c[0]}</span><span style="font-size:0.6rem;color:white;margin-left:auto">${c[2]}</span></div>
                `).join('')}
              </div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:14px">
            <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);margin-bottom:10px">RECENT TRANSACTIONS</div>
            ${[
              { m:'Swiggy', c:'Food', a:'₹480', col:'#EF4444' },
              { m:'Uber', c:'Travel', a:'₹220', col:'#F59E0B' },
              { m:'Netflix', c:'Entertainment', a:'₹649', col:'#06B6D4' },
              { m:'Amazon', c:'Shopping', a:'₹2,499', col:'#8B5CF6' },
            ].map(t => `
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                <div style="display:flex;align-items:center;gap:6px">
                  <div style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:0.7rem">💳</div>
                  <div>
                    <div style="font-size:0.65rem;color:rgba(255,255,255,0.8);font-weight:600">${t.m}</div>
                    <div style="font-size:0.55rem;color:${t.col}">${t.c}</div>
                  </div>
                </div>
                <span style="font-size:0.7rem;color:#EF4444;font-weight:700">-${t.a}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function getAnalyticsPreviewCards() {
  return `
    <div class="feature-card" style="text-align:center">
      <div style="font-size:3rem;margin-bottom:16px">📊</div>
      <div class="feature-title">Spending Distribution</div>
      <div class="feature-desc">Beautiful pie and donut charts showing exactly where your money goes, broken down by category.</div>
    </div>
    <div class="feature-card" style="text-align:center">
      <div style="font-size:3rem;margin-bottom:16px">📈</div>
      <div class="feature-title">Trend Analysis</div>
      <div class="feature-desc">Month-over-month and week-over-week spending trends with predictive forecasting.</div>
    </div>
    <div class="feature-card" style="text-align:center">
      <div style="font-size:3rem;margin-bottom:16px">🎯</div>
      <div class="feature-title">Budget vs Actual</div>
      <div class="feature-desc">Side-by-side comparison of your budgeted vs actual spending with variance analysis.</div>
    </div>
  `;
}

function initLanding() {
  const nav = document.getElementById('landing-nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleFAQ(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(item => item.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

function handleContact(e) {
  e.preventDefault();
  showToast('Message Sent!', 'We\'ll get back to you within 24 hours 🚀', 'success');
  e.target.reset();
}

// ============================================
// AUTH PAGES
// ============================================
function renderLogin() {
  return `
  <div class="auth-page">
    <div class="auth-bg"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="auth-card">
      <div class="auth-logo">
        <div class="logo-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
        <div class="logo-text">ExpenseAI</div>
      </div>
      <h1 class="auth-title">Welcome Back 👋</h1>
      <p class="auth-subtitle">Sign in to your financial command center</p>

      <form id="login-form" onsubmit="handleLogin(event)" style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <div class="form-input-wrapper">
            <span class="form-input-icon">📧</span>
            <input class="form-input" type="email" id="login-email" placeholder="arjun@gmail.com" value="demo@expenseai.com" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="form-input-wrapper" style="position:relative">
            <span class="form-input-icon">🔒</span>
            <input class="form-input" type="password" id="login-password" placeholder="••••••••" value="demo1234" required />
            <button type="button" onclick="togglePasswordVisibility('login-password', this)" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);border:none;background:none;cursor:pointer;color:rgba(255,255,255,0.5);font-size:0.9rem">👁</button>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <label class="checkbox-wrapper" style="color:rgba(255,255,255,0.65);font-size:0.83rem">
            <input type="checkbox" checked />
            Remember Me
          </label>
          <a style="font-size:0.82rem;color:var(--secondary);cursor:pointer;font-weight:600" onclick="showToast('Email Sent','Check your inbox for reset instructions','info')">Forgot Password?</a>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:14px;font-size:0.95rem" id="login-btn">
          Sign In 🚀
        </button>
      </form>

      <div class="auth-divider"><div class="auth-divider-line"></div><div class="auth-divider-text">or continue with</div><div class="auth-divider-line"></div></div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px">
        <button class="btn btn-outline" onclick="handleSocialLogin('Google')" style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.15);color:white;justify-content:center">🇬 Google</button>
        <button class="btn btn-outline" onclick="handleSocialLogin('Apple')" style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.15);color:white;justify-content:center">🍎 Apple</button>
      </div>

      <div class="auth-switch">Don't have an account? <a onclick="navigate('signup')">Create one for free →</a></div>
      <div style="text-align:center;margin-top:12px"><a onclick="navigate('landing')" style="font-size:0.78rem;color:rgba(255,255,255,0.4);cursor:pointer">← Back to Home</a></div>
    </div>
  </div>`;
}

function renderSignup() {
  return `
  <div class="auth-page">
    <div class="auth-bg"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-3"></div>

    <div class="auth-card" style="max-width:500px">
      <div class="auth-logo">
        <div class="logo-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
        <div class="logo-text">ExpenseAI</div>
      </div>
      <h1 class="auth-title">Create Account ✨</h1>
      <p class="auth-subtitle">Start your journey to financial freedom</p>

      <form id="signup-form" onsubmit="handleSignup(event)" style="display:flex;flex-direction:column;gap:14px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="form-group">
            <label class="form-label">First Name</label>
            <input class="form-input" type="text" id="signup-fname" placeholder="Arjun" required />
          </div>
          <div class="form-group">
            <label class="form-label">Last Name</label>
            <input class="form-input" type="text" id="signup-lname" placeholder="Sharma" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <div class="form-input-wrapper">
            <span class="form-input-icon">📧</span>
            <input class="form-input" type="email" id="signup-email" placeholder="arjun@gmail.com" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="form-input-wrapper" style="position:relative">
            <span class="form-input-icon">🔒</span>
            <input class="form-input" type="password" id="signup-password" placeholder="Min 8 characters" required oninput="checkPasswordStrength(this.value)" />
            <button type="button" onclick="togglePasswordVisibility('signup-password',this)" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);border:none;background:none;cursor:pointer;color:rgba(255,255,255,0.5)">👁</button>
          </div>
          <div class="password-strength" id="strength-container" style="display:none">
            <div class="strength-bars">
              <div class="strength-bar" id="sb1"></div>
              <div class="strength-bar" id="sb2"></div>
              <div class="strength-bar" id="sb3"></div>
              <div class="strength-bar" id="sb4"></div>
            </div>
            <div class="strength-label" id="strength-label">Weak</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <div class="form-input-wrapper">
            <span class="form-input-icon">🔒</span>
            <input class="form-input" type="password" id="signup-confirm" placeholder="Confirm password" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Monthly Income</label>
          <div class="form-input-wrapper">
            <span class="form-input-icon">💰</span>
            <input class="form-input" type="number" id="signup-income" placeholder="120000" />
          </div>
        </div>
        <label class="checkbox-wrapper" style="color:rgba(255,255,255,0.65);font-size:0.82rem">
          <input type="checkbox" required />
          I agree to the <a style="color:var(--secondary);margin-left:4px">Terms of Service</a> and <a style="color:var(--secondary);margin-left:4px">Privacy Policy</a>
        </label>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:14px;font-size:0.95rem">
          Create Account ✨
        </button>
      </form>

      <div class="auth-switch">Already have an account? <a onclick="navigate('login')">Sign in →</a></div>
      <div style="text-align:center;margin-top:12px"><a onclick="navigate('landing')" style="font-size:0.78rem;color:rgba(255,255,255,0.4);cursor:pointer">← Back to Home</a></div>
    </div>
  </div>`;
}

function initAuth(type) {}

function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.innerHTML = '<span class="animate-spin">⟳</span> Signing in...';
  btn.disabled = true;

  setTimeout(() => {
    AppState.isAuthenticated = true;
    showToast('Welcome back! 👋', `Hello, ${AppState.user.name.split(' ')[0]}!`, 'success');
    navigate('dashboard');
  }, 1500);
}

function handleSignup(e) {
  e.preventDefault();
  const fname = document.getElementById('signup-fname')?.value || 'User';
  const lname = document.getElementById('signup-lname')?.value || '';
  const email = document.getElementById('signup-email')?.value || 'user@email.com';
  const income = document.getElementById('signup-income')?.value || 80000;

  AppState.user = {
    name: `${fname} ${lname}`.trim(),
    email,
    phone: '+91 98765 43210',
    occupation: 'Professional',
    monthlyIncome: parseInt(income) || 80000,
    joinDate: new Date().toISOString().split('T')[0],
    avatar: (fname[0] + (lname[0] || '')).toUpperCase(),
  };
  localStorage.setItem('user', JSON.stringify(AppState.user));
  AppState.isAuthenticated = true;
  showToast('Account Created! 🎉', `Welcome to ExpenseAI, ${fname}!`, 'success');
  navigate('dashboard');
}

function handleSocialLogin(provider) {
  showToast('Coming Soon', `${provider} login will be available soon!`, 'info');
}

function togglePasswordVisibility(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

function checkPasswordStrength(password) {
  const container = document.getElementById('strength-container');
  if (!container) return;
  container.style.display = 'block';

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  document.getElementById('strength-label').textContent = labels[strength] || '';

  for (let i = 1; i <= 4; i++) {
    const bar = document.getElementById(`sb${i}`);
    if (!bar) continue;
    bar.className = 'strength-bar';
    if (i <= strength) bar.classList.add(`active-${strength}`);
  }
}

// ============================================
// DASHBOARD
// ============================================
function renderDashboard() {
  const thisMonth = getMonthExpenses(0);
  const lastMonth = getMonthExpenses(1);
  const thisTotal = getTotalAmount(thisMonth);
  const lastTotal = getTotalAmount(lastMonth);
  const budget = AppState.budgets.monthly;
  const remaining = budget - thisTotal;
  const savings = AppState.user.monthlyIncome - thisTotal;
  const change = lastTotal ? ((thisTotal - lastTotal) / lastTotal * 100).toFixed(1) : 0;
  const catTotals = getCategoryTotals(thisMonth);
  const todayExp = AppState.expenses.filter(e => e.date === new Date().toISOString().split('T')[0]);
  const todayTotal = getTotalAmount(todayExp);

  const aiInsights = [
    `You spent ${Math.abs(change)}% ${change > 0 ? 'more' : 'less'} on expenses this month compared to last month.`,
    `Food & Travel account for ${catTotals.slice(0,2).reduce((s,c) => s + c.amount, 0) > 0 ? Math.round((catTotals.slice(0,2).reduce((s,c) => s + c.amount, 0) / thisTotal * 100)) : 0}% of your total spending this month.`,
    `You can save ${formatCurrency(Math.round(thisTotal * 0.15))} next month by reducing ${catTotals[0]?.name || 'top category'} expenses by 20%.`,
    `Your spending is ${remaining > 0 ? 'within' : 'over'} budget by ${formatCurrency(Math.abs(remaining))}. ${remaining > 0 ? 'Great job!' : 'Review your expenses.'}`,
  ];

  return `
  <div class="app-layout">
    ${getSidebarHTML('dashboard')}
    <div class="main-content">
      ${getTopbarHTML('Dashboard', `Good ${getGreeting()}, ${AppState.user?.name?.split(' ')[0] || 'there'}! 👋`)}
      <div class="page-content">

        <!-- Welcome Card -->
        <div style="background:linear-gradient(135deg,var(--primary) 0%,#6366F1 50%,var(--secondary) 100%);border-radius:var(--radius-lg);padding:28px 32px;margin-bottom:24px;position:relative;overflow:hidden;box-shadow:var(--shadow-primary)">
          <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.07)"></div>
          <div style="position:absolute;bottom:-60px;right:80px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.05)"></div>
          <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
            <div>
              <div style="font-size:0.8rem;color:rgba(255,255,255,0.7);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px">Welcome back</div>
              <div style="font-size:1.6rem;font-weight:800;color:white;margin-bottom:8px">${AppState.user?.name || 'User'} 🎯</div>
              <div style="font-size:0.88rem;color:rgba(255,255,255,0.75);line-height:1.6">You have ${AppState.expenses.length} total transactions this year.<br>Budget health: ${remaining > 0 ? '✅ On Track' : '⚠️ Over Budget'}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
              <div style="background:rgba(255,255,255,0.15);border-radius:var(--radius-md);padding:16px 20px;text-align:center;backdrop-filter:blur(10px)">
                <div style="font-size:0.72rem;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:0.5px">Monthly Income</div>
                <div style="font-size:1.4rem;font-weight:800;color:white">${formatCurrency(AppState.user?.monthlyIncome || 80000)}</div>
              </div>
              <button class="btn btn-sm" onclick="navigate('add-expense')" style="background:rgba(255,255,255,0.2);color:white;border:1.5px solid rgba(255,255,255,0.3);backdrop-filter:blur(10px)">+ Add Expense</button>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          ${[
            { label:'Total Expenses', value:thisTotal, prefix:'₹', suffix:'', icon:'📉', grad:'linear-gradient(135deg,#EF4444,#DC2626)', change:`${Math.abs(change)}% ${change > 0 ? '↑' : '↓'}`, changeClass: change > 0 ? 'down' : 'up', sub:`vs ₹${lastTotal.toLocaleString('en-IN')} last month` },
            { label:'Monthly Budget', value:budget, prefix:'₹', suffix:'', icon:'🎯', grad:'linear-gradient(135deg,#4F46E5,#6366F1)', change:'Set Budget', changeClass:'up', sub:`${Math.round(thisTotal/budget*100)}% utilized` },
            { label:'Remaining Budget', value:Math.max(remaining, 0), prefix:'₹', suffix:'', icon:'💰', grad:'linear-gradient(135deg,#10B981,#059669)', change:`${Math.round((remaining/budget)*100)}% left`, changeClass: remaining > 0 ? 'up' : 'down', sub:`${remaining < 0 ? '⚠ Exceeded' : 'Safe to spend'}` },
            { label:'Savings This Month', value:Math.max(savings, 0), prefix:'₹', suffix:'', icon:'🏦', grad:'linear-gradient(135deg,#06B6D4,#0891B2)', change:`${Math.round((savings / (AppState.user?.monthlyIncome||80000)) * 100)}% saved`, changeClass:'up', sub:`of ${formatCurrency(AppState.user?.monthlyIncome||80000)} income` },
            { label:"Today's Expenses", value:todayTotal, prefix:'₹', suffix:'', icon:'📅', grad:'linear-gradient(135deg,#F59E0B,#D97706)', change:`${todayExp.length} transactions`, changeClass:'up', sub:'Today' },
            { label:'Total Transactions', value:AppState.expenses.length, prefix:'', suffix:'', icon:'🧾', grad:'linear-gradient(135deg,#8B5CF6,#7C3AED)', change:'All time', changeClass:'up', sub:`${thisMonth.length} this month` },
          ].map(s => `
            <div class="stat-card" style="--card-accent:${s.grad}">
              <div class="stat-icon" style="background:${s.grad}">${s.icon}</div>
              <div class="stat-label">${s.label}</div>
              <div class="stat-value" data-counter="${s.value}" data-prefix="${s.prefix}" data-suffix="${s.suffix}">${s.prefix}${s.value.toLocaleString('en-IN')}${s.suffix}</div>
              <div class="stat-change ${s.changeClass}">${s.changeClass === 'up' ? '▲' : '▼'} ${s.change}</div>
              <div class="stat-sub">${s.sub}</div>
            </div>
          `).join('')}
        </div>

        <!-- Charts -->
        <div class="charts-grid">
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">📊 Expense Distribution</div><div class="card-subtitle">This month by category</div></div>
              <span class="badge badge-primary">Live</span>
            </div>
            <div class="chart-container"><canvas id="pieChart"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">📈 Monthly Spending</div><div class="card-subtitle">Last 6 months trend</div></div>
              <span class="badge badge-success">Updated</span>
            </div>
            <div class="chart-container"><canvas id="barChart"></canvas></div>
          </div>
          <div class="card" style="grid-column:1/-1">
            <div class="card-header">
              <div><div class="card-title">📉 Weekly Trend</div><div class="card-subtitle">Daily spending this week</div></div>
            </div>
            <div class="chart-container-sm"><canvas id="lineChart"></canvas></div>
          </div>
        </div>

        <!-- Bottom Widgets -->
        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:20px;margin-bottom:24px">
          <!-- Recent Transactions -->
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">🧾 Recent Transactions</div><div class="card-subtitle">Your latest expenses</div></div>
              <button class="btn btn-secondary btn-sm" onclick="navigate('expense-history')">View All</button>
            </div>
            <div>
              ${AppState.expenses.slice(0, 7).map(e => `
                <div class="transaction-item">
                  <div class="transaction-icon" style="background:${e.categoryBg}">${e.categoryIcon}</div>
                  <div class="transaction-details">
                    <div class="transaction-name">${e.name}</div>
                    <div class="transaction-meta">${e.category} • ${formatDate(e.date)} • ${e.paymentMethod}</div>
                  </div>
                  <div class="transaction-amount debit">-${formatCurrency(e.amount)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Panel -->
          <div style="display:flex;flex-direction:column;gap:20px">
            <!-- AI Insights -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">🤖 AI Financial Insights</div></div>
                <span class="badge badge-primary">AI</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px">
                ${aiInsights.map(insight => `
                  <div class="ai-insight">
                    <div class="ai-insight-icon">✨</div>
                    <div>
                      <div class="ai-insight-label">AI Insight</div>
                      <div class="ai-insight-text">${insight}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Budget Progress -->
            <div class="card">
              <div class="card-header">
                <div><div class="card-title">🎯 Budget Progress</div></div>
                <button class="btn btn-secondary btn-sm" onclick="navigate('budget')">Manage</button>
              </div>
              ${AppState.budgets.categories.slice(0, 4).map(b => {
                const spent = getTotalAmount(thisMonth.filter(e => e.category === b.name));
                const pct = Math.min((spent / b.limit) * 100, 100);
                const color = pct >= 90 ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#10B981';
                return `
                  <div class="progress-wrapper">
                    <div class="progress-header">
                      <div class="progress-label">${b.icon} ${b.name}</div>
                      <div class="progress-value">${formatCurrency(spent)} / ${formatCurrency(b.limit)}</div>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
                    </div>
                    <div class="progress-percentage" style="color:${color}">${pct.toFixed(0)}%</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Category Breakdown + Smart Suggestions -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">🏷️ Category Breakdown</div><div class="card-subtitle">This month</div></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${catTotals.slice(0, 6).map(cat => {
                const pct = ((cat.amount / thisTotal) * 100).toFixed(1);
                return `
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:10px;background:${cat.bg};display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${cat.icon}</div>
                    <div style="flex:1">
                      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                        <span style="font-size:0.85rem;font-weight:600">${cat.name}</span>
                        <span style="font-size:0.85rem;font-weight:700">${formatCurrency(cat.amount)}</span>
                      </div>
                      <div class="progress-bar" style="height:6px">
                        <div class="progress-fill" style="width:${pct}%;background:${cat.color}"></div>
                      </div>
                    </div>
                    <div style="font-size:0.75rem;color:var(--text-muted);width:36px;text-align:right">${pct}%</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div><div class="card-title">💡 Smart Suggestions</div></div>
              <span class="badge badge-secondary">AI</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${[
                { icon:'🍽️', text:'Switch to home cooking 3x/week to save ₹2,400/month on food delivery.', save:'Save ₹2,400' },
                { icon:'🎭', text:'Consolidate your 4 streaming subscriptions into a family plan.', save:'Save ₹890' },
                { icon:'🚌', text:'Use public transport twice a week to reduce travel costs.', save:'Save ₹1,200' },
                { icon:'🛒', text:'Buy groceries in bulk to reduce per-unit costs by 15-20%.', save:'Save ₹600' },
              ].map(s => `
                <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:var(--bg-secondary);border-radius:var(--radius);transition:var(--transition)" onmouseenter="this.style.background='rgba(79,70,229,0.06)'" onmouseleave="this.style.background='var(--bg-secondary)'">
                  <span style="font-size:1.3rem;flex-shrink:0">${s.icon}</span>
                  <div style="flex:1">
                    <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5">${s.text}</div>
                  </div>
                  <span class="badge badge-success" style="flex-shrink:0">${s.save}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
}

function initDashboard() {
  initCounters();
  initDashboardCharts();
}

function initDashboardCharts() {
  const thisMonth = getMonthExpenses(0);
  const catTotals = getCategoryTotals(thisMonth);

  // Chart defaults
  Chart.defaults.font.family = 'Poppins';
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#64748B';

  const isDark = AppState.theme === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // Pie chart
  const pieCtx = document.getElementById('pieChart');
  if (pieCtx && catTotals.length > 0) {
    AppState.charts.pie = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: catTotals.map(c => c.name),
        datasets: [{
          data: catTotals.map(c => c.amount),
          backgroundColor: catTotals.map(c => c.color + 'CC'),
          borderColor: catTotals.map(c => c.color),
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '70%',
        plugins: {
          legend: { position: 'right', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 12, family: 'Poppins' } } },
          tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${formatCurrency(ctx.raw)} (${((ctx.raw / getTotalAmount(thisMonth)) * 100).toFixed(1)}%)` } },
        },
        animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' },
      },
    });
  }

  // Bar chart
  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    const months = [];
    const amounts = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleDateString('en-IN', { month: 'short' }));
      amounts.push(getTotalAmount(getMonthExpenses(i)));
    }
    AppState.charts.bar = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Expenses',
          data: amounts,
          backgroundColor: months.map((_, i) => i === 5 ? 'rgba(79,70,229,0.85)' : 'rgba(79,70,229,0.25)'),
          borderColor: 'rgba(79,70,229,1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: gridColor }, ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' } },
        },
        animation: { duration: 1200, easing: 'easeOutQuart' },
      },
    });
  }

  // Line chart
  const lineCtx = document.getElementById('lineChart');
  if (lineCtx) {
    const days = [];
    const dayAmounts = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
      dayAmounts.push(getTotalAmount(AppState.expenses.filter(e => e.date === dateStr)));
    }
    AppState.charts.line = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Daily Spending',
          data: dayAmounts,
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6,182,212,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#06B6D4',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: gridColor }, ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' } },
        },
        animation: { duration: 1200 },
      },
    });
  }
}

// ============================================
// ADD EXPENSE PAGE
// ============================================
function renderAddExpense() {
  const categories = ['Food', 'Travel', 'Shopping', 'Medical', 'Entertainment', 'Utilities', 'Education', 'Groceries', 'Finance', 'Others'];
  const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Wallet'];

  return `
  <div class="app-layout">
    ${getSidebarHTML('add-expense')}
    <div class="main-content">
      ${getTopbarHTML('Add Expense', 'Log a new expense with AI categorization')}
      <div class="page-content" style="max-width:800px;margin:0 auto">

        <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(79,70,229,0.05),rgba(6,182,212,0.03));border:1.5px solid rgba(79,70,229,0.15)">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:52px;height:52px;border-radius:var(--radius-md);background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:var(--shadow-primary)">🤖</div>
            <div>
              <div style="font-size:1rem;font-weight:700;margin-bottom:4px">AI-Powered Expense Entry</div>
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5">Type the merchant name and our AI will instantly predict the category. You can always edit it manually.</div>
            </div>
          </div>
        </div>

        <div class="card">
          <form id="add-expense-form" onsubmit="handleAddExpense(event)" style="display:flex;flex-direction:column;gap:20px">

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div class="form-group" style="grid-column:1/-1">
                <label class="form-label">Expense Name / Merchant *</label>
                <div class="form-input-wrapper">
                  <span class="form-input-icon">🏪</span>
                  <input class="form-input" type="text" id="exp-name" placeholder="e.g. Swiggy, Uber, Amazon..." required
                    oninput="triggerAIPrediction(this.value)" autocomplete="off" />
                </div>
                <div id="ai-prediction-box" style="display:none"></div>
              </div>

              <div class="form-group">
                <label class="form-label">Amount (₹) *</label>
                <div class="form-input-wrapper">
                  <span class="form-input-icon">₹</span>
                  <input class="form-input" type="number" id="exp-amount" placeholder="0.00" min="1" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Date *</label>
                <div class="form-input-wrapper">
                  <span class="form-input-icon">📅</span>
                  <input class="form-input" type="date" id="exp-date" value="${new Date().toISOString().split('T')[0]}" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-input form-select" id="exp-category">
                  ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select class="form-input form-select" id="exp-payment">
                  ${paymentMethods.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>

              <div class="form-group" style="grid-column:1/-1">
                <label class="form-label">Merchant (Optional)</label>
                <div class="form-input-wrapper">
                  <span class="form-input-icon">🏢</span>
                  <input class="form-input" type="text" id="exp-merchant" placeholder="Merchant name" />
                </div>
              </div>
            </div>

            <!-- Receipt Upload -->
            <div class="form-group">
              <label class="form-label">Receipt Upload (Optional)</label>
              <div class="upload-zone" id="upload-zone" onclick="document.getElementById('receipt-input').click()"
                ondragover="this.classList.add('drag-over');event.preventDefault()"
                ondragleave="this.classList.remove('drag-over')"
                ondrop="handleReceiptDrop(event)">
                <div class="upload-zone-icon">📎</div>
                <div class="upload-zone-title">Click to upload or drag & drop</div>
                <div class="upload-zone-sub">Supports JPG, PNG, PDF (Max 10MB)</div>
                <input type="file" id="receipt-input" accept="image/*,.pdf" style="display:none" onchange="handleReceiptUpload(this)" />
              </div>
              <div id="receipt-preview" style="display:none;margin-top:10px;padding:12px;background:rgba(16,185,129,0.08);border-radius:var(--radius);border:1px solid rgba(16,185,129,0.2);display:none;align-items:center;gap:12px">
                <span>📄</span>
                <span id="receipt-name" style="font-size:0.85rem;font-weight:600"></span>
                <button type="button" onclick="removeReceipt()" style="border:none;background:none;cursor:pointer;color:var(--danger);margin-left:auto">✕</button>
              </div>
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label class="form-label">Notes (Optional)</label>
              <textarea class="form-input" id="exp-notes" rows="3" placeholder="Add any additional notes about this expense..." style="resize:vertical"></textarea>
            </div>

            <!-- Category Preview -->
            <div id="selected-category-preview" style="padding:16px;background:var(--bg-secondary);border-radius:var(--radius-md);border:1px solid var(--border)">
              <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:8px;font-weight:600;text-transform:uppercase">SELECTED CATEGORY</div>
              <div id="cat-preview-content" style="display:flex;align-items:center;gap:10px">
                <span style="font-size:1.5rem">📦</span>
                <div>
                  <div style="font-weight:700">Others</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">Default category (AI will update)</div>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:12px">
              <button type="button" class="btn btn-outline" onclick="navigate('expense-history')" style="flex:1;justify-content:center">Cancel</button>
              <button type="submit" class="btn btn-primary" style="flex:2;justify-content:center;font-size:0.95rem" id="submit-expense-btn">
                💾 Save Expense
              </button>
            </div>
          </form>
        </div>

        <!-- Quick Entry Tips -->
        <div class="card" style="margin-top:20px">
          <div class="card-title" style="margin-bottom:16px">⚡ Quick AI Examples</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${[
              {name:'Swiggy Order', cat:'🍕 Food'},{name:'Uber Ride', cat:'🚗 Travel'},{name:'Amazon Purchase', cat:'🛍️ Shopping'},
              {name:'Netflix', cat:'🎬 Entertainment'},{name:'Apollo Pharmacy', cat:'💊 Medical'},{name:'BESCOM Bill', cat:'⚡ Utilities'},
              {name:'BigBasket', cat:'🛒 Groceries'},{name:'Coursera', cat:'📚 Education'},
            ].map(e => `
              <button type="button" class="btn btn-secondary btn-sm" onclick="autofillExpense('${e.name}')">
                ${e.cat}: <strong>${e.name}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

let aiPredictTimeout;
function triggerAIPrediction(value) {
  clearTimeout(aiPredictTimeout);
  const box = document.getElementById('ai-prediction-box');
  if (!box) return;

  if (value.length < 2) { box.style.display = 'none'; return; }

  aiPredictTimeout = setTimeout(() => {
    const prediction = predictCategory(value);
    if (prediction) {
      box.style.display = 'block';
      box.innerHTML = `
        <div class="ai-prediction">
          <div class="ai-prediction-icon">${prediction.icon}</div>
          <div style="flex:1">
            <div class="ai-prediction-label">🤖 AI Predicted Category</div>
            <div class="ai-prediction-value">${prediction.category}</div>
            <div class="ai-prediction-confidence">Confidence: ${prediction.confidence}%</div>
          </div>
          <button type="button" class="btn btn-success btn-sm" onclick="acceptAIPrediction('${prediction.category}','${prediction.icon}','${prediction.color}')">✓ Accept</button>
        </div>
      `;

      // Auto-set category select
      const catSelect = document.getElementById('exp-category');
      if (catSelect) {
        Array.from(catSelect.options).forEach(opt => {
          if (opt.value === prediction.category) catSelect.value = prediction.category;
        });
      }
      updateCategoryPreview(prediction.category, prediction.icon);
    }
  }, 400);
}

function acceptAIPrediction(category, icon, color) {
  const catSelect = document.getElementById('exp-category');
  if (catSelect) catSelect.value = category;
  updateCategoryPreview(category, icon);
  showToast('Category Set', `Expense categorized as ${category}`, 'success');
}

function updateCategoryPreview(category, icon) {
  const preview = document.getElementById('cat-preview-content');
  if (preview) {
    preview.innerHTML = `
      <span style="font-size:1.5rem">${icon}</span>
      <div>
        <div style="font-weight:700">${category}</div>
        <div style="font-size:0.75rem;color:var(--primary)">🤖 AI Suggested</div>
      </div>
    `;
  }
}

function autofillExpense(name) {
  const input = document.getElementById('exp-name');
  if (input) { input.value = name; triggerAIPrediction(name); }
}

function handleReceiptUpload(input) {
  if (input.files[0]) {
    const preview = document.getElementById('receipt-preview');
    const nameEl = document.getElementById('receipt-name');
    if (preview && nameEl) {
      nameEl.textContent = input.files[0].name;
      preview.style.display = 'flex';
    }
    showToast('Receipt Uploaded', 'Receipt attached successfully!', 'success');
  }
}

function handleReceiptDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) {
    const preview = document.getElementById('receipt-preview');
    const nameEl = document.getElementById('receipt-name');
    if (preview && nameEl) { nameEl.textContent = file.name; preview.style.display = 'flex'; }
    showToast('Receipt Uploaded', file.name + ' attached!', 'success');
  }
}

function removeReceipt() {
  document.getElementById('receipt-preview').style.display = 'none';
  document.getElementById('receipt-input').value = '';
}

function handleAddExpense(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-expense-btn');
  btn.innerHTML = '<span class="animate-spin">⟳</span> Saving...';
  btn.disabled = true;

  const name = document.getElementById('exp-name').value;
  const amount = parseFloat(document.getElementById('exp-amount').value);
  const date = document.getElementById('exp-date').value;
  const category = document.getElementById('exp-category').value;
  const paymentMethod = document.getElementById('exp-payment').value;
  const merchant = document.getElementById('exp-merchant').value || name;
  const notes = document.getElementById('exp-notes').value;

  const prediction = predictCategory(name);

  const newExpense = {
    id: Date.now(),
    name, merchant, amount, category,
    categoryIcon: prediction?.icon || '📦',
    categoryColor: prediction?.color || '#94A3B8',
    categoryBg: prediction?.bg || '#F8FAFC',
    date, paymentMethod, notes, aiPredicted: true, receipt: null,
  };

  setTimeout(() => {
    AppState.expenses.unshift(newExpense);
    localStorage.setItem('expenses', JSON.stringify(AppState.expenses));
    showToast('Expense Added! 🎉', `₹${amount.toLocaleString('en-IN')} for ${name} saved`, 'success');
    navigate('dashboard');
  }, 1000);
}

function initAddExpense() {
  const catSelect = document.getElementById('exp-category');
  if (catSelect) {
    catSelect.addEventListener('change', function() {
      const catData = Object.values(AI_CATEGORIES).find(c => c.category === this.value);
      updateCategoryPreview(this.value, catData?.icon || '📦');
    });
  }
}

// ============================================
// EXPENSE HISTORY
// ============================================
let historyPage = 1;
let historyFilter = 'all';
let historySearch = '';
let historySortBy = 'date-desc';

function renderExpenseHistory() {
  return `
  <div class="app-layout">
    ${getSidebarHTML('expense-history')}
    <div class="main-content">
      ${getTopbarHTML('Expense History', 'All your expenses in one place')}
      <div class="page-content">

        <!-- Filter Bar -->
        <div class="filter-bar">
          <div class="filter-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search expenses, merchants, categories..." id="history-search" oninput="filterHistory()" />
          </div>
          <select class="form-input form-select" id="history-category-filter" onchange="filterHistory()" style="width:auto;padding:9px 36px 9px 12px;font-size:0.85rem">
            <option value="all">All Categories</option>
            ${['Food','Travel','Shopping','Medical','Entertainment','Utilities','Education','Groceries','Finance','Others'].map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <select class="form-input form-select" id="history-sort" onchange="filterHistory()" style="width:auto;padding:9px 36px 9px 12px;font-size:0.85rem">
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (High-Low)</option>
            <option value="amount-asc">Amount (Low-High)</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="exportExpenses()">📊 Export CSV</button>
        </div>

        <!-- Stats Summary -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px" id="history-stats">
        </div>

        <!-- Table -->
        <div class="card" style="padding:0;overflow:hidden">
          <div style="overflow-x:auto">
            <table class="data-table" id="expense-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Merchant</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="expense-tbody"></tbody>
            </table>
          </div>
          <div id="expense-empty" class="empty-state" style="display:none">
            <div class="empty-state-icon">🔍</div>
            <h3>No expenses found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button class="btn btn-primary btn-sm" onclick="clearHistoryFilters()">Clear Filters</button>
          </div>
        </div>
        <div id="pagination-wrap" class="pagination"></div>
      </div>
    </div>
  </div>`;
}

function initExpenseHistory() {
  historyPage = 1;
  historySearch = '';
  historyFilter = 'all';
  renderHistoryTable();
  renderHistoryStats();
}

function getFilteredExpenses() {
  let expenses = [...AppState.expenses];
  const search = document.getElementById('history-search')?.value?.toLowerCase() || '';
  const cat = document.getElementById('history-category-filter')?.value || 'all';
  const sort = document.getElementById('history-sort')?.value || 'date-desc';

  if (search) expenses = expenses.filter(e => e.name.toLowerCase().includes(search) || e.category.toLowerCase().includes(search) || e.merchant?.toLowerCase().includes(search));
  if (cat !== 'all') expenses = expenses.filter(e => e.category === cat);

  switch (sort) {
    case 'date-asc': expenses.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
    case 'amount-desc': expenses.sort((a, b) => b.amount - a.amount); break;
    case 'amount-asc': expenses.sort((a, b) => a.amount - b.amount); break;
    default: expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return expenses;
}

function filterHistory() {
  historyPage = 1;
  renderHistoryTable();
  renderHistoryStats();
}

function clearHistoryFilters() {
  document.getElementById('history-search').value = '';
  document.getElementById('history-category-filter').value = 'all';
  historyPage = 1;
  renderHistoryTable();
}

function renderHistoryStats() {
  const filtered = getFilteredExpenses();
  const container = document.getElementById('history-stats');
  if (!container) return;
  const total = getTotalAmount(filtered);
  const avg = filtered.length ? total / filtered.length : 0;
  const highest = filtered.length ? Math.max(...filtered.map(e => e.amount)) : 0;
  const lowest = filtered.length ? Math.min(...filtered.map(e => e.amount)) : 0;

  container.innerHTML = [
    { l: 'Total', v: formatCurrency(total), i: '💰', c: '#4F46E5' },
    { l: `${filtered.length} Transactions`, v: formatCurrency(avg) + ' avg', i: '📊', c: '#10B981' },
    { l: 'Highest', v: formatCurrency(highest), i: '⬆', c: '#EF4444' },
    { l: 'Lowest', v: formatCurrency(lowest), i: '⬇', c: '#06B6D4' },
  ].map(s => `
    <div style="background:var(--surface);border-radius:var(--radius);padding:14px;border:1px solid var(--border-light);box-shadow:var(--shadow-sm);display:flex;align-items:center;gap:10px">
      <div style="font-size:1.3rem">${s.i}</div>
      <div>
        <div style="font-size:0.7rem;color:var(--text-muted);font-weight:600;text-transform:uppercase">${s.l}</div>
        <div style="font-size:1rem;font-weight:800;color:${s.c}">${s.v}</div>
      </div>
    </div>
  `).join('');
}

function renderHistoryTable() {
  const tbody = document.getElementById('expense-tbody');
  const empty = document.getElementById('expense-empty');
  const paginationWrap = document.getElementById('pagination-wrap');
  if (!tbody) return;

  const filtered = getFilteredExpenses();
  const perPage = 10;
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (historyPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'block';
    if (paginationWrap) paginationWrap.innerHTML = '';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = pageData.map((e, i) => `
    <tr style="animation-delay:${i * 30}ms">
      <td style="color:var(--text-muted);font-size:0.8rem">${start + i + 1}</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:10px;background:${e.categoryBg};display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${e.categoryIcon}</div>
          <div>
            <div style="font-weight:600;font-size:0.88rem">${e.name}</div>
            ${e.aiPredicted ? '<span style="font-size:0.65rem;background:rgba(79,70,229,0.1);color:var(--primary);padding:1px 6px;border-radius:99px;font-weight:600">🤖 AI</span>' : ''}
          </div>
        </div>
      </td>
      <td><span class="category-pill" style="background:${e.categoryBg};color:${e.categoryColor}">${e.categoryIcon} ${e.category}</span></td>
      <td style="font-size:0.85rem;white-space:nowrap">${formatDate(e.date)}</td>
      <td><span class="badge badge-secondary">${e.paymentMethod}</span></td>
      <td style="font-weight:700;color:var(--danger);white-space:nowrap">-${formatCurrency(e.amount)}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-icon-sm btn-outline" title="Edit" onclick="editExpense(${e.id})">✏️</button>
          <button class="btn btn-icon-sm" title="Delete" onclick="deleteExpense(${e.id})" style="background:rgba(239,68,68,0.08);color:var(--danger);border:1px solid rgba(239,68,68,0.2)">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');

  // Pagination
  if (paginationWrap) {
    let pages = '';
    pages += `<button class="page-btn" onclick="goHistoryPage(${historyPage-1})" ${historyPage<=1?'disabled':''}>‹</button>`;
    for (let p = Math.max(1,historyPage-2); p <= Math.min(totalPages,historyPage+2); p++) {
      pages += `<button class="page-btn ${p===historyPage?'active':''}" onclick="goHistoryPage(${p})">${p}</button>`;
    }
    pages += `<button class="page-btn" onclick="goHistoryPage(${historyPage+1})" ${historyPage>=totalPages?'disabled':''}>›</button>`;
    paginationWrap.innerHTML = `<div style="display:flex;align-items:center;gap:6px;justify-content:center;margin-top:20px">${pages}</div><div style="text-align:center;margin-top:8px;font-size:0.78rem;color:var(--text-muted)">Showing ${start+1}-${Math.min(start+perPage,filtered.length)} of ${filtered.length}</div>`;
  }
}

function goHistoryPage(page) {
  const filtered = getFilteredExpenses();
  const totalPages = Math.ceil(filtered.length / 10);
  if (page < 1 || page > totalPages) return;
  historyPage = page;
  renderHistoryTable();
  document.querySelector('.data-table')?.scrollIntoView({ behavior: 'smooth' });
}

function deleteExpense(id) {
  if (!confirm('Delete this expense?')) return;
  AppState.expenses = AppState.expenses.filter(e => e.id !== id);
  localStorage.setItem('expenses', JSON.stringify(AppState.expenses));
  renderHistoryTable();
  renderHistoryStats();
  showToast('Deleted', 'Expense removed successfully', 'success');
}

function editExpense(id) {
  showToast('Edit Mode', 'Edit functionality coming soon!', 'info');
}

function exportExpenses() {
  const filtered = getFilteredExpenses();
  const headers = ['ID','Name','Merchant','Amount','Category','Date','Payment Method','Notes'];
  const rows = filtered.map(e => [e.id, e.name, e.merchant, e.amount, e.category, e.date, e.paymentMethod, e.notes || '']);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'expenseai_export.csv'; a.click();
  URL.revokeObjectURL(url);
  showToast('Export Complete', `${filtered.length} expenses exported`, 'success');
}

// ============================================
// ANALYTICS PAGE
// ============================================
function renderAnalytics() {
  const thisMonth = getMonthExpenses(0);
  const lastMonth = getMonthExpenses(1);
  const thisTotal = getTotalAmount(thisMonth);
  const lastTotal = getTotalAmount(lastMonth);
  const avg = AppState.expenses.length ? getTotalAmount(AppState.expenses) / (new Set(AppState.expenses.map(e => e.date.substring(0, 7))).size || 1) : 0;
  const catTotals = getCategoryTotals(thisMonth);

  return `
  <div class="app-layout">
    ${getSidebarHTML('analytics')}
    <div class="main-content">
      ${getTopbarHTML('Analytics', 'Deep insights into your spending patterns')}
      <div class="page-content">

        <!-- Key Metrics -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px">
          ${[
            { label:'Highest Spending Day', value:formatCurrency(Math.max(...AppState.expenses.map(e=>e.amount))), icon:'📈', c:'#EF4444' },
            { label:'Lowest Expense', value:formatCurrency(Math.min(...AppState.expenses.map(e=>e.amount))), icon:'📉', c:'#10B981' },
            { label:'Average Expense', value:formatCurrency(Math.round(avg)), icon:'📊', c:'#4F46E5' },
            { label:'Top Category', value:catTotals[0]?.name || 'N/A', icon:'🏆', c:'#F59E0B' },
          ].map(m => `
            <div class="analytics-highlight card">
              <div style="font-size:1.5rem">${m.icon}</div>
              <div class="analytics-hl-label">${m.label}</div>
              <div class="analytics-hl-value" style="color:${m.c}">${m.value}</div>
            </div>
          `).join('')}
        </div>

        <!-- Charts Row 1 -->
        <div class="charts-grid">
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">🍩 Expense Distribution</div><div class="card-subtitle">By category this month</div></div>
            </div>
            <div class="chart-container-lg"><canvas id="analytics-pie"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">📊 Monthly Spending</div><div class="card-subtitle">Last 6 months</div></div>
            </div>
            <div class="chart-container-lg"><canvas id="analytics-monthly"></canvas></div>
          </div>
        </div>

        <!-- Charts Row 2 -->
        <div class="charts-grid">
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">📅 Weekly Spending</div><div class="card-subtitle">Current week daily breakdown</div></div>
            </div>
            <div class="chart-container"><canvas id="analytics-weekly"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header">
              <div><div class="card-title">🎯 Budget Comparison</div><div class="card-subtitle">Budget vs actual this month</div></div>
            </div>
            <div class="chart-container"><canvas id="analytics-budget"></canvas></div>
          </div>
        </div>

        <!-- Top Categories -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
          <div class="card">
            <div class="card-header"><div class="card-title">🏆 Top Spending Categories</div></div>
            ${catTotals.slice(0,6).map((cat,i) => `
              <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-light)">
                <div style="width:28px;height:28px;border-radius:8px;background:${cat.bg};display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0">${cat.icon}</div>
                <div style="flex:1">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                    <span style="font-size:0.85rem;font-weight:600">${cat.name}</span>
                    <span style="font-size:0.85rem;font-weight:700;color:${cat.color}">${formatCurrency(cat.amount)}</span>
                  </div>
                  <div class="progress-bar" style="height:5px"><div class="progress-fill" style="width:${((cat.amount/thisTotal)*100).toFixed(0)}%;background:${cat.color}"></div></div>
                </div>
                <div style="font-size:0.75rem;color:var(--text-muted);width:36px;text-align:right;font-weight:700">#${i+1}</div>
              </div>
            `).join('')}
          </div>

          <div class="card">
            <div class="card-header"><div class="card-title">💹 Income vs Expense</div></div>
            <div style="display:flex;flex-direction:column;gap:20px">
              ${[
                { label:'Monthly Income', val:AppState.user?.monthlyIncome||80000, color:'#10B981', icon:'💚' },
                { label:'Total Expenses', val:thisTotal, color:'#EF4444', icon:'❤️' },
                { label:'Net Savings', val:Math.max((AppState.user?.monthlyIncome||80000)-thisTotal,0), color:'#4F46E5', icon:'💙' },
              ].map(item => {
                const pct = Math.round((item.val/(AppState.user?.monthlyIncome||80000))*100);
                return `
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span style="font-size:0.85rem;font-weight:600">${item.icon} ${item.label}</span>
                    <span style="font-size:0.9rem;font-weight:800;color:${item.color}">${formatCurrency(item.val)}</span>
                  </div>
                  <div class="ive-bar" style="background:${item.color}30;height:10px;border-radius:5px">
                    <div style="height:100%;width:${Math.min(pct,100)}%;background:${item.color};border-radius:5px;transition:width 1.2s ease"></div>
                  </div>
                  <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px">${pct}% of income</div>
                </div>`;
              }).join('')}

              <!-- AI Insight -->
              <div class="ai-insight" style="margin-top:8px">
                <div class="ai-insight-icon">🧠</div>
                <div>
                  <div class="ai-insight-label">AI Analysis</div>
                  <div class="ai-insight-text">You're saving ${Math.round(((AppState.user?.monthlyIncome||80000 - thisTotal)/(AppState.user?.monthlyIncome||80000))*100)}% of your income this month. Financial experts recommend saving at least 20%. ${((AppState.user?.monthlyIncome||80000 - thisTotal)/(AppState.user?.monthlyIncome||80000))*100 >= 20 ? '✅ Great job!' : '⚠️ Try to increase your savings.'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Insights Section -->
        <div class="card">
          <div class="card-header"><div class="card-title">🤖 AI Financial Intelligence</div><span class="badge badge-primary">Powered by AI</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px">
            ${[
              { icon:'📈', text:`This month you spent ${formatCurrency(thisTotal)} total — ${thisTotal > lastTotal ? `${Math.round(((thisTotal-lastTotal)/lastTotal)*100)}% more` : `${Math.round(((lastTotal-thisTotal)/lastTotal)*100)}% less`} than last month (${formatCurrency(lastTotal)}).` },
              { icon:'🛍️', text:`Your biggest spending category is <strong>${catTotals[0]?.name || 'N/A'}</strong> at ${formatCurrency(catTotals[0]?.amount || 0)}, accounting for ${catTotals[0] ? Math.round((catTotals[0].amount/thisTotal)*100) : 0}% of total expenses.` },
              { icon:'💡', text:`You have ${thisMonth.filter(e => e.paymentMethod === 'Credit Card').length} credit card transactions this month. Consider UPI to avoid interest charges.` },
              { icon:'🎯', text:`At the current rate, you'll spend approximately ${formatCurrency(Math.round(thisTotal * 1.1))} by month end. Your budget allows ${formatCurrency(AppState.budgets.monthly)}.` },
            ].map(ai => `
              <div class="ai-insight">
                <div class="ai-insight-icon">${ai.icon}</div>
                <div>
                  <div class="ai-insight-label">AI Insight</div>
                  <div class="ai-insight-text">${ai.text}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function initAnalytics() {
  const thisMonth = getMonthExpenses(0);
  const catTotals = getCategoryTotals(thisMonth);
  const thisTotal = getTotalAmount(thisMonth);
  const isDark = AppState.theme === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // Pie
  const pieEl = document.getElementById('analytics-pie');
  if (pieEl && catTotals.length) {
    AppState.charts.aPie = new Chart(pieEl, {
      type: 'doughnut',
      data: {
        labels: catTotals.map(c => c.name),
        datasets: [{ data: catTotals.map(c => c.amount), backgroundColor: catTotals.map(c => c.color + 'CC'), borderColor: catTotals.map(c => c.color), borderWidth: 2, hoverOffset: 10 }],
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'right', labels: { padding: 12, usePointStyle: true, font: { size: 11, family: 'Poppins' } } }, tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${formatCurrency(ctx.raw)}` } } }, animation: { duration: 1200 } },
    });
  }

  // Monthly
  const monthlyEl = document.getElementById('analytics-monthly');
  if (monthlyEl) {
    const months = [], amounts = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }));
      amounts.push(getTotalAmount(getMonthExpenses(i)));
    }
    AppState.charts.aMonthly = new Chart(monthlyEl, {
      type: 'bar',
      data: { labels: months, datasets: [{ label: 'Spending', data: amounts, backgroundColor: amounts.map((_, i) => `hsl(${230 + i*15},70%,${55+i*3}%)`), borderRadius: 8, borderSkipped: false }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: gridColor }, ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' } } }, animation: { duration: 1200 } },
    });
  }

  // Weekly
  const weeklyEl = document.getElementById('analytics-weekly');
  if (weeklyEl) {
    const days = [], dayAmounts = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
      dayAmounts.push(getTotalAmount(AppState.expenses.filter(e => e.date === d.toISOString().split('T')[0])));
    }
    AppState.charts.aWeekly = new Chart(weeklyEl, {
      type: 'line',
      data: { labels: days, datasets: [{ label: 'Daily', data: dayAmounts, borderColor: '#06B6D4', backgroundColor: 'rgba(6,182,212,0.12)', fill: true, tension: 0.4, pointRadius: 5, pointHoverRadius: 8, pointBackgroundColor: '#06B6D4', pointBorderColor: 'white', pointBorderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: gridColor }, ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' } } }, animation: { duration: 1200 } },
    });
  }

  // Budget Comparison
  const budgetEl = document.getElementById('analytics-budget');
  if (budgetEl) {
    const cats = AppState.budgets.categories;
    const labels = cats.map(c => c.name);
    const budgetAmts = cats.map(c => c.limit);
    const actualAmts = cats.map(c => getTotalAmount(thisMonth.filter(e => e.category === c.name)));
    AppState.charts.aBudget = new Chart(budgetEl, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Budget', data: budgetAmts, backgroundColor: 'rgba(79,70,229,0.2)', borderColor: 'rgba(79,70,229,0.7)', borderWidth: 2, borderRadius: 6 },
          { label: 'Actual', data: actualAmts, backgroundColor: actualAmts.map((a, i) => a > budgetAmts[i] ? 'rgba(239,68,68,0.7)' : 'rgba(16,185,129,0.7)'), borderRadius: 6 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw)}` } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: gridColor }, ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' } } }, animation: { duration: 1200 } },
    });
  }
}

// ============================================
// BUDGET PAGE
// ============================================
function renderBudget() {
  const thisMonth = getMonthExpenses(0);
  const totalSpent = getTotalAmount(thisMonth);
  const monthlyBudget = AppState.budgets.monthly;
  const remaining = monthlyBudget - totalSpent;
  const usedPct = Math.min((totalSpent / monthlyBudget) * 100, 100);

  return `
  <div class="app-layout">
    ${getSidebarHTML('budget')}
    <div class="main-content">
      ${getTopbarHTML('Budget', 'Monitor and manage your spending limits')}
      <div class="page-content">

        <!-- Monthly Budget Overview -->
        <div class="card" style="background:linear-gradient(135deg,var(--primary),var(--primary-light),var(--secondary));margin-bottom:24px;color:white;overflow:hidden;position:relative">
          <div style="position:absolute;top:-30px;right:-30px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.07)"></div>
          <div style="position:relative;z-index:1">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px">
              <div>
                <div style="font-size:0.8rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Monthly Budget</div>
                <div style="font-size:2.4rem;font-weight:800">${formatCurrency(monthlyBudget)}</div>
              </div>
              <button class="btn" onclick="setBudget()" style="background:rgba(255,255,255,0.2);color:white;border:1.5px solid rgba(255,255,255,0.3)">✏️ Edit Budget</button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:20px">
              ${[
                { l:'Spent', v:formatCurrency(totalSpent), c:'rgba(255,255,255,0.7)' },
                { l:'Remaining', v:formatCurrency(Math.max(remaining,0)), c:'rgba(255,255,255,0.7)' },
                { l:'Progress', v:`${usedPct.toFixed(0)}%`, c:'rgba(255,255,255,0.7)' },
              ].map(s => `
                <div style="background:rgba(255,255,255,0.1);border-radius:var(--radius);padding:14px;text-align:center">
                  <div style="font-size:0.72rem;color:${s.c};margin-bottom:6px;text-transform:uppercase">${s.l}</div>
                  <div style="font-size:1.3rem;font-weight:700">${s.v}</div>
                </div>
              `).join('')}
            </div>
            <div style="background:rgba(255,255,255,0.15);border-radius:99px;height:10px">
              <div style="width:${usedPct}%;background:${usedPct >= 90 ? '#EF4444' : usedPct >= 70 ? '#F59E0B' : '#10B981'};height:100%;border-radius:99px;transition:width 1.5s ease;box-shadow:0 2px 8px rgba(0,0,0,0.2)"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:0.75rem;color:rgba(255,255,255,0.6)">
              <span>₹0</span><span>${usedPct >= 90 ? '⚠️ Almost exceeded!' : usedPct >= 70 ? '⚡ 70% used' : '✅ On track'}</span><span>${formatCurrency(monthlyBudget)}</span>
            </div>
          </div>
        </div>

        <!-- Category Budgets -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <h2 style="font-size:1.1rem;font-weight:700">Category Budgets</h2>
          <button class="btn btn-primary btn-sm" onclick="addCategoryBudget()">+ Add Category</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-bottom:24px">
          ${AppState.budgets.categories.map(budget => {
            const spent = getTotalAmount(thisMonth.filter(e => e.category === budget.name));
            const pct = Math.min((spent / budget.limit) * 100, 100);
            const color = pct >= 90 ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#10B981';
            const status = pct >= 90 ? '⚠️ Critical' : pct >= 70 ? '⚡ Warning' : '✅ Good';
            return `
              <div class="budget-card" style="border-top:3px solid ${color}">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                  <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:42px;height:42px;border-radius:var(--radius);background:${color}20;display:flex;align-items:center;justify-content:center;font-size:1.2rem">${budget.icon}</div>
                    <div>
                      <div style="font-weight:700">${budget.name}</div>
                      <div style="font-size:0.72rem;color:${color};font-weight:600">${status}</div>
                    </div>
                  </div>
                  <button class="btn btn-icon-sm btn-outline" onclick="editBudgetCategory('${budget.name}')" title="Edit">✏️</button>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                  <span style="font-size:0.82rem;color:var(--text-secondary)">Spent: <strong style="color:${color}">${formatCurrency(spent)}</strong></span>
                  <span style="font-size:0.82rem;color:var(--text-secondary)">Limit: <strong>${formatCurrency(budget.limit)}</strong></span>
                </div>
                <div class="progress-bar" style="height:10px;margin-bottom:8px">
                  <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.75rem">
                  <span style="color:var(--text-muted)">${pct.toFixed(0)}% used</span>
                  <span style="color:${color};font-weight:600">${formatCurrency(Math.max(budget.limit - spent, 0))} left</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Budget Alerts -->
        <div class="card">
          <div class="card-header"><div class="card-title">🔔 Budget Alerts</div></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${AppState.budgets.categories.filter(b => {
              const spent = getTotalAmount(thisMonth.filter(e => e.category === b.name));
              return spent / b.limit >= 0.7;
            }).map(b => {
              const spent = getTotalAmount(thisMonth.filter(e => e.category === b.name));
              const pct = (spent/b.limit*100).toFixed(0);
              const isExceeded = spent > b.limit;
              return `
                <div class="notif-card" style="${isExceeded ? 'border-left:3px solid var(--danger)' : 'border-left:3px solid var(--warning)'}">
                  <div class="notif-icon" style="background:${isExceeded ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)'}">${isExceeded ? '🔴' : '⚠️'}</div>
                  <div>
                    <div class="notif-title">${isExceeded ? 'Budget Exceeded' : 'Budget Alert'}: ${b.name}</div>
                    <div class="notif-body">You've used ${pct}% of your ${b.name} budget. Spent ${formatCurrency(spent)} of ${formatCurrency(b.limit)} limit.</div>
                  </div>
                </div>
              `;
            }).join('') || '<div style="text-align:center;padding:24px;color:var(--text-muted)">🎉 All budgets are on track! Great financial management.</div>'}
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

function setBudget() {
  const newBudget = prompt('Enter new monthly budget (₹):', AppState.budgets.monthly);
  if (newBudget && !isNaN(newBudget) && parseInt(newBudget) > 0) {
    AppState.budgets.monthly = parseInt(newBudget);
    localStorage.setItem('budgets', JSON.stringify(AppState.budgets));
    showToast('Budget Updated', `Monthly budget set to ${formatCurrency(parseInt(newBudget))}`, 'success');
    navigate('budget');
  }
}

function editBudgetCategory(name) {
  const budget = AppState.budgets.categories.find(b => b.name === name);
  if (!budget) return;
  const newLimit = prompt(`Enter new limit for ${name} (₹):`, budget.limit);
  if (newLimit && !isNaN(newLimit) && parseInt(newLimit) > 0) {
    budget.limit = parseInt(newLimit);
    localStorage.setItem('budgets', JSON.stringify(AppState.budgets));
    showToast('Budget Updated', `${name} budget set to ${formatCurrency(parseInt(newLimit))}`, 'success');
    navigate('budget');
  }
}

function addCategoryBudget() {
  showToast('Coming Soon', 'Custom category budgets coming in next update!', 'info');
}

function initBudget() {}

// ============================================
// NOTIFICATIONS PAGE
// ============================================
function renderNotifications() {
  return `
  <div class="app-layout">
    ${getSidebarHTML('notifications')}
    <div class="main-content">
      ${getTopbarHTML('Notifications', `${AppState.notifications.filter(n => n.unread).length} unread notifications`)}
      <div class="page-content" style="max-width:800px">

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div style="display:flex;gap:8px">
            <button class="filter-chip active" onclick="filterNotifs('all',this)">All (${AppState.notifications.length})</button>
            <button class="filter-chip" onclick="filterNotifs('unread',this)">Unread (${AppState.notifications.filter(n=>n.unread).length})</button>
          </div>
          <button class="btn btn-outline btn-sm" onclick="markAllRead()">Mark All Read</button>
        </div>

        <div id="notif-list">
          ${AppState.notifications.map(n => `
            <div class="notif-card ${n.unread ? 'unread' : ''}" id="notif-${n.id}">
              <div class="notif-icon" style="background:${n.bg};color:${n.iconColor}">${n.icon}</div>
              <div style="flex:1">
                <div class="notif-title" style="${n.unread ? 'color:var(--text-primary)' : 'color:var(--text-secondary)'}">${n.title}</div>
                <div class="notif-body">${n.body}</div>
                <div class="notif-time">🕐 ${n.time}</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;flex-shrink:0">
                ${n.unread ? `<div style="width:8px;height:8px;border-radius:50%;background:var(--primary)"></div>` : ''}
                <button class="btn btn-icon-sm btn-outline" onclick="dismissNotif(${n.id})" title="Dismiss">✕</button>
              </div>
            </div>
          `).join('')}
        </div>

        ${AppState.notifications.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">🔔</div>
            <h3>All Caught Up!</h3>
            <p>No new notifications. We'll alert you when something needs attention.</p>
          </div>
        ` : ''}

      </div>
    </div>
  </div>`;
}

function initNotifications() {}

function markAllRead() {
  AppState.notifications.forEach(n => n.unread = false);
  showToast('All read', 'All notifications marked as read', 'success');
  navigate('notifications');
}

function dismissNotif(id) {
  AppState.notifications = AppState.notifications.filter(n => n.id !== id);
  const el = document.getElementById(`notif-${id}`);
  if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(100%)'; el.style.transition = 'all 0.3s ease'; setTimeout(() => el.remove(), 300); }
  showToast('Dismissed', 'Notification removed', 'info');
}

function filterNotifs(type, btn) {
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = document.getElementById('notif-list');
  if (!list) return;
  Array.from(list.querySelectorAll('.notif-card')).forEach(card => {
    if (type === 'unread') {
      card.style.display = card.classList.contains('unread') ? '' : 'none';
    } else {
      card.style.display = '';
    }
  });
}

// ============================================
// PROFILE PAGE
// ============================================
function renderProfile() {
  const user = AppState.user;
  const thisMonth = getMonthExpenses(0);
  const totalThisMonth = getTotalAmount(thisMonth);
  const savingsRate = Math.round(((user.monthlyIncome - totalThisMonth) / user.monthlyIncome) * 100);

  return `
  <div class="app-layout">
    ${getSidebarHTML('profile')}
    <div class="main-content">
      ${getTopbarHTML('Profile', 'Manage your account settings')}
      <div class="page-content" style="max-width:900px;margin:0 auto">

        <div class="card" style="padding:0;overflow:hidden;margin-bottom:24px">
          <div class="profile-cover"></div>
          <div style="padding:0 28px 28px">
            <div class="profile-avatar-wrap">
              <div class="profile-avatar">${user.avatar || 'U'}</div>
            </div>
            <div style="text-align:center;margin-top:12px;margin-bottom:24px">
              <h2 style="font-size:1.4rem;font-weight:800">${user.name}</h2>
              <div style="color:var(--text-muted);font-size:0.9rem;margin-top:4px">${user.occupation}</div>
              <div style="color:var(--text-muted);font-size:0.85rem;margin-top:2px">${user.email}</div>
              <div style="display:flex;justify-content:center;gap:8px;margin-top:12px">
                <span class="badge badge-primary">Premium User</span>
                <span class="badge badge-success">AI Enabled</span>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
              ${[
                { l:'Total Expenses', v:AppState.expenses.length, s:'transactions' },
                { l:'Monthly Income', v:formatCurrency(user.monthlyIncome), s:'per month' },
                { l:'Savings Rate', v:`${savingsRate}%`, s:'this month' },
                { l:'Member Since', v:new Date(user.joinDate).toLocaleDateString('en-IN',{month:'short',year:'numeric'}), s:'ExpenseAI' },
              ].map(stat => `
                <div style="text-align:center;padding:16px;background:var(--bg-secondary);border-radius:var(--radius-md)">
                  <div style="font-size:1.2rem;font-weight:800;color:var(--primary)">${stat.v}</div>
                  <div style="font-size:0.78rem;font-weight:600;margin-top:2px">${stat.l}</div>
                  <div style="font-size:0.7rem;color:var(--text-muted)">${stat.s}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <!-- Edit Profile -->
          <div class="card">
            <div class="card-header"><div class="card-title">✏️ Edit Profile</div></div>
            <form onsubmit="saveProfile(event)" style="display:flex;flex-direction:column;gap:14px">
              <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="p-name" value="${user.name}" /></div>
              <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" id="p-email" value="${user.email}" /></div>
              <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="p-phone" value="${user.phone}" /></div>
              <div class="form-group"><label class="form-label">Occupation</label><input class="form-input" id="p-occ" value="${user.occupation}" /></div>
              <div class="form-group"><label class="form-label">Monthly Income (₹)</label><input class="form-input" type="number" id="p-income" value="${user.monthlyIncome}" /></div>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">💾 Save Changes</button>
            </form>
          </div>

          <!-- Settings -->
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card">
              <div class="card-header"><div class="card-title">🎨 Preferences</div></div>
              <div style="display:flex;flex-direction:column;gap:16px">
                ${[
                  { l:'Dark Mode', s:'Switch to dark theme', id:'darkModeToggle', val: AppState.theme === 'dark' },
                  { l:'Email Notifications', s:'Receive budget alerts via email', id:'emailNotif', val: true },
                  { l:'AI Auto-categorize', s:'Let AI predict categories automatically', id:'aiAuto', val: true },
                  { l:'Monthly Reports', s:'Receive monthly financial summaries', id:'monthlyRep', val: false },
                ].map(pref => `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-secondary);border-radius:var(--radius)">
                    <div>
                      <div style="font-size:0.88rem;font-weight:600">${pref.l}</div>
                      <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">${pref.s}</div>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" id="${pref.id}" ${pref.val ? 'checked' : ''} onchange="handlePrefChange('${pref.id}',this.checked)" />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="card">
              <div class="card-header"><div class="card-title">🔒 Security</div></div>
              <div style="display:flex;flex-direction:column;gap:10px">
                <button class="btn btn-outline" onclick="showToast('Email Sent','Password reset instructions sent!','info')" style="width:100%;justify-content:center">🔑 Change Password</button>
                <button class="btn btn-outline" onclick="showToast('2FA','2FA setup coming soon!','info')" style="width:100%;justify-content:center">🛡️ Enable 2FA</button>
                <button class="btn btn-danger" onclick="handleLogout()" style="width:100%;justify-content:center">🚪 Logout</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

function saveProfile(e) {
  e.preventDefault();
  AppState.user = {
    ...AppState.user,
    name: document.getElementById('p-name')?.value || AppState.user.name,
    email: document.getElementById('p-email')?.value || AppState.user.email,
    phone: document.getElementById('p-phone')?.value || AppState.user.phone,
    occupation: document.getElementById('p-occ')?.value || AppState.user.occupation,
    monthlyIncome: parseInt(document.getElementById('p-income')?.value) || AppState.user.monthlyIncome,
    avatar: (document.getElementById('p-name')?.value || AppState.user.name).split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase(),
  };
  localStorage.setItem('user', JSON.stringify(AppState.user));
  showToast('Profile Updated', 'Your profile has been saved!', 'success');
}

function handlePrefChange(id, val) {
  if (id === 'darkModeToggle') toggleTheme();
  else showToast('Preference Saved', `Setting updated successfully`, 'success');
}

function initProfile() {}

// ============================================
// SETTINGS PAGE
// ============================================
function renderSettings() {
  return `
  <div class="app-layout">
    ${getSidebarHTML('settings')}
    <div class="main-content">
      ${getTopbarHTML('Settings', 'Customize your ExpenseAI experience')}
      <div class="page-content" style="max-width:800px;margin:0 auto">

        ${[
          {
            title: '🎨 Appearance',
            items: [
              { l:'Theme', s:'Switch between light and dark mode', ctrl: `<div style="display:flex;gap:8px"><button class="btn btn-sm ${AppState.theme==='light'?'btn-primary':'btn-outline'}" onclick="applyTheme('light');navigate('settings')">☀️ Light</button><button class="btn btn-sm ${AppState.theme==='dark'?'btn-primary':'btn-outline'}" onclick="applyTheme('dark');navigate('settings')">🌙 Dark</button></div>` },
              { l:'Currency', s:'Set your preferred currency symbol', ctrl: `<select class="form-input form-select" style="width:auto;padding:8px 32px 8px 12px" onchange="showToast('Currency Updated','Currency set to '+this.value,'success')"><option>₹ INR</option><option>$ USD</option><option>€ EUR</option><option>£ GBP</option></select>` },
            ],
          },
          {
            title: '🤖 AI Settings',
            items: [
              { l:'Auto AI Categorization', s:'Automatically predict categories when entering expenses', ctrl: `<label class="toggle-switch"><input type="checkbox" checked onchange="showToast('Setting Saved','AI categorization updated','success')"/><span class="toggle-slider"></span></label>` },
              { l:'AI Confidence Threshold', s:'Minimum confidence for auto-acceptance (currently 85%)', ctrl: `<input type="range" min="50" max="99" value="85" style="accent-color:var(--primary)" oninput="showToast('Threshold Updated','Set to '+this.value+'%','info')"/>` },
              { l:'AI Insights Frequency', s:'How often to generate financial insights', ctrl: `<select class="form-input form-select" style="width:auto;padding:8px 32px 8px 12px"><option>Daily</option><option>Weekly</option><option>Monthly</option></select>` },
            ],
          },
          {
            title: '🔔 Notifications',
            items: [
              { l:'Budget Alerts', s:'Get notified when approaching budget limits', ctrl: `<label class="toggle-switch"><input type="checkbox" checked onchange="showToast('Setting Saved','Budget alerts updated','success')"/><span class="toggle-slider"></span></label>` },
              { l:'Large Expense Alerts', s:'Alert for expenses above ₹5,000', ctrl: `<label class="toggle-switch"><input type="checkbox" checked onchange="showToast('Setting Saved','Alert threshold updated','success')"/><span class="toggle-slider"></span></label>` },
              { l:'Monthly Reports', s:'Receive detailed monthly financial summaries', ctrl: `<label class="toggle-switch"><input type="checkbox" onchange="showToast('Setting Saved','Monthly reports updated','success')"/><span class="toggle-slider"></span></label>` },
            ],
          },
          {
            title: '🗂️ Data Management',
            items: [
              { l:'Export All Data', s:'Download all your expense data as CSV', ctrl: `<button class="btn btn-secondary btn-sm" onclick="exportExpenses()">📊 Export CSV</button>` },
              { l:'Clear All Data', s:'Permanently delete all expense records', ctrl: `<button class="btn btn-danger btn-sm" onclick="clearAllData()">🗑️ Clear Data</button>` },
            ],
          },
        ].map(section => `
          <div class="card" style="margin-bottom:16px">
            <div class="card-title" style="margin-bottom:20px">${section.title}</div>
            <div style="display:flex;flex-direction:column;gap:4px">
              ${section.items.map(item => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:var(--bg-secondary);border-radius:var(--radius);transition:var(--transition)" onmouseenter="this.style.background='rgba(79,70,229,0.04)'" onmouseleave="this.style.background='var(--bg-secondary)'">
                  <div>
                    <div style="font-size:0.88rem;font-weight:600">${item.l}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">${item.s}</div>
                  </div>
                  <div>${item.ctrl}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="card" style="text-align:center;padding:24px;background:linear-gradient(135deg,rgba(79,70,229,0.05),rgba(6,182,212,0.03));border:1px solid rgba(79,70,229,0.12)">
          <div style="font-size:1rem;font-weight:700;margin-bottom:4px">ExpenseAI v2.4.1</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Built with ❤️ in Bangalore, India • © 2025 ExpenseAI Technologies</div>
        </div>
      </div>
    </div>
  </div>`;
}

function clearAllData() {
  if (!confirm('This will permanently delete ALL expense data. This cannot be undone. Are you sure?')) return;
  AppState.expenses = [];
  localStorage.removeItem('expenses');
  showToast('Data Cleared', 'All expense data has been removed', 'success');
  navigate('dashboard');
}

function initSettings() {}

// ============================================
// INITIAL LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Show loading screen briefly
  const loadingEl = document.createElement('div');
  loadingEl.className = 'loading-screen';
  loadingEl.innerHTML = `
    <div class="loading-logo">
      <div class="logo-icon" style="width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      </div>
      <div class="loading-text">ExpenseAI</div>
    </div>
    <div class="loading-spinner"></div>
    <div class="loading-sub">Loading your financial intelligence...</div>
  `;
  document.body.appendChild(loadingEl);

  setTimeout(() => {
    loadingEl.style.opacity = '0';
    setTimeout(() => {
      loadingEl.remove();
      navigate('landing');
    }, 500);
  }, 1800);
});
