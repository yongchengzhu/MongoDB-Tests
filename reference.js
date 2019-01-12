var mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/reference_app", {useNewUrlParser: true}
);
//------------------------------------------------------------------------------
// Post Schema: title, content
//------------------------------------------------------------------------------

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//------------------------------------------------------------------------------
// User Schema: name, email, posts
//    * One user can have many posts. (By reference this time.)
//------------------------------------------------------------------------------
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

var User = mongoose.model("User", userSchema);

//------------------------------------------------------------------------------
// Create new data; one-time use.
//------------------------------------------------------------------------------

// User.create({
//     name: "John Smith",
//     email: "john.smith@gmail.com"
// }, function(err, createdUser) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(createdUser);
//     }
// });

Post.create({
    title: "Nya part. 2",
    content: "Nya Nya Nya Nya Nya :3"
}, function(err, createdPost) {
    if (err) {
        console.log(err);
    }
    else {
        //
        // If post is sucessfully created, then save this post to a user.
        //
        User.findOne({name: "John Smith"}, function(err, foundUser) {
            if (err) {
                console.log(err);
            }
            else {
                foundUser.posts.push(createdPost);
                foundUser.save(function(err, savedUser) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(savedUser);
                    }
                });
            }
        });
    }
});