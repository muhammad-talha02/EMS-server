const mysql =require("mysql");

const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:'root@123',
    database:"EMS"
});

db.connect((err)=>{
    if(err) return err
    console.log("Connected")
})

module.exports = db;
