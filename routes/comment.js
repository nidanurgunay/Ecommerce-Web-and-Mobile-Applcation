express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());


var Comment = require("../services/comment-service");
var Product = require("../services/products-service");
router.get("/all", async (req, res) => {
    var comment = await Comment.findAll();
    res.send(comment);
});

router.get("/:id", async (req, res) => {
    var comments = await Comment.find(req.params.id);
    res.send(comments);
});

router.post("/", async (req, res) => {
    console.log(req.body)

    var comment = await Comment.add(req.body);
    console.log(comment);
    var product = await Product.find(req.body.product);
    
    product.commentId=comment._id;
    product.rate=comment.totalRate;
    await Product.add(product);
    res.send(comment);
});

//To add new comment
router.put("/:id", async (req, res) => { //comment idsi gönderilmeli, product objesinin içinde var
    var Comments = await Comment.find(req.params.id);
    var comment = req.body;
   
    var comarray = Comments.comments;
    comarray.push(comment);
    Comments.comments = comarray;

    var prevrates=Comments.totalcomment*Comments.totalRate;
    Comments.totalcomment=Comments.totalcomment+1;
    Comments.totalRate=(prevrates+req.body.rating)/Comments.totalcomment;

    var product = await Product.find(Comments.product);
   

    product.rate=Comments.totalRate;
    await Product.add(product);

    await Comment.add(Comments);
    res.send(Comments);
   
});

//validate comments
router.put("/validate/:id", async (req, res) => { //comment idsi gönderilmeli, product objesinin içinde var
    var Comments = await Comment.find(req.params.id);
    var commentid = req.body.id;
   console.log(commentid)
    var comarray = Comments.comments;
    console.log(comarray)
    for (var i = 0; i < comarray.length; i++) {
       
        if (comarray[i]._id == commentid) {
            console.log(comarray[i])
           comarray[i].isValid =true;
           Comments.comments = comarray;
            break;
        }
    }


    await Comment.add(Comments);
    res.send(Comments);
   
});

//to delete a comment
router.put("/delete/:id", async (req, res) => {
    var Comments = await Comment.find(req.params.id);
    var deleteid = req.body.id;
    var comarray = Comments.comments;
    var prevrates=Comments.totalcomment*Comments.totalRate;
    for (var i = 0; i < comarray.length; i++) {
        console.log(comarray[i])
        if (comarray[i]._id == deleteid) {

            Comments.totalcomment=Comments.totalcomment-1;
            Comments.totalRate=(prevrates-comarray[i].rating)/Comments.totalcomment;


            comarray.splice(i, 1);
            Comments.comments = comarray;
         
            break;
        }
    }
    var product = await Product.find(Comments.product);
    product.rate=Comments.totalRate;
    await Product.add(product);
    await Comment.add(Comments);
    res.send(Comments)

});

router.delete("/:id", async (req, res) => {
    var comment = await Comment.del(req.params.id);
    res.send(comment);
});

module.exports = router;
