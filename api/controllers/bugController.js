const asyncHandler = require('express-async-handler');
const Bug = require('../models/bugModel');
const User = require('../models/userModel');

//@desc     Get Bugs
//@route    GET /api/bugs
//@access   Private
const getBugs = asyncHandler(async (req,res) => {
    const bugs = await Bug.find({ user: req.user.id })
    res.status(200).json(bugs);
});

//@desc     Create Bug
//@route    POST /api/bugs
//@access   Private
const createBug = asyncHandler(async (req,res) => {
    //TO DO 
    console.log(req.body.description);
    console.log(req.body.state);
    console.log(req.body.priority);
    if (!req.body.description) {     //TO DO
        res.status(400)
        throw new Error('fields missing');
    }
    const bug = await Bug.create({
        description: req.body.description,
        state: req.body.state, 
        priority: req.body.priority,
        user: req.user.id
    })
    res.status(200).json(bug);
});

//@desc     Update Bug
//@route    PUT /api/bugs
//@access   Private
const updateBug = asyncHandler(async (req,res) => {     //TO DO  - fails to update
    const bug = await Bug.findById(req.params.id)
    if (!bug) {
        res.status(400)
        throw new Error(`Bug not found:  ${ req.params.id }`)
    }
    // const user = await User.findById(req.user.id);
    if (!req.user) {
        res.status(401)
        throw new Error('User not found');
    }
    if (bug.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorised');
    }
    console.log(req.body.description); 
    const updatedBug =  await Bug.findByIdAndUpdate(req.params.id, req.body.description, { new: true });
    res.status(200).json(updatedBug);
});

//@desc     Delete Bug
//@route    DELETE /api/bugs
//@access   Private
const deleteBug = asyncHandler(async (req,res) => {
    const bug = await Bug.findById(req.params.id)
    if (!bug) {
        res.status(400)
        throw new Error(`Bug not found:  ${ req.params.id }`)
    }
    // const user = await User.findById(req.user.id);
    if (!req.user) {
        res.status(401)
        throw new Error('User not found');
    }
    if (bug.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorised');
    }
    await bug.remove();
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getBugs,
    createBug,
    updateBug,
    deleteBug,
}