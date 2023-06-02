const express = require("express");
const router = new express.Router();
const db = require("../db/connection")
router.get("/", (req,res)=>{
    res.send("Home")
});

router.post("/login", (req, res)=>{
    const {email , password} = req.body;
    let sql = "SELECT * from users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, data)=>{
        if(err) return res.json({Status: "Error", Error:"Error in Server. Please wait!"});
        if(data.length > 0) return res.json({Status: "Success"})
        else res.json({Status: "Error", Error:'Wrong Email or Password'})
    })
})
module.exports = router
