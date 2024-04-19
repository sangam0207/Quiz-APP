const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign Up User
const signup = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
      return res
        .status(404)
        .send({ success: false, message: "All fields are required" });
    }
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      return res
        .status(200)
        .send({ success: false, message: "User is already registered" });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    if (!newUser) {
      return res
        .status(500)
        .send({ success: false, message: "Registration Failed" });
    }
    await newUser.save();
    res.status(200).send({ success: true, message: "Registration Successful" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found in Record" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id ,isAdmin:user.isAdmin}, process.env.JWT_SECRET);
    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "Error in Login" });
    }
    res
      .status(200).cookie("token",token).send({ success: true, message: "Login Successfully", user, token });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getCurrentUser=async(req,res)=>{
  try {
    const id=req.userId;
  const currentUser=await User.findById(id);
  if(!currentUser){
    return res.send({success:false,message:"User not Authorized"})
  }
  res.status(200).send({success:true,message:"User data found successfully",user:currentUser})
  } catch (error) {
    res.status(500).send({success:false,message:error.message})
  }
  
}



module.exports = { signup, login,getCurrentUser };
