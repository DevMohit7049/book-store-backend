const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const {authenticateToken} = require('../jwtAuth');

// add book in cart //
router.put('/add-to-cart',authenticateToken,async(req,res)=>{
    try {
          const {bookid,id} = req.headers;
          const userData = await User.findById(id);
          const isBookInCart = userData.cart.includes(bookid);

          if(isBookInCart){
             return res.status(200).json({message:'book already in cart'})
          } 

          await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
          res.status(200).json({message:'book added in cart'})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
})


// remove book from cart//
router.put('/remove-from-cart/:bookid',authenticateToken,async(req,res)=>{
    try {
          const {bookid} = req.params;
          const {id} = req.headers;
          await User.findByIdAndUpdate(id,
            {$pull:{cart:bookid}});
          res.status(200).json({message:'book remove from cart'})
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
})

// get user cart //
router.get('/get-cart-details',authenticateToken,async(req,res)=>{
    try {
          const {id} = req.headers;
          const userData = await User.findById(id).populate('cart');
          const cart = userData.cart.reverse();
          res.status(200).json({message:'Cart Data Fatch Successfully',data:cart});
    } 
    catch (error) {
       
        res.status(500).json({message:'Internal Server Error'});
    }
})
module.exports = router;