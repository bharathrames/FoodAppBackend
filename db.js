const mongoose = require('mongoose');

// Use environment variables for sensitive information
const mongoURI = 'mongodb+srv://bharath91505:bharath123@cluster10.osghaom.mongodb.net/?retryWrites=true&w=majority; // Set this in your environment'

// Create a separate connection function to handle the async/await syntax
async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = async function (callback) {
    try {
        await connectToDatabase();

        const foodCollection = mongoose.connection.collection('food_items');
        const data = await foodCollection.find({}).toArray();

        const categoryCollection = mongoose.connection.collection('Categories');
        const Catdata = await categoryCollection.find({}).toArray();

        callback(null, data, Catdata);
    } catch (error) {
        callback(error, null, null);
    }
};
