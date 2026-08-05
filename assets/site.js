const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (menuButton && mobileMenu) {
  const openIcon = menuButton.querySelector('[data-menu-open]');
  const closeIcon = menuButton.querySelector('[data-menu-close]');
  const menuLabel = menuButton.querySelector('.sr-only');

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('hidden', isOpen);
    openIcon?.classList.toggle('hidden', !isOpen);
    closeIcon?.classList.toggle('hidden', isOpen);
    if (menuLabel) menuLabel.textContent = isOpen ? 'Open navigation' : 'Close navigation';
  });
}

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const contactEmail = contactForm.dataset.contactEmail;
    const status = contactForm.querySelector('[data-form-status]');

    if (!contactEmail || contactEmail.startsWith('[')) {
      if (status) {
        status.textContent = 'The official contact email has not yet been added. Please share your feedback through your Parish Council representative.';
        status.classList.remove('hidden');
      }
      return;
    }

    const formData = new FormData(contactForm);
    const subject = `Neighbourhood Plan: ${formData.get('subject')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Parish: ${formData.get('parish')}`,
      '',
      formData.get('message'),
    ].join('\n');

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}