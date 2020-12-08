const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

mongoose.set('useFindAndModify', false);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connect successfully');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


const accountRouter = require('./routes/accounts');
const productRouter = require('./routes/product');

app.use('/account', accountRouter);
app.use('/product', productRouter);

;


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});