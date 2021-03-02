const mongoose = require('mongoose')


const LOBSchema = new mongoose.Schema({
    id:{
        required:true,
        type:Number,
        unique:true
    },
    category_name:{
        type:String,
        trim:true
    }
    
})



const LOB = mongoose.model('LOB',LOBSchema)
module.exports = LOB