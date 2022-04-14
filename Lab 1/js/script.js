import User from "./User.mjs";


let userForm = document.querySelector('#user-form');
let userButton = document.querySelector('#user-form-button');

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
    console.log("Success")
    return true;
}

function createUser() {
    let a = userForm.elements[0];
    console.log(a)
}

