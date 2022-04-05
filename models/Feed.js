
const feedSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }
  
})

module.exports = mongoose.model('Feed', feedSchema);