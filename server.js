const express = require('express');
const app = express();
const db = require('./db');
const bodyparser = require('body-parser');

app.use(bodyparser.json());


// import the routers
const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');
// use the routers 
app.use("/person",personroutes);
app.use("/menu",menuroutes);

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
  