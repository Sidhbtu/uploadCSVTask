const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id:{
        required:true,
        type:Number,
        unique:true
    },
    first_name:{
        type:String,
        
    },
    dob:{
        type:Date,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    phone_number:{
        type:String,
        trim:true
    },
    state:{
        type:String,
        trim:true
    },
    zip_code:{
        type:String,
        trim:true 
    },
    email:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    user_type:{
        type:String,
        trim:true
    }
    
})



const User = mongoose.model('User',UserSchema)
module.exports = User