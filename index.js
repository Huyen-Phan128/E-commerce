const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

const app = express();
const port = 3000;


//Connect database
mongoose.connect('mongodb://127.0.0.1:27017/E_commerce', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', error => console.log(error));
db.on('open', () => console.log('connect to mongodb...'));

app.use(morgan('combined'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(cors());
app.use(morgan('common'));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});