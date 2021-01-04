const express = require("express");
const { serializeUser } = require("passport");
const router = express.Router();

const Basket = require("../services/basket-service");

router.get("/all", async (req, res) => {
  const baskets = await Basket.findAll();
  res.send(baskets);
});

router.get("/:id", async (req, res) => {
  const basket = await Basket.find(req.params.id);
  res.send(basket);
});



router.post("/", async (req, res) => {
  var basket = req.body;
  var productList = basket.productList;
  console.log(productList);
  console.log(productList.productArray);
  console.log(productList.productArray.length);
  var totalprice = 0;
  for (var i = 0; i < productList.productArray.length; i++) {
    var qnty = productList.productArray[i].quantity;
    console.log(qnty);
    var price = productList.productArray[i].price;
    totalprice = totalprice + qnty * price;
  }
  console.log(totalprice);
  basket.productList.totalprice = totalprice;
  basket = await Basket.add(basket);
  res.send(basket);
});

router.put("/:BasketId", async (req, res) => {
  var arrayelement = req.body;
  var basket = await Basket.find(req.params.BasketId);
  console.log("basket", basket);
  var array = basket.productList.productArray;
  basket.productList.totalprice = basket.productList.totalprice + arrayelement.newprice * arrayelement.quantity;
  array.push(arrayelement);
  basket.productList.productArray = array;
  console.log(array);
  Basket.add(basket);
  res.send(basket);
  console.log(basket);
});

//increase the quantity by  one
router.put("/byOne/:BasketId", async (req, res) => {
  var productId = req.body.product;
  var basket = await Basket.find(req.params.BasketId);
  console.log("basket   ", basket);
  var array = basket.productList.productArray;
  console.log("arraay      ", array);
  var ifexist = false;
  for (var i = 0; i < array.length; i++) {
    console.log("product Id  ", productId)
    console.log("array product  ", array[i].product)
    if (productId == array[i].product) {
      console.log("if içerde")
      array[i].quantity = array[i].quantity + 1;
      basket.productList.totalprice = basket.productList.totalprice + array[i].newprice;
      basket.productList.productArray = array;
      ifexist = true;
      Basket.add(basket);
      res.send(basket);
      break;
    }
  }
  if (ifexist == false) {
    res.send("Product Id couldn't find")
  }

  console.log(basket);
});


router.put("/delete/:BasketId", async (req, res) => {
  var productId = req.body.product;
  var basket = await Basket.find(req.params.BasketId);
  var array = basket.productList.productArray;

  //array.push(arrayelement);
  for (var i = 0; array.length > i; i++) {
    if (array[i].product == productId) {
     
      basket.productList.totalprice = basket.productList.totalprice - array[i].quantity * array[i].newprice
      array.splice(i, 1);
      basket.productList.productArray = array;
      basket = await Basket.add(basket);
      res.send(basket);
      break;
    }
  }
});
router.put("/delete/byOne/:BasketId", async (req, res) => {
  var productId = req.body.product;
  var basket = await Basket.find(req.params.BasketId);

  var array = basket.productList.productArray;
  
  //array.push(arrayelement);
  for (var i = 0; array.length > i; i++) {
    if (array[i].product == productId) {
      
      if (array[i].quantity > 1) {
        array[i].quantity = array[i].quantity - 1;
        basket.productList.totalprice = basket.productList.totalprice - array[i].newprice
        basket.productList.productArray = array;

        basket = await Basket.add(basket);
        res.send(basket);
        break;
      }
      else{ //if quantity is 1 and whole product need to be removed from array
       
        basket.productList.totalprice = basket.productList.totalprice - array[i].newprice
        array.splice(i, 1);
        basket.productList.productArray = array;
      
        basket = await Basket.add(basket);
        res.send(basket);
        break;
      }
     
    }
  }
});

router.delete("/:id", async (req, res) => {
  const basket = await Basket.del(req.params.id);
  res.send(basket);
});

module.exports = router;
