import User from "./User.js";

const userElement = document.querySelector('#user-list');

window.localStorageKeys = Object.keys(localStorage);

document.addEventListener("DOMContentLoaded", () => {
    updateKeys();
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

function updateKeys() {
    window.localStorageKeys = Object.keys(localStorage);
    window.localStorageKeys.splice(window.localStorageKeys.indexOf('userListChoice'), 1)
    window.localStorageKeys.splice(window.localStorageKeys.indexOf('idCounter'), 1)
    window.localStorageKeys.sort(function (a, b) {
        return parseInt(a) - parseInt(b)
    })
}

// Проходим по всем юзерам
window.showUserAsList = function showUserAsList() {
    updateKeys();
    localStorage.setItem('userListChoice', '0');
    removePrevElement();
    // Create ul
    let newUlElement = document.createElement('ul');
    newUlElement.className = "user-list";
    userElement.prepend(newUlElement);

    // Create li
    const userElementList = userElement.querySelector('ul')
    for (let key of window.localStorageKeys) {
        let user = User.getUser(key);
        const newLiElement = document.createElement('li');
        newLiElement.style.width = '400px';
        newLiElement.id = `user-${user._id}`;
        newLiElement.innerHTML = `
            <a href="#" onclick="return false">${user.name}</a>
            <button class="delete-button" name='Delete' value="${user._id}" onclick="deleteUser(${user._id})">Удалить</button>
            <button class="info-button" name='Info' value="${user._id}" onclick="getUserInfo(${user._id})">Подробнее</button>`;
        userElementList.appendChild(newLiElement);
    }
}

window.showUserAsTable = function showUserAsTable() {
    updateKeys();
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
    for (let key of window.localStorageKeys) {
        let user = User.getUser(key);

        let userElementList = document.createElement('tr');
        userElementList.id = `user-${user._id}`

        let firstRaw = document.createElement('td');
        firstRaw.innerHTML = `${user._id}`

        let secondRaw = document.createElement('td');
        secondRaw.innerHTML = `<a href="#" onclick="return false">${user.name}</a>`;
        secondRaw.style.width = secondColumnWidth;

        let firstButton = document.createElement('td');
        firstButton.innerHTML = `<button class="delete-button" name='Delete' value="${user._id}" onclick="deleteUser(${user._id})">Удалить</button>`
        firstButton.style.textAlign = "center";

        let secondButton = document.createElement('td');
        secondButton.innerHTML = `<button class="info-button" name='Info' value="${user._id}" onclick="getUserInfo(${user._id})">Подробнее</button>`;
        secondButton.style.textAlign = "center";

        userElementList.appendChild(firstRaw);
        userElementList.appendChild(secondRaw);
        userElementList.appendChild(firstButton);
        userElementList.appendChild(secondButton);
        tbody.appendChild(userElementList);
    }
}

window.deleteUser = function deleteUser(user_id) {
    let listElement = document.querySelector(`#user-${user_id}`);
    listElement.parentNode.removeChild(listElement);
    localStorage.removeItem(user_id)
}

window.getUserInfo = function getUserInfo(user_id) {
    let userInfoDiv = document.querySelector('#user-info')
    userInfoDiv.innerHTML = '<a href="#" onclick="return false">User info:</a><br><br>';

    let user = User.serializeUser(User.getUser(user_id));
    let userInfo = user.getInformation();

    for (let val in userInfo) {
        let pInfo = document.createElement('p');
        let atrName = val.startsWith('_') ? val.replace('_', ' ') : val
        pInfo.innerHTML = `<b>${atrName}</b>: ${userInfo[val]}`;
        userInfoDiv.appendChild(pInfo);
    }

    // add friends
    let p = document.createElement('p');
    let userFriendString = ''
    for (let i of user.friends) {
        let friendUser = User.serializeUser(User.getUser(i['_id']));
        let userFriendInfo = friendUser.getInformation();
        userFriendString += `{<br>
                "id": ${userFriendInfo['_id']},<br>
                "name": ${userFriendInfo['name']},<br>
                "email": ${userFriendInfo['email']},<br>
                "created_at": ${userFriendInfo['createdAt']},<br>
            },<br>`
    }
    p.innerHTML = `<b>friends</b>: <p style="margin-left: 50px">${userFriendString}</p>`;
    userInfoDiv.appendChild(p);
}