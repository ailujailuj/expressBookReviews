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
public_users.get('/isbn/:isbn',async (req, res) => {
  try {
      const isbn = await req.params.isbn
      res.send(JSON.stringify(books[isbn], null, 4))
  } catch (err) {
      res.status(500).json({message: "Internal Server Error"})
  }
});
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  try {
      const author = await req.params.author
    const books_values = Object.values(books)
    const filtered_books = books_values.filter((book) => book.author.toLowerCase() === author.toLowerCase())
    res.send(filtered_books)
  } catch(err) {
      res.status(500).json({message: "Internal Server Error"});
  }
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  try {
      const title = await req.params.title
      const books_values = Object.values(books)
      const filtered_books = books_values.filter((book) => book.title.toLowerCase() === title.toLowerCase())
      res.send(filtered_books)
  } catch(err) {
      res.status(500).json({message: "Internal Server Error"});
  }
});

//  Get book review
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const isbn = await req.params.isbn
    res.send(books[isbn].reviews)
  } catch (err) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

module.exports.general = public_users;
