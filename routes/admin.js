
let multer = require('multer')
let Gallery = require('../database/gallery')
let Product = require('../database/product')
let Cat = require('../database/cat')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname); // new Date()
    }
})
var upload = multer({ storage: storage })

module.exports = (express, passport) => {
    let router = express.Router();

    router.get('/home', (req, res) => {
        res.send("Admin Home Route")
    });

    router.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.send("Admin Secret Page");
    });

    router.post('/image/upload', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res, next) => {
        // res.send(req.file.filename);

        let obj = {
            name: req.file.filename
        };
        Gallery.save(obj)
            .then(result => res.json({ con: true, msg: req.file.filename }))
            .catch(err => res.json({ con: false, msg: err }))

    });

    //localhost:3000/admin/product/paginate/4/10
    //     "totalDocs": 1305,
    //     "limit": 10,
    //     "totalPages": 131,
    //     "page": 4,
    //     "pagingCounter": 31,
    //     "hasPrevPage": true,
    //     "hasNextPage": true,
    //     "prevPage": 3,
    //     "nextPage": 5
    router.get('/product/paginate/:start/:count', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        let start = req.param("start");
        let count = req.param("count");
        // res.send(`Start ${start}, count ${count}`);
        Product.paginate(start, count)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    })

    router.get('/cat/all', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        Cat.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    })

    router.get('/gallery/all', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        Gallery.all()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    })

    router.post('/product/create', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        let obj = {
            "cat_id": req.body.cat_id,
            "name": req.body.name,
            "price": req.body.price,
            "image": req.body.image,
            "description": req.body.description,
            // "since": new Date()
        }
        Product.save(obj)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }))
    })

    return router;
};
