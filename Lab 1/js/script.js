import User from "./User.js";


let userForm = document.querySelector('#user-form');

function generateId() {
    let id = parseInt(localStorage.getItem('idCounter'));
    let newId = id + 1;
    localStorage.setItem('idCounter', newId.toString());
    return newId;
}

window.sendFormValidation = function sendFormValidation() {
    if (userForm.username.value === "") {
        alert('Пожалуйста, введите Ваше имя');
        userForm.name.focus();
        return false
    }
    if (userForm.email.value === "") {
        alert('Пожалуйста, введите электронный адрес');
        userForm.email.focus();
        return false
    }
    if (userForm.password.value === "") {
        alert('Пожалуйста, введите пароль');
        userForm.password.focus();
        return false
    }
    if (userForm.securityQuestion.value.length >= 1 && userForm.answer.value === "") {
        alert('Не задан ответ');
        userForm.answer.focus();
        return false
    }
    if (userForm.answer.value.length >= 1 && userForm.securityQuestion.value === "") {
        alert('Не задан вопрос');
        userForm.securityQuestion.focus();
        return false
    }
    createUser();
    return true;
}

function createUser() {
    let user = new User(
        userForm.username.value,
        userForm.email.value,
        userForm.password.value,
        userForm.age.value,
        userForm.address.value,
        userForm.securityQuestion.value,
        userForm.answer.value,
        generateId()
    )
    alert("User has been created!")
    return user;
}

