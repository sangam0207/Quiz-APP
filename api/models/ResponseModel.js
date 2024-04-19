const mongoose=require('mongoose');

const responseSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    response:[{
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        },
        ans:{
            type:String,
        }
    }]
  
})
const ansResponse=mongoose.model('ansResponse',responseSchema);
module.exports=ansResponse;