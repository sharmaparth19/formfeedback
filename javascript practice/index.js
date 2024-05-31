const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const empRoute = require('./routes/empc');
const feedbackRoute = require('./routes/feedbackc');
const authRoute = require('./routes/auth');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect("mongodb+srv://parth_sharma:iamparth@cluster0.pedwy.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
});


//Middleware 
app.use('/api/user',empRoute);
app.use('/api/status',feedbackRoute);
app.use('/api/auth',authRoute);


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors({
  origin: 'http://localhost:54814' // assuming Angular app runs on port 4200
}));

app.listen(3000, () => {
  console.log('Express server is listening on port 3000');
});
