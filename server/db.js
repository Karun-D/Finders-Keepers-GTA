//mysql --host=us-cdbr-east-02.cleardb.com --user=bdccc9d7020c79 --password=d49cf4a5 --reconnect heroku_b5198c496ea8f6b

// CREATE TABLE IF NOT EXISTS `goldentrash` (
//   id int(11) PRIMARY KEY AUTO_INCREMENT,
//   title varchar(255),
//   location text,
//   date text,
//   link text
// );


// NEW DATABASE
// CLEARDB_DATABASE_URL: mysql://bedae71d7e6892:dbd83021@us-cdbr-east-02.cleardb.com/heroku_5228725b72417b7?reconnect=true
// heroku config:set DATABASE_URL='mysql://bedae71d7e6892:dbd83021@us-cdbr-east-02.cleardb.com/heroku_5228725b72417b7?reconnect=true'

// username - bedae71d7e6892
// password - dbd83021
// host - us-cdbr-east-02.cleardb.com
// db - heroku_5228725b72417b7


// mysql --host=us-cdbr-east-02.cleardb.com --user=bedae71d7e6892 --password=dbd83021 --reconnect heroku_5228725b72417b7

const typeorm = require('typeorm');

// Listing Object
class Listing {
    constructor(id, title, location, date, link) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.date = date;
        this.link = link;
    }    
}

const EntitySchema = require("typeorm").EntitySchema; 

const ListingSchema = new EntitySchema({
    title: "Listing",
    target: Listing,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        location: {
            type: "text"
        },
        date: {
            type: "text"
        },
        link: {
            type: "text"
        }
    }
});

/////////////////////////////////////////////////////////////
// REPLACE CONNECTION VARIABLES WITH ENVIRONMENT VARIABLES //
/////////////////////////////////////////////////////////////

// async function getConnection() {
//     try {
//         return await typeorm.createConnection({
//             type: "mysql",
//             host: "us-cdbr-east-02.cleardb.com",
//             port: 3306,
//             username: "bedae71d7e6892",
//             password: "dbd83021",
//             database: "heroku_5228725b72417b7",
//             synchronize: true,
//             logging: false,
//             entities: [
//                 ListingSchema
//             ]
//         })
//     } catch (err) {
//         console.log(err.name);
//         // If AlreadyHasActiveConnectionError occurs, return already existent connection
//         if (err.name === "AlreadyHasActiveConnectionError") {
//           const existentConn = typeorm.getConnectionManager().get("default");
//           return existentConn;
//         } 
//     }
// }

async function getConnection() {
    try {
        return await typeorm.createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "b+cP3?8zG7",
            database: "goldentrash",
            synchronize: true,
            logging: false,
            entities: [
                ListingSchema
            ]
        })
    } catch (err) {
        // If AlreadyHasActiveConnectionError occurs, return already existent connection
        if (err.name === "AlreadyHasActiveConnectionError") {
          const existentConn = typeorm.getConnectionManager().get("default");
          return existentConn;
        } 
    }
    
}

async function getAllListings() {
    const connection = await getConnection();
    const listingRepo = connection.getRepository(Listing);
    const listings = await listingRepo.find();
    connection.close();
    return listings;
}

async function insertListing(kijijiData, craigsListData) {
    const connection = await getConnection();                           // Create new connection to DB
    const listingRepo = connection.getRepository(Listing);              // Get DB repo using connection variable
    
    // Iterate over array of listing objects scraped from kijiji
    for (var i = 0; i < kijijiData.length; i++){
        const listing = new Listing();                                  // Create new listing object

        // Update listing object values
        listing.title = kijijiData[i]["title"];
        listing.location = kijijiData[i]["location"];
        listing.date = kijijiData[i]["date"];
        listing.link = kijijiData[i]["link"];

        const res = await listingRepo.save(listing);                    // Save listing to database
        console.log('saved', res);
    }

    for (var i = 0; i < craigsListData.length; i++){
        const listing = new Listing();
        listing.title = craigsListData[i]["title"];
        listing.location = craigsListData[i]["location"];
        listing.date = craigsListData[i]["date"];
        listing.link = craigsListData[i]["link"];

        const res = await listingRepo.save(listing);
        console.log('saved', res);
    }

    const allListings = await listingRepo.find();                       // Store array of newly scraped listings
    connection.close(); 

    return allListings;                                                 // Return array of newly scraped listings
}

async function removeListings(listingIDs) {
    const connection = await getConnection();                           // Create new connection to DB
    const listingRepo = connection.getRepository(Listing);              // Get DB repo using connection variable

    for (var i = 0; i < listingIDs.length; i++){
        const removedListing = await listingRepo.findOne(listingIDs[i]);
        await listingRepo.remove(removedListing);
        console.log(listingIDs[i],"removed");

        if (i == (listingIDs.length - 1)) {
            connection.close(); 
        }
    }
}

module.exports = {
    getAllListings,
    insertListing,
    removeListings
}