(function () {
  const PAYPAL_CLIENT =
    'BAA8nO5EagHBkx9gemUtYaTy2b_AJdfmqUTHKQIZ7_BoT3tIUI4iYiq8PKcMRrKjBELAvYHeURAmd01eTk';

  const BUTTONS = [
    { id: 'MWZU2LX6MMYME', container: 'paypal-familia', label: 'Plan Familia Segura' },
    { id: '4MP3PQYMYCMGE', container: 'paypal-general', label: 'Otros planes' },
  ];

  function renderOfficialButton(containerId, buttonId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML =
      '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="paypal-official-form">' +
      '<input type="hidden" name="cmd" value="_s-xclick">' +
      '<input type="hidden" name="hosted_button_id" value="' + buttonId + '">' +
      '<input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_paynowCC_LG.gif" ' +
      'border="0" name="submit" alt="Pagar ahora con PayPal" class="paypal-official-img">' +
      '<img alt="" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1" class="paypal-pixel">' +
      '</form>';
  }

  function hasRenderedButton(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return false;
    return Boolean(
      el.querySelector('iframe') ||
      el.querySelector('.paypal-button') ||
      el.querySelector('.paypal-official-form')
    );
  }

  function renderSdkButton(button) {
    return paypal
      .HostedButtons({ hostedButtonId: button.id })
      .render('#' + button.container)
      .catch(function () {
        renderOfficialButton(button.container, button.id);
      });
  }

  function renderAllButtons() {
    if (typeof paypal === 'undefined' || !paypal.HostedButtons) {
      BUTTONS.forEach(function (b) {
        renderOfficialButton(b.container, b.id);
      });
      return;
    }

    BUTTONS.forEach(function (b) {
      renderSdkButton(b);
    });

    setTimeout(function () {
      BUTTONS.forEach(function (b) {
        if (!hasRenderedButton(b.container)) {
          renderOfficialButton(b.container, b.id);
        }
      });
    }, 4000);
  }

  function loadSdk() {
    if (document.getElementById('paypal-sdk')) {
      renderAllButtons();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src =
      'https://www.paypal.com/sdk/js?client-id=' +
      PAYPAL_CLIENT +
      '&components=hosted-buttons&disable-funding=venmo&currency=MXN';
    script.onload = renderAllButtons;
    script.onerror = function () {
      BUTTONS.forEach(function (b) {
        renderOfficialButton(b.container, b.id);
      });
    };
    document.body.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSdk);
  } else {
    loadSdk();
  }
})();