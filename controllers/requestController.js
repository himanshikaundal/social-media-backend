module.exports={
    Request:(req,res,next)=>{
        if(req.body.id!== req.params.id){
            try{
                const user=User.findById(req.params.id);
                const meUser=User.findById(req.body.id);
                
            }
            catch(err){}
        }
    const newFriend=new Request({
        receiverUserId:req.body.id
    })
    }

}