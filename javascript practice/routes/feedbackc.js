const router = require("express").Router();
const Feedback = require('../models/feedback');
const verifytoken = require('../verifyToken')

//post the feedback

router.post('/feedback', async(req,res) => {
    const feedbackpost = new Feedback(req.body);
    try{
        const saveFeedback = await feedbackpost.save();
        console.log("Feedback has been saved");
        res.status(200).json(saveFeedback)
    }catch(err){
        console.log("Error while saving the post")
        res.status(500).send("Internal server error")
    }
})

//delete the feedback

router.delete("/feedback/:id",async(req,res) => {
    try{
        const feedback = await Feedback.findByIdAndDelete(req.params.id)
        if(!feedback){
            return res.status(404).send('User not found')
        }
        return res.send({message: 'User deleted sucessfully'})
    }catch{
        res.status(500).send('Server error');
    }
})

//get Feedback

    router.get('/response',async(req,res) => {
        try{
            const allfeedback = await Feedback.find();
            allfeedback.sort((a,b) => a.age-b.age)
            res.status(200).json(allfeedback)
        }catch(err){
            res.status(500).send("Internal server error")
        }
    })

//edit function for this feedbacl saved

router.put('/feedback/:id',async(req,res) => {
    const feedbackId = req.params.id
    try{
        const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId,req.body,{new:true})
        console.log("Feedback has been updated")
        res.status(200).json(updatedFeedback)
    }catch(err){
        res.status(500).send("Internal server error")
        console.log("Server error")
    }
})

//get dropdown options for gender

router.get('/gender',async(req,res) => {
   const genderOptions = [
        { id: 1, gender: 'Male' },
        { id: 2, gender: 'Female' }
    ];
    res.status(200).json(genderOptions)
})

module.exports = router