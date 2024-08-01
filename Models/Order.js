const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
           type:mongoose.Types.ObjectId,
           ref:"userItem"
    },

    book:{
        type:mongoose.Types.ObjectId,
        ref:"bookItem"
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:['Order Placed','Out for delivery','Deleverd','Canceled']
    }

},{timestamps:true}
);

const orderItem = mongoose.model('orderItem',orderSchema);
module.exports = orderItem;