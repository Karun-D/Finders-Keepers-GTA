const puppeteer = require('puppeteer');

const craigslistURL = {
    "Ajax": "https://toronto.craigslist.org/d/free-stuff/search/drh/zip",
    "Aurora": "https://toronto.craigslist.org/search/yrk/zip?",
    "Brampton": "https://toronto.craigslist.org/d/free-stuff/search/bra/zip",
    "Brock": "https://toronto.craigslist.org/d/free-stuff/search/zip",
    "Burlington": "https://toronto.craigslist.org/d/free-stuff/search/zip",
    "Caledon": "https://toronto.craigslist.org/search/oak/zip?",
    "Clarington": "https://toronto.craigslist.org/d/free-stuff/search/drh/zip",
    "East Gwillimbury": "https://toronto.craigslist.org/search/yrk/zip?",
    "Georgina": "https://toronto.craigslist.org/search/yrk/zip?",
    "Halton Hills": "https://toronto.craigslist.org/search/oak/zip?",
    "King": "https://toronto.craigslist.org/search/yrk/zip?",
    "Markham": "https://toronto.craigslist.org/search/yrk/zip?",
    "Milton": "https://toronto.craigslist.org/search/oak/zip?",
    "Mississauga": "https://toronto.craigslist.org/d/free-stuff/search/mss/zip",
    "Newmarket": "https://toronto.craigslist.org/d/free-stuff/search/mss/zip",
    "Oakville": "https://toronto.craigslist.org/search/oak/zip?",
    "Oshawa": "https://toronto.craigslist.org/d/free-stuff/search/drh/zip",
    "Pickering": "https://toronto.craigslist.org/d/free-stuff/search/drh/zip",
    "Richmond Hill": "https://toronto.craigslist.org/d/free-stuff/search/yrk/zip",
    "Scugog": "https://toronto.craigslist.org/d/free-stuff/search/zip",
    "Toronto": "https://toronto.craigslist.org/d/free-stuff/search/zip",
    "Uxbridge": "https://toronto.craigslist.org/d/free-stuff/search/zip",
    "Vaughan": "https://toronto.craigslist.org/search/yrk/zip?",
    "Whitby": "https://toronto.craigslist.org/d/free-stuff/search/drh/zip"
};

const kijijiURL = {
    "Ajax": "https://www.kijiji.ca/b-free-stuff/oshawa-durham-region/c17220001l1700275?ll=43.850855%2C-79.020373&address=Ajax%2C+ON&radius=25.0",
    "Aurora": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=44.006480%2C-79.450396&address=Aurora%2C+ON&radius=25.0",
    "Brampton": "https://www.kijiji.ca/b-free-stuff/mississauga-peel-region/c17220001l1700276",
    "Brock": "https://www.kijiji.ca/b-free-stuff/kawartha-lakes/c17220001l1700219?ll=44.337569%2C-79.095410&address=Brock%2C+ON&radius=25.0",
    "Burlington": "https://www.kijiji.ca/b-free-stuff/hamilton/c17220001l80014?ll=43.325520%2C-79.799032&address=Burlington%2C+ON&radius=25.0",
    "Caledon": "https://www.kijiji.ca/b-free-stuff/oakville-halton-region/c17220001l1700277?ll=43.836337%2C-79.874484&address=Caledon%2C+ON&radius=25.0",
    "Clarington": "https://www.kijiji.ca/b-free-stuff/oshawa-durham-region/c17220001l1700275?ll=43.934535%2C-78.600034&address=Clarington%2C+ON&radius=25.0",
    "East Gwillimbury": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=44.101065%2C-79.441781&address=East+Gwillimbury%2C+ON&radius=25.0",
    "Georgina": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=44.296296%2C-79.436232&address=Georgina%2C+ON&radius=25.0",
    "Halton Hills": "https://www.kijiji.ca/b-free-stuff/oakville-halton-region/c17220001l1700277?ll=43.646987%2C-80.017663&address=Halton+Hills%2C+ON&radius=25.0",
    "King": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=43.963184%2C-79.605288&address=King%2C+ON&radius=25.0",
    "Markham": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=43.856100%2C-79.337019&address=Markham%2C+ON&radius=25.0",
    "Milton": "https://www.kijiji.ca/b-free-stuff/oakville-halton-region/c17220001l1700277?ll=43.518299%2C-79.877404&address=Milton%2C+ON&radius=25.0",
    "Mississauga": "https://www.kijiji.ca/b-free-stuff/mississauga-peel-region/c17220001l1700276?ll=43.589045%2C-79.644120&address=Mississauga%2C+ON&radius=25.0",
    "Newmarket": "https://www.kijiji.ca/b-free-stuff/mississauga-peel-region/c17220001l1700276?ll=43.589045%2C-79.644120&address=Newmarket%2C+ON&radius=25.0",
    "Oakville": "https://www.kijiji.ca/b-free-stuff/oakville-halton-region/c17220001l1700277?ll=43.467517%2C-79.687666&address=Oakville%2C+ON&radius=25.0",
    "Oshawa": "https://www.kijiji.ca/b-free-stuff/oshawa-durham-region/c17220001l1700275?ll=43.897093%2C-78.865791&address=Oshawa%2C+ON&radius=25.0",
    "Pickering": "https://www.kijiji.ca/b-free-stuff/oshawa-durham-region/c17220001l1700275?ll=43.838412%2C-79.086758&address=Pickering%2C+ON&radius=25.0",
    "Richmond Hill": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=43.882840%2C-79.440281&address=Richmond+Hill%2C+ON&radius=25.0",
    "Scugog": "https://www.kijiji.ca/b-free-stuff/kawartha-lakes/c17220001l1700219?ll=44.170115%2C-78.894457&address=Scugog%2C+ON&radius=25.0",
    "Toronto": "https://www.kijiji.ca/b-free-stuff/city-of-toronto/c17220001l1700273?ll=43.653226%2C-79.383184&address=Toronto%2C+ON&radius=25.0",
    "Uxbridge": "https://www.kijiji.ca/b-free-stuff/kawartha-lakes/c17220001l1700219?ll=44.109403%2C-79.120500&address=Uxbridge%2C+ON&radius=25.0",
    "Vaughan": "https://www.kijiji.ca/b-free-stuff/markham-york-region/c17220001l1700274?ll=43.856316%2C-79.508538&address=Vaughan%2C+ON&radius=25.0",
    "Whitby": "https://www.kijiji.ca/b-free-stuff/oshawa-durham-region/c17220001l1700275?ll=43.897545%2C-78.942933&address=Whitby%2C+ON&radius=25.0"
};

