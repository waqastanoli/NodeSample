   
var mongoose = require('mongoose');
Posts = require('./../../models/post'),
Post = mongoose.model('Posts');
var redis = require("redis"),
    client = redis.createClient({
		host: 'redis',
		port: 6379
	});
//Create a post
exports.create = (req, res)=> {
    
    var new_post = new Post(req.body);
    
    new_post.save(function(err, mongoresponse) {
        if (err){
            
                res.status(400).send(err);            
            
        }else{            

            Post
            .findById(mongoresponse._id)
            .populate('user')
            
            .exec((error, transaction) => {
                if(error)
                res.status(400).send(error);

                res.status(200).send({success:true,post:{
                    id:transaction._id,
                    user: transaction.user,  
                    title: transaction.title,
                    content: transaction.content,
                    createdAt: transaction.createdAt
                }
                });
    
                
            });
            
        }         
        
      });
    
           
   
};

//Retrieve a Post
exports.retrieve = async(req, res)=> {
    try {
        
        const post = await Post.findById(mongoose.Types.ObjectId(req.params.id)).populate('user').exec();  
        
        if(post){
            res.status(200).send({
                success:true,
                post:{
                    id:post._id,
                    user: post.user,  
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt
                }
            });
            client.set("post:"+post._id, JSON.stringify({
                user: post.user,  
                title: post.title,
                content: post.content,
                createdAt: post.createdAt
            }), redis.print);
        }else {
            res.status(400).send({success:false,"message":"Post not found"});
        }
    } catch(err) {
        
        res.status(400).send({success:false,"message":"Post not found"});
    }
};



//Update a user
exports.update = async(req, res)=> {

    try {
        
        const post = await Post.findById(mongoose.Types.ObjectId(req.params.id)).exec();  
        
        if(post){
            let fieldToUpdate = {
                title: req.body.title,
                content: req.body.content,
            };
            for (const [key, value] of Object.entries(fieldToUpdate)) {
                if (!value) {
                    delete fieldToUpdate[key];
                }
            }  
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: { ...fieldToUpdate } },
                {
                  runValidators: true,
                  new: true,
                }
              ).populate('user');            

            res.status(200).send({
                success:true,
                post:{
                    id:post._id,
                    user: post.user,  
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt
                }            
            });
        }else {
            res.status(400).send({success:false,"message":"Post not found"});
        }
    } catch(err) {
        
        res.status(400).send({success:false,"message":"Post not found"});
    }
};

//Delete a user
exports.delete = (req, res)=> {
    res.status(200).send({"message":"delete user"});
};


//List all users
exports.list = (req, res)=> {
    res.status(200).send({"message":"list user"});
};