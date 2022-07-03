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
  const CarGroupObj = req.body
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

