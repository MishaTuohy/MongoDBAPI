const prompt = require("prompt");
const mongo = require('../mongodb-connect');
const {insertCustomer, findCustomer, findRandomCustomer, updateCustomer, updateRandomCustomer, deleteCustomer, deleteRandomCustomer} = require('./userMethods'); // imports methods used in crud activity


// All this code is just for getting user input, the actually crud methods are inside of the "...Methods" files


async function userCRUD() {
    console.log("\n            -- USER CRUD MENU --");
    console.log("How would you like to query the phone collection?");
    console.log("     1. Insert a new user");
    console.log("     2. Search for a user");
    console.log("     3. Search for a random user");
    console.log("     4. Update user information");
    console.log("     5. Update random user");
    console.log("     6. Delete user");
    console.log("     7. Delete random user");
    console.log("     8. Exit program");
    console.log();

    const userInput = prompt.get(['res'], async function(err, result) {
        if(err) {
            console.log('Exiting Program...');
        }
        else if(result.res === '1') {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Enter new user details:');
                    console.log();
                    const input = await prompt.get(['title', 'firstName', 'lastName', 'mobile', 'email', 'addressLine1', 'addressLine2', 'town', 'countyCity', 'eircode']);
                    console.log();
                    await insertCustomer(input.title, input.firstName, input.lastName, input.mobile, input.email, input.addressLine1, input.addressLine2, input.town, input.countyCity, input.eircode);
                } finally {
                    mongoose.connection.close()
                }
            })
        } 
        
        else if(result.res === '2') {
            console.log("Enter the user's phone number:");
            console.log();
            await mongo().then(async (mongoose) => {
                try {
                    const input = await prompt.get(['mobile']);
                    console.log();
                    await findCustomer(input.mobile);
                } finally {
                    mongoose.connection.close()
                }
            })
        } 
        
        else if(result.res === '3') {
            await mongo().then(async (mongoose) => {
                try {
                    console.log();
                    await findRandomCustomer();
                } finally {
                    mongoose.connection.close()
                }
            })
        } 
        
        else if(result.res == '4') {
            console.log("Enter the phone number of the user, you wish to update the details of");
            console.log();
            console.log('WARNING!: If you do not fill out some of the fields, they will be changed to an empty field!');
            console.log();
            await mongo().then(async (mongoose) => {
                try {
                    const input = await prompt.get(['mobile', 'titleUpdate', 'mobileUpdate', 'emailUpdate', 'addressLine1Update', 'addressLine2Update', 'townUpdate', 'countyCityUpdate', 'eircodeUpdate']);
                    console.log();
                    const result = await updateCustomer(
                        input.mobile, 
                        input.titleUpdate, 
                        input.mobileUpdate, 
                        input.emailUpdate, 
                        input.addressLine1Update, 
                        input.addressLine2Update, 
                        input.townUpdate, 
                        input.countyCityUpdate, 
                        input.eircodeUpdate);
                } finally {
                    mongoose.connection.close()
                }
            })
        } 
        
        else if(result.res == '5') {
            console.log("Enter details you wish to change");
            await mongo().then(async (mongoose) => {
                try {
                    const input = await prompt.get(['titleUpdate', 'mobileUpdate', 'emailUpdate', 'addressLine1Update', 'addressLine2Update', 'townUpdate', 'countyCityUpdate', 'eircodeUpdate']);
                    console.log();
                    await updateRandomCustomer(
                        input.titleUpdate, 
                        input.mobileUpdate, 
                        input.emailUpdate, 
                        input.addressLine1Update, 
                        input.addressLine2Update, 
                        input.townUpdate, 
                        input.countyCityUpdate, 
                        input.eircodeUpdate);
                } finally {
                    mongoose.connection.close()
                }
            })
        } 
        else if(result.res == '6') {
            console.log("Enter the first name, last name, mobile and email of the user you wish to delete");
            await mongo().then(async (mongoose) => {
                try {
                    const input = await prompt.get(['firstName', 'lastName', 'mobile', 'email']);
                    console.log();
                    await deleteCustomer(input.firstName, input.lastName, input.mobile, input.email);
                } finally {
                    mongoose.connection.close()
                }
            })
        } 
        else if(result.res == '7') {
            await mongo().then(async (mongoose) => {
                try {
                    console.log();
                    await deleteRandomCustomer();
                } finally {
                    mongoose.connection.close()
                }
            })
        }
        else if(result.res == '8') {
            console.log('Exiting program...')
            process.exit()
        }
        else {
            console.log("Please enter a valid input to continue querying the database!");
            console.log(result.res + " is not a valid input");
            process.exit();
        }
        process.exit()
    })
}

module.exports = userCRUD