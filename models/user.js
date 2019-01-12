var mongoose = require("mongoose");

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

module.exports = User;