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

router.get("/all", async (req, res) => {
  var orders = await Order.findAll();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  var order = await Order.find(req.params.id);
  res.send(order);
});

router.post("/", async (req, res) => {

  try {
    var email = req.body.email;
    var order = await Order.add(req.body);
    var basket = await Basket.find(order.basket);
    console.log(basket);
    const tp=basket.productList.totalprice;
    const parray=basket.productList.productArray;
    console.log(parray)

    
    const CLIENT_URL = 'http://localhost:5002'
    const data = {
        from: 'noreply@ecommerce.com',
        to: email,
        subject: 'Friendyol Order Email',
        message: `
        <h2>Thank you for shopping with FRIENDYOL</h2>
        <p> Your order status is "${order.status}" </p><br>
        <p> Your have purchased "${parray.length} items" </p><br>
        {% for item in parray %}
       
        <span>{{ item.name }}</span>  
       
        <span>Price: ${{ }}</span>  
        <span>Qty: {{ item.quantity }}</span>  		
      
      {% endfor %}
       
      
`

    };
    mg.messages().send(data, function (error, body) {
        if (error) {
            return res.json({
                message: error.message
            })
        }
        return res.status(200).json({ message: 'Order Email has been send'});

    });

} catch {
    res.status(500).send("email hataa")
}

  res.send(order);
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