// Scrapes listings from Craigslist using user's city name and number of listings
async function scrapeCraigslist(jsonContent){
    const listings = [];
    const city = jsonContent["cityName"];
    const maxListings = Math.floor((parseInt(jsonContent["numListings"])) / 2.0);           // Scrapes half the desired listings
    const url = craigslistURL[city];

    /////////////////////////////////
    // Initialize headless browser //
    /////////////////////////////////

    const browser = await puppeteer.launch({
      'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector('.rows');
    const lis = await page.$$('.rows li')


    // Scrape listings
    for (var i = 0; i < maxListings; i++){
        let li = lis[i];

        //////////////////////////////////////////////////////////////////
        // Locate current listing details and initialize listing object //
        //////////////////////////////////////////////////////////////////

        let listing = {};

        const title = await li.$eval('h3', function(h3) {
            return h3.innerText;
        });
        const link = await li.$eval('a', function(a) {
            return a.getAttribute('href');
        });

        const date = await li.$eval('time', function(a) {
            return a.innerText;
        });

        listing["title"] = title;
        listing["link"] = link;
        listing["date"] = date;

        try {
            const location = await li.$eval('span[class="result-hood"]', function(span) {
                return span.innerText;
            });
            // console.log(title, link, location);
            listing["location"] = location;
            
        } catch (error) {
            // console.log(title, link, "LOCATION NOT SPECIFIED");
            listing["location"] = "LOCATION NOT SPECIFIED";
        }
        
    
        listings.push(listing);                     // Push listing to listings array
    }

    await console.log(listings);
    browser.close();
    return listings;                                // Return listings array
}

// Scrapes listings from Craigslist using user's city name and number of listings
async function scrapeKijiji(jsonContent){
    const listings = [];
    const city = jsonContent["cityName"];
    const maxListings = Math.ceil(parseInt(jsonContent["numListings"]) / 2.0);
    const url = kijijiURL[city];

    const browser = await puppeteer.launch({
      'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();

    await page.goto(url);

    const websiteListings = await page.$$('.info-container');

    // Scrape listings
    for (var i = 0; i < maxListings; i++){
    
        //////////////////////////////////////////////////////////////////
        // Locate current listing details and initialize listing object //
        //////////////////////////////////////////////////////////////////

        let websiteListing = websiteListings[i];
        let listing = {};

        const title = await websiteListing.$eval('a.title', function(a) {
            return a.innerText;
        });

        listing["title"] = title;

        const link = await websiteListing.$eval('a.title', function(a) {
            return a.getAttribute('href');
        });

        listing["link"] = "https://www.kijiji.ca" + link;

        try {
            const date = await websiteListing.$eval('span.date-posted', function(span) {
                return span.innerText;
            });

            listing["date"] = date;
        } catch (error) {
            continue;                           // Listing is a promoted ad, skip websiteListing
        }
    
        const location = await websiteListing.$eval('div.location span', function(span) {
            return span.innerText;
        });

        listing["location"] = location;

        // console.log(title, link, location);
        listings.push(listing);                 // Push listing to listings array
    }


    await console.log(listings);
    browser.close();
    return listings;                            // Return listings array
}

module.exports = {
    scrapeKijiji,
    scrapeCraigslist
}