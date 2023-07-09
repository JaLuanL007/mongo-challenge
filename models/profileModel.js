const mongoose = require(`mongoose`)
const userSchema = new mongoose.Schema({
    name:{type: String},
    adress:{type: Number},
    age:{type: Number}
})
const userModel = mongoose.model("users",userSchema)
module.exports = userModel