const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/User');
const Book = require('../Models/book');
const {authenticateToken} = require('../jwtAuth');


// Add book by admin//
router.post('/add-book',authenticateToken,async (req,res)=>{
    try {
         const {id} = req.headers;
         const adminUser = await User.findById(id);
        //  check admin role /
         if(adminUser.role !== 'admin'){
           res.status(400).json({message:'Your not having access to admin work'});
         } 

         const{url,title,author,price,description,language} = req.body;
        // creation of new book //
         const newBook = new Book({
            url:url,
            title:title,
            author:author,
            price:price,
            description:description,
            language:language
         });

        await newBook.save();
        res.status(200).json({message:'Book Added Successfully'});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
})


// Update Book by admin//
router.put('/update-book',authenticateToken,async(req,res)=>{
   try {

      const {bookid} = req.headers; 

      const {url,title,author,price,description,language} = req.body;

     await Book.findByIdAndUpdate(bookid,{
        url: url,
        title: title,
        author: author,
        price: price,
        description: description,
        language: language
      });
      return res.status(200).json({message:'Book Updated Successfully'});
   } 
   catch (error) {
     res.status(500).json({message:'Internal Server Error'});
   }
})

// Delete book by admin//
router.delete('/delete-book',authenticateToken,async(req,res)=>{
   try {
         const {bookid} = req.headers;
         await Book.findByIdAndDelete(bookid);
         return res.status(200).json({message:'Book Deleted Successfully'});
   } 
   catch (error) {
      res.status(500).json({message:'Internal Server Error'});
   }
});

// ............................................Public Api...........................................................//

// Get All Book //
router.get('/get-all-books',async(req,res)=>{
   try {
           const books = await Book.find().sort({ createdAt: -1});
           res.status(200).json({message:'book fatched sucessfully',data:books})
   } 
   catch (error) {
      res.status(500).json({message:'Internal Server Error'});

   }
});


// get recently added books //
router.get('/get-recent-book',async(req,res)=>{
   try {
           const books = await Book.find().sort({ createdAt: -1}).limit(4);
           res.status(200).json({message:'book fatch',data:books})
   } 
   catch (error) {
      res.status(500).json({message:'Internal Server Error'});

   }
})


// get book details by id//
router.get('/get-book-details/:id',async(req,res)=>{
   try {
           const { id } = req.params;
           const books = await Book.findById(id);

           res.status(200).json({message:'book details fatched',data:books})
   } 
   catch (error) {
      res.status(500).json({message:'Internal Server Error'});

   }
})
module.exports = router;
