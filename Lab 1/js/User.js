function generateId() {
    let id = parseInt(localStorage.getItem('idCounter'));
    if (id === null) {
        localStorage.setItem('idCounter', '0')
    }
    let newId = id + 1;
    localStorage.setItem('idCounter', newId.toString());
    return newId;
}

class User {
    constructor(name,
                email,
                passwd,
                age = null,
                address = null,
                securityQuestion = null,
                answer = null,
                _id = null,
                createdAt = null,
                friends = null
    ) {
        this._id = _id ? _id : generateId();
        this.createdAt = createdAt ? createdAt : new Date().toLocaleString();
        this.name = name;
        this.email = email;
        this.age = age;
        this.address = address;
        this._friends = friends ? friends : []

        if (this._passwordValidation(passwd.toString())) {
            this._password = passwd.toString()
        } else {
            alert('Short password!')
            throw Error('Short password!')
        }

        this._securityQuestion = securityQuestion;
        this._answer = answer;
        if (!window.localStorage.getItem(this._id)) {
            window.localStorage.setItem(this._id, JSON.stringify(this));
        }
    }

    get friends() {
        let tempArray = []
        this._friends.forEach(el => tempArray.push(el))
        return tempArray
    }

    addFriend(user_id) {
        let userInfo = User.getUser(user_id)
        if (!(userInfo)) {
            console.log("User does not exist!")
        }
        let user = User.serializeUser(userInfo)

        // Add friends
        this._friends.push(user.getInformation())
        user._friends.push(this.getInformation())

        // Save changes
        window.localStorage.setItem(this._id, JSON.stringify(this));
        window.localStorage.setItem(user._id, JSON.stringify(user));
    }

    deleteFriend(user_id) {
        let userInfo = User.getUser(user_id)
        if (!(userInfo)) {
            console.log("User does not exist!")
        }
        let user = User.serializeUser(userInfo)
        this._friends = this._friends.filter(function (item) {
            return item._id !== user._id
        })

        // Save changes
        window.localStorage.setItem(this._id, JSON.stringify(this));
        window.localStorage.setItem(user._id, JSON.stringify(user));
    }

    resetPassword(newPassword) {
        if (this._passwordValidation(newPassword)) {
            this._password = newPassword.toString();
            console.log("Successful");
        } else {
            console.log("Wrong password. The password cannot be the same and must be more than six characters long.");
        }
    }

    changeEmail(email, answer) {
        if (this._questionValidation(answer)) {
            this.email = (email !== null && email !== undefined) ? email.toString() : this.email
        } else {
            console.log("Answer is wrong.")
        }
    }

    changeName(name, answer) {
        if (this._questionValidation(answer)) {
            this.name = (name !== null && name !== undefined) ? name.toString() : this.name
            console.log("U successful change name!")
        } else {
            console.log("Answer is wrong.")
        }
    }

    changeSecurityQuestion(newSecurityQuestion, newAnswer, answer = null) {
        if (this._securityQuestion === null || this._questionValidation(answer)) {
            this._securityQuestion = newSecurityQuestion.toString()
            this._answer = newAnswer.toString()
            console.log("Question set successful!")
        } else
            console.log("Wrong answer!")
    }

    getInformation() {
        return {
            _id: this._id,
            name: this.name,
            age: this.age,
            address: this.address,
            email: this.email,
            createdAt: this.createdAt
        };
    }

    _passwordValidation(newPasswd) {
        return newPasswd.toString().length > 6;
    }

    _questionValidation(answer) {
        return (this._securityQuestion === null && answer === this._password) || (this._answer === answer && answer !== null);
    }

    static getUser(user_id) {
        try {
            return JSON.parse(localStorage.getItem(user_id))
        } catch {
            throw Error("User does not exists")
        }
    }

    static serializeUser(data) {
        return new User(
            data.name,
            data.email,
            data._password,
            data.age,
            data.address,
            data._securityQuestion,
            data._answer,
            data._id,
            data.createdAt,
            data._friends,
        )
    }
}

export default User;