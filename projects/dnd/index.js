/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let draggableDiv = false;
let X = 0;
let Y = 0;

document.addEventListener('mousemove', (e) => {
  if (draggableDiv) {
    draggableDiv.style.top = e.clientY - Y + 'px';
    draggableDiv.style.left = e.clientX - X + 'px';
  }
});

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomPx = (max) => {
  return getRandomInt(max) + 'px';
};

export function createDiv() {
  const div = document.createElement('div');

  div.style.backgroundColor = getRandomColor();
  div.style.top = getRandomPx(window.innerHeight);
  div.style.bottom = getRandomPx(window.innerHeight);
  div.style.left = getRandomPx(window.innerWidth);
  div.style.right = getRandomPx(window.innerWidth);
  div.style.width = getRandomPx(200);
  div.style.height = getRandomPx(200);
  div.classList.add('draggable-div');

  div.addEventListener('mousedown', (e) => {
    draggableDiv = div;
    X = e.offsetX;
    Y = e.offsetY;
  });

  div.addEventListener('mouseup', () => {
    draggableDiv = false;
  });

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
