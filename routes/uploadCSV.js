const express = require("express");
const route = express.Router();
const csvtojson = require("csvtojson");
const Agent = require("../database/Agent");
const Carrier = require("../database/Carrier");
const LOB = require("../database/LOB");
const Policy = require("../database/Policy");
const User_acc = require("../database/User_acc");
const User = require("../database/User");

const uploadCSV = () => {
  let csvDt = "";
  return new Promise((reject, resolve) => {
    csvtojson()
      .fromFile("./data-sheet.csv")
      .then((csvData) => {
        let agent = [];
        let carrier = [];
        let lob = [];
        let user_acc = [];
        let policy = [];
        let user = [];
        for (let i = 0; i < csvData.length; i++) {
          var agentData = {
            id: i,
            agent_name: csvData[i].agent,
            versionKey: false,
          };
          var carrierData = {
            id: i,
            company_name: csvData[i].company_name,
            versionKey: false,
          };
          var lobData = {
            id: i,
            category_name: csvData[i].category_name,
            versionKey: false,
          };
          var user_accData = {
            id: i,
            account_name: csvData[i].account_name,
            versionKey: false,
          };
          var policyData = {
            id: i,
            policy_number: csvData[i].policy_number,
            policy_start_date: csvData[i].policy_start_date,
            policy_end_date: csvData[i].policy_end_date,
            policy_category: csvData[i].category_name,
            collection_id: csvData[i].primary,
            company_collection_id: csvData[i].agency_id,
            user_id: i,
            versionKey: false,
          };
          var userData = {
            id: i,
            first_name: csvData[i].firstname,
            dob: csvData[i].dob,
            address: csvData[i].address,
            phone_number: csvData[i].phone,
            state: csvData[i].state,
            zip_code: csvData[i].zip,
            email: csvData[i].email,
            gender: csvData[i].gender,
            user_type: csvData[i].userType,
            versionKey: false,
          };
          //console.log(csvData[0].agent);

          agent.push(agentData);
          lob.push(lobData);
          carrier.push(carrierData);
          user_acc.push(user_accData);
          user.push(userData);
          policy.push(policyData);
        }

        Agent.insertMany(user)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (err) {
            console.log(err);
          });
        Carrier.insertMany(carrier)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (err) {
            console.log(err);
          });

        LOB.insertMany(lob)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (err) {
            console.log(err);
          });
        Policy.insertMany(policy)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (err) {
            console.log(err);
          });
        User_acc.insertMany(user_acc)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (err) {
            console.log(err);
          });
        User.insertMany(user)
          .then(function () {
            console.log("Data inserted");
          })
          .catch(function (err) {
            console.log(err);
          });
        console.log("success");
      });
  });
};

module.exports = uploadCSV;
