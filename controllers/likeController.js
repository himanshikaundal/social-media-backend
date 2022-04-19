const Joi = require("joi");
const Dislike = require("../models/Dislike");
const Likes = require("../models/Likes")

module.exports={
    like:async(req,res,next)=>{
try{
    const schema = Joi.object({
        reactions: Joi.string().required(),
      });
      const { error,value } = schema.validate(req.body);
      if (error) return next(createError(400, error.message));
  
       
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
        const remove=await Likes.findByIdAndDelete(req.params.id);
        await remove.save();
        res.success(remove);
    }
    catch(error){
        res.error(error);
    }

}

}