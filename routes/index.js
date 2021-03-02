const express = require("express");
const route = express.Router();
const csvtojson = require("csvtojson");
const Agent = require("../database/Agent");
const Carrier = require("../database/Carrier");
const LOB = require("../database/LOB");
const Policy = require("../database/Policy");
const User_acc = require("../database/User_acc");
const User = require("../database/User");

route.get("/policy_info", (req, res, next) => {
  var firstname = req.query.firstname;
  var result = [];

  User.find({ first_name: firstname }, (err, user) => {
    if (err) console.error(err);

    Policy.find({ id: user[0].id }, (err, policyInfo) => {
      if (err) console.error(err);
      console.log(policyInfo[0]);
      result[0] = policyInfo[0];
      return res.send(policyInfo[0]);
    });
  });
});

route.get("/aggregated_policy", (req, res, next) => {
  Policy.aggregate([
    {
      $lookup: {
        from: "users", // collection name in db
        localField: "_id",
        foreignField: "user_id",
        as: "worksnapsTimeEntries",
      },
    },
  ]).exec(function (err, policy) {
    // students contain WorksnapsTimeEntries
    res.send(policy);
  });
});

route.get("/", (req, res, next) => {
  res.send("hello");
});

// route.post('/addtodb',(req,res,next)=>{
//     let csvDt=""
//     csvtojson()
//   .fromFile("data-sheet.csv")
//   .then(csvData => {

//       for(let i=0;i<csvData.length;i++){
//     var agentData = { id:i, agent_name : csvData[i].agent,versionKey:false}
//     var carrierData = { id:i, company_name : csvData[i].company_name,versionKey:false}
//     var lobData = { id:i, category_name : csvData[i].category_name,versionKey:false}
//     var user_accData = { id:i, account_name : csvData[i].account_name,versionKey:false}
//     var policyData = { id:i,policy_number : csvData[i].policy_number,policy_start_date : csvData[i].policy_start_date,policy_end_date : csvData[i].policy_end_date,policy_category : csvData[i].category_name,collection_id : csvData[i].primary,company_collection_id : csvData[i].agency_id,user_id : i, versionKey:false}
//     var userData = { id:i, first_name : csvData[i].firstname, dob : csvData[i].dob, address : csvData[i].address, phone_number : csvData[i].phone, state : csvData[i].state,zip_code : csvData[i].zip,email : csvData[i].email,gender : csvData[i].gender,  user_type : csvData[i].userType,versionKey:false}
//     //console.log(csvData[0].agent);
//     Agent.create(agentData,(err,user)=>{
//         if(err) return next(err)

//     })
//     Carrier.create(carrierData,(err,user)=>{
//         if(err) return next(err)

//     })
//     LOB.create(lobData,(err,user)=>{
//         if(err) return next(err)

//     })
//     Policy.create(policyData,(err,user)=>{
//         if(err) return next(err)

//     })
//     User_acc.create(user_accData,(err,user)=>{
//         if(err) return next(err)

//     })
//     User.create(userData,(err,user)=>{
//         if(err) return next(err)

//     })
// }
// console.log("success");
// return res.send(csvData[0])
//   }
// )

// })

module.exports = route;
