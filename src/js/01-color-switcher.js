const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  startBtn.setAttribute('disabled', 'disabled');
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  stopBtn.removeAttribute('disabled');
}

function onStopBtn() {
  stopBtn.setAttribute('disabled', 'disabled');
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
