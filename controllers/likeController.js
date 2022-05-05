const Joi = require("joi");
// const Dislike = require("../models/Dislike");
const Like = require("../models/Likes");
const Feed = require("../models/Feed");

module.exports = {
  like: async (req, res, next) => {
    try {
      const schema = Joi.object({
        reaction: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) return next(error);

      const post = await Feed.findById(req.params.id);
      //console.log(post);
      if (post) {
        //let userLiked= await Like.find({userId:req.loggedInUser._id});
        let userLiked = await Like.findOne().and([
          { feedId: req.params.id },
          { userId: req.loggedInUser._id },
        ]);
        console.log(userLiked);
        if (!userLiked) {
          const result = new Like({
            reaction: value.reaction,
            feedId: req.params.id,
            userId: req.loggedInUser._id,
          });
          await result.save();
          res.success(200, "Liked the post");
        } else {
          //dislike
          try {
            const remove = await Like.deleteOne({
              userId: req.loggedInUser._id,
            });
            // await remove.save();
            res.success(200, "disliked the post");
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        return next(createError(500, error.message));
      }
    } catch (error) {
      console.log(error);
    }
  },
};
