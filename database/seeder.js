const Cat = require('./cat');
const Product = require('./product')
const fs = require('fs').promises; // Use the promises version of fs

let seedCat = async () => {
    try {
        const data = await fs.readFile('categories.json');
        const cats = JSON.parse(data);

        for (const cat of cats) {
            const obj = {
                id: cat.id,
                name: cat.name,
                image: cat.image,
                since: new Date()
            };

            try {
                const result = await Cat.save(obj);
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

let seedProduct = async () => {
    try {
        const data = await fs.readFile('products.json');
        const products = JSON.parse(data);

        for (const product of products) {
            let productObj = {
                "cat_id": product.cat_id,
                "name": product.name,
                "price": product.price,
                "image": product.image,
                "description": product.description
            };

            try {
                const result = await Product.save(productObj);
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    seedCat, seedProduct
};
