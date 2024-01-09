let db = require('./db');
let User = db.User;

let save = async (obj) => {
    try {
        obj["since"] = new Date();
        let user = new User(obj);
        let result = await user.save();
        console.log(result);
    } catch (error) {
        console.error(error)
    }
}

let all = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}

let findUserById = async (id) => {
    try {
        let result = await User.findById(id)
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

let findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ "email": email })
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}

module.exports = {
    save, all, findUserById, findByEmail
}