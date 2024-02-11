const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const ary = [];
const valuesArray = Object.values(books);


ary.push(valuesArray);
//
console.log(books[0]);

//
const booksByAuthor =Object.values(books).filter(book => book.author== "Dante Alighieri");
console.log(booksByAuthor);

const booksByAuthor2 =Object.values(books).filter(book => book.title== "The Book Of Job");
console.log(booksByAuthor2);  



//
  function usingAsyncAllBooks(callback)
  {  
  setTimeout(() => {    callback(null, books);  }, 100)
  ; }
  usingAsyncAllBooks((err, allBooks) => {
    if (err) {  
    console.error(err);  
  return; 
  } 
  console.log("All books:", allBooks);
  });  




//
function selectsBookByISBN(bookId) {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const book = books[bookId];
      if (book) {
        resolve(book);
      } else {
        reject(new Error('Book not found with ID: ' + bookId));
      }
    }, 100); 
  });
}


selectsBookByISBN(3).then(book => {
  console.log("Book details:", book);
}).catch(err => {
  console.error(err);
});




//
let newuse = [];

public_users.post("/register", (req,res) => {
  //Write your code here
  let newusername;
  newusername = req.body.username;
  console.log(newusername);
  let newpass;
  newpass  = req.body.password;
  console.log(newpass);
  try{
  // Assuming users is an array accessible in this scope
  newuse.push({ username: newusername, password: newpass }); 
  console.log(newuse);
  return res.status(201).json({ message: "User registered successfully" });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Server error while registering user" });
}
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 const allbooks = JSON.stringify(books);
 const zz =  Object.values(books).filter(book => console.log(book));
  //Write your code here

  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  //Write your code here
  const isbn = req.params.isbn;

  const bookz = books[isbn];
  console.log(bookz);
  //const booksByAuthor = Object.values(books).filter(book =>  console.log(book[1]) );
//  console.log(isbn);
  return res.status(300).json({bookz});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = "author";
  const nameauthor = req.params.author;
  const namesofauthors = [];
  const booksByAuthor = Object.values(books).filter(book => book.author === nameauthor);
  namesofauthors.push(booksByAuthor);
 // const booksByAuthor = Object.values(books).filter(book =>  namesofauthors.push(book[author] == nameauthor) );
  console.log(namesofauthors);
  return res.status(300).json({namesofauthors});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const gettitle = req.params.title;
  const showtitles = [];
  const showingtitles =  Object.values(books).filter(titles=> titles.title === gettitle); 
  console.log(showingtitles);
  showtitles.push(showingtitles);
  //Write your code here
  return res.status(300).json({showtitles});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const paramreview = req.params.isbn;
  const reviewsoftitle = [];
  const paras = Object.values(books).filter(reviewss => reviewss.title === paramreview);
  paras.forEach(book => {
    console.log(book.reviews);
    reviewsoftitle.push(book.reviews);
  });
  console.log(reviewsoftitle);
  //Write your code here
  return res.status(300).json({reviewsoftitle});
});

module.exports.general = public_users;
module.exports.newuse = newuse;
