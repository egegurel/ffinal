const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

const bodyParser = require('express').json;
let public_users = require('./general.js').general;
let newuser = require('./general.js').newuse;
const app = express();
const regd_users = express.Router();
app.use(express.json());
app.use(bodyParser);
app.use(express.urlencoded({extended: true}));


let users = [];

const ww = Object.values(newuser);
users.push(ww);

const isValid = (username)=>{ //returns boolean
   

    if(users[username]===true){
        return true;
    }
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
  
    if(newuser[0].username === username &&  newuser[0].password===password){
        console.log("username & password is valid");
        return true;
    }else{
        console.log('fail');
        console.log(newuser);
        console.log(newuser[username]);
       
    }
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    console.log('NOT LOGGED IN');
      return res.status(404).json({message: "Error logging in"});
  }
  
  if (authenticatedUser(username,password)===true) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60*60 });

    req.session.authorization = {
      accessToken,username
  }
  console.log('SUCCEED IN LOGIN');
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});

});




// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const comment = req.query;
  const co = []; 
    for (const element in comment) {
      co.push(element);
    };
  console.log(co);
  const addreview = req.params.isbn;

  console.log(books[addreview]["reviews"]);
  books[addreview]['reviews'] = co;
  //const bookk = books[addreview];
  return res.status(300).json({message: "Review added successfully"});
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
