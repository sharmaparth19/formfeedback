const express = require("express");
const router = require("express").Router();
const Post = require('../models/emp');

//post details

router.post('/emp', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savepost = await newPost.save()
        console.log("post has been created")
        res.status(200).send(savepost)
    } catch (err) {
        console.log("some error has been occur:", err.message);
        res.status(500).json(err);
    }
})

// put api

router.put('/emp/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const updatePost = await Post.findByIdAndUpdate(postId, req.body, { new: true })
        if (!updatePost) {
            return res.status(404).json({ error: "Post not found" })
        }
        console.log("Post has been updated");
        res.status(200).send(updatePost)
    } catch (err) {
        console.error("An error occurred:", err.message);
        res.status(500).json({ error: "Internal server error" }); // Return error if any
    }
})

//get post data from databse

router.get('/emp', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (err) {
        console.error("An error occurred:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get emp on bases of category or search on bases of category

router.get('/emp/:category',async(req,res) => {
    const category = req.params.category
    try{
        const postsearch = await Post.find({category:category});
        res.status(200).json(postsearch)
    }catch(err){
        console.error("Cant search, server error")
        res.status(500).send("Internal server error")
    }
})

module.exports = router;
