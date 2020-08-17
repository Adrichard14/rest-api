const { create, getUserByUserID, getUserByEmail, getUsers, updateUser, deleteUser } = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sign } = require('jsonwebtoken')
module.exports = {
    createUser: (req, res) =>{
        const body = req.body;
        // const hasUser = getUserByEmail(body.email, (err, results)=>{
        //    if(results){
        //        return;
        //    }
        //     return true;
        // });
        // console.log(hasUser);
        const salt = genSaltSync(10);  
        body.password = hashSync(body.password, salt);
        create(body, (err, results, status = 1)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: status,
                data: results
            })
        });
    },
    getUserByID: (req, res) =>{
        const ID = req.params.ID;
        getUserByUserID(ID, (err, results) =>{
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "User not found!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    // getUserByEmail: (req, res) => {
    //     const email = req.params.email;
    //     getUserByUserID(email, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         if (!results) {
    //             return res.json({
    //                 success: 0,
    //                 message: "User not found!"
    //             });
    //         }
    //         return res.json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
    getUsers: (req, res) =>{
        getUsers((err, results) =>{
            if (err) {
                console.log(err);
               return;
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    updateUser: (req, res) => {
        const body = req.body;

        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return; 
            }
            return res.json({
                success: 1,
                data: "Update sucessfully"
            })
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: "User deleted from database"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) =>{
            if(err){
                console.log(err);
            }
            if(!results){
                res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
            console.log(results);
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({ result: results}, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login successfuly",
                    token: jsonToken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
    
}
