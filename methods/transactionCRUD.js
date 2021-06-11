const prompt = require("prompt");
const mongo = require('../mongodb-connect');
const transactionMethods = require('./transactionMethods');  // imports methods used in crud activity
// In my code for this file I just typed transactionsMethod
// before using them so i don't have a nasty long variable up here


// All this code is just for getting user input, the actually crud methods are inside of the "...Methods" files


async function transactionCRUD() {
    console.log("\n            -- TRANSACTIONS CRUD MENU --");
    console.log("How would you like to query the phone collection?");
    console.log("     1. Create new order");
    console.log("     2. Search for a user's orders");
    console.log("     3. Update a random user's order");
    console.log("     4. Delete a user's orders");
    console.log("     5. Exit program");

    const userInput = prompt.get(['res'], async function(err, result) {
        
        try {
            if(err) {
                console.log('Exiting Program...');
            }
    
            else if(result.res === '1') {
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['phoneModel', 'userFirstName', 'userLastName', 'userEmail']);
                        console.log();
                        await transactionMethods.createOrder(input.phoneModel, input.userFirstName, input.userLastName, input.userEmail);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }
    
            else if(result.res === '2') {
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['userFirstName', 'userLastName', 'userEmail']);
                        console.log();
                        await transactionMethods.searchOrder(input.userFirstName, input.userLastName, input.userEmail);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }
    
            else if(result.res === '3') {
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['phoneModel']);
                        if(input) {
                            console.log();
                            await transactionMethods.updateRandomOrder(input.phoneModel);
                        } else {
                            console.log('asdasd');
                        }
                        
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }
    
            else if(result.res === '4') {
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['userFirstName', 'userLastName', 'userEmail']);
                        
                        await transactionMethods.deleteOrders(input.userFirstName, input.userLastName, input.userEmail);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }
            else if(result.res == '5') {
                console.log('Exiting program...')
                process.exit()
            }
            else {
                console.log("Please enter a valid input to continue querying the database!");
                console.log(result.res + " is not a valid input");
                process.exit();
            }
            process.exit()
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = transactionCRUD;