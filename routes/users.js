const express = require('express');
const db = require('../db');

const router = express.Router();

const jwt = require('jsonwebtoken');



// http://localhost:4000/users/allusers
router.get('/allusers', async (req, res) =>{
    console.log(req.body);
    const tempEmail = req.body.email;
    const tempPassword = req.body.password;
    try{
        // const response = await User.findOne({email: tempEmail});
        const response = await db.promise().query(`SELECT * FROM users`);
        console.log(response[0]);
        const data = response[0];
        res.status(200).json(data);
    }
    catch(err) {
        res.status(400).json({Error: err.message})
    }
})



// http://localhost:4000/users/login
router.post('/login', async (req, res) =>{
    console.log(req.body);
    const tempEmail = req.body.email;
    const tempPassword = req.body.password;
    try{
        // const response = await User.findOne({email: tempEmail});
        const response = await db.promise().query(`SELECT * FROM users WHERE email = '${tempEmail}' `);
        console.log(response[0][0]);
        const data = response[0];
        if(data.length !== 0) {
            console.log(data[0].password, typeof(data[0].password), tempPassword, typeof(tempPassword));
            if(data[0].password === tempPassword) {
                //successfull login
                //store login data in session variable
                //create jwt token

                let obj = {};
                obj.userDetails = data[0];
                obj.token = jwt.sign(data[0], "newtonschool", {
                    expiresIn: 60000
                });
                res.status(200).json(obj);
            }
            else {
                //password incorrect
                res.status(401).json({err: 'Invalid Password'});
            }
        }
        else {
            //user not found
            res.status(401).json({err: 'Invalid Username'});
        }
    }
    catch(err) {
        res.status(400).json({Error: err.message})
    }
})

// http://localhost:4000/users/register
router.post('/register', async (req, res) =>{
    console.log(req.body);
    try{
        const response = await db.promise().query(`INSERT INTO users(userid, name, email, mobile, password) values ('${req.body.userid}', '${req.body.name}', '${req.body.email}', '${req.body.mobile}', '${req.body.password}')`)
        // const response = await tempObj.save();
        res.status(201).json(response);
    }
    catch(err) {
        res.status(400).json({Error: err.message})
    }
}) 


module.exports = router;





// let arr = ['java', 'python', 'js', 'sql'];
// let arrdata = arr.join(',');

// let sqldata = 'java#python#js#sql';
// let data = arrdata.split(',');



// users - id, email, password
// user_details - id, city, pincode, gender, dob, skills
