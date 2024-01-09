const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/mediaDB";
const connect = mongoose.connect(url);

// const autoincrement = require('mongoose-auto-increment');
// autoincrement.initialize(mongoose.connection);

const AutoIncrement = require('mongoose-sequence')(mongoose);

const mongoosePaginate = require('mongoose-paginate-v2');

let schema = mongoose.Schema;

let Catscheme = new schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    since: { type: Date, required: true }
})

let ProductScheme = new schema({
    cat_id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    since: { type: Date, required: true }
})

let UserScheme = new schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    since: { type: Date, required: true }
})

let GalleryScheme = new schema({
    name: { type: String, require: true },
})

let dropColle = (colle) => {
    let db = mongoose.connection;

    return new Promise((resolve, reject) => {
        db.dropCollection(colle)
            .then((data) => resolve(colle + 'removed!'))
            .catch((err) => reject(err))
    })
}

let Cat = mongoose.model('category', Catscheme)

// ProductScheme.plugin(autoincrement.plugin, 'product')
ProductScheme.plugin(AutoIncrement, { inc_field: 'id' });
ProductScheme.plugin(mongoosePaginate);
let Product = mongoose.model('product', ProductScheme)

let User = mongoose.model('user', UserScheme)

GalleryScheme.plugin(AutoIncrement, { inc_field: 'galleryId' });
let Gallery = mongoose.model('gallery', GalleryScheme)

module.exports = {
    Cat, Product, User, Gallery, dropColle
}

