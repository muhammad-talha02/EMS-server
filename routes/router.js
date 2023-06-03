const express = require("express");
const router = new express.Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt")
const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images")
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_ " + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})
router.get("/", (req, res) => {
    res.send("Home")
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    let sql = "SELECT * from users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) return res.json({ Status: "Error", Error: "Error in Server. Please wait!" });
        if (data.length > 0) return res.json({ Status: "Success" })
        else res.json({ Status: "Error", Error: 'Wrong Email or Password' })
    })
});
router.post("/create", upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) return "Errror in hashing"
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.file.filename,
        ];
        console.log(values)
        const sql = 'INSERT into employee(name, email, password, address, image) VALUES (?)';
        db.query(sql, [values], (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        })
    });
})
module.exports = router
