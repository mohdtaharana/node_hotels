const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Database is connected");
});

db.on("error", (error) => {
    console.log("Error agya ", error);
});

db.on("disconnected", () => {
    console.log("Database is disconnected");
});

module.exports = db;
