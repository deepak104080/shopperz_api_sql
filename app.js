const express = require('express');
const app = express();
const cors = require('cors');
// app - active express apllication
//app.use(reqAgeFilter);

app.use(express.json());
app.use(cors());

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');


app.use('/products', productsRoute);
app.use('/users', usersRoute);



//http://localhost:4000/
app.get('/', (req, res) => {
    res.send('Express application is running..............')
})




// use - represents middleware
// req - object from client to server
// res - object from server to client

//to run server on port
app.listen(4000);