const mongoose = require("../config/db");

const schema = mongoose.Schema;

const MemberSchema = new schema({
    name: String,
    photo:String,
    age:Number,
    email:String
});

const Member = mongoose.model("Member",MemberSchema);

module.exports= Member;