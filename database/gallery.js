let db = require('./db')
let Gallery = db.Gallery;

let save = async (obj) => {
    try {
        let gallery = new Gallery(obj);
        let result = await gallery.save()
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}

let all = () => {
    return new Promise ((resolve, reject) => {
        Gallery.find()
            .then((data) => resolve(data))
            .then((err) => reject(err))
    })
}

module.exports = {
    save, all
}