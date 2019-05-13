// ------------------------------
// IMPORTS REQUIRED FILES
// ------------------------------

var User = require('./user');
var Admin = require('./admin');

// ------------------------------
// CREATES NEW USERS
// ------------------------------
var adam = new User('Adam', 'adam@mail.com', '1234');
var ben = new User('Ben', 'ben@mail.com', '1234');
var charles = new User('Charles', 'charles@mail.com', '1234');

// ------------------------------
// CREATES NEW ADMINS
// ------------------------------
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

// ------------------------------
// CREATES NEW USERS
// ------------------------------
var david = new User('David', 'david@mail.com', '1234');

// ------------------------------
// CREATES NEW ADMINS
// ------------------------------
var fiona = new Admin('Fiona', 'fiona@mail.com', '4321');
var gertrude = new Admin('Gertrude', 'gertrude@mail.com', '4321');
var hailie = new Admin('Hailie', 'hailie@mail.com', '4321');
var ingrid = new Admin('Ingrid', 'ingrid@mail.com', '4321');
var joanne = new Admin('Joanne', 'joanne@mail.com', '4321');

// ------------------------------
// CREATES A NEW ORDER
// ------------------------------
david.createNewOrder('soap', 'sponge'); // USER CAN CREATE A NEW ORDER
david.createNewOrder('bag', 'broom'); // USER CAN CREATE A NEW ORDER
gertrude.createNewOrder('pen', 'pencil', 'paper', 'palette', 'paint'); // ADMIN CAN CREATE A NEW ORDER
gertrude.createNewOrder('mat', 'rug'); // ADMIN CAN CREATE A NEW ORDER

// ------------------------------
// READ ALL THE ORDERS
// ------------------------------
fiona.readAllOrders(); // ADMIN CAN LOOK UP DETAILS OF ALL THE ORDERS IN THE DATABASE

// ------------------------------
// READ A SINGLE ORDER USING ITS ID
// ------------------------------
gertrude.readOrder('order-1'); // ADMIN CAN LOOK UP THE DETAILS OF AN ORDER USING ITS ORDER ID

// ------------------------------
// UPDATE ORDER DETAILS IN THE DATABASE USING ITS ORDER ID
// ------------------------------
hailie.updateOrder('order-1', ['apples', 'bananas', 'carrots']); // ADMIN CAN UPDATE THE DETAILS OF AN ORDER USING ITS ORDER ID

// ------------------------------
// DELETE A SINGLE ORDER FROM THE DATABASE USING ITS ORDER ID
// ------------------------------
ingrid.deleteOrder('order-3'); // ADMIN CAN DELETE AN ORDER FROM THE DATABASE USING ITS ORDER ID
ingrid.readAllOrders(); // READ ALL ORDERS SHOWS THAT THE DELETED ORDER IS NOT IN THE DATABASE

// ------------------------------
// DELETE ALL ORDERS FROM THE DATABASE
// ------------------------------
joanne.deleteAllOrders(); // ADMIN CAN DELETE ALL ORDERS IN THE DATABASE
joanne.readAllOrders(); // READ ALL ORDERS SHOWS THAT ALL ORDERS HAVE BEEN DELETED FROM THE DATABASE
