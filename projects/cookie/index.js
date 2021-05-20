/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookies = {};
let filterValue = filterNameInput.value;

function updateCookies() {
  const cookiesString = document.cookie;
  cookiesString.split(';').map((cookie) => {
    const [name, value] = cookie.trim().split('=');

    if (name) {
      cookies[name] = value;
    }
  });
}

updateCookies();
refreshTable();

filterNameInput.addEventListener('input', function () {
  filterValue = this.value;

  refreshTable();
});

addButton.addEventListener('click', () => {
  const name = encodeURIComponent(addNameInput.value.trim());
  const value = encodeURIComponent(addValueInput.value.trim());

  document.cookie = `${name}=${value}`;
  cookies[name] = value;

  refreshTable();
});

listTable.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('remove-cookie')) {
    const name = el.dataset.cookieName;
    document.cookie = `${name}=; max-age=0`;
    delete cookies[name];

    refreshTable();
  }
});

function refreshTable() {
  listTable.innerHTML = '';

  for (const name of Object.keys(cookies)) {
    const value = cookies[name];

    if (
      filterValue &&
      !name.toLowerCase().includes(filterValue.toLowerCase()) &&
      !value.toLowerCase().includes(filterValue.toLowerCase())
    ) {
      continue;
    }

    const tr = document.createElement('tr');
    const nameCell = document.createElement('td');
    const valueCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');

    removeButton.classList.add('remove-cookie');
    removeButton.dataset.cookieName = name;
    removeButton.textContent = 'Удалить';

    nameCell.textContent = name;
    valueCell.textContent = value;
    actionCell.append(removeButton);

    tr.append(nameCell, valueCell, actionCell);

    listTable.append(tr);
  }
}

export { addButton, addNameInput, addValueInput, listTable };
