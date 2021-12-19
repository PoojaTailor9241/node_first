const express= require("express");
const app = express();
const MemberRouter = require("./routes/MemberRouter");
const AdminRouter = require("./routes/AdminRouter");
const cookieparser = require('cookie-parser');
const { verify }= require('./libs/jwt');

app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"));
app.use(cookieparser());

app.use("/member",verify,MemberRouter);
app.use("/admin",AdminRouter);

app.get('/*',(req,res) => {
    res.redirect('/admin/login');
})

app.listen(7575,() => {
    console.log("listening at 7575..");
})