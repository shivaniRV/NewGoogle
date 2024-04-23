const express= require('express')
const cors= require('cors')
const morgan =require('morgan')
const dotenv= require('dotenv')
const colors =require('colors')
const connectdb = require('./config/connectdb')

//config dotenv file
dotenv.config();


//databse call
connectdb();

//rest object
const app= express()

//middleware
app.use(morgan(`dev`))
app.use(express.json())
app.use((cors()))

//routes
app.route('/').get((req,res)=>{
    res.send('shivani')
}).post((req,res)=>{
    res.send("hi this is post request")

}).delete((req,res)=>{
    res.send("hi this is delete request")
}).put((req,res)=>{
    res.send("hi this is put request");
})

// app.get('/',(req,res)=>{
//     res.send(`<h1> Hello from Server</h1>`)
// })

//port 
const PORT= 8080||process.env.PORT

//listen server
app.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
})
