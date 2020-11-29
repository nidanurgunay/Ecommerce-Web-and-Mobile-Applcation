express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Product = require('../models/products');
var expressAsyncHandler = require('express-async-handler');
router.use(bodyParser.json());
let d = new Date();

///// 
///product manager için post
//delete product 
//put product 
//get by id
//get by category
//get by 




router.post("/", async (req, res, next) => {

    const product = new Product({
        name: 'Erkek Bot',
        //seller: req.user._id,
        image: '../images/erkekbot.jpeg',
        price: 30,
        category: 'Bot',
        brand: 'sample brand',
        countInStock: 0,
        rate: 2,
        creationTime: d,
        modifictionTime: d,
        description: 'sample description',
        countInStock: 10,
        size: [40, 42, 44],
        gender: 'erkek',
    });
    try {
        const createdProduct = await product.save();
        res.send({ message: 'Product Created', product: createdProduct });
    } catch {
        res.status(500).send("error in posting product")
    }

});


// router.get('/', async (req, res) => {
//     try {
//         const name = req.query.name || '';
//         const category = req.query.category || '';
//         const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
//         const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
//         const rate = req.query.rate && Number(req.query.rate) !== 0 ? Number(req.query.rating) : 0;

//         const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
//         const categoryFilter = category ? { category } : {};
//         const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
//         const ratingFilter = rating ? { rating: { $gte: rating } } : {};
//         const sortOrder =
//             order === 'lowest'
//                 ? { price: 1 }
//                 : order === 'highest'
//                     ? { price: -1 }
//                     : order === 'toprated'
//                         ? { rating: -1 }
//                         : { _id: -1 };

//         const products = await Product.find({
//             ...sellerFilter,
//             ...nameFilter,
//             ...categoryFilter,
//             ...priceFilter,
//             ...ratingFilter,
//         })
//             .populate('seller', 'seller.name seller.logo')
//             .sort(sortOrder);
//         res.send(products);
//     } catch {
//         res.status(500).send("hataa")
//     }
// });

router.get('/categories', async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
});


router.get('/:id', expressAsyncHandler(async (req, res) => {
    var mongoose = require("mongoose");
    console.log(id)
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const product = await Product.findById(req.params.id)

        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }
    else
        res.status(404).send({ message: 'Invalid Id' });

}));

module.exports = router;
