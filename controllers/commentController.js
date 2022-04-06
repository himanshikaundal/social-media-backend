const createError = require('http-errors');
const Joi = require('joi');
const Comment = require('../models/Comment');
const Feed = require('../models/Feed')

module.exports = {

  createComment: async(req, res, next) => {
try {
        const schema=Joi.object({
          comment:Joi.string().required(),
          feed_id:Joi.string().required(),
          comment_id:Joi.string()
        })

        const{error,value}=schema.validate(req.body);
        if(error) return next(error);
      
      const comment = new Comment({
        comment: value.comment,
        feed_id:value.feed_id,
        comment_id:value.comment_id
 })
      const result = await comment.save();
      res.success(result);
    }
    catch (error) {
      return next(error);
    }
  },

  // listComment: (req, res, next) => {
  //   if(req.params.id===Feed._id)
  //   const comment = await Comment.findById(req.params.id);
  //   if (!comment) return next(createError(500, 'unable to find comment found'));
  //   const list = await comment.find()
  //     .populate('Feed')
  //   res.success(list);
  // },

  






}

