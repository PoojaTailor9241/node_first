const router = require("express").Router();
const Member = require("../models/Member");
const multer = require("multer");

const storage= multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/images')
    },
    filename:(req,file,cb) => {
        cb(null,Date.now() + file.originalname)
    }
});

const upload = multer({
    storage:storage
}).single('photo')

router.get("/",(req,res) => {
    Member.find()
    .then((data) => {
        res.render("Memberlist",{MemberList:data,data:true})
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get("/add",(req,res) => {
    res.render("Memberadd");
});

router.post("/add",upload,(req,res) =>{
    let member = new Member({
        name:req.body.name,
        photo:req.file.filename,
        age:req.body.age,
        email:req.body.email,
    })
    member.save()
    .then((data) => {
        res.redirect("/member");
    }) 
    .catch((err) => {
        console.log(err);
    })
});

router.get('/:id',(req,res) => {
    let ID = req.params.id;
    Member.findById(ID)
    .then((data) => {
        res.render("Memberedit",{List:data})
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post("/edit",upload,(req,res) => {
    
    if(req.file)
    {
        let databody={
            name:req.body.name,
            photo:req.file.filename,
            age:req.body.age,
            email:req.body.email,
        }
        Member.findByIdAndUpdate({"_id":req.body.id},databody,{new:true})
        .then((data) => {
            res.redirect("/member");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else
    {
        let databody={
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
        }
        Member.findByIdAndUpdate({"_id":req.body.id},databody,{new:true})
        .then((data) => {
            res.redirect("/member");
        })
        .catch((err) => {
            console.log(err);
        })
    }
});

router.get("/delete/:id",(req,res) => {
    let ID = req.params.id;
    Member.findByIdAndDelete(ID)
    .then((data) => {
        res.redirect("/member");
    })
    .catch((err) => {
        console.log(err);
    })
});
module.exports =  router;