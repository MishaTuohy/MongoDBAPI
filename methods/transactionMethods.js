const phoneMethods = require('./phoneMethods');
const userMethods = require('./userMethods');
const transactionSchema = require('../schemas/transaction-schema');
const userSchema = require('../schemas/user-schema');
const prompt = require("prompt");

async function createOrder(phoneModel, userFname, userLname, userEmail) {
    try {
        const phone = await phoneMethods.findPhoneOrder(phoneModel);    // This is just another version of the findPhone method that doesn't log to the console.
        if(phone) {
            const userDetails = await userMethods.findCustomerOrder(userFname, userLname, userEmail);   // This is just another version of the find customer method that doesn't log to the console.
            if(userDetails) {
                console.log();
                const order = { // Just stores the info in a variable
                    phonesPurchased: [phone],
                    orderCost: phone.price,
                    shippingAddress: userDetails.shippingAddress,
                    userID: userDetails._id
                }
                const result = await new transactionSchema(order).save();           // This is creates the new order
                await userMethods.updateCustomerOrder(userDetails._id, result._id); // This takes in the id of the order and updates the user orders array

                console.log('Transaction accepted')
                console.log('    Phone purchased: ' + phone.manufacturer);
                console.log('                     ' + phone.modelName);
                console.log('');
                console.log('    Order Cost: ' + result.orderCost);
                console.log('    UserID' + result.userID);
            } else {
                console.log('Invalid user details!');
                console.log('"' + userDetails + '" is not a user we have in our database. Try another!');
            }
        } else {
            console.log('Invalid phone model!');
            console.log('"' + phoneModel + '" is not a phone model we have in our database. Try another!');
        }
        
        
    } catch (error) {
        console.log('stinky');
        console.log(error);
    }
}

async function searchOrder(userFname, userLname, userEmail) {
    try {
        const userDetails = await userMethods.findCustomerOrder(userFname, userLname, userEmail); // This is just another version of the find customer method that doesn't log to the console.
        console.log();
        
        const result = await transactionSchema.find({   // Just finds the order coressponding to the user input
            userID: userDetails._id
        })
        console.log(result);
    } catch (error) {
        console.log('stinky');
        console.log(error);
    }
}

async function updateRandomOrder(phoneModel) {  
    
    try {
        const phone = await phoneMethods.findPhoneOrder(phoneModel); // Finds phone using inputted phone model the user wishes to order
        
        const find = await transactionSchema.aggregate([{$sample : {size: 1}}]) // Uses the aggregate pipeline function and makes use of the $samle thing to take a random sample from the collection
        const orderID = find[0]._id;
        const result = await transactionSchema.findOneAndUpdate({ // Finds the order that matches with the id of a random order and updates it
            _id: orderID
        }, {
            $set :{
                phonesPurchased: phone,
                orderCost: phone.price
            }
        }, {
            new: true
        });

        if(result) {
            console.log('Updated it to the following:');
            console.log('    Manufacturer: ' + result.manufacturer);
            console.log('    Model: ' + result.modelName);
            console.log('    Price: ' + result.price);
            console.log();
        } else {
            console.log('Invalid price!');
            console.log('You have most likely entered a letter by mistake');
            console.log('Only use numbers/integers for setting the price!')
        }
        
    } catch (error) {
        
    }
}

async function deleteOrders(userFname, userLname, userEmail) {
    try {
        const userDetails = await userMethods.findCustomerOrder(userFname, userLname, userEmail); // Finds user that matches with the inputted details
        console.log();
        await transactionSchema.deleteMany({    // Deletes all orders with the userID matching the user details inputted
            userID: userDetails._id
        })
        await deleteCustomerOrderHistory(userDetails._id);
    } catch (error) {
        console.log('stinky');
        console.log(error);
    }
}

async function deleteCustomerOrderHistory(userID) { // This is used in the previous method to actually delete the orders with the given userID
    try {
        await userSchema.updateOne({
            _id: userID
        }, {
            $set: {
                orders: []
            }
        });
        console.log('Transaction(s) and user order history deleted');
        console.log();
    } catch (error) {
        console.log('stinky');
        console.log(error);
    }
}
module.exports = {createOrder, searchOrder, updateRandomOrder, deleteOrders, deleteCustomerOrderHistory}