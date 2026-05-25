// Inicializacao da Aplicacao

const App = {
  init: function() {
    console.log('Inicializando DayCap-Systems...');
    
    Storage.initializeDefaults();
    this.checkAuth();
    
    console.log('DayCap-Systems inicializado com sucesso');
  },
  
  checkAuth: function() {
    const currentPage = window.location.pathname;
    const isLoginPage = currentPage.includes('login.html');
    const isIndexPage = currentPage.endsWith('/') || currentPage.endsWith('index.html');
    const isDashboardPage = currentPage.includes('dashboard.html');
    
    if (isIndexPage) {
      if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'login.html';
      }
      return;
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
