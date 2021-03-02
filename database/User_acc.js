const mongoose = require('mongoose')

const User_accSchema = new mongoose.Schema({
    id:{
        required:true,
        type:Number,
        unique:true
    },
    account_name:{
        type:String,
        trim:true
    }
    
})



const User_acc = mongoose.model('User_acc',User_accSchema)
module.exports = User_acc