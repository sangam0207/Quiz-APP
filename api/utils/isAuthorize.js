const jwt=require('jsonwebtoken');
const isAuthorize=async(req,res,next)=>{
    const token=req.cookies?.token;
    console.log(token)
    if(!token){
        return res.status(401).send({success:false,message:"UnAuthorize User"});
    }
    const isAuthorizedUser=await jwt.verify(token,process.env.JWT_SECRET);
    console.log(isAuthorizedUser);
    req.userId=isAuthorizedUser.id;
    req.isAdmin=isAuthorizedUser.isAdmin;
    next()
}
module.exports={isAuthorize}