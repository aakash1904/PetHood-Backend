var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true,"Name is Required"]
    },
    email : {
        type : String,
        unique : true,
        required: [true,"Email is Required"]
    },
    password : {
        type : String,
        required: [true,"Password is Required"]
    },
    mobile_number :  {
        type : Number,
        required: false
    },
});

userSchema.pre('save' , function(next){
    var user = this;

    if(!user.isModified('password'))
        return next()

    bcrypt.hash(user.password , null , null , (err , hash) =>{
        if(err) return next(err);

        user.password = hash;
        next()
    })    
})

mongoose.set('useCreateIndex', true)
module.exports = mongoose.model('User', userSchema);