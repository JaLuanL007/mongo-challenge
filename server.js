const mongoose = require(`mongoose`)
const express = require('express');
const cors = require('cors');
const userModel = require(`./models/profileModel`)
const bodyParser = require(`body-parser`)

require("dotenv").config();

const app = express()
const PORT = process.env.PORT;

app.use(cors({ 
    origin: true,
    credentials: true
    
}));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
mongoose.set("strictQuery",true)
async function connectToDB(){
    try {
        await mongoose.connect(process.env.mongo_db_uri)
        console.log(`connected to db`)
    } catch (e) {
        console.log(`connection failed${e}`)
    }
}
connectToDB()
app.post("/newprofile",async(req,res) =>{
    const data = req.body
try {
    const newProfile = await userModel.create({
        name:data.name,
        adress:data.adress,
        age:data.age
    },{new:true})
    res.status(200).send({
        message:"profile created",
        payload:newProfile
    })
} catch (e) {
    res.status(400).send({
        message:"error in post",
        payload:e
    })
}
})
 app.get("/profiles",async(req,res) =>{
    try {
        const profiles = await userModel.find()
        res.status(200).send({
            message:"profiles found",
            payload:profiles
        })
    } catch (e) {
        res.status(400).send({
            message:"no profiles found",
            payload:e
        })
    }
 })
 app.delete("/delete-profiles",async(req,res) =>{
    const data = req.body
    try {
        await userModel.findByIdAndDelete(data._id)
        res.status(200).send({
        message:"profile deleted"
        })

    } catch (e) {
        res.status(400).send({
            message:"profile wasn't deleted",
            payload:e
        })
    }
 })

app.listen(PORT,()=>{
    console.log(`server is running on port${
        PORT
    }`)
})
