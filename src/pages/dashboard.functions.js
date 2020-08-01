import {storage} from '@core/helper';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  return `<li class="dashboard__record">
            <a class="dashboard__record-link"
               href="#excel/${id}">
                ${model.title}
            </a>
            <strong>${new Date(model.openedData).toLocaleTimeString()}</strong>
          </li>`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }

  return keys;
}

export function crateRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return ` <div class="dashboard__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
           </div>
           <ul class="dashboard__list">
           ${keys.map(toHTML).join('')}
           </ul>`;
}
