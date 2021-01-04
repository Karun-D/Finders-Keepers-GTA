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

////////////////////////////////////
// Add MYSQL database information //
////////////////////////////////////

// async function getConnection() {
//     try {
//         return await typeorm.createConnection({
//             type: "mysql",
//             host: "localhost",
//             port: 3306,
//             username: "root",
//             password: ,
//             database: ,
//             synchronize: true,
//             logging: false,
//             entities: [
//                 ListingSchema
//             ]
//         })
//     } catch (err) {
//         // If AlreadyHasActiveConnectionError occurs, return already existent connection
//         if (err.name === "AlreadyHasActiveConnectionError") {
//           const existentConn = typeorm.getConnectionManager().get("default");
//           return existentConn;
//         } 
//     }
    
// }

// Get all listings from database
async function getAllListings() {
    const connection = await getConnection();
    const listingRepo = connection.getRepository(Listing);
    const listings = await listingRepo.find();
    connection.close();
    return listings;
}

// Insert listing from database
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

// Remove listing from database
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