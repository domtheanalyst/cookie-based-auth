const http = require('http');

const app = require('./src/app');

require('dotenv').config();

const { connectDB } = require('./src/db/connectDB');

const server = http.createServer(app);

const PORT = process.env.PORT || 6000;

// starting server function

async function startServer(){

    try {

        await connectDB();

        server.listen (PORT, () => {
    
            console.log(`Server is running at port ${PORT}`);
        
        });
        
    } catch (error) {

        console.log("Error starting the server", error);

        process.exit(1);
        
    }
    
}


startServer();
