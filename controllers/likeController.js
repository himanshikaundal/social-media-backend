const Joi = require("joi");
// const Dislike = require("../models/Dislike");
const Like = require("../models/Likes");
const Feed = require("../models/Feed");

<<<<<<< HEAD
   
    const schema = Joi.object({
        reactions: Joi.string().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) return next(error);

       

    const result=new Likes({
        reactions:value.reactions,
        feed_id:req.params.id,
        comment_id:req.params.id,
        user_id:req.loggedInUser 
     })
     await result.save();
     res.success(result);
         }

catch(error){
    res.error(error);
}
}
,
dislike:async(req,res,next)=>{
    try{
        const remove=await Likes.findByIdAndDelete({user_id:req.params.id});
        await remove.save();
        res.success(remove);
    }
    catch(error){
        res.error(error);
=======
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
>>>>>>> 45d80d88c430de45f38b3ce003d28f255b3cc969
    }
  },
};
