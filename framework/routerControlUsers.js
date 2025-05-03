const users = [
    {id:1, name: 'Anton'},
    {id:2, name: 'Yuri'},
    {id:3, name: 'Pavel'},

]

const getUser = (req,res)=> {
    if(req.params.id) {
        return res.send(users.find(user => user.id == req.params.id))
    }
    res.send(users)
}

const createUser = (req,res)=> {
    console.log(req.body);
    const user = req.body;
    users.push(user);
    res.send(users)
}

module.exports = {
    getUser, 
    createUser,
    
};