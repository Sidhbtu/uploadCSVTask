const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema({
    id:{
        required:true,
        type:Number,
        unique:true
    },
    agent_name:{
        type:String,
        trim:true
    }
    
})



const Agent = mongoose.model('Agent',AgentSchema)
module.exports = Agent