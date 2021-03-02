const mongoose = require('mongoose')


const CarrierSchema = new mongoose.Schema({
    id:{
        required:true,
        type:Number,
        unique:true
    },
    company_name:{
        type:String,
        trim:true
    }
    
})



const Carrier = mongoose.model('Carrier',CarrierSchema)
module.exports = Carrier