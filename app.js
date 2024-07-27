const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Cors = require("cors")

let app = Express()

  app.get("/",(req,res)=>{
    res.send("server started")
  })

  app.listen(3030,()=>{
    console.log("server started")
  })