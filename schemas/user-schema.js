const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const shippingSchema = mongoose.Schema({
    addressLine1: requiredString,
    addressLine2: String,
    town: requiredString,
    county_city: requiredString,
    eircode: String
}, {
    versionKey: false
})

const userSchema = mongoose.Schema({
    title: String,
    fname: requiredString,
    lname: requiredString,
    mobile: requiredString,
    email: requiredString,
    shippingInfo: shippingSchema,
    orders: [String]
}, {
    versionKey: false
})

module.exports = mongoose.model('users', userSchema);