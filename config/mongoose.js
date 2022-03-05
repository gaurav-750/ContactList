//requiring 'mongoose' library (as it's a package)
const mongoose = require('mongoose');

//making connection with the database named 'contacts_list_db':
mongoose.connect('mongodb://localhost:27017/contacts_list_db');
//contacts_list_db -> name of our database

//Aquiring the connection
const db = mongoose.connection;
//the connection which is present between database and mongoose is 'db':
//db - used for accessing the database


//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//once the connection is open for me to interact with the database(on line 9), 
db.once('open', function(){
    console.log('Successfully connected to the database!');
})