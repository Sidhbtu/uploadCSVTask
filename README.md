# uploadCSVTask

run the following command

1=>npm init
2=> npm i express mongoose csvtojson os-utils pm2 router
3=>pm2 start app1.js
=> server will be started at http://localhost:4321

4=>pm2 logs   //for logs

=> to get the policy info with the help of username  http://localhost:4321/policy_info
     and pass firstname 

=> to get  aggregated policy by each user http://localhost:4321/aggregated_policy 

=> server will restart if cpu usages becomes more than 70%
