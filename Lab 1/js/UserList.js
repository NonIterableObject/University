import User from "./User.js";

let localStorageKeys = Object.keys(localStorage);
const userElement = document.querySelector('#user-list');

document.addEventListener("DOMContentLoaded", () => {
    showUserAsList();
});

function removePrevElement() {
    const element = document.querySelector('#user-list').firstChild;
    if (element)
        element.remove()
}

// Проходим по всем юзерам
window.showUserAsList = function showUserAsList() {
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
        newLiElement.style.width = '300px';
        newLiElement.innerHTML = `<a href="#">id: ${user._id}, name: ${user.name}</a>`;
        userElementList.prepend(newLiElement);
    }
}

window.showUserAsTable = function showUserAsTable() {
    removePrevElement();
}

