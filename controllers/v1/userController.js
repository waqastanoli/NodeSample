   
var mongoose = require('mongoose');
Users = require('./../../models/user'),
User= mongoose.model('Users');
var redis = require("redis"),
    client = redis.createClient({
		host: 'redis',
		port: 6379
	}),
    Posts = require('./../../models/post'),
    Post = mongoose.model('Posts');
    
//Create a user
exports.create = (req, res)=> {
    
    var new_user = new User(req.body);
    
    new_user.save(function(err, mongoresponse) {
        if (err){
            //console.log(err)
            if (err.code !== 11000){
                res.status(400).send(err);
            }
            if (err.keyValue.email != null && err.code === 11000) {

                
                res.status(400).send({
                    success:false,
                    "errors": {
                        "email": {
                            "name": "ValidatorError",
                            "message": "Email already in use",
                            "properties": {
                                "message": "Email already in use",
                                "type": "required",
                                "path": "email"
                            },
                            "kind": "unique",
                            "path": "email"
                        }
                    },
                    "_message": "Users validation failed",
                    "name": "ValidationError",
                    "message": "Users validation failed: email: Email already in use"
                });
              } else if (err.keyValue.userName != null && err.code === 11000) {
                
                res.status(400).send({
                    success:false,
                    "errors": {
                        "Username": {
                            "name": "ValidatorError",
                            "message": "Username already in use",
                            "properties": {
                                "message": "Username already in use",
                                "type": "required",
                                "path": "Username"
                            },
                            "kind": "unique",
                            "path": "Username"
                        }
                    },
                    "_message": "Users validation failed",
                    "name": "ValidationError",
                    "message": "Users validation failed: Username: Username already in use"
                });
              }
        }else{
            
            res.status(200).send({success:true,user:{
                id:mongoresponse._id,
                firstName: mongoresponse.firstName,
                lastName: mongoresponse.lastName,
                email: mongoresponse.email,
                userName: mongoresponse.userName,
                createdAt: mongoresponse.createdAt
            }});

        }         
        
      });
    
           
   
};

//Retrieve a user
exports.retrieve = async(req, res)=> {
    try {
        const user = await User.findById(mongoose.Types.ObjectId(req.params.id)).exec();  
        if(user){
            res.status(200).send({
                success:true,
                user:{
                    id:user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userName: user.userName,
                    createdAt: user.createdAt

                }
            });
            client.set("user:"+user._id, JSON.stringify({
                id:user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                createdAt: user.createdAt

            }), redis.print);
        }else {
            res.status(400).send({success:false,"message":"User not found"});
        }
    } catch(err) {
        res.status(400).send({success:false,"message":"User not found"});
    }
};



//Update a user
exports.update = async(req, res)=> {

    try {
        
        const user = await User.findById(mongoose.Types.ObjectId(req.params.id)).exec();  
        
        if(user){
            let fieldToUpdate = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };
            for (const [key, value] of Object.entries(fieldToUpdate)) {
                if (!value) {
                    delete fieldToUpdate[key];
                }
            }  
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: { ...fieldToUpdate } },
                {
                  runValidators: true,
                  new: true,
                }
              );            

            res.status(200).send({
                success:true,
                user:{
                    id:user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userName: user.userName,
                    createdAt: user.createdAt

                }
            });

        }else {
            res.status(400).send({success:false,"message":"User not found"});
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({success:false,"message":"User not found"});
    }
};

//getUserPosts
exports.getUserPosts = async(req, res)=> {
    try {
        
        const posts = await Post.find({"user":mongoose.Types.ObjectId(req.params.userId)}).populate('user').exec();  
        
        if(posts){
            res.status(200).send({
                success:true,
                posts:posts
            });
            client.set("posts:"+req.params.userId, JSON.stringify(posts), redis.print);
        }else {
            res.status(400).send({success:false,"message":"Post not found"});
        }
    } catch(err) {
        console.log(err)
        res.status(400).send({success:false,"message":"Post not found"});
    }
};


//List all users
exports.list = (req, res)=> {
    res.status(200).send({"message":"list user"});
};