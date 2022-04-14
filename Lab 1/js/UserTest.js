import User from "./User.mjs";
import * as assert from "assert";

const defaultPassword = "123123123"
const defaultName = "John"
const defaultEmail = "user@com.com"

/*Test password function*/
it('Test valid password', () => {
    let user = new User(defaultName, defaultEmail, defaultPassword);
    user.resetPassword("qweasdzxc")
    assert.strictEqual(user._password, "qweasdzxc")
})

it('Test same passwords', () => {
    let user = new User(defaultName, defaultEmail, defaultPassword);
    user.resetPassword(defaultPassword)
    assert.strictEqual(user._password, defaultPassword)
})

it('Test short password', () => {
    let user = new User(defaultName, defaultEmail, defaultPassword);
    user.resetPassword("zxc")
    assert.strictEqual(user._password, defaultPassword)
})



/*Test change question*/
it('Test valid question but previously one was null', () => {
    let user = new User(defaultName, defaultEmail, defaultPassword);
    user.changeSecurityQuestion("qwe", "qwe")
    assert.strictEqual(user._securityQuestion, "qwe")
    assert.strictEqual(user._answer, "qwe")
})

it('Test valid question but previously one was not null', () => {
    let user = new User(defaultName, defaultEmail, defaultPassword);
    user.changeSecurityQuestion("qwe", "qwe")
    user.changeSecurityQuestion("zxc", "zxc", "qwe")
    assert.strictEqual(user._securityQuestion, "zxc")
    assert.strictEqual(user._answer, "zxc")
})

it('Test invalid answer on previously question', () => {
    let user = new User(defaultName, defaultEmail, defaultPassword);
    user.changeSecurityQuestion("question", "answer")
    user.changeSecurityQuestion("new_question", "new_answer", "wrong_answer")
    assert.strictEqual(user._securityQuestion, "question")
    assert.strictEqual(user._answer, "answer")
})


/*Test change name*/
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

