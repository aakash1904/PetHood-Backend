var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');


var User = require('./models/User');
var auth = require('./auth');


app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res) =>{
    res.send({message : "Server is Running"});
});

app.get('/users' ,async (req,res) =>{
    
    try {
        var users = await User.find({} ,'-password -__v' );
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

});


app.get('/profile/:id',async (req,res) =>{
    
    try {
        
    var user = await User.findById(req.params.id ,'-password -__v' );

    res.send(user);


    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

});




mongoose.connect('mongodb://admin:2210@cluster0-shard-00-00-95caf.mongodb.net:27017,cluster0-shard-00-01-95caf.mongodb.net:27017,cluster0-shard-00-02-95caf.mongodb.net:27017/pethood?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority' ,{ useNewUrlParser: true }, (err) => {
    if(err){
        console.log(' error connecting to mongo',err);
    }
    else{
        console.log('connected to mongo');
    }
});



app.use('/auth' , auth.router)

app.listen(3000, () =>{
    console.log('Server is running at port 3000');
});