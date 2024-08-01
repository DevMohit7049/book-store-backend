const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
      url:{
         type:String,
         require:true
      },
      title:{
        type:String,
        require:true
      },
      author:{
        type:String,
        require:true
      },
      price:{
        type:Number,
        require:true
      },

      description:{
          type:String,
          require:true
      },

      language:{
        type:String,
        require:true
      },

},{timestamps:true}
);

const bookItem = mongoose.model('bookItem',bookSchema);
module.exports = bookItem;