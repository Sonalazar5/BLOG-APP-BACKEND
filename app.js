const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Cors = require("cors")
const userModel = require("./models/users")

let app = Express()
app.use(Express.json)
app.use(Cors())
Mongoose.connect("mongodb+srv://sonalazar:9633591213@cluster0.zs9tqxx.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")
//signIn
app.post("/signIn",async(req,res)=>{

  let input=req.body
  let result=userModel.find({email:req.body.email}).then(
    (items)=>{
      if (items.length>0){
        const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
        if(passwordValidator){

          jwt.sign({email:req.body.email},"blogapp",{expiresIn:"1d"},
            (error,token)=>{
              if (error) {
                res.json({"status":"error","error":error})
              } else {
                res.json({"status":"success","token":token,"userId":items[0]._id})
              }
            }
          )

        }else{
          res.json({"status":"incorrect password"})
        }
      }else{
        res.json({"status":"invalid"})
      }
    }
  ).catch()
  
  
})










//signUp
  app.post("/signUp",async(req,res)=>{

  let input = req.body
  let hashedPassword = Bcrypt.hashSync(req.body.password,10)
  console.log(hashedPassword)
  req.body.password=hashedPassword
  
    userModel.find({email:req.body.email}).then(
      (items)=>{
        if (items.length > 0) {

      res.json({"status":"email id already exists"})
        
    } else {
        let result=new userModel(input)
        result.save()
        res.json({"status":"success"})
    }

      }
    ).catch(
      (error)=>{}
    )
console.log(check)
    
  
})

  
   app.listen(3030,()=>{
    console.log("server started")
   })