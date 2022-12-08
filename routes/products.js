const express = require('express');

const router = express.Router();

const db = require('../db');

const jwt = require('jsonwebtoken');


// http://localhost:4000/products/allproducts
router.get('/allproducts', async (req, res) =>{
    try{
        const response = await db.promise().query('SELECT * FROM products');
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json({Error: err.message})
    }
})


// http://localhost:4000/products/addproduct
router.post('/addproduct', async (req, res) => {
    console.log(req.body);
    try{
        //store in db - mongoose command
        // let tempObj = new Product({
        //     id: req.body.id,
        //     title: req.body.title,
        //     price: req.body.price,
        //     description: req.body.description,
        //     category: req.body.category,
        //     image: req.body.image
        // });
        // let responseDb = await tempObj.save();
        const response = await db.promise().query(`INSERT INTO products(id, title, price, description, category, image) values ('${req.body.id}', '${req.body.title}', '${req.body.price}', '${req.body.description}', '${req.body.category}', '${req.body.image}')`)
        res.status(201).json(response);
    }
    catch(err){
        res.status(400).json({Error: err.message})
    }
})


// http://localhost:4000/products/abc
// router.get('/abc',  (req, res) =>{
//     res.send('Router is working....')
// }) 


const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];
    console.log('token', token);


    if(!token)(
        res.status(400).json({err: 'Token Missing'})
    )
    else {
        jwt.verify(token, "newtonschool", (err, decoded) => {
            if(err) {
                res.status(400).json({err: 'Token Invalid'})
            }
            else {
                //favourable case - all good
                console.log('decoded', decoded);
                next();
            }
        })
    }
}


// http://localhost:4000/products/searchbyid/{product_id}
router.get('/searchbyid/:tempid', verifyJwt, async (req, res) =>{
    console.log(req.params.tempid);
    let temp = req.params.tempid;


    try{
            const response = await db.promise().query(`SELECT * FROM products WHERE id= ${temp}`);
            //check in session varibale for loginstatus
            res.status(200).json(response[0][0]);
            //else return error
        }
        catch(err){
            res.status(400).json({Error: err.message})
        }
    
}) 

// http://localhost:4000/products/searchbycategory/{category}
router.get('/searchbycategory/:tempcategory', async (req, res) =>{
    console.log(req.params.tempcategory);
    try{
        // const response = await Product.find({category: req.params.tempcategory});
        // show data on ejs template
        // res.render('ejsfile3', {response});

        res.status(200).json('response');
    }
    catch(err){
        res.status(400).json({Error: err.message})
    }
}) 



// http://localhost:4000/products/search_product/?id1=12345
router.get('/search_product', async (req, res) =>{
    console.log(req.query.id1);
    // console.log('inside products route')
    res.send('Router is working....')
}) 

// http://localhost:4000/products/updatebyid/{product_id}
router.put('/updatebyid/:id', async (req, res) =>{
    console.log(req.params.id);
    console.log(req.body);
    let tempId = req.params.id
    let tempData = req.body;
    try{
        // const response = await Product.findOneAndUpdate({'id': tempId}, tempData, {new: true});
        res.status(200).json('response');
    }
    catch(err){
        res.status(400).json({Error: err.message})
    }
})

// http://localhost:4000/products/deletebyid/{product_id}
router.delete('/deletebyid/:id', async (req, res) =>{
    console.log(req.body);
    try{
        let tempId = req.params.id;
        // let responseDb = await Product.deleteOne({id: tempId});
        res.status(201).json('responseDb');
    }
    catch(err){
        res.status(400).json({Error: err.message})
    }
})


module.exports = router;


// jwt token
// bcrypt
// passport / passport-jwt
// auth - express auth