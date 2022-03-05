//setting up our express server:
const express = require('express'); //returns a function

//including the file:
const db = require('./config/mongoose');

//require the contact.js file:
const Contact = require('./Models/contact');
// 'Contact' will be used to populate contacts

const app = express(); //invoking the returned function

// importing 'path' module:
const path = require('path');

const port = 8000;

//telling our web app which is generated using express to use 'ejs' as its 'template engine':
app.set('view engine', 'ejs');

//setting the view path:
app.set('views', path.join(__dirname, 'views'));

//parsing data from browser:
app.use(express.urlencoded({extended: true}));

//accessing static files - for using CSS and JS:
app.use(express.static('assets'));



//an array of contact list:
var contactList = []; 


app.get('/', function(req, res){

    // To fetch all the documents in our collections:
    /*
        Contact.find({}, function(err, contacts){
             console.log('Contacts found:', contacts);
            for (const item of contacts) {
                console.log(item.name, '', item.phoneNumber);
            } 
                    //(or)
            contacts.forEach(function(item){
                console.log(item.phoneNumber);
            })
        }); 
    */

    Contact.find({}, function(err, contacts){ // {} means * (all) , i.e there is no condition in finding 
        if (err) {
            console.log('Error in fetching contacts from db!');
            return;
        }
        
        //to render the html file to browser:
        return res.render('home', {
            dynamicTitle : "Contact List",
            contact_list : contacts //sending the contact list to ejs file
        });
    })
    
})

//When the form sends (post) data, it would come here:
app.post('/createContacts', function(req, res){

    //Inserting into our database:
    Contact.create({  //creating a collection
        name: req.body.name,
        phoneNumber: req.body.phoneNum
    }, function(err, newContact){ //callback function
        if (err) {
            console.log('Error in creating contact!');
            return;
        }
        console.log(newContact);
        res.redirect('/');
    })


    /* 
    //appending the contact in contactList:
    contactList.push({
        name: req.body.name,
        phoneNumber: req.body.phoneNum
    }); 
    // (or) contactList.push(req.body);

    return res.redirect('/'); //redirect (take us) to the home page
    */
})


//For deleting a contact:
// Get the query/string param from the url
app.get('/delete-Contact/:id', function(req, res){ //Using 'params'
    // console.log(req.params); //params too is an object which contains what we are sending through our html
    // console.log(req.params.phone); //gives the phone Number

    let id = req.params.id;
    console.log(id);

    //find the contact in the database using 'id' and delete it:
    Contact.findByIdAndDelete(id, function(err){
        if (err) {
            console.log('Error in deleting an object in database!');
            return;
        }
    });

    /*
    //getting the index of the phone Number to be deleted
    var deletingContactIndex = contactList.findIndex(function(contact){
        return contact.phoneNumber == phone;
    })

    //removing the contact at the index:
    if (deletingContactIndex != -1) {
        contactList.splice(deletingContactIndex, 1);
    }*/

    return res.redirect('/');
})


//Practice:
/*
app.get('/practice', function(req, res){
    return res.render('practice', {
        title: " Let's play with ejs "
    });
})
*/

app.listen(port, function(err){
    if (err) {
        console.log('Error', err);
        return;
    }

    console.log('My express server is running on port:', port);
})