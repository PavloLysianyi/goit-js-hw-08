import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');
const storageKey = 'feedback-form-state';

form.addEventListener('input', throttle(handleInput, 500));

window.addEventListener('load', loadFormData);

form.addEventListener('submit', handleSubmit);

function handleInput() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function loadFormData() {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    emailInput.value = parsedData.email;
    messageInput.value = parsedData.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();

  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
}
