import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const calendar = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minLeft = document.querySelector('[data-minutes]');
const secLeft = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future', {
        timeout: 6000,
      });
      startBtn.setAttribute('disabled', 'disabled');
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.removeAttribute('disabled');
    }
  },
};

let selectedDate;

flatpickr(calendar, options);
startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', onStart);

Notify.init({
  width: '500px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
});

function onStart() {
  setInterval(() => {
    let timeLeft = selectedDate >= Date.now() ? selectedDate - Date.now() : 0;
    secLeft.textContent = addLeadingZero(convertMs(timeLeft).seconds);
    minLeft.textContent = addLeadingZero(convertMs(timeLeft).minutes);
    hoursLeft.textContent = addLeadingZero(convertMs(timeLeft).hours);
    daysLeft.textContent =
      convertMs(timeLeft).days > 99
        ? convertMs(timeLeft).days
        : addLeadingZero(convertMs(timeLeft).days);
  }, 1000);
}

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
  return String(value).padStart(2, 0);
}
