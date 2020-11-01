const express = require('express');
const router = express.Router();
const multer = require('multer');
let Products = require('../models/product.model');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {

        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage });


//=================================
//             Product
//=================================

router.post("/uploadImage", upload.single("file"), (req, res) => {
    return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    
});


router.post("/uploadProduct", (req, res) => {


    //save all the data we got from the client into the DB 
    const product = new Products(req.body)

    product.save() 
        
    return res.status(200).json({ success: true })

});

router.post("/getproduct", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    Products.find()
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, product) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, product })
    })
});


module.exports = router;
