const mongoose = require('mongoose');

const requiredNumber = {
    type: Number,
    required: true
}

const requiredString = {
    type: String,
    required: true
}

const phoneSchema = mongoose.Schema({
    manufacturer: requiredString,
    modelName: requiredString,
    price: requiredNumber
})

const shippingSchema = mongoose.Schema({
    addressLine1: requiredString,
    addressLine2: String,
    town: requiredString,
    county_city: requiredString,
    eircode: String
}, {
    versionKey: false
})

const transactionSchema = mongoose.Schema({
    phonesPurchased: [phoneSchema],
    orderCost: requiredNumber,
    shippingAddress: shippingSchema,
    userID: requiredString
}, {
    versionKey: false
})

module.exports = mongoose.model('transactions', transactionSchema);