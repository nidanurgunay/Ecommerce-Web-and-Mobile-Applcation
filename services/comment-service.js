const BaseService = require("./base-service");
const Comment = require("../models/comments");

class CommentService extends BaseService {
 
  model = Comment;
}

module.exports = new CommentService();