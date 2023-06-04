const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
require("./db/connection")
app.use(cors());
const router = require("./routes/router")
app.use(express.json())
app.use(router);
app.use(express.static("public"))



app.listen(port, ()=>{
    console.log(`App is Running at ${port}`)
})