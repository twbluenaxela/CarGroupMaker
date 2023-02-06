const { isIfStatement } = require("@babel/types");
const express = require("express");
// const firebase = require('firebase')
const fs = require("fs");
const { initializeApp, getDatabase, set } = require("firebase-admin/app");
const admin = require("firebase-admin");
require("dotenv").config();
// const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.project_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
  }),
  databaseURL: "https://cargroupapp-default-rtdb.firebaseio.com",
});

let db = admin.database();
let rootRef = admin.database().ref();

const router = (module.exports = express.Router());

//const CarGroups = []

// Handle GET requests to /api route
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

async function writeToDatabase(obj) {}

// async function loadDatabase() {
//   rootRef.once("value").then(function (snapshot) {
//     console.log("Printing out snapshot values...");
//     console.log(snapshot.val());
//     // let cargroups = JSON.parse(snapshot.val());
//     let cargroups = snapshot.val();
//     // console.log(cargroups);
//     // res.send(cargroups)
//     return cargroups;
//   });
// }

router.post("/newcargroup", (req, res) => {
  console.log("Got the request to add a new car group.");
  console.log(req.body);
  const ReceivedCarGroupObj = req.body;
  // console.log("Reading database data...")
  // let rawdata = fs.readFileSync('db.json');
  // let carGroupsDb = JSON.parse(rawdata);
  // console.log("Here's what in the database currently.")
  // console.log(carGroupsDb)

  console.log("Reading firebase data...");
  rootRef.once("value").then(function (snapshot) {
    console.log("Printing out snapshot values...");
    // console.log(snapshot.val());
    // let carGroupsDb = JSON.parse(snapshot.val());
    let carGroupsDb = snapshot.val();
    console.log(carGroupsDb);
    // res.send(cargroups);
    let dataToWrite;
  if (
    carGroupsDb.CarGroups.some(
      (e) => e.CarGroupNumber == ReceivedCarGroupObj.CarGroupNumber
    )
  ) {
    carGroupsDb.CarGroups.forEach((element) => {
      console.log("Found existing car group with matching Car Group Number.");
      if (element.CarGroupNumber == ReceivedCarGroupObj.CarGroupNumber) {
        for (let property in element) {
          element[property] = ReceivedCarGroupObj[property];
        }
        console.log("Entry has been updated.");
        console.log(element);
      }
    });
    // dataToWrite = JSON.stringify(carGroupsDb);
    dataToWrite = carGroupsDb
  } else {
    carGroupsDb.CarGroups.push(ReceivedCarGroupObj);
    // dataToWrite = JSON.stringify(carGroupsDb);
    dataToWrite = carGroupsDb

  }

  console.log("Updating the database...");
  // fs.writeFileSync("db.json", dataToWrite);
  rootRef.set(dataToWrite)
  res.send("Added a new car group!");


  });


  //First, check if there is any entry currently in the database with
  //a matching car group number. If there is, then update that entry.
  //If not, then that new entry to the database.
  
  
});

router.get("/cargroupsdb", async (req, res) => {
  console.log("Reading firebase data...");
  let firebaseRawData = await rootRef.once("value").then(function (snapshot) {
    console.log("Printing out snapshot values...");
    // console.log(snapshot.val());
    // let cargroups = JSON.parse(snapshot.val());
    let cargroups = snapshot.val();
    console.log(cargroups);
    res.send(cargroups);
  });
  // let databaseRawInfo = await loadDatabase();
});

router.post("/deletecargroup", async (req, res) => {
  console.log("Received deletion request.");
  const carGroupToDelete = req.body;
  const isExistingCarGroup = (element) =>
    element.CarGroupNumber == carGroupToDelete.CarGroupNumber;
  // let rawdata = fs.readFileSync("db.json");
  // let carGroupsDb = JSON.parse(rawdata);

  rootRef.once("value").then(function (snapshot) {
    console.log("Printing out snapshot values...");
    // console.log(snapshot.val());
    // let carGroupsDb = JSON.parse(snapshot.val());
    let carGroupsDb = snapshot.val();
    console.log(carGroupsDb);


    console.log("Index of the item to be deleted.");
  let indexOfItemToDelete = carGroupsDb.CarGroups.findIndex(isExistingCarGroup);
  console.log(indexOfItemToDelete);
  if (indexOfItemToDelete > -1) {
    carGroupsDb.CarGroups.splice(indexOfItemToDelete, 1);
    console.log(carGroupsDb);
    // let data = JSON.stringify(carGroupsDb);
    let data = carGroupsDb
    console.log(data);
    console.log("Deleting from database...");
    rootRef.set(data)
  }
  res.send("Server: Deleted from database.");



    // res.send(cargroups);
  });


  
});
