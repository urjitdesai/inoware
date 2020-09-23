const {create,getUserByEmail, getUserByUsername, updateUser,deleteUser, getUsers}= require("./user.service")
const {genSaltSync, hashSync, compareSync}= require('bcrypt')
const {sign}= require("jsonwebtoken")
module.exports={
    createUser: (req, res) =>{
        const body= req.body;
        const salt= genSaltSync(10)
        console.log(req.body);
        body.password= hashSync(body.password, salt)
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'DB connection error '
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getUserByUsername: (req,res) => {
        const username= req.body.username;
        getUserByUsername(username, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: 'result not found'
                })
            }
            return res.json({
                success:1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                succes:1,
                data:results
            })
        })
    },
    updateUser: (req,res) =>{
        
        const body = req.body;
        console.log(body);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message: "Falied to update user"
                })
            }
            return res.json({
                success:1,
                message: 'updated successfully'
            })
        })
    },
    deleteUser: (req,res) =>{
        const data=req.body;
        deleteUser(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    succes:0,
                    message: "Record not found"
                })
            }
            return res.json({
                success:1,
                message: "Record deleted"
            })
        })
    },
    login: (req,res)=>{
        const body=req.body;
        console.log("login called", body);
        getUserByEmail(body.email, (err, results)=> {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data: "Invalid email or password"
                })
            }
            const result= compareSync(body.password, results.password)
            if(result){
                results.password=undefined;
                const jsontoken=sign({result:results}, "qwe1234",{
                    expiresIn: '1h'
                })
                return res.json({
                    succes:1,
                    message: "login successfull",
                    results:results,
                    token: jsontoken
                })
            }else{
                return res.json({
                    succes:0,
                    message: "Wrong credentials"
                })
            }
        })
    }
}
