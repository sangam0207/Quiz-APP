const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Quiz')
.then(()=>{
    console.log('Database Connected')
}).catch((error)=>{
    console.log('Connection Failed')
})