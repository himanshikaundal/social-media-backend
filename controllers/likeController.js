const Dislike = require("../models/Dislike");
const Likes = require("../models/Likes")
const Joi=require('joi');
module.exports={
    like:async(req,res,next)=>{
try{
<<<<<<< HEAD

    const schema = Joi.object({
        reactions: Joi.string().required(),
        feed_id: Joi.string().required(),
        comment_id: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return next(error);

=======
       
>>>>>>> b8d88f9d81bd21f2418aaec6d0ca5e86df2d3e82
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