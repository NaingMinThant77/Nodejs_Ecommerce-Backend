let bcrypt = require('bcryptjs')

let encrypt = (pass) => {
    return new Promise((resolve, reject) => {
        let salt = bcrypt.genSaltSync(10);
        let encoded = bcrypt.hash(pass, salt);
        if(encoded != null) {
            resolve(encoded)
        } else {
            reject("Password Encoded Error!");
        }
    })
}

let compare = (plain, encode) => {
    return new Promise((resolve, reject) => {
        let com = bcrypt.compare(plain, encode);
        if (com) {
            resolve(com)
        } else {
            reject(com)
        }
    })
}

module.exports = {
    encrypt, compare
}