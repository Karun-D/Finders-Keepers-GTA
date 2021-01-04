const express = require('express')
const bodyParser = require('body-parser'); 
const app = express()

const scrapers = require('./scrapers');
const db = require('./db');
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

// Use the express-static middleware to access HTML and CSS files
app.use(express.static("client"))

// Disables security block on local
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Retrieves listings from database
app.get('/listings', async(req, res) => {
    const listings = await db.getAllListings();
    res.send(listings)
})
 
// Inserts listings into database via webscraping
app.post('/listings', async(req, res) => {
    console.log(req.body)
    const kijijiData = await scrapers.scrapeKijiji(req.body.jsonContent);
    const craigsListData = await scrapers.scrapeCraigslist (req.body.jsonContent);
    const listings = db.insertListing(kijijiData, craigsListData);
    res.send(listings);
})

// Inserts listings into database via webscraping
app.post('/delete', async(req, res) => {
    console.log(req.body)
    db.removeListings(req.body.listingIDs);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})