# DayCap-Systems

> Sistema web completo para gestão de alunos e pagamentos educacionais

## 📋 Visão Geral

DayCap-Systems é uma plataforma moderna e profissional para gestão administrativa de instituições educacionais, com foco em:

- 👥 Cadastro e gestão de alunos
- 💳 Controle de pagamentos e dívidas
- 📊 Dashboard financeiro completo
- 📱 Geração e leitura de QR Code
- 📈 Relatórios e estatísticas

## 🎯 Fases de Desenvolvimento

### 🔴 FASE 1 - MVP ESSENCIAL
- [x] Estrutura base do projeto
- [ ] Autenticação e login
- [ ] Cadastro/edição/exclusão de alunos
- [ ] Registro de pagamentos
- [ ] Dashboard principal com estatísticas básicas
- [ ] Listagem de alunos com pesquisa

### 🟡 FASE 2 - CORE
- [ ] Geração de QR Code individual
- [ ] Dashboard financeiro completo
- [ ] Histórico de pagamentos
- [ ] Relatórios básicos
- [ ] Controle automático de dívidas

### 🟢 FASE 3 - AVANÇADO
- [ ] Scanner de QR Code
- [ ] Gráficos Chart.js
- [ ] Exportação PDF
- [ ] Notificações toast
- [ ] Modo claro/escuro

## 🛠 Stack Tecnológico

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+** - Lógica da aplicação
- **Chart.js v4** - Gráficos interativos
- **QRCode.js** - Geração de QR Code
- **Html5Qrcode** - Leitura de QR Code
- **Font Awesome v6** - Ícones
- **LocalStorage** - Persistência de dados

## 📁 Estrutura do Projeto

```
DayCap-Systems/
├── index.html
├── login.html
├── dashboard.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── style.css
│   ├── components.css
│   ├── dashboard.css
│   ├── login.css
│   └── animations.css
├── js/
│   ├── config.js
│   ├── auth.js
│   ├── storage.js
│   ├── models.js
│   ├── validators.js
│   ├── alunos.js
│   ├── financeiro.js
│   ├── qr-generator.js
│   ├── qr-scanner.js
│   ├── charts.js
│   ├── reports.js
│   ├── notifications.js
│   ├── dashboard.js
│   └── app.js
├── pages/
│   ├── alunos.html
│   ├── financeiro.html
│   ├── relatorios.html
│   ├── scanner.html
│   ├── configuracoes.html
│   └── perfil.html
└── assets/
    ├── icons/
    ├── images/
    └── logos/
```

## 🚀 Quick Start

1. Clone o repositório
2. Abra `index.html` em um navegador moderno
3. Use credenciais padrão para login
4. Comece a gerenciar alunos e pagamentos

## 🎨 Design System

### Paleta de Cores (Dark Mode Premium)

```css
/* Primárias */
--primary: #6366f1;           /* Azul vibrante */
--primary-dark: #4f46e5;
--primary-light: #818cf8;

/* Neutras */
--background: #0f0f23;        /* Azul escuro profundo */
--surface: #1a1a2e;           /* Superfícies elevadas */
--surface-light: #252540;

/* Acentos */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

## 📊 Modelo de Dados

Veja a documentação completa no arquivo de especificação.

## ✅ Validações

- ✅ Nomes únicos de alunos
- ✅ Dados financeiros validados
- ✅ QR Codes únicos por aluno
- ✅ Histórico de pagamentos auditado

## 📝 Contribuindo

Siga o padrão de commits:
- `feat:` Novas funcionalidades
- `fix:` Correções de bugs
- `docs:` Documentação
- `style:` Estilo/formatação

## 📄 Licença

MIT License - Veja LICENSE para detalhes
