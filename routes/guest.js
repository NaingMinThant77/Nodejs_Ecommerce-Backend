let Gallery = require('../database/gallery')
let Product = require('../database/product')
let Cat = require('../database/cat')

module.exports = (express) => {
    let router = express.Router();

    router.get('/home', (req, res) => {
        res.send("Guest Home Route")
    })

    router.get('/cats', (req, res) => {
        Cat.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    });

    router.get('/galleries', (req, res) => {
        Gallery.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    });

    router.get('/cat/:id', (req, res) => {
        let id = req.param('id')
        Product.findProductById(id)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
        // res.send(id)
    })

    //localhost:3000/product/3/50
    router.get('/product/:start/:count', (req, res) => {
        let start = req.param("start");
        let count = req.param("count");
        // res.send(`Start ${start}, count ${count}`);
        Product.paginate(start, count)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    })

    return router;
}