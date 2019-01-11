var mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/embedded_app", {useNewUrlParser: true}
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
//    * One user can have many posts.
//------------------------------------------------------------------------------
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

//------------------------------------------------------------------------------
// Create new data; one-time use.
//------------------------------------------------------------------------------

// var newUser = new User({
//     name: "Jamal",
//     email: "jamal@gmail.com"
// });

// newUser.posts.push({
//     title: "Cuh wtf.",
//     content: "Yeah, kys cuh!"
// });

// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

User.findOne({name: "Jamal"}, function(err, foundUser) {
    if (err) {
        console.log(err);
    }
    else {
        foundUser.posts.push({
            title: "Cuh wtf. Part 2.",
            content: "Nigguh, you ded!"
        });
        
        foundUser.save(function(err, saveUser) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(saveUser);
            }
        });
    }
});