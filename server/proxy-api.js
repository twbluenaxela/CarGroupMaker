const { isIfStatement } = require("@babel/types");
const express = require("express");
const fs = require('fs');

// const webScraper = require("../webscraper");
// const categoryScraper = require("../categoryscraper")

const router = (module.exports = express.Router());

//const CarGroups = []



// Handle GET requests to /api route
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// router.post("/scrape", async (req, res) => {
//   console.log("Got the request!");
//   console.log(req.body.url);
//   let urlToSendBack = req.body.url;

//   if (!urlToSendBack) return res.sendStatus(400);

//    let fetchedResults = await webScraper.webScraper(urlToSendBack);
//   console.log("Sending it back!");
//   console.log(fetchedResults);
//   res.send(fetchedResults);
// });

router.post("/newcargroup", (req, res)=> {
  console.log("Got the request to add a new car group.")
  console.log(req.body);
  const ReceivedCarGroupObj = req.body
  console.log("Reading database data...")
  let rawdata = fs.readFileSync('db.json');
  let carGroupsDb = JSON.parse(rawdata);
  console.log("Here's what in the database currently.")
  console.log(carGroupsDb)
  const isExistingCarGroup = (element) => element.CarGroupNumber === ReceivedCarGroupObj.CarGroupNumber
  //First, check if there is any entry currently in the database with
  //a matching car group number. If there is, then update that entry.
  //If not, then that new entry to the database.
  let dataToWrite
  if(carGroupsDb.CarGroups.some(e => e.CarGroupNumber === ReceivedCarGroupObj.CarGroupNumber)){
    carGroupsDb.CarGroups.forEach(element => {
        console.log("Found existing car group with matching Car Group Number.")
        for(let property in element){
          // console.log(property,element[property]);
          element[property] = ReceivedCarGroupObj[property]
          // console.log(element[property])
        }
        console.log("Entry has been updated.")
        console.log(element)
    })
    dataToWrite = JSON.stringify(carGroupsDb)
  }else{
    
    carGroupsDb.CarGroups.push(ReceivedCarGroupObj)
    dataToWrite = JSON.stringify(carGroupsDb)
  }
  console.log("Updating the database...")
  fs.writeFileSync('db.json', dataToWrite)
  // if(carGroupsDb.CarGroups.some(e => e.CarGroupNumber === ReceivedCarGroupObj.CarGroupNumber)){
  //   console.log("Found an entry with the same car group number. Updating...")
  //   for (prop in e){
  //     console.log(prop)
  //     e.prop = ReceivedCarGroupObj.prop
  //   }
  // }
  // CarGroups.push(CarGroupObj)
  // console.log("Here's how many are in CarGroups: " + CarGroups.length)
  res.send("Added a new car group!")
})

router.get("/cargroupsdb", async(req, res) => {
  console.log("Reading database data...")
  let rawdata = fs.readFileSync('db.json');
  let cargroups = JSON.parse(rawdata);
  console.log(cargroups);
  // res.json({ message: "Hello from server!" });
  res.send(cargroups)


})

