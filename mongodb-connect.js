const mongoose = require("mongoose");
const mongoPath = 'mongodb+srv://cs230:cs230@cluster.f0xng.mongodb.net/CS230?retryWrites=true&w=majority';

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose;
}
