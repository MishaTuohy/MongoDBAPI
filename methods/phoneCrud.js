const prompt = require("prompt");
const mongo = require('../mongodb-connect');
const {insertPhone, findPhone , findRandomPhone, updatePhone, updateRandomPhone, deletePhone, deleteRandomPhone} = require('./phoneMethods');   // imports methods used in crud activity


// All this code is just for getting user input, the actually crud methods are inside of the "...Methods" files

async function phoneCRUD() {

    console.log("\n            -- PHONE CRUD MENU --");
    console.log("How would you like to query the phone collection?");
    console.log("     1. Insert a new phone");
    console.log("     2. Search for a phone");
    console.log("     3. Search for a random phone");
    console.log("     4. Update a phone");
    console.log("     5. Update a random phone");
    console.log("     6. Delete a phone");
    console.log("     7. Delete a random phone");
    console.log("     8. Exit program");
    console.log();

    const userInput = prompt.get(['res'], async function(err, result) {

        try {
            if(err) {
                console.log('spaget');
            }
            else if(result.res === '1') {
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['manufacturer', 'modelName', 'price']);
                        console.log();
                        await insertPhone(input.manufacturer, input.modelName, input.price);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            } 
            
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            else if(result.res === '2') {
                console.log("Enter phone model");
                console.log();
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['model']);
                        console.log();
                        await findPhone(input.model);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            } 

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            else if(result.res === '3') {
                await mongo().then(async (mongoose) => {
                    try {
                        console.log();
                        await findRandomPhone();
                    } finally {
                        mongoose.connection.close()
                    }
                })
            } 

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            else if(result.res == '4') {
                console.log("Enter phone model to update, along with details you wish to change");
                console.log();
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['model', 'manufacturerUpdate', 'modelNameUpdate', 'priceUpdate']);
                        console.log();
                        await updatePhone(input.model, input.manufacturerUpdate, input.modelNameUpdate, input.priceUpdate);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            } 

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            else if(result.res == '5') {
                console.log("Enter details you wish to change");
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['manufacturerUpdate', 'modelNameUpdate', 'priceUpdate']);
                        console.log();
                        await updateRandomPhone(input.manufacturerUpdate, input.modelNameUpdate, input.priceUpdate);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            } 

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            else if(result.res == '6') {
                console.log("Enter the model and manufacturer of the phone you wish to delete");
                await mongo().then(async (mongoose) => {
                    try {
                        const input = await prompt.get(['manufacturerDelete', 'modelNameDelete']);
                        console.log();
                        await deletePhone(input.manufacturerDelete, input.modelNameDelete);
                    } finally {
                        mongoose.connection.close()
                    }
                })
            } 

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            else if(result.res == '7') {
                await mongo().then(async (mongoose) => {
                    try {
                        console.log();
                        await deleteRandomPhone();
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            else if(result.res == '8') {
                console.log('Exiting program...')
                process.exit()
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            else {
                console.log("Please enter a valid input to continue querying the database!");
                console.log(result.res + " is not a valid input");
                process.exit();
            }
            
            process.exit()

        } catch (error) {
            console.log('Something went wrong!');
            console.log('phoneCrud.js - phondCRUD method');
        }
    })
}

module.exports = phoneCRUD;