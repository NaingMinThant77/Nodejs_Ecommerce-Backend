let cors = require('cors')
require('dotenv').config();
let express = require("express");
let app = express();

//Cat
const cat = require("./database/cat");

let catObj = {
    id: 11,
    name: "PC",
    image: 'pc.png',
    since: Date.now()
};

async function SaveData() {
    try {
        let result = await cat.save(catObj);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// cat.save(catObj).then(res => console.log(res)).catch(err => console.log(err))

// SaveData();

let obj = {
    id: '6591235c5a956ce3fd111bc8',
    name: "Laptop",
    image: 'laptop.png'
}

async function UpdateData() {
    try {
        let result = await cat.update(obj);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
// cat.update(obj).then(res => console.log(res)).catch(err => console.log(err))

// UpdateData();

async function DestoryData() {
    try {
        let result = await cat.destory('659120387c674865afab46fe');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
// cat.destory('658fd4118c9c668cdf105620').then(res => console.log(res)).catch(err => console.log(err))

// DestoryData();

//seeding
// const seeder = require('./database/seeder')
// seeder.seedCat();

// cat.all().then(res => console.log(res)).catch(err => console.log(err))

//  Product
const product = require('./database/product');

let productObj = {
    cat_id: 1,
    name: "Car",
    price: 3000,
    image: 'car.png',
    description: "No Desc",
};

async function SaveProductData() {
    try {
        let result = await product.save(productObj);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
// product.save(productObj).then(res => console.log(res)).catch(err => console.log(err))

// SaveProductData();

// product.all().then(res => console.log(res)).catch(err => console.log(err))

// product.destory(5).then(res => console.log(res)).catch(err => console.log(err))

//input json data to database
const seeder = require('./database/seeder')
// seeder.seedProduct();
// seeder.seedCat();

const db = require("./database/db");
// db.dropColle('categories').then(res => console.log(res)).catch(err => console.log(err))

// const cat = require("./database/cat");
// cat.getPost("id", "cat_id", "products")
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// product.paginate(5, 50)
//     .then((data) => { console.log(data); })
//     .catch((err) => { console.error(err); });


//user

const User = require('./database/user')
let userObj = {
    "name": "P1",
    "email": "person1@gmail.com",
    "password": "123"
};

// User.save(userObj).then(res => console.log(res)).catch(err => console.log(err))

// User.all().then(res => console.log(res)).catch(err => console.log(err))

// User.findUserById('659251810af29acb4c32be95').then(res => console.log(res)).catch(err => console.log(err))

// User.findByEmail('tester@gmail.com').then(res => console.log(res)).catch(err => console.log(err))

//Gallery
const Gallery = require('./database/gallery')

let galleryobj = {
    "name": "coder.png"
}

// Gallery.save(galleryobj).then(res => console.log(res)).catch(err => console.log(err))

// Gallery.all().then(res => console.log(res)).catch(err => console.log(err))

const passgen = require('./helper/passgen');
let pass = '123';   //$2a$10$2xqwkhcx4GIh00DZjycOuOxCWrP3UrwGyRJDvVXMnT4htq9.KZiLe
let encoded = '$2a$10$2xqwkhcx4GIh00DZjycOuOxCWrP3UrwGyRJDvVXMnT4htq9.KZiLe'

// passgen.encrypt(pass).then(res => console.log(res)).catch(err => console.log(err))

// passgen.compare(pass, encoded).then(res => console.log(res)).catch(err => console.log(err)) //true

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let jwt = require('jsonwebtoken');
let userRoute = require("./routes/user")(express, jwt)
app.use("/user", userRoute)

let passport = require('passport');
let adminRoute = require("./routes/admin")(express, passport)
app.use('/admin', adminRoute)

let guestRoute = require("./routes/guest")(express)
app.use('/', guestRoute)

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;

let myStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    let email = payload.email;
    let name = payload.name;
    User.findByEmail(email)
        .then(user => {
            if (user.name == name) {
                done(null, user);
            }
        })
        .catch(err => done(err, null));
});

passport.use(myStrategy)

path = require('path');
app.use(express.static(path.join(__dirname, './assets'))); //http://localhost:3000/uploads/1704340998647_android.png in browser

app.use(cors())

app.listen(process.env.PORT, () => {
    console.log("Server is running at Port", process.env.PORT);
});