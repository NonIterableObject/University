import User from "./User.js";
// import * as assert from "assert";  // For local tests
let assert = chai.assert;  //For browser

const defaultPassword = "123123123"
const defaultName = "John"
const defaultEmail = "user@com.com"

function idCounter() {
    let id = 1;
    return () => id++;
}

let generateId = idCounter()

function generateName() {
    return `user_${generateId()}`;
}

document.addEventListener("DOMContentLoaded", () => {
    let isAccept = confirm("If you run tests localStorage will be cleared!");
    if (!isAccept) {
        history.back();
    } else {
        runAllTest();
    }
});

function runAllTest() {
    /*Test password function*/
    describe("password", function () {
        before(() => {
            localStorage.clear();
            localStorage.setItem('idCounter', '0');
        });

        it('Test valid password', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.resetPassword("qweasdzxc")
            assert.strictEqual(user._password, "qweasdzxc")
        })

        it('Test same passwords', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.resetPassword(defaultPassword)
            assert.strictEqual(user._password, defaultPassword)
        })

        it('Test short password', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.resetPassword("zxc")
            assert.strictEqual(user._password, defaultPassword)
        })
    });

    /*Test change question*/
    describe("change question", function () {
        it('Test valid question but previously one was null', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.changeSecurityQuestion("qwe", "qwe")
            assert.strictEqual(user._securityQuestion, "qwe")
            assert.strictEqual(user._answer, "qwe")
        })

        it('Test valid question but previously one was not null', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.changeSecurityQuestion("qwe", "qwe")
            user.changeSecurityQuestion("zxc", "zxc", "qwe")
            assert.strictEqual(user._securityQuestion, "zxc")
            assert.strictEqual(user._answer, "zxc")
        })

        it('Test invalid answer on previously question', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.changeSecurityQuestion("question", "answer")
            user.changeSecurityQuestion("new_question", "new_answer", "wrong_answer")
            assert.strictEqual(user._securityQuestion, "question")
            assert.strictEqual(user._answer, "answer")
        })

    });

    /*Test change name*/
    describe("change name", function () {
        it('Test valid name with wrong answer', () => {
            let user = new User(defaultName, defaultEmail, defaultPassword);
            const name = "Vlad"
            user.changeName(name, "wrong answer")
            assert.strictEqual(user.name, defaultName)
        })

        it('Test valid name with correct answer', () => {
            let user = new User(defaultName, defaultEmail, defaultPassword);
            const name = "Vlad"
            user.changeName(name, user._password)
            assert.strictEqual(user.name, name)
        })

        it('Test invalid change name', () => {
            let user = new User(defaultName, defaultEmail, defaultPassword);
            user.changeEmail(null, defaultPassword)
            assert.strictEqual(user.name, defaultName)

            user.changeEmail(undefined, defaultName)
            assert.strictEqual(user.name, defaultName)
        })
    });

    /*Test change email*/
    describe("change email", function () {
        it('Test valid change email with correct answer', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.changeSecurityQuestion("question", "answer")
            user.changeEmail("test@test.com", "answer")
            assert.strictEqual(user.email, "test@test.com")
        })

        it('Test valid change email with incorrect answer', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.changeSecurityQuestion("question", "answer")
            user.changeEmail("test@test.com", "wrong_answer")
            assert.strictEqual(user.email, defaultEmail)
        })

        it('Test invalid change email', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            user.changeEmail(null, defaultPassword)
            assert.strictEqual(user.email, defaultEmail)

            user.changeEmail(undefined, defaultPassword)
            assert.strictEqual(user.email, defaultEmail)
        })
    });

    /*Test_questionValidation method*/
    describe("Test_questionValidation", function () {
        it('Test _questionValidation method', () => {
            let user = new User(generateName(), defaultEmail, defaultPassword);
            assert.strictEqual(user._questionValidation(user._password), true)
            assert.strictEqual(user._questionValidation(null), false)
            user._answer = user._securityQuestion = null
            user.changeSecurityQuestion("qwe", "qwe")
            assert.strictEqual(user._questionValidation("qwe"), true)
        })
    });

    /*Test friends functionality*/
    describe("Test friends functionality", function () {
        it('Test addFriend method', () => {
            let user1 = new User(generateName(), "qqq", "qqqzzxc");
            let user2 = new User(generateName(), "asd", "asdqzxc");
            let user3 = new User(generateName(), "zxc", "zxcqqzxc");

            user1.addFriend(user2._id);
            user1.addFriend(user3._id);

            user2 = User.serializeUser(User.getUser(user2._id))
            user3 = User.serializeUser(User.getUser(user3._id))

            assert.deepStrictEqual(user1.friends, [user2.getInformation(), user3.getInformation()]);
        });

        it('Test deleteFriend method', () => {
            let user1 = new User(generateName(), "qwe", "qqwezxc");
            let user2 = new User(generateName(), "asd", "asqdzxc");
            let user3 = new User(generateName(), "zxc", "zxqczxc");

            user1.addFriend(user2._id);
            user1.addFriend(user3._id);

            user2 = User.serializeUser(User.getUser(user2._id))
            user3 = User.serializeUser(User.getUser(user3._id))

            assert.deepStrictEqual(user1.friends, [user2.getInformation(), user3.getInformation()]);
            user1.deleteFriend(user2._id)

            user2 = User.serializeUser(User.getUser(user2._id))

            assert.deepStrictEqual(user1.friends, [user3.getInformation()]);
        });

        it('Test friends methods with invalid data method', () => {
            let user1 = new User(generateName(), "qwe", "qwqweqwee");
            assert.throws(function () {
                user1.addFriend(null)
            }, Error)
            assert.throws(function () {
                user1.addFriend("")
            }, Error)
            assert.throws(function () {
                user1.deleteFriend("")
            }, Error)
            assert.throws(function () {
                user1.deleteFriend(null)
            }, Error)
        });
    });
}