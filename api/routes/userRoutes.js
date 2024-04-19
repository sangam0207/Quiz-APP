const express=require('express');
const router=express.Router();
const {signup,login,getCurrentUser}=require('../controler/authControler.js')
const {isAuthorize}=require('../utils/isAuthorize.js')
router.get('/test',(req,res)=>{
    res.send('I am from testing')
})
router.post('/signup',signup);
router.post('/login',login);
router.get('/currentUser',isAuthorize,getCurrentUser);
module.exports=router;