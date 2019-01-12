//------------------------------------------------------------------------------
// App Requirements
//------------------------------------------------------------------------------

var mongoose = require("mongoose");

//------------------------------------------------------------------------------
// Database Configurations
//------------------------------------------------------------------------------

mongoose.connect(
    "mongodb://localhost:27017/reference_app", {useNewUrlParser: true}
);

var Post = require("./models/post.js");
var User = require("./models/user.js");

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
    title: "Nya part. 5",
    content: "Nya Nya Nya Nya Nya :3 part. 5"
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