// Configurações globais da aplicação

const CONFIG = {
  // Informações da Escola
  schoolName: 'Escola Modelo Angola',
  schoolYear: '2025/2026',
  currency: 'AOA',
  defaultFee: 25000,
  
  // URLs e Paths
  baseUrl: window.location.origin,
  apiBase: '/api',
  
  // LocalStorage Keys
  storageKeys: {
    admin: 'daycap_admin',
    students: 'daycap_students',
    payments: 'daycap_payments',
    settings: 'daycap_settings',
    activities: 'daycap_activities',
    sessionToken: 'daycap_session'
  },
  
  // Validação
  validation: {
    minPasswordLength: 6,
    minNameLength: 3,
    maxNameLength: 50,
    maxCourseLength: 50
  },
  
  // Paginação
  pagination: {
    itemsPerPage: 20,
    maxPages: 10
  },
  
  // Timeouts
  timeouts: {
    notification: 3000,
    debounce: 300,
    animationDuration: 300
  },
  
  // Credenciais Padrão
  defaultCredentials: {
    email: 'admin@escola.ao',
    password: '123456',
    name: 'Administrador'
  }
};

// Log para debug
console.log('DayCap-Systems Config Loaded', CONFIG);
