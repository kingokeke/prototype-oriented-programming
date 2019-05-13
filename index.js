// IMPORTS REQUIRED FILES
var DB = require('./db');
var User = require('./user');
var Admin = require('./admin');
var Order = require('./order');

// CREATES NEW USERS
var adam = new User('Adam', 'adam@mail.com', '1234');
var ben = new User('Ben', 'ben@mail.com', '1234');
var charles = new User('Charles', 'charles@mail.com', '1234');
var david = new User('David', 'david@mail.com', '1234');
var edwin = new User('Edwin', 'edwin@mail.com', '1234');

// CREATES NEW ADMINS
var alexis = new Admin('Alexis', 'alexis@mail.com', '4321');
var barbara = new Admin('Barbara', 'barbara@mail.com', '4321');
var christine = new Admin('Christine', 'christine@mail.com', '4321');
var daphne = new Admin('Daphne', 'daphne@mail.com', '4321');
var erica = new Admin('Erica', 'erica@mail.com', '4321');

// ------------------------------
// READ A SINGLE USER BY HIS ID
// ------------------------------
// adam.readUser('user-2'); // USER CAN LOOK UP THE DETAILS OF A SINGLE USER USING HIS ID
// alexis.readUser('user-2'); // ADMIN CAN LOOK UP THE DETAILS OF A SINGLE USER USING HIS ID

// ------------------------------
// READS ALL USERS
// ------------------------------
// alexis.readAllUsers(); // ONLY ADMIN CAN LOOK UP THE DETAILS OF ALL USERS

// UPDATES THE DETAILS OF A USER
ben.updateUserDetails({name: 'Benjamin'});
