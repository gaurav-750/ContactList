//requiring mongoose:
const mongoose = require('mongoose');

//Defining a Schema:
const contactSchema = new mongoose.Schema({
    name: {
        type: String, //name would ofc be a string
        required: true //Since we don't want an empty name to be created
    },
    phoneNumber: {
        type: String,
        required: true
    }

});

//Creating our Model:
const Contact = mongoose.model('Contact', contactSchema);
// 'Contact' is our MODEL

//exporting the model:
module.exports = Contact;

