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
adam.readUser('user-7'); // USER CAN LOOK UP THE DETAILS OF A SINGLE USER USING HIS ID
alexis.readUser('user-2'); // ADMIN CAN LOOK UP THE DETAILS OF A SINGLE USER USING HIS ID

// ------------------------------
// READS ALL USERS IN THE DATABASE
// ------------------------------
alexis.readAllUsers(); // ONLY ADMIN CAN LOOK UP THE DETAILS OF ALL USERS

// ------------------------------
// UPDATES THE DETAILS OF A USER
// ------------------------------
ben.updateUserDetails({name: 'Benjamin'}); // USER CAN UPDATE HIS USER DETAILS
barbara.updateUserDetails({name: 'Barbie', email: 'barbie@mymail.com'}); // ADMIN CAN UPDATE HIS USER DETAILS

// ------------------------------
// DELETES A USER IN THE DATABASE
// ------------------------------
christine.deleteUser('user-1'); // ADMIN CAN DELETE A USER FROM THE DATABASE
christine.deleteUser('user-6'); // ADMIN CAN DELETE AN ADMIN FROM THE DATABASE

// ------------------------------
// DELETES A USER IN THE DATABASE
// ------------------------------
charles.searchUsername('Daphne'); // USER CAN SEARCH THE DATABASE FOR USERS WUTH A PARTICULAR USERNAME
daphne.searchUsername('Benjamin'); // ADMIN CAN SEARCH THE DATABASE FOR USERS WUTH A PARTICULAR USERNAME

// ------------------------------
// DELETES A USER IN THE DATABASE
// ------------------------------
erica.deleteAllUsers(); // ADMIN CAN DELETE A USER FROM THE DATABASE
