const mongoose = require("mongoose")

const connectDB = async () => {
    // attempts  to connect to the server on MongoDB, as opposed to the local server
    //! Additional properties no longer needed
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        // if connection is successful, console log the following message
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    // catches errors
    catch (err) {
        console.err(err);
        process.exit(1);
    }
}

// exports the function, to be imported into another script and called at the appropriate time
module.exports = connectDB