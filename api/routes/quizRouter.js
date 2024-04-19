const express=require('express');
const router=express.Router();
const {isAuthorize}=require('../utils/isAuthorize.js')
const {createQuestion,getQuestion}=require('../controler/questionCOntroler.js')
router.get('/test',(req,res)=>{
    res.send('I am from testing')
})
router.post('/createQuestion/:id',isAuthorize,createQuestion);
router.get('/getQuestion',getQuestion);


module.exports=router;