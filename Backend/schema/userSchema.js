const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:String,
    useremail:String,
    password:String,
    dob:String,
}, { timestamps: true } 
);

module.exports=mongoose.model("Users",userSchema)