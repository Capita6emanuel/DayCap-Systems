// CRUD de Alunos

const AlunosModule = {
  // Listar todos os alunos
  list: function() {
    return Storage.get(CONFIG.storageKeys.students) || [];
  },
  
  // Obter aluno por ID
  getById: function(id) {
    const students = this.list();
    return students.find(s => s.id === id) || null;
  },
  
  // Buscar alunos (por nome, curso, classe)
  search: function(query) {
    const students = this.list();
    const queryLower = query.toLowerCase();
    
    return students.filter(s => 
      s.nome.toLowerCase().includes(queryLower) ||
      s.curso.toLowerCase().includes(queryLower) ||
      s.classe.toLowerCase().includes(queryLower)
    );
  },
  
  // Criar novo aluno
  create: function(data) {
    // Validar dados
    const validation = Validators.validateStudent(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors[0],
        errors: validation.errors
      };
    }
    
    // Verificar duplicatas
    const students = this.list();
    const existe = students.some(s => 
      s.nome.toLowerCase() === data.nome.toLowerCase() && 
      s.classe === data.classe
    );
    
    if (existe) {
      return {
        success: false,
        message: 'Aluno com esse nome já existe nesta classe'
      };
    }
    
    // Criar novo aluno
    const student = new Models.Student(data);
    students.push(student);
    Storage.set(CONFIG.storageKeys.students, students);
    
    // Registrar atividade
    Auth.logActivity(
      'Novo aluno cadastrado',
      `Aluno ${student.nome} foi cadastrado na classe ${student.classe}`,
      'success'
    );
    
    return {
      success: true,
      message: 'Aluno cadastrado com sucesso',
      student: student
    };
  },
  
  // Atualizar aluno
  update: function(id, data) {
    const students = this.list();
    const index = students.findIndex(s => s.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Aluno não encontrado'
      };
    }
    
    // Validar dados
    const validation = Validators.validateStudent(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors[0]
      };
    }
    
    // Atualizar
    students[index].atualizarDados(data);
    Storage.set(CONFIG.storageKeys.students, students);
    
    Auth.logActivity(
      'Aluno atualizado',
      `Dados do aluno ${students[index].nome} foram atualizados`,
      'info'
    );
    
    return {
      success: true,
      message: 'Aluno atualizado com sucesso',
      student: students[index]
    };
  },
  
  // Deletar aluno
  delete: function(id) {
    const students = this.list();
    const index = students.findIndex(s => s.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Aluno não encontrado'
      };
    }
    
    const student = students[index];
    students.splice(index, 1);
    Storage.set(CONFIG.storageKeys.students, students);
    
    Auth.logActivity(
      'Aluno deletado',
      `Aluno ${student.nome} foi removido do sistema`,
      'warning'
    );
    
    return {
      success: true,
      message: 'Aluno removido com sucesso'
    };
  },
  
  // Obter estatísticas
  getStats: function() {
    const students = this.list();
    const payments = Storage.get(CONFIG.storageKeys.payments) || [];
    
    const totalArrecadado = payments.reduce((sum, p) => sum + p.valor, 0);
    const totalDivida = students.reduce((sum, s) => sum + s.divida, 0);
    const emDia = students.filter(s => s.divida === 0).length;
    
    return {
      total: students.length,
      ativo: students.filter(s => s.status === 'ativo').length,
      inativo: students.filter(s => s.status === 'inativo').length,
      totalArrecadado: totalArrecadado,
      totalDivida: totalDivida,
      emDia: emDia,
      comDivida: students.length - emDia
    };
  }
};
