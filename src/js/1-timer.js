// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
const button = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const inputElement = document.getElementById('datetime-picker');

let userSelectedDate;
let intervalId = null;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = new Date();
    if (selectedDate >= dateNow) {
      button.disabled = false;
      userSelectedDate = selectedDate;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: `topRight`,
      });
      button.disabled = true;
    }
  },
};

const fp = flatpickr(inputElement, options);
button.addEventListener('click', onStartClick);
function onStartClick() {
  button.disabled = true;
  inputElement.disabled = true;
  intervalId = setInterval(() => {
    const dateNow = new Date();
    const diff = userSelectedDate - dateNow;
    if (diff <= 0) {
      clearInterval(intervalId);
      days.textContent = `00`;
      minutes.textContent = `00`;
      hours.textContent = `00`;
      seconds.textContent = `00`;
      inputElement.disabled = false;
      button.disabled = true;
      return;
    } else {
      const time = convertMs(diff);
      days.textContent = addLeadingZero(time.days);
      minutes.textContent = addLeadingZero(time.minutes);
      hours.textContent = addLeadingZero(time.hours);
      seconds.textContent = addLeadingZero(time.seconds);
    }
  }, 1000);
}
