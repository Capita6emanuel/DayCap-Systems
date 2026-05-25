// Validações de Formulários

const Validators = {
  // Validar Email
  isValidEmail: function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Validar Nome
  isValidName: function(name) {
    return name && name.trim().length >= CONFIG.validation.minNameLength;
  },
  
  // Validar Senha
  isValidPassword: function(password) {
    return password && password.length >= CONFIG.validation.minPasswordLength;
  },
  
  // Validar Número Positivo
  isValidAmount: function(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  },
  
  // Validar Curso
  isValidCourse: function(course) {
    return course && course.trim().length > 0 && course.length <= CONFIG.validation.maxCourseLength;
  },
  
  // Validar Classe
  isValidClass: function(classe) {
    return classe && classe.trim().length > 0;
  },
  
  // Validar Data
  isValidDate: function(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  },
  
  // Validar Aluno
  validateStudent: function(student) {
    const errors = [];
    
    if (!this.isValidName(student.nome)) {
      errors.push('Nome inválido (mínimo 3 caracteres)');
    }
    if (!this.isValidCourse(student.curso)) {
      errors.push('Curso inválido');
    }
    if (!this.isValidClass(student.classe)) {
      errors.push('Classe inválida');
    }
    if (!this.isValidAmount(student.mensalidade)) {
      errors.push('Mensalidade inválida (deve ser positiva)');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },
  
  // Validar Pagamento
  validatePayment: function(payment) {
    const errors = [];
    
    if (!this.isValidAmount(payment.valor)) {
      errors.push('Valor inválido');
    }
    if (!payment.alunoId || payment.alunoId.trim() === '') {
      errors.push('Aluno não selecionado');
    }
    if (!payment.metodoPagamento || payment.metodoPagamento.trim() === '') {
      errors.push('Método de pagamento não selecionado');
    }
    if (!this.isValidAmount(payment.quantidadeMeses) || payment.quantidadeMeses < 1) {
      errors.push('Quantidade de meses inválida');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },
  
  // Validar Login
  validateLogin: function(email, password) {
    const errors = [];
    
    if (!this.isValidEmail(email)) {
      errors.push('Email inválido');
    }
    if (!this.isValidPassword(password)) {
      errors.push('Senha inválida');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
};
