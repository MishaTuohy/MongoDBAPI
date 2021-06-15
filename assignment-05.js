// var port = 8000; // port the server with listen on
// var server = http.createServer(); // create the server

// // SERVER IS LISTENING ON PORT 8000
// server.listen(port, function() {
//     console.log("server created on port: " + port);
// })

// // LISTENING FOR TERMINAL INPUT CTRL+C
// process.on("SIGINT", function () {
//     console.log("\nServer disconnected");
//     process.exit();
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const prompt = require("prompt");                               // imports prompt module
const phoneCRUD = require('./methods/phoneCrud');               // imports phone crud menu method
const userCRUD = require('./methods/userCrud');                 // imports user crud menu method
const transactionCRUD = require("./methods/transactionCRUD");   // imports transactions crud menu method
const datadump = require('./methods/datadump');                 // imports datadump method

cliProgram();

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This just acts as the main menu for my program
// I have created a lot of different javascript files, since it would be near immpossible
// To know what I am doing half the time if I didn't otherwise.

// A problem I could not figure out and had to work around due to time constaints
// Was that when using prompt and trying to returning to main menu or any menu for that matter
// Prompt would not close its listeners after finishing the process
// This meant that when you typed the number 2 for example, it would take in two number 2's
// And would continue to increase in number as you moved from menu to menu.

// This is why the program ends after completing any task in the CLI

async function cliProgram() { 
    console.log("            -- Main menu --");
    console.log("How would you like to query the database?");
    console.log("    1. User CRUD");
    console.log("    2. Phone CRUD");
    console.log("    3. Transaction CRUD");
    console.log("    4. Add data - WARNING will add duplicate data if used before");
    console.log("    5. Exit program");
    try {
        prompt.get(['response'], async function(err, result) {
            if(err) {
                console.log('spaget');
            }
            else if(result.response === '1') {  // Sends you to the user menu
                userCRUD();
            } 
            
            else if(result.response === '2') { // Sends you to the phone menu
                phoneCRUD();
            } 
            
            else if(result.response === '3') { // Sends you to the transactions menu
                transactionCRUD();
            } 
            
            else if(result.response == '4') {   // Dumps 5 users and 10 phones into the database.
                datadump();
            }

            else if(result.response == '5') {   // Exits program
                console.log("Exiting program...");
            }

            else {
                console.log("Please enter a valid input to continue querying the database!");
                console.log(result);
                process.exit()
            }
        })
    } catch (error) {
        console.log('Something went wrong!');
        console.log('assignment-05 - cliProgram method');
    }
}
