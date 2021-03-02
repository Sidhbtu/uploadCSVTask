const mongoose = require('mongoose')

const PolicySchema = new mongoose.Schema({
    id:{
        required:true,
        type:Number,
        unique:true
    },
    policy_number:{
        type:String,
        
    },
    policy_start_date:{
        type:Date,
        trim:true
    },
    policy_end_date:{
        type:Date,
        trim:true
    },
    policy_category:{
        type:String,
        trim:true
    },
    collection_id:{
        type:Number,
        trim:true
    },
    company_collection_id:{
        type:Number,
        trim:true
    },
    user_id:{
        type:Number,
        trim:true
    },
    
})



const Policy = mongoose.model('Policy',PolicySchema)
module.exports = Policy