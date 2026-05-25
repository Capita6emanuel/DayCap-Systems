// Modelos de Dados

const Models = {
  // Modelo de Aluno
  Student: class {
    constructor(data = {}) {
      this.id = data.id || this.generateId('ALU');
      this.nome = data.nome || '';
      this.curso = data.curso || '';
      this.classe = data.classe || '';
      this.mensalidade = data.mensalidade || CONFIG.defaultFee;
      this.dataMatricula = data.dataMatricula || new Date().toISOString().split('T')[0];
      this.status = data.status || 'ativo'; // ativo, inativo, transferido
      this.mesesPagos = data.mesesPagos || [];
      this.divida = data.divida || this.calcularDivida();
      this.qrCode = data.qrCode || '';
      this.historicoPagamentos = data.historicoPagamentos || [];
      this.dataCriacao = data.dataCriacao || new Date().toISOString();
      this.dataAtualizacao = data.dataAtualizacao || new Date().toISOString();
    }
    
    generateId(prefix) {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substr(2, 9).toUpperCase();
      return `${prefix}-${timestamp}${random}`.slice(0, 20);
    }
    
    calcularDivida() {
      const hoje = new Date();
      const dataMatricula = new Date(this.dataMatricula);
      
      let mesesDecorridos = 0;
      let mesAtual = new Date(dataMatricula);
      
      while (mesAtual <= hoje) {
        mesesDecorridos++;
        mesAtual.setMonth(mesAtual.getMonth() + 1);
      }
      
      const mesesDevidos = mesesDecorridos - this.mesesPagos.length;
      return Math.max(0, mesesDevidos * this.mensalidade);
    }
    
    atualizarDados(novosDados) {
      Object.assign(this, novosDados);
      this.dataAtualizacao = new Date().toISOString();
    }
  },
  
  // Modelo de Pagamento
  Payment: class {
    constructor(data = {}) {
      this.id = data.id || this.generateId('PAG');
      this.alunoId = data.alunoId || '';
      this.alunoNome = data.alunoNome || '';
      this.valor = data.valor || 0;
      this.quantidadeMeses = data.quantidadeMeses || 1;
      this.mesesPagos = data.mesesPagos || [];
      this.dataPagamento = data.dataPagamento || new Date().toISOString();
      this.numeroOperacao = data.numeroOperacao || this.generateOperationNumber();
      this.metodoPagamento = data.metodoPagamento || 'transferência'; // transferência, dinheiro, multicaixa
      this.responsavel = data.responsavel || 'admin';
      this.observacoes = data.observacoes || '';
      this.status = data.status || 'confirmado'; // pendente, confirmado, cancelado
    }
    
    generateId(prefix) {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substr(2, 5).toUpperCase();
      return `${prefix}-${timestamp}${random}`.slice(0, 15);
    }
    
    generateOperationNumber() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      return `REF-${year}${month}${day}${random}`;
    }
  },
  
  // Modelo de Atividade
  Activity: class {
    constructor(data = {}) {
      this.id = data.id || this.generateId('ATI');
      this.tipo = data.tipo || 'info'; // info, success, warning, error
      this.titulo = data.titulo || '';
      this.descricao = data.descricao || '';
      this.usuario = data.usuario || 'admin';
      this.dataCriacao = data.dataCriacao || new Date().toISOString();
      this.icone = data.icone || 'fas fa-info-circle';
    }
    
    generateId(prefix) {
      const timestamp = Date.now().toString(36).toUpperCase();
      return `${prefix}-${timestamp}`.slice(0, 15);
    }
  }
};
