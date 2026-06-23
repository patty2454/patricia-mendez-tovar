(function () {
  const CALENDLY_URL = 'https://calendly.com/thinkahead2033/30min';
  const EMAIL = 'thinkahead2033@gmail.com';
  const PHONE = '646 207 7996';
  const WHATSAPP_URL = 'https://wa.me/526462077996?text=Hola%2C%20quiero%20agendar%20una%20asesor%C3%ADa%20gratuita%20de%2030%20minutos%20con%20DataLexis.mx.';

  const PROFILES = {
    empresa: {
      label: 'Empresa',
      emoji: '🏢',
      info:
        'Para Empresas y PYMES, el plan Empresa Blindada ($12,000 MXN) incluye:\n\n' +
        '• Entrevista ejecutiva de diagnóstico\n' +
        '• Manual completo ISO 27001 personalizado\n' +
        '• Matriz de riesgos corporativa\n' +
        '• Políticas, procedimientos e informe ejecutivo\n\n' +
        'Proteges tu operación ante ransomware, phishing y fuga de datos de clientes.',
    },
    escuela: {
      label: 'Escuela',
      emoji: '🏫',
      info:
        'Para Escuelas e Instituciones, el plan Escuela Protegida ($8,500 MXN) incluye:\n\n' +
        '• Protocolo de actuación ante ciberacoso\n' +
        '• Guía para docentes, directivos y padres\n' +
        '• Manual ISO 27001 adaptado a tu institución\n' +
        '• Sesión de capacitación incluida\n\n' +
        'Es nuestro plan más solicitado — protege alumnos y reputación institucional.',
    },
    familia: {
      label: 'Familia',
      emoji: '🏠',
      info:
        'Para Padres de Familia, el plan Familia Segura ($2,800 MXN) incluye:\n\n' +
        '• Manual del hogar digital seguro\n' +
        '• Checklist de configuración de dispositivos\n' +
        '• Acuerdo familiar de uso de internet\n' +
        '• Guía ante grooming, sextorsión o robo de identidad\n\n' +
        'Protege a quienes más importan con reglas claras y accionables.',
    },
  };

  const PROFILE_BUTTONS = [
    { id: 'empresa', label: '🏢 Empresa' },
    { id: 'escuela', label: '🏫 Escuela' },
    { id: 'familia', label: '🏠 Familia' },
  ];

  const widget = document.getElementById('chatbot');
  if (!widget) return;

  const toggle = widget.querySelector('.chatbot-toggle');
  const panel = widget.querySelector('.chatbot-panel');
  const closeBtn = widget.querySelector('.chatbot-close');
  const messagesEl = document.getElementById('chatbot-messages');
  const quickRepliesEl = document.getElementById('chatbot-quick');
  const calendlyBar = document.getElementById('chatbot-calendly');
  const subtitleEl = document.getElementById('chatbot-subtitle');
  const form = widget.querySelector('.chatbot-form');
  const input = widget.querySelector('.chatbot-input');

  let isOpen = false;
  let state = 'awaiting_profile';
  let userProfile = null;

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function detectProfile(text) {
    const n = normalize(text);
    if (/\b(empresa|pyme|negocio|corporativo|empresarial)\b/.test(n)) return 'empresa';
    if (/\b(escuela|colegio|institucion|docente|director|maestro|preparatoria)\b/.test(n)) return 'escuela';
    if (/\b(familia|padre|madre|hogar|hijos|menores|casa)\b/.test(n)) return 'familia';
    return null;
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function createCalendlyButton() {
    const link = document.createElement('a');
    link.className = 'chatbot-calendly-btn chatbot-calendly-btn--inline';
    link.href = CALENDLY_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' +
      ' Agendar en Calendly (30 minutos)';
    return link;
  }

  function addMessage(text, type, options = {}) {
    const msg = document.createElement('div');
    msg.className = `chatbot-msg chatbot-msg--${type}`;
    msg.setAttribute('role', type === 'bot' ? 'status' : 'none');

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.textContent = text;
    msg.appendChild(bubble);

    if (options.actions && type === 'bot') {
      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'chatbot-actions';
      options.actions.forEach((action) => {
        const link = document.createElement('a');
        link.className = 'chatbot-action' + (action.primary ? ' chatbot-action--primary' : '');
        link.textContent = action.label;
        link.href = action.href;
        if (action.external) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        actionsWrap.appendChild(link);
      });
      msg.appendChild(actionsWrap);
    }

    if (options.showCalendly && type === 'bot') {
      msg.appendChild(createCalendlyButton());
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

  function botReply(fn, delay) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      fn();
    }, delay || 500 + Math.random() * 300);
  }

  function setQuickReplies(buttons) {
    quickRepliesEl.innerHTML = '';
    buttons.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chatbot-quick-btn' + (item.profile ? ' chatbot-quick-btn--profile' : '');
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        if (item.profile) {
          selectProfile(item.profile);
        } else if (item.action) {
          item.action();
        } else if (item.text) {
          sendUserMessage(item.text);
        }
      });
      quickRepliesEl.appendChild(btn);
    });
  }

  function showProfileButtons() {
    setQuickReplies(
      PROFILE_BUTTONS.map((b) => ({
        label: b.label,
        profile: b.id,
      }))
    );
  }

  function contactOfferText() {
    return (
      '🎁 Te ofrezco una asesoría gratuita de 30 minutos para evaluar tus riesgos reales — sin compromiso.\n\n' +
      'Elige cómo prefieres contactarnos:\n' +
      `📧 Correo: ${EMAIL}\n` +
      `📱 WhatsApp / Teléfono: ${PHONE}\n` +
      '📅 O agenda directamente en Calendly (botón abajo).'
    );
  }

  function showCalendlyBar(show) {
    calendlyBar.hidden = !show;
    widget.classList.toggle('chatbot--profile-set', show);
  }

  function updateSubtitle() {
    if (userProfile && PROFILES[userProfile]) {
      const p = PROFILES[userProfile];
      subtitleEl.textContent = `${p.emoji} Perfil: ${p.label}`;
    } else {
      subtitleEl.textContent = 'En línea · Respuesta inmediata';
    }
  }

  function getFollowUpButtons() {
    return [
      { label: '📅 Agendar Calendly', action: () => { addMessage('Agendar en Calendly', 'user'); handleAgendar(); } },
      { label: '📧 Enviar correo', action: () => { addMessage('Contactar por correo', 'user'); handleContacto('correo'); } },
      { label: '📱 WhatsApp', action: () => { addMessage('Contactar por WhatsApp', 'user'); handleContacto('whatsapp'); } },
      { label: '💰 Ver precios', text: '¿Cuánto cuesta?' },
      { label: '🔄 Cambiar perfil', action: () => { addMessage('Cambiar perfil', 'user'); resetProfile(true); } },
    ];
  }

  function startConversation() {
    state = 'awaiting_profile';
    userProfile = null;
    showCalendlyBar(false);
    updateSubtitle();
    addMessage(
      '¡Hola! Soy el asistente de DataLexis.mx. Te ayudo a proteger tu información con un Manual de Gestión de Riesgos ISO 27001 personalizado.\n\n¿Eres Empresa, Escuela o Familia?',
      'bot'
    );
    showProfileButtons();
  }

  function selectProfile(profileId, skipUserBubble) {
    if (!PROFILES[profileId]) return;

    userProfile = profileId;
    state = 'profile_set';
    const profile = PROFILES[profileId];

    if (!skipUserBubble) {
      addMessage(profile.label, 'user');
    }
    showCalendlyBar(true);
    updateSubtitle();

    botReply(() => {
      addMessage(`Perfecto, ${profile.emoji} perfil ${profile.label}.\n\n${profile.info}`, 'bot');
      botReply(() => {
        addMessage(contactOfferText(), 'bot', { showCalendly: true });
        setQuickReplies(getFollowUpButtons());
      }, 400);
    });
  }

  function resetProfile(skipUserBubble) {
    if (!skipUserBubble) {
      addMessage('Cambiar perfil', 'user');
    }
    botReply(() => {
      state = 'awaiting_profile';
      userProfile = null;
      showCalendlyBar(false);
      updateSubtitle();
      addMessage('Sin problema. ¿Eres Empresa, Escuela o Familia?', 'bot');
      showProfileButtons();
    });
  }

  function handleAgendar() {
    const label = userProfile ? PROFILES[userProfile].label : 'mi perfil';
    botReply(() => {
      addMessage(
        `¡Excelente decisión! Agenda tu asesoría gratuita de 30 minutos para ${label}.\n\nHaz clic en el botón verde de Calendly — te llevará directo al calendario disponible.`,
        'bot',
        { showCalendly: true }
      );
      setQuickReplies(getFollowUpButtons());
    });
  }

  function handleContacto(channel) {
    const label = userProfile ? PROFILES[userProfile].label : 'DataLexis.mx';
    if (channel === 'correo') {
      botReply(() => {
        addMessage(
          `Escribe a ${EMAIL} con el asunto "Asesoría ${label}" y te respondemos en menos de 24 horas.\n\nTambién puedes agendar directamente en Calendly si prefieres elegir fecha y hora.`,
          'bot',
          {
            showCalendly: true,
            actions: [
              {
                label: `Enviar correo a ${EMAIL}`,
                href: `mailto:${EMAIL}?subject=${encodeURIComponent('Asesoría DataLexis.mx — ' + label)}&body=${encodeURIComponent('Hola, me interesa la asesoría gratuita de 30 minutos para ' + label + '.')}`,
                external: true,
              },
            ],
          }
        );
        setQuickReplies(getFollowUpButtons());
      });
    } else {
      botReply(() => {
        addMessage(
          `Escríbenos al ${PHONE} por WhatsApp o llama directamente.\n\nMenciona que vienes de DataLexis.mx y tu perfil (${label}) para una atención más rápida.`,
          'bot',
          {
            showCalendly: true,
            actions: [
              { label: 'Abrir WhatsApp', href: WHATSAPP_URL, external: true },
              { label: `Llamar al ${PHONE}`, href: 'tel:+526462077996', external: true },
            ],
          }
        );
        setQuickReplies(getFollowUpButtons());
      });
    }
  }

  function handleAwaitingProfile(text) {
    const detected = detectProfile(text);
    if (detected) {
      selectProfile(detected, true);
      return;
    }
    botReply(() => {
      addMessage(
        'Para orientarte mejor, necesito saber tu perfil. Por favor elige una opción:\n\n🏢 Empresa · 🏫 Escuela · 🏠 Familia',
        'bot'
      );
      showProfileButtons();
    });
  }

  function handleProfileSet(text) {
    const n = normalize(text);

    if (/\b(cambiar|otro perfil|otra opcion)\b/.test(n)) {
      resetProfile(true);
      return;
    }

    const newProfile = detectProfile(text);
    if (newProfile && newProfile !== userProfile) {
      selectProfile(newProfile, true);
      return;
    }

    if (/\b(agendar|cita|calendly|reunion|llamada|asesoria|consulta|horario)\b/.test(n)) {
      handleAgendar();
      return;
    }

    if (/\b(correo|email|mail|escribir)\b/.test(n)) {
      handleContacto('correo');
      return;
    }

    if (/\b(whatsapp|wsp|telefono|teléfono|llamar|646)\b/.test(n)) {
      handleContacto('whatsapp');
      return;
    }

    if (/\b(precio|costo|cuanto|cuánto|plan|tarifa|vale|cobr)\b/.test(n)) {
      const p = PROFILES[userProfile];
      botReply(() => {
        addMessage(
          `El plan recomendado para ${p.label} ya está en tu perfil. Si quieres profundizar, la asesoría de 30 minutos es gratuita y ahí definimos el alcance exacto.\n\n¿Listo para agendar?`,
          'bot',
          { showCalendly: true }
        );
        setQuickReplies(getFollowUpButtons());
      });
      return;
    }

    if (/\b(proceso|funciona|pasos|manual|iso|entrevista|entrega)\b/.test(n)) {
      botReply(() => {
        addMessage(
          'El proceso para tu perfil es:\n\n' +
          '1️⃣ Asesoría gratuita de 30 min (Calendly)\n' +
          '2️⃣ Entrevista de diagnóstico (60–90 min)\n' +
          '3️⃣ Análisis de riesgos ISO 27001\n' +
          '4️⃣ Entrega de tu manual personalizado (5–10 días)\n' +
          '5️⃣ Soporte post-entrega incluido\n\n' +
          'Todo empieza con tu cita gratuita.',
          'bot',
          { showCalendly: true }
        );
        setQuickReplies(getFollowUpButtons());
      });
      return;
    }

    if (/\b(pago|pagar|transferencia|deposito|depósito|exhibicion|exhibición)\b/.test(n)) {
      botReply(() => {
        addMessage(
          'Aceptamos:\n• PayPal (MXN) — botón en la sección Precios\n• Transferencia y depósito\n• Pagos en 2 exhibiciones (50% al iniciar, 50% al entregar)\n\nPrimero agendamos la asesoría gratuita de 30 minutos para confirmar el plan ideal.',
          'bot',
          { showCalendly: true, actions: [{ label: 'Ver pago PayPal', href: '#pago' }] }
        );
        setQuickReplies(getFollowUpButtons());
      });
      return;
    }

    if (/\b(gracias|thank|perfecto|genial|excelente|listo|de acuerdo)\b/.test(n)) {
      botReply(() => {
        addMessage(
          '¡Con gusto! Cuando estés listo, agenda tu asesoría gratuita de 30 minutos. Estaré aquí si tienes más dudas.',
          'bot',
          { showCalendly: true }
        );
        setQuickReplies(getFollowUpButtons());
      });
      return;
    }

    if (/\b(adios|adiós|bye|chao|hasta luego)\b/.test(n)) {
      botReply(() => {
        addMessage(
          `¡Hasta pronto! Recuerda: proteger tu información empieza con un paso. Agenda tu asesoría en Calendly o escríbenos a ${EMAIL}.`,
          'bot',
          { showCalendly: true }
        );
        setQuickReplies([{ label: '📅 Agendar Calendly', action: () => { addMessage('Agendar en Calendly', 'user'); handleAgendar(); } }]);
      });
      return;
    }

    if (/\b(hola|buenos|buenas|hey|saludos)\b/.test(n)) {
      const p = PROFILES[userProfile];
      botReply(() => {
        addMessage(
          `¡Hola de nuevo! Sigues en perfil ${p.emoji} ${p.label}. ¿Quieres agendar tu asesoría gratuita de 30 minutos?`,
          'bot',
          { showCalendly: true }
        );
        setQuickReplies(getFollowUpButtons());
      });
      return;
    }

    const p = PROFILES[userProfile];
    botReply(() => {
      addMessage(
        `Entiendo tu consulta. Como perfil ${p.label}, lo mejor es que lo revisemos en la asesoría gratuita de 30 minutos — ahí Patricia te orienta de forma personalizada.\n\nUsa Calendly, correo o WhatsApp:`,
        'bot',
        {
          showCalendly: true,
          actions: [
            { label: `📧 ${EMAIL}`, href: `mailto:${EMAIL}`, external: true },
            { label: `📱 ${PHONE}`, href: WHATSAPP_URL, external: true },
          ],
        }
      );
      setQuickReplies(getFollowUpButtons());
    });
  }

  function processMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    addMessage(trimmed, 'user');

    if (state === 'awaiting_profile') {
      handleAwaitingProfile(trimmed);
    } else {
      handleProfileSet(trimmed);
    }
  }

  function sendUserMessage(text) {
    processMessage(text);
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

  startConversation();
})();