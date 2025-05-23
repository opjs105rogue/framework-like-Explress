const User = require("../userSchema.js");

const getUser = async (req,res)=> {
    let users;
    if(req.params.id) {
        users = await User.findById(req.params.id);
    } else {
        users = await User.find();
        }
    res.send(users);
}

const createUser = async (req,res)=> {
    const users = await User.create(req.body);
    res.send(users)
}

module.exports = {
    getUser, 
    createUser,
    
};