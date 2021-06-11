const userSchema = require('../schemas/user-schema');
const phoneSchema = require('../schemas/phone-schema');
const mongo = require('../mongodb-connect');

async function datadump() {
    await mongo().then(async (mongoose) => {
        try {
            try {
                console.log('5 new users added to the database');
                console.log('10 new phones added to the database');

                await new userSchema({
                    'title': 'Dr.', 'fname': 'Gus', 'lname': 'Johnson', 'mobile': '586-335-7580', 'email': 'gus.johnson@mail.com', 
                    'shippingInfo': {'addressLine1': 'Allenstown Navan', 'addressLine2': '', 'town': 'Navan', 'county_city': 'Co.Meath', 'Eircode': ''},
                    'orders': []
                }).save();
                
                await new userSchema({
                    'title': 'Mr.', 'fname': 'Michael', 'lname': 'Tuohy', 'mobile': '(045)894502', 'email': 'michael.tuohy@mail.com', 
                    'shippingInfo': {'addressLine1': 'Monread Naas', 'addressLine2': '', 'town': 'Naas', 'county_city': 'Co.Kildare', 'Eircode': ''},
                    'orders': []
                }).save();
    
                await new userSchema({
                    'title': 'Mx.', 'fname': 'Joe', 'lname': 'Murphy', 'mobile': '(0402)32788', 'email': 'joe.murphy@mail.com', 
                    'shippingInfo': {'addressLine1': '81 Main st lr Arklow', 'addressLine2': '', 'town': 'Arklow', 'county_city': 'Co.Wicklow', 'Eircode': ''},
                    'orders': []
                }).save();
    
                await new userSchema({
                    'title': 'Mrs.', 'fname': 'Enda', 'lname': 'Smith', 'mobile': '(045)982979', 'email': 'enda.smith@mail.com', 
                    'shippingInfo': {'addressLine1': 'Clane', 'addressLine2': '', 'town': 'Clane', 'county_city': 'Co.Kildare', 'Eircode': ''},
                    'orders': []
                }).save();
    
                await new userSchema({
                    'title': 'Miss.', 'fname': 'Annabelle', 'lname': 'Larson', 'mobile': '(057)8645918', 'email': 'anna.larson@mail.com', 
                    'shippingInfo': {'addressLine1': 'Kilmalogue Cross', 'addressLine2': 'Gracefield Kilmalogue', 'town': 'Portarlington', 'county_city': 'Co.Offaly', 'Eircode': ''},
                    'orders': []
                }).save();
    
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
                await new phoneSchema({
                    'manufacturer': 'Samsung', 'modelName': 'Galaxy A42 5G', 'price': 399
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Samsung', 'modelName': 'Galaxy A12', 'price': 160
                }).save();
                
                await new phoneSchema({
                    'manufacturer': 'Apple', 'modelName': 'iPhone 12', 'price': 930
                }).save();
                
                await new phoneSchema({
                    'manufacturer': 'Apple', 'modelName': 'iPhone 6s Mint+', 'price': 160
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Huawei', 'modelName': 'P Smart 2021', 'price': 200
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Huawei', 'modelName': 'P40 Pro', 'price': 900
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Nokia', 'modelName': '5.3', 'price': 137
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Alcatel', 'modelName': '3X', 'price': 100
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Nokia', 'modelName': 'Lumia 950 XL', 'price': 250
                }).save();
    
                await new phoneSchema({
                    'manufacturer': 'Motorola', 'modelName': 'Moto G Plus', 'price': 349
                }).save();
            } catch (error) {
                console.log('Something went the wrong!');
                console.log('datadump.js - connectToMongoDB method');
            }
            

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports = datadump;