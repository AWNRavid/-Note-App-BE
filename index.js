require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3500;
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())
const cors=require("cors");
var cookieParser = require('cookie-parser')

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cookieParser())

app.use(cors(corsOptions)) // Use this after the variable declaration

const members = require('./routes/members')

app.use('/members', members)

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});


/* 
require('dotenv').config();
require('./Config/db');
// require('./config/config');

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const beverageRouter = require('./Api/BeverageApi/BeverageRouter');
const foodRouter = require('./Api/FoodApi/FoodRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);

app.use('/', beverageRouter);
app.use('/', foodRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

*/