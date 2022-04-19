const createError = require("http-errors");
const Joi = require("joi");
const Comment = require("../models/Comment");
const Feed = require("../models/Feed");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

      comment.createdby = req.loggedInUser._id;

      const result = await comment.save();

      const email = req.loggedInUser.email;
      const msg = {
        to: email,
        from: "himanshi.kaundal@tothenew.com",
        subject: "Posting comment",

        html: `<strong>Your comment has been successfully uploaded </strong>`,
      };

      await sgMail.send(msg);

      res.success(result);
    } catch (error) {
      return next(error);
    }
  },

  listComment: async (req, res, next) => {
    try {
      // const user=req.loggedInUser._id;
      // if(!user) return res.error(next(createError()))

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


};
