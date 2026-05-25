// CRUD de Pagamentos

const FinanceiroModule = {
  // Listar todos os pagamentos
  list: function() {
    return Storage.get(CONFIG.storageKeys.payments) || [];
  },
  
  // Obter pagamento por ID
  getById: function(id) {
    const payments = this.list();
    return payments.find(p => p.id === id) || null;
  },
  
  // Registrar novo pagamento
  register: function(data) {
    // Validar dados
    const validation = Validators.validatePayment(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors[0],
        errors: validation.errors
      };
    }
    
    // Obter aluno
    const student = AlunosModule.getById(data.alunoId);
    if (!student) {
      return {
        success: false,
        message: 'Aluno não encontrado'
      };
    }
    
    // Verificar se pode pagar mais meses que a diferença de data
    const mesesDisponiveis = this.calcularMesesDisponiveis(student);
    if (data.quantidadeMeses > mesesDisponiveis) {
      return {
        success: false,
        message: `Máximo de ${mesesDisponiveis} meses disponíveis para pagamento`
      };
    }
    
    // Gerar meses pagos
    const mesesPagos = this.gerarMesesPagos(student, data.quantidadeMeses);
    
    // Criar pagamento
    const payment = new Models.Payment({
      alunoId: student.id,
      alunoNome: student.nome,
      valor: data.valor,
      quantidadeMeses: data.quantidadeMeses,
      mesesPagos: mesesPagos,
      metodoPagamento: data.metodoPagamento,
      responsavel: Auth.currentUser?.name || 'admin',
      observacoes: data.observacoes || ''
    });
    
    // Salvar pagamento
    const payments = this.list();
    payments.unshift(payment);
    Storage.set(CONFIG.storageKeys.payments, payments);
    
    // Atualizar aluno
    student.mesesPagos = [...student.mesesPagos, ...mesesPagos];
    student.divida = student.calcularDivida();
    student.historicoPagamentos.push(payment.id);
    student.dataAtualizacao = new Date().toISOString();
    
    const students = AlunosModule.list();
    const index = students.findIndex(s => s.id === student.id);
    students[index] = student;
    Storage.set(CONFIG.storageKeys.students, students);
    
    // Registrar atividade
    Auth.logActivity(
      'Pagamento registrado',
      `${student.nome} pagou ${data.quantidadeMeses} mês(es) no valor de ${data.valor.toLocaleString()} AOA`,
      'success'
    );
    
    return {
      success: true,
      message: 'Pagamento registrado com sucesso',
      payment: payment,
      student: student
    };
  },
  
  // Obter pagamentos por aluno
  getByStudent: function(alunoId) {
    const payments = this.list();
    return payments.filter(p => p.alunoId === alunoId);
  },
  
  // Calcular meses disponíveis para pagamento
  calcularMesesDisponiveis: function(student) {
    const hoje = new Date();
    const dataMatricula = new Date(student.dataMatricula);
    
    let meses = 0;
    let mesAtual = new Date(dataMatricula);
    
    while (mesAtual <= hoje) {
      meses++;
      mesAtual.setMonth(mesAtual.getMonth() + 1);
    }
    
    return Math.max(0, meses - student.mesesPagos.length);
  },
  
  // Gerar array de meses pagos
  gerarMesesPagos: function(student, quantidade) {
    const meses = [];
    const dataMatricula = new Date(student.dataMatricula);
    let mesAtual = new Date(dataMatricula);
    const mesesJaInclusos = student.mesesPagos.length;
    
    // Pular meses já pagos
    for (let i = 0; i < mesesJaInclusos; i++) {
      mesAtual.setMonth(mesAtual.getMonth() + 1);
    }
    
    // Adicionar novos meses
    for (let i = 0; i < quantidade; i++) {
      const ano = mesAtual.getFullYear();
      const mes = String(mesAtual.getMonth() + 1).padStart(2, '0');
      meses.push(`${ano}-${mes}`);
      mesAtual.setMonth(mesAtual.getMonth() + 1);
    }
    
    return meses;
  },
  
  // Cancelar pagamento
  cancel: function(paymentId) {
    const payments = this.list();
    const index = payments.findIndex(p => p.id === paymentId);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Pagamento não encontrado'
      };
    }
    
    const payment = payments[index];
    payment.status = 'cancelado';
    Storage.set(CONFIG.storageKeys.payments, payments);
    
    // Atualizar aluno
    const student = AlunosModule.getById(payment.alunoId);
    if (student) {
      student.mesesPagos = student.mesesPagos.filter(m => !payment.mesesPagos.includes(m));
      student.divida = student.calcularDivida();
      AlunosModule.update(student.id, student);
    }
    
    Auth.logActivity(
      'Pagamento cancelado',
      `Pagamento #${payment.numeroOperacao} foi cancelado`,
      'warning'
    );
    
    return {
      success: true,
      message: 'Pagamento cancelado com sucesso'
    };
  },
  
  // Obter estatísticas financeiras
  getStats: function() {
    const payments = this.list();
    const confirmedPayments = payments.filter(p => p.status === 'confirmado');
    
    const totalArrecadado = confirmedPayments.reduce((sum, p) => sum + p.valor, 0);
    const totalPagamentos = confirmedPayments.length;
    
    // Arrecadação este mês
    const hoje = new Date();
    const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
    const estesMes = confirmedPayments.filter(p => {
      const dataPag = new Date(p.dataPagamento);
      const mesPag = `${dataPag.getFullYear()}-${String(dataPag.getMonth() + 1).padStart(2, '0')}`;
      return mesPag === mesAtual;
    });
    const arrecadacaoMes = estesMes.reduce((sum, p) => sum + p.valor, 0);
    
    return {
      totalArrecadado: totalArrecadado,
      totalPagamentos: totalPagamentos,
      arrecadacaoMes: arrecadacaoMes,
      pagamentosPendentes: payments.filter(p => p.status === 'pendente').length,
      pagamentosCancelados: payments.filter(p => p.status === 'cancelado').length
    };
  }
};
