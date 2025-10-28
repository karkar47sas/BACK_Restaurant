const mongoose = require('mongoose');

async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Connecté à mongoDB"))
            .catch(error => console.error("Could not connect to mongoDB", error));
    } catch (error) {
        console.error("Could not connect to mongoDB", error);
    }
}

module.exports=connectToDB;