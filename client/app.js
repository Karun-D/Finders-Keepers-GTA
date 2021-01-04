// Sends user input to Express API
function submitCity() {
    const cities = ["Ajax","Aurora","Brampton","Brock","Burlington","Caledon","Clarington","East Gwillimbury","Georgina","Halton Hills","King","Markham","Milton","Mississauga","Newmarket","Oakville","Oshawa","Pickering","Richmond Hill","Scugog","Toronto","Uxbridge","Vaughan","Whitby"];

    // Reads the name of the city entered in the input Box when the user clicks the submit button
    const cityName = document.querySelector("#title").value;
    const numListings = document.querySelector("#numListings").value;

    // Error checking
    if ((cities.indexOf(cityName) < 0) || (cityName === "")){
        alert('The city name "' + cityName + '" is not recognized.');
        return;
    } else if ((parseInt(numListings) < 1) || (parseInt(numListings) > 40) || (numListings === "")) {
        alert('Please enter in an integer between 1 and 40.');
        return;
    } 

    const jsonContent = {
        "cityName": cityName,
        "numListings": numListings
    };

    console.log(jsonContent);

    // Uploads JSON data to API
    // fetch("https://finders-keepers-gta.herokuapp.com/listings", {
    fetch("http://localhost:3000/listings", {
        method: "POST",                                                         // Path
        headers: {
            "Content-Type": "application/json",                                 // Data type
        },
        body: JSON.stringify({ jsonContent }),                                  // Serialized Object (Body)
    });

    // Auto refreshes the web page (history.go(0)) 12 seconds (6000 ms) after the user clicks the submit button
    setTimeout(function () {history.go(0);}, 6000);
}

// Adds each listing from the Express API to the top of the tables\
async function prependListings() {
    // const res = await fetch("https://finders-keepers-gta.herokuapp.com/listings");     // Fetch response from API
    const res = await fetch("http://localhost:3000/listings");                  // Fetch response from API
    const listings = await res.json();                                          // Extract data                   

    const table = document.querySelector("#listings");                          // Target the listings table in HTML file

    // Formats listing data using HTML elements
    listings.forEach((listing) => {                
        const row = document.createElement('tr');                               // Create new table row to display listing information
        const content = [listing.title, listing.location, listing.date];        // Listing content

        // Creates Title as hyperlink
        const title = document.createElement('td');                             // Create table cell
        const titleContent = document.createElement('a');                       // Create a new 'a' element to store title as hyperlink
        titleContent.setAttribute('href', listing.link);                        // Create hyperlink using listing URL
        titleContent.appendChild(document.createTextNode(content[0]));          // Attach hyperlink to title
        title.appendChild(titleContent);                                        // Attach title to table cell
        row.appendChild(title);                                                 // Attach table cell to row
        
        // Creates listing location and date cells
        for (var i = 1; i < content.length; i++) {
            const cell = document.createElement('td');
            const cellContent = document.createTextNode(content[i]);
            cell.appendChild(cellContent);
            row.appendChild(cell);                                              // Attach listing location and date cells to table row
        }

        // Creates Delete Button
        const cell = document.createElement('td');
        const cellContent = document.createElement('a');
        cellContent.setAttribute('href', '#')
        cellContent.setAttribute('class', 'btn btn-danger btn-sm delete')
        cellContent.setAttribute('id', listing.id);
        cellContent.appendChild(document.createTextNode("X"));
        cell.appendChild(cellContent);                                  
        row.appendChild(cell);                                                  // Attach delete button to table row

        // ctr.appendChild(row);
        table.insertBefore(row, table.childNodes[0]);                           // Insert new row at the top of the listing table
    });
}

// Deletes listing from table in HTML file
function deleteListing(element) {
    // If user hits the delete button
    if (element.classList.contains("delete")) {
        // Access the parentElement (table row)
        element.parentElement.parentElement.remove();                           // Remove listing from table
        const listingIDs = [element.id];

        // fetch("https://finders-keepers-gta.herokuapp.com/delete", {
        fetch("http://localhost:3000/delete", {
            method: "POST",                                                         // Path
            headers: {
                "Content-Type": "application/json",                                 // Data type
            },
            body: JSON.stringify({ listingIDs }),                                    // Serialized Object (Body)
        });
    }
}

// Deletes all listing from table in HTML file
function deleteAllListings() {
    const listings = document.querySelectorAll("tr");                                  // Target the listings table in HTML file
    const listingIDs = [];

    // Locate all listing ids tied to the delete button of each row, and remove from html
    for (var i = 1; i < listings.length; i++){
        listingIDs.push(listings[i].getElementsByClassName('btn')[0].getAttribute('id'));
        listings[i].remove();
    }

    // fetch("https://finders-keepers-gta.herokuapp.com/delete", {
    fetch("http://localhost:3000/delete", {
        method: "POST",                                                         // Path
        headers: {
            "Content-Type": "application/json",                                 // Data type
        },
        body: JSON.stringify({ listingIDs }),                                   // Serialized Object (Body)
    });
}

// Add addEventListener to table for deleting listings
document.querySelector('.container').addEventListener('click', function (e) {
    deleteListing(e.target);
})

prependListings();                                                                 