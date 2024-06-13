const mongoose = require('mongoose');

const connectDB =  async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log("Database successfully connected at host:", conn.connection.host);
        
        
    } catch (error) {
        
        console.log("Error connecting to mongodb", error);
    }

}


module.exports = {
    
    connectDB

}