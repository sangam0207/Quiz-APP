const express=require('express');
const cookieParser=require('cookie-parser')
require('./db/conn')
const dotenv=require('dotenv')
const app=express();
dotenv.config();
const questionRouter=require('./routes/quizRouter.js');
const userRouter=require('./routes/userRoutes.js');
const ansRouter=require('./routes/ansRouter.js')
app.use(cookieParser())
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello i am from testing");
});
app.use('/api/v1/quiz',questionRouter);
app.use('/api/v1/auth',userRouter);
app.use('/api/v1.ans',ansRouter)
app.listen(8000,()=>{
    console.log('Server is running on port number 8080')
});