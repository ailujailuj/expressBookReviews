const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
 const username = req.body.username
 const password = req.body.password

 if (username&&password) {
     if (isValid(username)) {
        users.push({"username": username, "password": password})
        res.status(200).json({message: "User successfully registered."})
     } else {
         res.status(404).json({message: "Username already exists."})
     }
 } else {
     res.status(404).json({message: "Unable to register user."})
 }
});

// Get the book list available in the shop
public_users.get('/',async (req, res) => {
  try {
    const bookList = await JSON.stringify(books, null, 4)
    res.send(bookList)
  } catch(err) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    res.send(JSON.stringify(books[isbn], null, 4))
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
  const books_values = Object.values(books)
  const filtered_books = books_values.filter((book) => book.author.toLowerCase() === author.toLowerCase())
  res.send(filtered_books)
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const books_values = Object.values(books)
  const filtered_books = books_values.filter((book) => book.title.toLowerCase() === title.toLowerCase())
    res.send(filtered_books)
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    res.send(books[isbn].reviews)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
