const post=require("../models/postschema");
const post=require("../models/userschema");

exports.createpost=async(req,res)=>{
    try{
        const postowner=await UserActivation.findbyid(req.body["postowner"]);
        if(!postowner){
            return res
            .status(401)
            .json({message:"please login to create a new post"});
        }
        const newpost=await post.create({
            postowner: req.body["postowner"],
            img: req.body["img"],
            caption: req.body["caption"],
            content: req.body["content"],
        });
        return res
        .status(201)
        .json({data: newpost,message:"post created successfully"});
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};


exports.deletepost=async(req,res)=>{
    try{
        const usertryingtodelete= await user.findbyid(req.body["postowner"])
        if(!usertryingtodelete){
            return res
            .status(404)
            .json({message:"user trying to delete thepost is not found"});
        }
        const post=await post.findbyid(req.params["postid"]);
        if(!post){
            return res
            .status(404)
            .json({message:"post is not found"});
        }

        if(usertryingtodelete._id.tostring() !== post.postowner.tostring()){
            return res
            .status(404)
            .json({message:"user is not allowed to delete a post that is not owned by them"});
        }
        await post.deleteone();
        return res
            .status(200)
            .json({message:"Post deleted succesfully"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }


};

exports.like = async (req,res)=>{
    try{
            const post =await post.findbyid(req.params["postid"]);
            if(!psot){
                return res.status(401).json({message:"login  to like the post"});
            }

            if(!post.like.includes(req).body["userid"]){
                await post.updateone({$push :{like:req.body["userid"]}});
                res.status(200).json({message: "the post has been like"});
            }
            else{
                await post.updateone({$pull :{like:req.body["userid"]}});
                res.status(200).json({message: "the post has been disliked"});
            }
        }
    
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.fetchtimelinepost=async (req,res) =>{
    try{
        const currentuser =await post.findbyid(req.body["currentuserid"]);
            if(!currentuser){
                return res.status(401).json({message:"please login to continue"});
            }
        const currentuserposts =await post.find({
            postowner: req.body["currentuserid"],
        });

        const freindsposts =await Promise.all(
            currentuser.friends.map((friendid) => {
                return post.find({ postowner:friendid});
            })
            );
        const timelineposts = currentuserposts.concat(... freindsposts);
        return timelineposts.length <=0
        ? res.status(404).json({message : "there is no posts to display"})
        :res.status(200).json(timelineposts)
    }
    catch{
        console.log(err);
        res.status(500)
        .json({message: err.message});
    }
};