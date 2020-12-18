express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());


var Comment = require("../services/comment-service");

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
    res.send(comment);
});

router.put("/:id", async (req, res) => {
    var Comments = await Comment.find(req.params.id);
    var comment = req.body;
    console.log(comment);
    var comarray = Comments.comments;
    comarray.push(comment);
    Comments.comments = comarray;
    await Comment.add(Comments);
    res.send(Comments);
    console.log("final comments",)
});

router.put("/delete/:id", async (req, res) => {
    var Comments = await Comment.find(req.params.id);
    var deleteid = req.body.id;
    var comarray = Comments.comments;
    for (var i = 0; i < comarray.length; i++) {
        console.log(comarray[i])
        if (comarray[i]._id == deleteid) {
            comarray.splice(i, 1);
            Comments.comments = comarray;
            await Comment.add(Comments);
            res.send(Comments)
            break;
        }
    }

});

router.delete("/:id", async (req, res) => {
    var comment = await Comment.del(req.params.id);
    res.send(comment);
});

module.exports = router;
