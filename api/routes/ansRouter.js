const express=require('express');
const router=express.Router();
const {isAuthorize}=require('../utils/isAuthorize.js')
const {createResponse,saveResponse,getResult}=require('../controler/ansControler.js')
router.get('/test',(req,res)=>{
    res.send('I am from testing')
})
router.post('/createResponse',createResponse)
router.post('/addResponse',saveResponse)
router.get('/getResult',getResult);

module.exports=router;