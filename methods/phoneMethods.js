const phoneSchema = require('../schemas/phone-schema');

// Phone methods are exactly the same as the user methods but they are for the phones
// The user method has comments briefly explaining their functionality
// This code is mostly just console logs
// The actually code for querying the database is minimal

// Using the mongoose module I have created schemas and models for my database
// Here I just created a document using said schema and model!

async function insertPhone(mana, mod, pr) {
    const phone = {
        manufacturer: mana,
        modelName: mod,
        price: pr
    }

    const result = await new phoneSchema(phone).save();

    console.log('Added new phone to inventory:');
    console.log('    Manufacturer: ' + result.manufacturer);
    console.log('    Model: ' + result.modelName);
    console.log('    Price: ' + result.price);
    console.log();
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function findPhone(details) {
    const result = await phoneSchema.findOne({
        modelName: details,
    });
    if(result === null) {
        console.log('skeert')
    } else {
        console.log('Found phone(s) with the model name: ' + details);
        console.log('    Manufacturer: ' + result.manufacturer);
        console.log('    Price: ' + result.price);
        console.log();
    }
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function findPhoneOrder(details) {
    
    try {
        return result = await phoneSchema.findOne({
            modelName: details,
        });
    } catch (error) {
        console.log('aghhh')
    }
    
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function findRandomPhone() {
    const result = await phoneSchema.aggregate([{$sample : {size: 1}}]); // Uses the aggregate pipeline function and makes use of the $samle thing to take a random sample from the collection

    console.log('Found random phone with the following details:');
    console.log('    Manufacturer: ' + result[0].manufacturer);
    console.log('    Model: ' + result[0].modelName);
    console.log('    Price: ' + result[0].price);
    console.log();
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function updatePhone(search, mana, mod, pr) {
    
    try {
        const result = await phoneSchema.findOneAndUpdate(
            {
              modelName: search,
            },
            {
                manufacturer: mana,
                modelName: mod,
                price: pr
            },
            {
              upsert: false,
              useFindAndModify: false,
              new: true
            }
        )
    
        console.log('Updated phone to:');
        console.log('    Manufacturer: ' + result.manufacturer);
        console.log('    Model: ' + result.modelName);
        console.log('    Price: ' + result.price);
        console.log();
        
    } catch (error) {
        console.log('Invalid input!');
        console.log('The phone model "' + search +'" does not exist!');
    }
    
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function updateRandomPhone(mana, mod, pr) {
    const rand = await phoneSchema.aggregate([{$sample : {size: 1}}]);  // Uses the aggregate pipeline function and makes use of the $samle thing to take a random sample from the collection
    console.log('Found random phone with the following details:');
        console.log('    Manufacturer: ' + rand[0].manufacturer);
        console.log('    Model: ' + rand[0].modelName);
        console.log('    Price: ' + rand[0].price);
        console.log();

    const docID = rand[0]._id;
    const result = await phoneSchema.findOneAndUpdate(
        {
            _id: docID
        }, 
        {
            manufacturer: mana,
            modelName: mod,
            price: pr
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
        console.log('    Manufacturer: ' + result.manufacturer);
        console.log('    Model: ' + result.modelName);
        console.log('    Price: ' + result.price);
        console.log();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function deletePhone(mana, mod) {
    const result = await phoneSchema.findOneAndDelete(
        {
            manufacturer: mana,
            modelName: mod
        }, (error, theGoods) => {
            if(theGoods) {
                console.log('The following phone has been deleted:')
                console.log('    Manufacturer: ' + theGoods.manufacturer);
                console.log('    Model: ' + theGoods.modelName);
                console.log('    Price: ' + theGoods.price);
                console.log();
            } else {
                console.log('A phone the details "' + theGoods.manufacturer + '" and or "' + theGoods.modelName + '" does not exist within our database');
            }
        }
    )
}

////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteRandomPhone() {
    const rand = await phoneSchema.aggregate([{$sample : {size: 1}}]); // Uses the aggregate pipeline function and makes use of the $samle thing to take a random sample from the collection
    if(rand[0] === undefined) {
        console.log('There are no phones to delete');
    }
    const result = await phoneSchema.findOneAndDelete(
        {
            _id: rand[0]._id
        }, (error, theGoods) => {
            if(error) {
                console.log(error);
            } else {
                console.log('The following phone has been deleted:')
                console.log('    Manufacturer: ' + theGoods.manufacturer);
                console.log('    Model: ' + theGoods.modelName);
                console.log('    Price: ' + theGoods.price);
                console.log();
            }
        }
    )
}

module.exports = {insertPhone, findPhone, findPhoneOrder, findRandomPhone, updatePhone, updateRandomPhone, deletePhone, deleteRandomPhone};