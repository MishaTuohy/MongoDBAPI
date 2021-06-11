const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const requiredNumber = {
    type: Number,
    required: true
}

const phoneSchema = mongoose.Schema({
    manufacturer: requiredString,
    modelName: requiredString,
    price: requiredNumber
}, {
    versionKey: false
})

module.exports = mongoose.model('phones', phoneSchema);