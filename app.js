const express=require('express');
const app=express();
const studentRoute=require('./api/routes/student');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')
 


const DB= 'mongodb+srv://pooja:12345678@cluster0.lijw7.mongodb.net/trackDB?retryWrites=true&w=majority';
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection suceesfully')
}).catch((err)=>console.log('no connection'));


app.use(fileUpload({
    useTempFiles:true
}))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use('/student',studentRoute)


app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running is'
    })
})

app.use((req,res,next)=>{
    res.status(404).json({
        message:'bad request'
    })
})


module.exports=app;