const userSchema = require('../schemas/user-schema');

async function insertCustomer(title, firstName, lastName, phone, mail, addressLine1, addressLine2, town, countyCity, eircode) {

    // Using the mongoose module I have created schemas and models for my database
    // Here I just created a document using said schema and model!

    const result = await new userSchema({
        title: title,
        fname: firstName,
        lname: lastName,
        mobile: phone,
        email: mail,
        shippingInfo: {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            town: town,
            county_city: countyCity,
            eircode: eircode
        }
    }).save();

    console.log('Created new user:');
    console.log();
    console.log('Personal Information: ')
    console.log('    Title: ' + result.title);
    console.log('    First name: ' + result.fname);
    console.log('    Last name: ' + result.lname);
    console.log('    Mobile number: ' + result.mobile);
    console.log('    Email Address: ' + result.email);
    console.log();
    console.log('Shipping information:');
    console.log('    Address Line 1: ' + result.shippingInfo.addressLine1);
    console.log('    Address Line 2: ' + result.shippingInfo.addressLine2);
    console.log('    Town: ' + result.shippingInfo.town);
    console.log('    County/City: ' + result.shippingInfo.county_city);
    console.log('    Eircode: ' + result.shippingInfo.eircode);
    console.log();
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function findCustomer(details) {
    const result = await userSchema.findOne({   // Finds the first user that matches the inputted details
        mobile: details,
    });

    console.log('Found user(s) with the Title: ' + details);
    console.log();
    console.log('Personal Information: ')
    console.log('    Title: ' + result.title);
    console.log('    First name: ' + result.fname);
    console.log('    Last name: ' + result.lname);
    console.log('    Mobile number: ' + result.mobile);
    console.log('    Email Address: ' + result.email);
    console.log();
    console.log('Shipping information:');
    console.log('    Address Line 1: ' + result.shippingInfo.addressLine1);
    console.log('    Address Line 2: ' + result.shippingInfo.addressLine2);
    console.log('    Town: ' + result.shippingInfo.town);
    console.log('    County/City: ' + result.shippingInfo.county_city);
    console.log('    Eircode: ' + result.shippingInfo.eircode);
    console.log();
    console.log('Orders:');
    console.log(result.orders)
    console.log();
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function findCustomerOrder(fname, lname, email) {
    const result = await userSchema.findOne({   // Same as the previous method but without logging details to the console
        fname: fname,
        lname: lname,
        email: email
    });

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function findRandomCustomer() {

    // Uses the aggregate pipeline function and makes use of the $samle thing to take a random sample from the collection

    const result = await userSchema.aggregate([{$sample : {size: 1}}]);

    // Logs details

    console.log('Found random user with the following details:');
    console.log();
    console.log('Personal Information: ')
    console.log('    Title: ' + result[0].title);
    console.log('    First name: ' + result[0].fname);
    console.log('    Last name: ' + result[0].lname);
    console.log('    Mobile number: ' + result[0].mobile);
    console.log('    Email Address: ' + result[0].email);
    console.log();
    console.log('Shipping information:');
    console.log('    Address Line 1: ' + result[0].shippingInfo.addressLine1);
    console.log('    Address Line 2: ' + result[0].shippingInfo.addressLine2);
    console.log('    Town: ' + result[0].shippingInfo.town);
    console.log('    County/City: ' + result[0].shippingInfo.county_city);
    console.log('    Eircode: ' + result[0].shippingInfo.eircode);
    console.log();
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function updateCustomer(mobile, title, mobileUpdate, email, addressLine1, addressLine2, town, countyCity, eircode) {
    try {
        const result = await userSchema.findOneAndUpdate( // Finds first user with matching details and updates their details
            {
              mobile: mobile,
            },
            {
              title: title,
              mobile: mobileUpdate,
              email: email,
              shippingInfo: {
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                town: town,
                county_city: countyCity,
                eircode: eircode
            }
            },
            {
              upsert: false,
              useFindAndModify: false,
              new: true
            }
        )

        if(result) {
            console.log('Updated customer with the phone number ' + mobile);
            console.log();
            console.log('Personal Information: ')
            console.log('    Title: ' + result.title);
            console.log('    First name: ' + result.fname);
            console.log('    Last name: ' + result.lname);
            console.log('    Mobile number: ' + result.mobile);
            console.log('    Email Address: ' + result.email);
            console.log();
            console.log('Shipping information:');
            console.log('    Address Line 1: ' + result.shippingInfo.addressLine1);
            console.log('    Address Line 2: ' + result.shippingInfo.addressLine2);
            console.log('    Town: ' + result.shippingInfo.town);
            console.log('    County/City: ' + result.shippingInfo.county_city);
            console.log('    Eircode: ' + result.shippingInfo.eircode);
            return result._id;
        } else {
            console.log("Something went wrong here my guy");
            console.log('"' + mobile + '" is not a phone number that exists within the database! Try another.');
            console.log();
        }
        
    } catch (error) {
        
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function updateCustomerOrder(userID, orderID) {   // Same as previous method but without logging details to the console
    try {
        const result = await userSchema.findOneAndUpdate({
            _id: userID
        },{
            $push: {
                orders: orderID
            }
        }, {
            upsert: true,
            useFindAndModify: false,
            new: true
        })
        return result._id;
        
    } catch (error) {
        console.log("This ain't it chief");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

// async function updateShippingInfo(id, addressLine1, addressLine2, town, countyCity, eircode) {   // Never saw the light of day ;(
//     try {
//         const result = await userSchema.findOneAndUpdate(
//             {
//               _id: id,
//             },
//             {
//               addressLine1: addressLine1,
//               addressLine2: addressLine2,
//               town: town,
//               county_city: countyCity,
//               eircode: eircode
//             },
//             {
//               upsert: false,
//               useFindAndModify: false
//             }
//         )
//         if(result === null) {
//             console.log("This ain't it chief");
//         } else {
//             console.log('Updated customer shipping information with the phone number ' + result.mobile);
//             console.log('    Address Line 1: ' + result.shippingInfo.addressLine1);
//             console.log('    Address Line 2: ' + result.shippingInfo.addressLine2);
//             console.log('    Town: ' + result.shippingInfo.town);
//             console.log('    County/City: ' + result.shippingInfo.county_city);
//             console.log('    Eircode: ' + result.shippingInfo.eircode);
//             console.log();
//         }
//     } catch (error) {}
// }

////////////////////////////////////////////////////////////////////////////////////////////////

async function updateRandomCustomer(title, phone, email, addressLine1, addressLine2, town, countyCity, eircode) {

    try {
        // Uses the aggregate pipeline function and makes use of the $samle thing to take a random sample from the collection
        // Updates user and displays both the old and new user details

        const rand = await userSchema.aggregate([{$sample : {size: 1}}]);
        console.log('Found random user with the following details:');
        console.log();
        console.log('Personal information:')
        console.log('    Title: ' + rand[0].title);
        console.log('    First name: ' + rand[0].fname);
        console.log('    Last name: ' + rand[0].lname);
        console.log('    Mobile number: ' + rand[0].mobile);
        console.log('    Email Address: ' + rand[0].email);
        console.log();
        console.log('Shipping information:');
        console.log('    Address Line 1: ' + rand[0].shippingInfo.addressLine1);
        console.log('    Address Line 2: ' + rand[0].shippingInfo.addressLine2);
        console.log('    Town: ' + rand[0].shippingInfo.town);
        console.log('    County/City: ' + rand[0].shippingInfo.county_city);
        console.log('    Eircode: ' + rand[0].shippingInfo.eircode);
        console.log();
        console.log('Updated it to the following:')
        console.log();

        const docID = rand[0]._id;
        const result = await userSchema.findOneAndUpdate(
            {
                _id: docID
            }, 
            {
                title: title,
                mobile: phone,
                email: email,
                shippingInfo: {
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    town: town,
                    county_city: countyCity,
                    eircode: eircode
                }
            },
            {
            upsert: false,
            new: true,
            useFindAndModify: false
            }
        )
        if(result === null) {
            console.log("This ain't it chief");
        } else {
            console.log('Personal information:');
            console.log('    Title: ' + result.title);
            console.log('    First name: ' + result.fname);
            console.log('    Last name: ' + result.lname);
            console.log('    Mobile number: ' + result.mobile);
            console.log('    Email Address: ' + result.email);
            console.log();
            console.log('Shipping information:');
            console.log('    Address Line 1: ' + result.shippingInfo.addressLine1);
            console.log('    Address Line 2: ' + result.shippingInfo.addressLine2);
            console.log('    Town: ' + result.shippingInfo.town);
            console.log('    County/City: ' + result.shippingInfo.county_city);
            console.log('    Eircode: ' + result.shippingInfo.eircode);
            console.log();
        }

        return result._id;
    } catch (error) {
        
    }
    
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteCustomer(firstName, lastName, phone, em) {
    const result = await userSchema.findOneAndDelete( // Finds the first user matching inputted details and deletes them
        {
            fname: firstName,
            lname: lastName,
            mobile: phone,
            email: em
        }, (error, theGoods) => {
            if(error) {
                console.log(error);
            } else {
                if(theGoods) {
                    console.log('Personal information:');
                    console.log('The following user has been deleted:')
                    console.log('    Title: ' + theGoods.title);
                    console.log('    First name: ' + theGoods.fname);
                    console.log('    Last name: ' + theGoods.lname);
                    console.log('    Mobile number: ' + theGoods.mobile);
                    console.log('    Email Address: ' + theGoods.email);
                    console.log();
                    console.log('Shipping information:');
                    console.log('    Address Line 1: ' + theGoods.shippingInfo.addressLine1);
                    console.log('    Address Line 2: ' + theGoods.shippingInfo.addressLine2);
                    console.log('    Town: ' + theGoods.shippingInfo.town);
                    console.log('    County/City: ' + theGoods.shippingInfo.county_city);
                    console.log('    Eircode: ' + theGoods.shippingInfo.eircode);
                    console.log();
                } else {
                    console.log('Something went wrong there buddd');
                    console.log();
                    console.log('Firstname: "' + firstName + '"\nLast name: "' + lastName + '"\nPhone number: "' + phone + '"' 
                    + "\nDon't seem to match with anything in the database!");
                    console.log();
                    console.log('Try another combination!');
                }
                
            }
        }
    )
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteRandomCustomer() {

    try {
        const rand = await userSchema.aggregate([{$sample : {size: 1}}]);
        const result = await userSchema.findOneAndDelete(
        {
            _id: rand[0]._id
        }, (error, theGoods) => {
            if(error) {
                console.log(error);
            } else {
                console.log('The following user has been deleted:');
                console.log();
                console.log('Personal information:');
                console.log('    Title: ' + theGoods.title);
                console.log('    First name: ' + theGoods.fname);
                console.log('    Last name: ' + theGoods.lname);
                console.log('    Mobile number: ' + theGoods.mobile);
                console.log('    Email Address: ' + theGoods.email);
                console.log();
                console.log('Shipping information:');
                console.log('    Address Line 1: ' + theGoods.shippingInfo.addressLine1);
                console.log('    Address Line 2: ' + theGoods.shippingInfo.addressLine2);
                console.log('    Town: ' + theGoods.shippingInfo.town);
                console.log('    County/City: ' + theGoods.shippingInfo.county_city);
                console.log('    Eircode: ' + theGoods.shippingInfo.eircode);
                console.log();
            }
        }
    )
    } catch (error) {
        console.log('No users to delete');
    }
    
}

module.exports = {insertCustomer, findCustomer, findCustomerOrder, findRandomCustomer, updateCustomer, updateRandomCustomer, updateCustomerOrder, deleteCustomer, deleteRandomCustomer};