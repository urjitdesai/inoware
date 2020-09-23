const pool=require('../../config/database')

module.exports={
    create: (data, callBack)=>{
        pool.query(
            `insert into users (name, username, email, password, photo) values (?,?,?,?,?)`,
            [
                data.name,
                data.username,
                data.email,
                data.password,
                data.photo
            ],
            (err,results,fields)=>{
                if(err){
                    callBack(err)
                }
                return callBack(null, results)
            }
            )
    },
    getUsers: (callBack)=>{
        pool.query(
            `select name, username, email, photo from users`,[],
            (err, results, fields)=>{
                if(err){
                     callBack(err);
                }
                return callBack(null, results)
            }
            )
    },

    getUserByUsername: (username, callBack)=>{
        pool.query(
            `select name, username, email, photo from users where username= ?`,
            [username],
            (error, results, fields)=> {
                if(error){
                     callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update users set name=?, username=?, password=?, photo=? where email=?`,
            [
                data.name,
                data.username,
                data.password,
                data.photo,
                data.email
            ],
            (error,results,fields)=>{
                if(error){
                    callBack(error)
                }
                return callBack(null, results)
            }
            )
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where username=?`,[
                data.username
            ],
            (error, results, fields)=> {
                if(error){
                    callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getUserByEmail: (email, callBack) =>{
        pool.query(
            `select * from users where email =?`, [email],
            (err, results, field)=>{
                if(err){
                    callBack(err);
                }
                // console.log(results[0]);
                return callBack(null, results[0])
            }
        )
    }

}