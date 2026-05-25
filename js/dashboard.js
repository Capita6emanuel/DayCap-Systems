// Lógica do Dashboard

const DashboardManager = {
  currentPage: 'dashboard',
  
  init: function() {
    if (!Auth.isAuthenticated()) {
      window.location.href = 'login.html';
      return;
    }
    
    this.setupEventListeners();
    this.loadPage('dashboard');
    this.updateStats();
    this.loadActivities();
  },
  
  setupEventListeners: function() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.loadPage(page);
      });
    });
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }
  },
  
  loadPage: function(pageName) {
    this.currentPage = pageName;
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.page === pageName) {
        item.classList.add('active');
      }
    });
    
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    const page = document.getElementById(`${pageName}-page`);
    if (page) {
      page.classList.add('active');
    }
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
      const titles = {
        'dashboard': 'Dashboard',
        'alunos': 'Gestao de Alunos',
        'financeiro': 'Gestao Financeira'
      };
      pageTitle.textContent = titles[pageName] || pageName;
    }
  },
  
  updateStats: function() {
    const stats = AlunosModule.getStats();
    
    const totalStudents = document.getElementById('totalStudents');
    if (totalStudents) totalStudents.textContent = stats.total;
  },
  
  loadActivities: function() {
    const activities = Storage.get(CONFIG.storageKeys.activities) || [];
    const list = document.getElementById('activitiesList');
    
    if (!list) return;
    
    if (activities.length === 0) {
      list.innerHTML = '<p class="empty-state">Nenhuma atividade registrada</p>';
      return;
    }
  },
  
  logout: function() {
    if (confirm('Tem certeza que deseja sair?')) {
      Auth.logout();
      window.location.href = 'login.html';
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DashboardManager.init());
} else {
  DashboardManager.init();
}
