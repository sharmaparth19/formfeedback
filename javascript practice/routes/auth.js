const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


//register routes

router.post('/register',async(req,res) =>{
    try{
        //check if the username already exist
        const existingUser = await User.findOne({username:req.body.username})
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        //hash the password
        const hasPassword = await bcrypt.hash(req.body.password,10)

        //create new user
        const user = new User({
            username:req.body.username,
            password:hasPassword,
            name: req.body.name
        })
        //save the user
        await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    }catch(err){
        console.log(">>>>>>>>>>>>>>>>>>",err)
        res.status(500).send("Internal Server Error")
    }
})

//login the user

router.post('/login',async(req,res) => {
    try{
        //find user already exist
        const user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(400).json({message:'User Not exist'})
        }

        //check if password is correct or not
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(401).json({message:'Invalid Password'})
        }

        //create and send jwt tocken
        const jwtSecretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({_id:user._id},jwtSecretKey)
        res.header('auth-token',token).send(token);
    }catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router
 