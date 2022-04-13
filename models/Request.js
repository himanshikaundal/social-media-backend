<<<<<<< HEAD
const { string } = require('joi');
const mongoose=require('mongoose');
const requestSchema=new mongoose.Schema({
senderUserId:{
    type:mongoose.Schema.Types.ObjectId,ref:'User'
},

receiverUserId: {
 type: mongoose.Schema.Types.ObjectId, ref: 'User',
},
status:{
    type:string,
    enum:['REQUESTED','ACCEPTED']
}
});
module.exports=mongoose.model('Request',requestSchema);
=======
const mongoose = require('mongoose');
const User = require('./User');


const requestSchema = new mongoose.Schema({

    sentRequest: [
        {
            username: {
                type: String
            }
        }
    ],
    recieved: [
        {
            username: {
                type:String
            },
            user_id:{
                type:mongoose.Schema.Types.ObjectId

            }
        }
    ]
    ,
    friendList: [
        {
            friendId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            friendName: String

        }
    ],
    totalRequest: {
        type: Number
    }
})
>>>>>>> b8d88f9d81bd21f2418aaec6d0ca5e86df2d3e82
