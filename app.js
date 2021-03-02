const express = require("express");
const app = express();
const route = require("./routes/index");
const mongoose = require("mongoose");
const os = require("os-utils");
const uploadCSV = require("./routes/uploadCSV");

const { Worker, isMainThread, parentPort } = require("worker_threads");

var mongoDB =
  "mongodb+srv://aryasudhanshu:123@Vishal@cluster0.dnnzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

setInterval(
  () =>
    os.cpuUsage((v) => {
      if (v > 70) {
        console.log("CPU Usage (%): " + v);
        process.exit();
      }
    }),
  1000
);
if (isMainThread) {
  app.listen(process.env.port || 4321, () => {
    console.log("Server started at http://localhost:4321");
  });
  app.use(express.json());
  app.use("/", route);
  app.use((err, req, res, next) => {
    res.render("error", { title: "error", message: err.message });
  });
  const data = { upload: true };
  const worker = new Worker(__filename, { workerData: data });
  worker.postMessage({ upload: true });
  worker.on("message", (data) => {
    if (data === "uploaded") {
      worker.terminate();
    }
  });
} else {
  console.log("fghj");
  // const Admin = new mongoose.mongo.Admin();
  // const admin = new Admin(db.db);
  db.on("open", () => {
    const Admin = mongoose.mongo.Admin;
    const admin = new Admin(db.db);
    admin.listDatabases((err, data) => {
      let flag = 0;
      data.databases.forEach((data) => {
        if (data.name === "myFirstDatabase") flag = 1;
      });
      if (flag === 0) {
        uploadCSV().then((res) => {
          console.log("uploaded");
          parentPort.postMessage("uploaded");
        });
      }
    });
  });
}
