function idCounter() {
    let id = 1;
    return () => id++;
}

let generateId = idCounter()


class User{
    constructor(name, email, passwd, securityQuestion = null, answer = null) {
        this._id = generateId()
        this.createdAt = new Date().toLocaleString()
        this.name = name;
        this.email = email;
        this._friends = []
        this._password = passwd.toString();
        this._securityQuestion = securityQuestion;
        this._answer = answer;
        User.prototype.allUser.push(this);
    }

    get friends() {
        let tempArray = []
        this._friends.forEach(el => tempArray.push(el.getInformation()))
        return tempArray
    }

    addFriend(user) {
        if (!(user instanceof User)) {
            throw Error("It`s not a user!")
        }
        this._friends.push(this._findUser(user))
        user._friends.push(this)
    }

    deleteFriend(user) {
        if (!(user instanceof User)) {
            throw Error("It`s not a user!")
        }
        this._friends = this._friends.filter(function (item) {
            return item._id !== user._id
        })
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
            name: this.name,
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

    _findUser(user) {
        return User.prototype.allUser.find((element) => element._id === user._id)
    }

}
User.prototype.allUser=[];

export default User;