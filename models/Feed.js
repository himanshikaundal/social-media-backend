const  mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: false,
    }

})

const feedSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    media: [mediaSchema],
    createby:{
        type:String,
        required:true,
    }


}, { timestamps: true })

module.exports = mongoose.model('Feed', feedSchema);