const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Book = require('../Models/book');
const Order = require('../Models/Order');
const {authenticateToken} = require('../jwtAuth');

// place Order//
router.post('/place-order',authenticateToken,async(req,res)=>{
     try {
        
         const {id} = req.headers;
         const {order} = req.body;

         for(const orderData of order){

           const newOrder = new Order({user:id,book:orderData._id});
           const orderDataFromDb = await newOrder.save();

        // saving order in user model//
        await User.findByIdAndUpdate(id,
            {$push:{orders:orderDataFromDb._id},
        });

        // clearing cart //
        await User.findByIdAndUpdate(id,
            {$pull:{cart:orderData._id}
        });
    }

    return res.json({status:'success',message:'Order Placed Successfully'});

     } catch (error) {
         res.status(200).json({message:"Error Occured"});
     }
});

// get order history of particular order //
router.get('/order-history',authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        });

        const orderData = userData.orders.reverse();
        return res.json({status:'Success',data:orderData
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Internal Server Error'})
    }
 

})


// get all order ---admin role //
router.get('/get-all-order',authenticateToken,async(req,res)=>{
    try{

        const orderData = await Order.find().populate({ path:"book",}).populate({path:'user'}).sort({createdAt: -1});
        return res.json({status:'Success',data:orderData});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Internal Server Error'})
    }
 

})


// update order status ---admin role//
router.put('/update-status/:id',authenticateToken,async(req,res)=>{
    try{
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        
        return res.json({status:'Success',message:"Status Updated Successfully"});
    }
    catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
 

})


module.exports = router;