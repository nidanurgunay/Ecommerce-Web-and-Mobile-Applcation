
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* Todo Listeleme Islemi Burada Yapilacak. */
router.get('/', function(req, res, next) { 
    User.find().then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
});
/* Todo Ekleme Islemi Burada Yapilacak. */
router.post("/", function(req, res, next){
console.log("userdayım")
    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,

    }).save().then(() => {
        res.json("Kaydetme İşlemi Başarılı.");
    }).catch((err) => {
        res.json("Kaydetme İşleminde Hata Oluştu.");
    });
  
});
/* Todo Guncelleme Islemi Burada Yapilacak. */
router.put("/:id", function(req, res, next){
    var id = req.params.id;

    User.findByIdAndUpdate({"_id": id}, req.body).then((newUser) => {
        res.json("Güncelleme İşlemi Başarılı.");
    }).catch((err) => {
        res.json("Güncelleme İşleminde Hata Oluştu.");
    });
  
});
/* Todo Silme Islemi Burada Yapilacak. */
router.delete("/:id", function(req, res, next){
  
    var id = req.params.id;
    User.findByIdAndRemove(id).then(() => {
        res.json("Silme İşlemi Başarılı.");
    }).catch((err) => {
        res.json("Silme İşleminde Hata Oluştu.");
    });
  
});

module.exports = router;