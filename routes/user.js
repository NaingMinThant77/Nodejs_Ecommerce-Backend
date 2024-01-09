let passgen = require('../helper/passgen');
let User = require('../database/user');

module.exports = (express, jwt) => {
    let router = express.Router();

    router.post('/api/login', (req, res) => {
        let email = req.body.email;
        let pass = req.body.password;

        User.findByEmail(email)
            .then(user => {
                // res.send({ con: true, msg: user })
                passgen.compare(pass, user.password)
                    .then(result => {
                        // res.send({ con: true, msg: result }) // result = true
                        let payload = {email: user.email, name: user.name};
                        let token = jwt.sign(payload, process.env.SECRET);
                        res.send({con: true, token: token})
                        // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNvQGdtYWlsLmNvbSIsIm5hbWUiOiJtYXJjbyIsImlhdCI6MTcwNDIwNzE4MH0.ImFW_njtR6_RLkySslEL_J6Yfn1Tgco08yKcSovGl_s"
                    })
                    .catch(err => res.send({ con: true, msg: err }))
            })
            .catch(err => res.send({ con: false, msg: err }))
    });

    // router.post('/api/register', (req, res) => {
    //     if (req.body && req.body.name && req.body.email && req.body.password) {
    //         let name = req.body.name;
    //         let email = req.body.email;
    //         let password = req.body.password;

    //         passgen.encrypt(password)
    //             .then(pass => {
    //                 // res.send({ con: true, pass })
    //                 let Uobj = {
    //                     "name": name,
    //                     "email": email,
    //                     "password": pass
    //                 };
    //                 User.save(Uobj)
    //                     .then(user => res.send({ con: true, msg: user }))
    //                     .catch(err => res.send({ con: false, msg: err }))
    //             })
    //             .catch(err => res.send({ con: false, msg: err }))

    //         // res.send("Name :" + name + " Email :" + email + " Password : " + password);
    //     } else {
    //         res.status(400).send("Invalid request body");
    //     }
    // });

    router.post('/api/register', async (req, res) => {
        try {
            if (req.body && req.body.name && req.body.email && req.body.password) {
                let name = req.body.name;
                let email = req.body.email;
                let password = req.body.password;

                let pass = await passgen.encrypt(password);

                let Uobj = {
                    "name": name,
                    "email": email,
                    "password": pass
                };

                let user = await User.save(Uobj);

                res.send({ con: true, msg: user });
            } else {
                res.status(400).send("Invalid request body");
            }
        } catch (error) {
            console.error(error);
            res.send({ con: false, msg: error });
        }
    });


    return router;
};
