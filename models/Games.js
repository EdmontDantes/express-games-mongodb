const mongoose = require('mongoose');

const VideoGameMongoDBSchema = new mongoose.Schema ({
    name: { type: String, unique: true, lowercase: true, required: true},
    description: { type: String, required: true},
    released: { type: String },
    playtime: { type: Number },
    secret: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('videogame', VideoGameMongoDBSchema);

// MODEL:
// name - make unique, lowercase, and required, string
// description - string, required
// released - string,
// playtime - number in minutes
// secret - string, required
// timestamp - date, default to the current date