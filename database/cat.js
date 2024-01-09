let db = require("./db")
let Cat = db.Cat;

let all = () => {
    return new Promise((resolve, reject) => {
        Cat.find()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}
//let all = () => Cat.find().exec();

let save = (obj) => {
    return new Promise((resolve, reject) => {
        let cat = new Cat(obj);
        cat.save()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
};

let update = (obj) => {
    return new Promise((resolve, reject) => {
        Cat.findById(obj.id)
            .then((data) => {
                data.name = obj.name;
                data.save()
                    .then((dat) => resolve(dat))
                    .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
    });
};

// let destory = (id) => {
//     return new Promise((resolve, reject) => {
//         Cat.deleteOne({ _id: id})
//             .then(() => resolve("OK"))
//             .catch((err) => reject(err));
//     });
// };

let destory = async function (id) {
    try {
        let result = await Cat.deleteOne({ _id: id});
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

let getPost = (localId, foreignID, table) => {
    return new Promise((resolve, reject) => {
        Cat.aggregate([{
            $lookup: {
                from : table,
                localField: localId,
                foreignField: foreignID,
                as: 'catposts'
            }
        }]).exec()
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}

module.exports = {
    all, save, update, destory, getPost
}