// Sistema de Autenticação

const Auth = {
  currentUser: null,
  sessionToken: null,
  
  // Inicializar autenticação
  init: function() {
    this.sessionToken = Storage.get(CONFIG.storageKeys.sessionToken);
    if (this.sessionToken) {
      this.currentUser = this.validateSession();
    }
  },
  
  // Login do usuário
  login: async function(email, password) {
    // Validar entrada
    const validation = Validators.validateLogin(email, password);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors[0]
      };
    }
    
    // Buscar admin
    const admin = Storage.get(CONFIG.storageKeys.admin);
    if (!admin) {
      return {
        success: false,
        message: 'Nenhum administrador configurado'
      };
    }
    
    // Verificar credenciais
    if (admin.email !== email || !Storage.verifyPassword(password, admin.password)) {
      return {
        success: false,
        message: 'Email ou senha inválidos'
      };
    }
    
    // Criar sessão
    this.currentUser = admin;
    this.sessionToken = this.generateToken();
    Storage.set(CONFIG.storageKeys.sessionToken, this.sessionToken);
    
    // Registrar atividade
    this.logActivity('Login realizado', `Usuário ${admin.name} entrou no sistema`);
    
    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: admin
    };
  },
  
  // Logout
  logout: function() {
    if (this.currentUser) {
      this.logActivity('Logout', `Usuário ${this.currentUser.name} saiu do sistema`);
    }
    this.currentUser = null;
    this.sessionToken = null;
    Storage.remove(CONFIG.storageKeys.sessionToken);
    return true;
  },
  
  // Verificar se está autenticado
  isAuthenticated: function() {
    return this.currentUser !== null && this.sessionToken !== null;
  },
  
  // Gerar token de sessão
  generateToken: function() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2);
    return btoa(`${timestamp}-${random}`);
  },
  
  // Validar sessão
  validateSession: function() {
    try {
      const admin = Storage.get(CONFIG.storageKeys.admin);
      if (admin && this.sessionToken) {
        return admin;
      }
      return null;
    } catch (error) {
      console.error('Erro ao validar sessão:', error);
      return null;
    }
  },
  
  // Registrar atividade
  logActivity: function(titulo, descricao, tipo = 'info') {
    const activity = new Models.Activity({
      tipo: tipo,
      titulo: titulo,
      descricao: descricao,
      usuario: this.currentUser?.name || 'sistema'
    });
    
    let activities = Storage.get(CONFIG.storageKeys.activities) || [];
    activities.unshift(activity); // Adicionar no início
    
    // Manter apenas últimas 100 atividades
    if (activities.length > 100) {
      activities = activities.slice(0, 100);
    }
    
    Storage.set(CONFIG.storageKeys.activities, activities);
  },
  
  // Mudar senha
  changePassword: function(senhaAtual, senhaNova) {
    if (!this.currentUser) {
      return { success: false, message: 'Usuário não autenticado' };
    }
    
    if (!Storage.verifyPassword(senhaAtual, this.currentUser.password)) {
      return { success: false, message: 'Senha atual incorreta' };
    }
    
    if (!Validators.isValidPassword(senhaNova)) {
      return { success: false, message: 'Nova senha inválida' };
    }
    
    this.currentUser.password = Storage.hashPassword(senhaNova);
    Storage.set(CONFIG.storageKeys.admin, this.currentUser);
    this.logActivity('Senha alterada', 'Usuário alterou sua senha', 'info');
    
    return { success: true, message: 'Senha alterada com sucesso' };
  }
};

// Inicializar autenticação ao carregar
Auth.init();
