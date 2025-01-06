const mongoose = require('mongoose');
const dotenv=require('dotenv');


const dbName = process.env.bright_idea;
const username = process.env.admin;
const pw = process.env.admin;



dotenv.config();
const uri=process.env.URI_MONGODB;



const connectDB = async() => {
    try{
        await mongoose.connect(uri)
        .then(() => console.log("Established a connexion to the database"))
        .catch(err => console.log("something went wrong when connecting to the database", err));
    }catch (error){
        console.error('Erreur fr connexion à mongo DB:' , error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;