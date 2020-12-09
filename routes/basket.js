const express = require("express");
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

router.put("/addProduct",  async (req, res) =>{
  const basket = await Basket.findByIdAndUpdate(req.body.id);
  console.log(basket);
  res.send(basket);
})

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
 var price=productList.productArray[i].price;

    
    totalprice = totalprice + qnty*price ;
  }
  console.log(totalprice);
  basket.productList.totalprice=totalprice;
  basket = await Basket.add(basket);
  res.send(basket);
});

router.delete("/:id", async (req, res) => {
  const basket = await Basket.del(req.params.id);
  res.send(basket);
});

module.exports = router;
