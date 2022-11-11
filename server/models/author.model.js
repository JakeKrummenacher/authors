const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true,
            "Author must have a first name"
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            "Author must have a last name"
        ]
    }
}, { timestamps: true });
module.exports = mongoose.model('Author', AuthorSchema);