const mongoose = require("../config/db");

const schema = mongoose.Schema;

const AdminSchema = new schema({
    email:String,
    password:String
});

const Admin = mongoose.model("Admin",AdminSchema);

module.exports= Admin;