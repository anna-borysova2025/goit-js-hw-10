const form = document.querySelector('form');
const localStorageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const saveData = JSON.parse(localStorage.getItem(localStorageKey));

if (saveData) {
  formData = saveData;
  form.elements.email.value = saveData.email || '';
  form.elements.message.value = saveData.message || '';
}

form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  formData = { email: '', message: '' };
  localStorage.removeItem(localStorageKey);
  form.reset();
});
