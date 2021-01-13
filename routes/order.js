express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
let d = new Date();

const mailgun = require("mailgun-js");
const passport = require('passport');
const DOMAIN = 'sandbox387fdc914bd44fb7a7ff7c5cf325a53a.mailgun.org';
const API_KEY = '75ed49265d30f00af00ff7ef24c28fba-360a0b2c-97875b1a'
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });


var Order = require("../services/order-service");
const Basket = require("../services/basket-service");
const Address = require("../services/adress-service");
router.get("/all", async (req, res) => {
  var orders = await Order.findAll();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  var order = await Order.find(req.params.id);
  res.send(order);
});
router.get("/user/:id", async (req, res) => {
console.log(req.params.id)
  var order = await Order.findprevOrder(req.params.id);
  res.send(order);
});

router.post("/", async (req, res) => {

  try {
    var email = req.body.email;
    console.log("req", req.body)
    var order = await Order.add(req.body);
    var basket = await Basket.find(order.basket);
    console.log("baskett",basket);
    const tp=basket.productList.totalprice;
    const parray=basket.productList.productArray;
    console.log("parray", parray)
    console.log("order.address", order.address)

    var address = await Address.find(req.body.address);
    console.log(address)
    const CLIENT_URL = 'http://localhost:5008'
    const data = {
        from: 'noreply@ecommerce.com',
        to: email,
        subject: 'Friendyol Order Email',
        html: `
        <h2>Thank you for shopping with FRIENDYOL</h2>
        <p> Your order status is "${order.status}" </p><br>
        <p> Your have purchased "${parray.length} items" </p><br>
       
`

    };
    parray.forEach((element) => {
      data.html = data.html + `<span>Name: ${element.name}</span><br>`;
      data.html = data.html + `<span>Price: ${element.price} TL</span><br>`;
      data.html = data.html + `<span>Size: ${element.size}</span><br>`;
      data.html =
        data.html + `<span>Quantity: ${element.quantity}</span><br><br>`;
    });
    data.html = data.html + `<span>Total Price:$${tp}</span><br><br>`;
    data.html =
      data.html +
      `<span>You can track your order with this id ${order._id}</span><br><br>`;
    data.html = data.html + `<span>Address: ${address.adress}</span><br><br>`;
    mg.messages().send(data, function (error, body) {
        if (error) {
            return res.json({
                message: error.message
            })
        }
        return res.status(200).json({ message: 'Order Email has been send', order:order});

    });

} catch {
    res.status(500).send("email hataa")
}

 
});

router.delete("/:id", async (req, res) => {
  var order = await Order.del(req.params.id);
  res.send(order);
});

router.put("/:id", async (req, res) => {
  var order = await Order.find(req.params.id);
  order.status = req.body.status;
  var order1 = await Order.add(order);
  res.send(order1);
});
module.exports = router;
