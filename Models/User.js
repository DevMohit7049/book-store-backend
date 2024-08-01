const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },

    avtaar:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'
    },

    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favourites:
    [
        {
        type:mongoose.Types.ObjectId,
        ref:"bookItem"
        }
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"bookItem"
        }
    ],

    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"orderItem"
        }
    ],
},{timestamps:true}
);


const userItem = mongoose.model('userItem',userSchema);
module.exports = userItem;

