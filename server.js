const express = require('express');
const app = express();
const cors = require('cors')
const db  = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())
require('dotenv').config();
const PORT = process.env.PORT || 3000;


const userRoutes = require('./Routes/userRoutes');
app.use('/user',userRoutes);

const bookRoutes = require('./Routes/bookRoute');
app.use('/book',bookRoutes);

const userFavouritsRoutes = require('./Routes/userFavourits');
app.use('/favourits',userFavouritsRoutes);

const userCartRoutes = require('./Routes/cartRoute');
app.use('/cart',userCartRoutes);

const userOrder = require('./Routes/orderRoutes');
app.use('/order',userOrder);


app.listen(PORT,()=>{
    console.log("Listenign on==",PORT);
});