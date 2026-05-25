// Sistema de Armazenamento - LocalStorage Manager

const Storage = {
  // Obter dados
  get: function(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao obter dados do storage:', error);
      return null;
    }
  },
  
  // Salvar dados
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados no storage:', error);
      return false;
    }
  },
  
  // Remover dados
  remove: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover dados do storage:', error);
      return false;
    }
  },
  
  // Limpar tudo
  clear: function() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
      return false;
    }
  },
  
  // Verificar se existe
  exists: function(key) {
    return localStorage.getItem(key) !== null;
  },
  
  // Inicializar admin padrão se não existir
  initializeDefaults: function() {
    if (!this.exists(CONFIG.storageKeys.admin)) {
      const admin = {
        id: 'ADM-001',
        email: CONFIG.defaultCredentials.email,
        password: this.hashPassword(CONFIG.defaultCredentials.password),
        name: CONFIG.defaultCredentials.name,
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      this.set(CONFIG.storageKeys.admin, admin);
    }
    
    if (!this.exists(CONFIG.storageKeys.settings)) {
      const settings = {
        nomeEscola: CONFIG.schoolName,
        anoLetivo: CONFIG.schoolYear,
        valorMensalidadePadrao: CONFIG.defaultFee,
        moeda: CONFIG.currency,
        tema: 'dark',
        idioma: 'pt-AO'
      };
      this.set(CONFIG.storageKeys.settings, settings);
    }
  },
  
  // Hash simples para senha (em produção usar bcrypt no backend)
  hashPassword: function(password) {
    return btoa(password); // Base64 encoding simples
  },
  
  // Verificar senha
  verifyPassword: function(password, hash) {
    return btoa(password) === hash;
  }
};

// Inicializar defaults
Storage.initializeDefaults();
