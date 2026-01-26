/**
 * serve listening port
 * connect db with server on port
 * scinero first db connection established than listening on port
 */

const mongoose = require('mongoose');
const URI = "mongodb+srv://sg491919_db_user:bjFvoW7INyf7S6gJ@cluster0.j9w2izz.mongodb.net/devTinder?appName=Cluster0/"

const connectDB = async() =>{
    await mongoose.connect(URI);
}

module.exports = connectDB

