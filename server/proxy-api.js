const { isIfStatement } = require("@babel/types");
const express = require("express");

// const webScraper = require("../webscraper");
// const categoryScraper = require("../categoryscraper")

const router = (module.exports = express.Router());

const CarGroups = []

// Handle GET requests to /api route
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.post("/scrape", async (req, res) => {
  console.log("Got the request!");
  console.log(req.body.url);
  let urlToSendBack = req.body.url;

  if (!urlToSendBack) return res.sendStatus(400);

   let fetchedResults = await webScraper.webScraper(urlToSendBack);
  console.log("Sending it back!");
  console.log(fetchedResults);
  res.send(fetchedResults);
});

router.post("/newcargroup", async(req, res)=> {
  console.log("Got the request to add a new car group.")
  console.log(req.body.CarGroupNumber);
  const CarGroupObj = req.body
  CarGroups.push(CarGroupObj)
  res.send("Hi!")
})

