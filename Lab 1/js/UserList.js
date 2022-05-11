import User from "./User.js";

let localStorageKeys = Object.keys(localStorage);
localStorageKeys.splice(localStorageKeys.indexOf('userListChoice'), 1)
localStorageKeys.splice(localStorageKeys.indexOf('idCounter'), 1)
localStorageKeys.sort(function(a,b){
  return parseInt(a) - parseInt(b)
})

const userElement = document.querySelector('#user-list');

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('userListChoice') === '1') {
        showUserAsTable();
    } else {
        showUserAsList();
    }
});

function removePrevElement() {
    const element = document.querySelector('#user-list').firstChild;
    if (element)
        element.remove()
}

// Проходим по всем юзерам
window.showUserAsList = function showUserAsList() {
    localStorage.setItem('userListChoice', '0');
    removePrevElement();
    // Create ul
    let newUlElement = document.createElement('ul');
    newUlElement.className = "user-list";
    userElement.prepend(newUlElement);

    // Create li
    const userElementList = userElement.querySelector('ul')
    for (let key of localStorageKeys) {
        let user = User.getUser(key);
        const newLiElement = document.createElement('li');
        newLiElement.style.width = '400px';
        newLiElement.innerHTML = `
            <a href="#" onclick="return false">id: ${user._id}, name: ${user.name}</a>
            <button class="delete-button" name='Delete' value="${user._id}">Удалить</button>
            <button class="info-button" name='Info' value="${user._id}">Подробнее</button>`;
        userElementList.appendChild(newLiElement);
    }
}

window.showUserAsTable = function showUserAsTable() {
    localStorage.setItem('userListChoice', '1');
    removePrevElement();
    const secondColumnWidth = '9px';

    // Create table
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    table.id = "user-table";
    userElement.prepend(table);

    // Create tr
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Номер";

    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Имя";
    heading_2.style.width = secondColumnWidth;

    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "💥";
    heading_3.style.textAlign = "center";

    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "📝";
    heading_4.style.textAlign = "center";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    thead.appendChild(row_1);

    // Create td
    for (let key of localStorageKeys) {
        let user = User.getUser(key);

        let userElementList = document.createElement('tr');

        let firstRaw = document.createElement('td');
        firstRaw.innerHTML = `${user._id}`

        let secondRaw = document.createElement('td');
        secondRaw.innerHTML = `<a href="#" onclick="return false">${user.name}</a>`;
        secondRaw.style.width = secondColumnWidth;

        let firstButton = document.createElement('td');
        firstButton.innerHTML = `<button class="delete-button" name='Delete' value="${user._id}">Удалить</button>`
        firstButton.style.textAlign = "center";

        let secondButton = document.createElement('td');
        secondButton.innerHTML = `<button class="info-button" name='Info' value="${user._id}">Подробнее</button>`;
        secondButton.style.textAlign = "center";

        userElementList.appendChild(firstRaw);
        userElementList.appendChild(secondRaw);
        userElementList.appendChild(firstButton);
        userElementList.appendChild(secondButton);
        tbody.appendChild(userElementList);
    }
}

