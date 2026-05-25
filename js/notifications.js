// Sistema de Notificações Toast

const Notification = {
  container: null,
  
  // Inicializar
  init: function() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'notification-container';
      this.container.style.cssText = `
        position: fixed;
        top: var(--spacing-lg);
        right: var(--spacing-lg);
        z-index: var(--z-notification);
        max-width: 400px;
      `;
      document.body.appendChild(this.container);
    }
  },
  
  // Mostrar notificação
  show: function(message, type = 'info', duration = CONFIG.timeouts.notification) {
    this.init();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate-slideIn`;
    notification.style.cssText = `
      background: var(--surface);
      border-left: 4px solid ${this.getColorByType(type)};
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      box-shadow: var(--shadow-lg);
      animation: slideLeft var(--transition-base);
    `;
    
    const icon = document.createElement('i');
    icon.className = `fas ${this.getIconByType(type)}`;
    icon.style.cssText = `color: ${this.getColorByType(type)};`;
    
    const text = document.createElement('span');
    text.textContent = message;
    text.style.cssText = 'color: var(--text-primary); flex: 1;';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 20px;
      cursor: pointer;
      padding: 0;
    `;
    closeBtn.onclick = () => this.removeNotification(notification);
    
    notification.appendChild(icon);
    notification.appendChild(text);
    notification.appendChild(closeBtn);
    
    this.container.appendChild(notification);
    
    // Auto-remover após duração
    if (duration > 0) {
      setTimeout(() => this.removeNotification(notification), duration);
    }
    
    return notification;
  },
  
  // Remover notificação
  removeNotification: function(notification) {
    notification.style.animation = 'fadeOut var(--transition-fast)';
    setTimeout(() => {
      notification.remove();
    }, 200);
  },
  
  // Obter cor por tipo
  getColorByType: function(type) {
    const colors = {
      success: 'var(--success)',
      error: 'var(--error)',
      warning: 'var(--warning)',
      info: 'var(--info)'
    };
    return colors[type] || colors.info;
  },
  
  // Obter ícone por tipo
  getIconByType: function(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  },
  
  // Atalhos
  success: function(message) {
    return this.show(message, 'success');
  },
  
  error: function(message) {
    return this.show(message, 'error');
  },
  
  warning: function(message) {
    return this.show(message, 'warning');
  },
  
  info: function(message) {
    return this.show(message, 'info');
  }
};
