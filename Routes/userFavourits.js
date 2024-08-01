const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const {authenticateToken} = require('../jwtAuth');

// added favourites books //
router.put('/add-book-to-favourites',authenticateToken,async(req,res)=>{
    try {
          const {bookid,id} = req.headers;
          const userData = await User.findById(id);
          const isBookfavourites = userData.favourites.includes(bookid);

          if(isBookfavourites){
             return res.status(200).json({message:'book already in favourites'})
          } 

          await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
          res.status(200).json({message:'book added in favourites'})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
})


// remove book from favourites //
router.put('/delete-book-from-favourites',authenticateToken,async(req,res)=>{
    try {
          const {bookid,id} = req.headers;
          const userData = await User.findById(id);
          const isBookfavourites = userData.favourites.includes(bookid);

          if(isBookfavourites){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
            res.status(200).json({message:'book remove from favourites'});
          }
          else{
            res.status(200).json({message:'nothing in favourites'});
          }
          
    } 
    catch (error) {
     
        res.status(500).json({message:'Internal Server Error'});
    }
})


// fatching favourites books//
router.get('/get-favourites-book',authenticateToken,async(req,res)=>{
    try{
          const {id} = req.headers;
          const userData = await User.findById(id).populate("favourites");
          const favouriteBook = userData.favourites;
          res.status(200).json({message:'book fatched',data:favouriteBook});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
})
module.exports = router;