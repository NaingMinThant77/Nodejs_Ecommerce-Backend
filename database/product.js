const db = require('./db');
const Product = db.Product;

let all = () => {
    return new Promise((resolve, reject) => {
        Product.find()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}

const save = (obj) => {
    return new Promise((resolve, reject) => {
        obj["since"] = new Date();
        let product = new Product(obj);
        product.save()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
};

let destory = async function (id) {
    try {
        let result = await Product.deleteOne({ id: id });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

const paginate = (start, count) => {
    const options = {
        sort: { id: 1 }, //ascend
        lean: true, // linear search, not jump
        page: start,
        limit: count // 100
        //1350 => 13.5(14) => 1 page = 100
    };

    console.log("Start :", start, "Count : ", count);

    return Product.paginate({}, options);
};

let findProductById = (id) => {
    return new Promise((resolve, reject) => {
        Product.find({ "cat_id": id })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}

module.exports = {
    all, save, destory, paginate, findProductById
};
