const createError = require("http-errors");
const Joi = require("joi");
const Comment = require("../models/Comment");
const Feed = require("../models/Feed");

module.exports = {
  createComment: async (req, res, next) => {
    try {
      const schema = Joi.object({
        comment: Joi.string().required(),
        feed_id: Joi.string().required(),
        comment_id: Joi.string(),
      });

      const { error, value } = schema.validate(req.body);
      if (error) return next(error);

      const comment = new Comment({
        comment: value.comment,
        feed_id: value.feed_id,
        comment_id: value.comment_id
      });

      comment.createdby=req.loggedInUser._id;
      const result = await comment.save();
      res.success(result);
    } catch (error) {
      return next(error);
    }
  },

  listComment: async (req, res, next) => {
    try {
      const comments = await Comment.find({ feed_id: req.params.id }).select('comment -_id');
      
      res.success(comments);
    }

    catch (error) {
      res.error(error);
    }


  },

  update: async (req, res, next) => {

    try {
      const result = await Comment.findByIdAndUpdate(req.params.id, { comment: req.body.comment });
      await result.save();
      res.success(result);
    }
    catch (error) {
      res.error(error);

    }

  },
  delete: async (req, res, next) => {
    try {
      const result = await Comment.deleteOne({ _id: req.params.id });
      res.success(result);
    }
    catch (error) {
      res.error(error);
    }

  }


} ;
