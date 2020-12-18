var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema(
    {

        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "products",
            required: true
        },
        productmanager:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
            required: true
        },
        comments: [
            {
                commentId: Schema.Types.ObjectId,
                user: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "users"
                },
                
                rating:
                {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 5
                },
                text:
                {
                    type: String,
                    required: true
                }
            }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
