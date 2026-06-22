(function () {
  const RULES = [
    {
      keys: ['hola', 'buenos', 'buenas', 'hey', 'hi', 'saludos', 'qué tal', 'que tal'],
      reply:
        '¡Hola! Soy el asistente virtual de Patricia Méndez Tovar. Puedo ayudarte con información sobre su perfil profesional, certificaciones, el taller Ciber Educa Ahora o cómo contactarla. ¿Qué te gustaría saber?',
    },
    {
      keys: ['quién es', 'quien es', 'sobre patricia', 'sobre mí', 'presentación', 'perfil'],
      reply:
        'Patricia Méndez Tovar es auxiliar administrativa, asistente jurídica y reclutadora IT. Tiene doble licenciatura en Derecho (UNADM) e Ingeniería en Gestión de TI (UVEG), con más de 3 años de experiencia en despachos jurídicos, reclutamiento tech y atención a clientes.',
    },
    {
      keys: ['experiencia', 'trabajo', 'laboral', 'despacho', 'telvista', 'reclutadora'],
      reply:
        'Su experiencia incluye: Asistente Jurídica en A R y Asociados (2024–2025), Reclutadora IT Freelancer (2021–2024) y Agente de Atención a Clientes en Telvista (2022–2023). Puedes ver el detalle en la sección Experiencia del portafolio.',
      action: { label: 'Ver experiencia', href: '#experiencia' },
    },
    {
      keys: ['educación', 'educacion', 'estudios', 'unadm', 'uveg', 'licenciatura', 'universidad'],
      reply:
        'Licenciatura en Derecho (UNADM, 2019–2024) e Ingeniería en Gestión de Tecnologías de la Información (UVEG, 2018–2021), con formación en bases de datos, desarrollo, seguridad de la información y gestión de proyectos.',
      action: { label: 'Ver educación', href: '#educacion' },
    },
    {
      keys: ['certificación', 'certificacion', 'az-900', 'azure', 'iso', '27001', 'ciberseguridad'],
      reply:
        'Patricia cuenta con: Microsoft Azure Fundamentals (AZ-900), Auditor Interno ISO 27001 y Fundamentos de Ciberseguridad. Esto respalda su trabajo en Ciber Educa Ahora y proyectos con enfoque en seguridad digital.',
      action: { label: 'Ver certificaciones', href: '#certificaciones' },
    },
    {
      keys: ['habilidad', 'competencia', 'sabe', 'dominio', 'python', 'sql', 'scrum'],
      reply:
        'Sus competencias incluyen: control documental, gestión de expedientes, reclutamiento IT, Microsoft Office, Python, SQL/MySQL, Azure, Scrum/Agile, ISO 27001 y ciberseguridad. Idiomas: español nativo e inglés B2.',
      action: { label: 'Ver habilidades', href: '#habilidades' },
    },
    {
      keys: ['contacto', 'correo', 'email', 'teléfono', 'telefono', 'llamar', 'escribir', 'whatsapp'],
      reply:
        'Puedes contactar a Patricia por:\n• Correo: thinkahead2033@gmail.com\n• Teléfono: 646 207 7996\n• LinkedIn: patricia-méndez-tovar',
      action: { label: 'Ir a contacto', href: '#contacto' },
    },
    {
      keys: ['ciber educa', 'cibereduca', 'taller', 'familias seguras', 'ciberacoso', 'padres', 'familia'],
      reply:
        'Ciber Educa Ahora es su proyecto de educación en ciberseguridad familiar. Ofrece el taller «Familias Seguras en Red» (2 h): ciberacoso, privacidad, phishing y qué hacer ante incidentes, con enfoque legal. Desde $450 MXN por persona o $3,500 por grupo.',
      action: { label: 'Ver Ciber Educa Ahora', href: '#ciber-educa' },
    },
    {
      keys: ['precio', 'costo', 'cuánto', 'cuanto', 'cobr', 'tarifa', 'paquete'],
      reply:
        'Referencias de precio:\n• Taller familiar: desde $450 MXN/persona o $3,500/grupo\n• Programa escuelas: desde $6,000 MXN\nPara cotización exacta, escribe a thinkahead2033@gmail.com indicando número de participantes y modalidad (presencial o virtual).',
      action: { label: 'Solicitar taller', href: 'mailto:thinkahead2033@gmail.com?subject=Cotización%20taller%20Ciber%20Educa%20Ahora' },
    },
    {
      keys: ['escuela', 'colegio', 'docente', 'maestro', 'director', 'institución'],
      reply:
        'Ofrece paquetes para escuelas: taller para padres + guía para docentes con protocolo ante ciberacoso. Paquete básico desde $6,000 MXN (presencial o virtual). Solicita propuesta formal por correo.',
      action: { label: 'Solicitar propuesta escolar', href: 'mailto:thinkahead2033@gmail.com?subject=Propuesta%20taller%20escuela%20Ciber%20Educa%20Ahora' },
    },
    {
      keys: ['088', 'te protejo', 'denuncia', 'ayuda', 'emergencia', 'recurso'],
      reply:
        'Recursos recomendados en México:\n• 088 — CERT-MX (orientación 24/7)\n• Te Protejo México — teprotejomexico.org\n• 911 — emergencias\n• CONDUSEF — fraudes bancarios',
      action: { label: 'Recursos en el sitio', href: '#ciber-educa' },
    },
    {
      keys: ['linkedin', 'red profesional'],
      reply: 'Perfil de LinkedIn: linkedin.com/in/patricia-méndez-tovar-3919bb169',
      action: {
        label: 'Abrir LinkedIn',
        href: 'https://www.linkedin.com/in/patricia-m%C3%A9ndez-tovar-3919bb169/',
        external: true,
      },
    },
    {
      keys: ['empleo', 'contratar', 'oportunidad', 'vacante', 'servicio', 'freelance', 'consultoría', 'consultoria'],
      reply:
        'Patricia está disponible para oportunidades en administración, apoyo jurídico, reclutamiento IT y talleres de ciberseguridad familiar. Escríbele con el tipo de proyecto y modalidad (presencial o remota).',
      action: { label: 'Enviar correo', href: 'mailto:thinkahead2033@gmail.com?subject=Consulta%20profesional' },
    },
    {
      keys: ['gracias', 'thank', 'perfecto', 'genial', 'excelente', 'ok', 'vale'],
      reply: '¡Con gusto! Si necesitas algo más, aquí estaré. También puedes contactar a Patricia directamente por correo o teléfono.',
    },
    {
      keys: ['adiós', 'adios', 'bye', 'chao', 'hasta luego'],
      reply: '¡Hasta pronto! Que tengas un excelente día. Recuerda que Patricia está a un correo de distancia: thinkahead2033@gmail.com',
    },
  ];

  const QUICK_REPLIES = [
    { label: '¿Quién es Patricia?', text: '¿Quién es Patricia?' },
    { label: 'Taller Ciber Educa', text: 'Cuéntame del taller Ciber Educa Ahora' },
    { label: 'Contacto', text: '¿Cómo puedo contactarla?' },
    { label: 'Certificaciones', text: '¿Qué certificaciones tiene?' },
  ];

  const FALLBACK =
    'No tengo esa información exacta, pero Patricia puede ayudarte personalmente. Escríbele a thinkahead2033@gmail.com o llama al 646 207 7996.';

  const widget = document.getElementById('chatbot');
  if (!widget) return;

  const toggle = widget.querySelector('.chatbot-toggle');
  const panel = widget.querySelector('.chatbot-panel');
  const closeBtn = widget.querySelector('.chatbot-close');
  const messagesEl = widget.querySelector('.chatbot-messages');
  const form = widget.querySelector('.chatbot-form');
  const input = widget.querySelector('.chatbot-input');
  const quickRepliesEl = widget.querySelector('.chatbot-quick');

  let isOpen = false;

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function findReply(text) {
    const n = normalize(text);
    for (const rule of RULES) {
      if (rule.keys.some((k) => n.includes(normalize(k)))) {
        return rule;
      }
    }
    return { reply: FALLBACK, action: { label: 'Contactar', href: '#contacto' } };
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(text, type, action) {
    const msg = document.createElement('div');
    msg.className = `chatbot-msg chatbot-msg--${type}`;
    msg.setAttribute('role', type === 'bot' ? 'status' : 'none');

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.textContent = text;
    msg.appendChild(bubble);

    if (action && type === 'bot') {
      const link = document.createElement('a');
      link.className = 'chatbot-action';
      link.textContent = action.label;
      link.href = action.href;
      if (action.external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      link.addEventListener('click', () => {
        if (!action.external && action.href.startsWith('#')) {
          setOpen(false);
        }
      });
      msg.appendChild(link);
    }

    messagesEl.appendChild(msg);
    scrollToBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chatbot-msg chatbot-msg--bot chatbot-msg--typing';
    el.innerHTML = '<div class="chatbot-bubble"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function botRespond(text) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      const result = findReply(text);
      addMessage(result.reply, 'bot', result.action);
    }, 500 + Math.random() * 400);
  }

  function setOpen(open) {
    isOpen = open;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    widget.classList.toggle('chatbot--open', open);
    if (open) {
      input.focus();
      scrollToBottom();
    }
  }

  function sendUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'user');
    botRespond(trimmed);
  }

  function renderQuickReplies() {
    quickRepliesEl.innerHTML = '';
    QUICK_REPLIES.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chatbot-quick-btn';
      btn.textContent = item.label;
      btn.addEventListener('click', () => sendUserMessage(item.text));
      quickRepliesEl.appendChild(btn);
    });
  }

  toggle.addEventListener('click', () => setOpen(!isOpen));
  closeBtn.addEventListener('click', () => setOpen(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    sendUserMessage(value);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) setOpen(false);
  });

  renderQuickReplies();
  addMessage(
    '¡Hola! Soy el asistente de Patricia. Pregúntame sobre su experiencia, certificaciones, el taller Ciber Educa Ahora o cómo contactarla.',
    'bot'
  );
})();