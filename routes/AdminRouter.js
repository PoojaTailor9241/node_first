const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const key ="nkcdbkfjbajnjaenvienifnu3y4734y34cbhjsbkjsf";
const expireSec  = 3000;
const { verify } = require("../libs/jwt")

router.get("/",verify,(req,res) => {
    Admin.find()
    .then((data) => {
        res.render("Adminlist",{AdminList:data,data:true})
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get("/add",verify,(req,res) => {
    res.render("Adminadd");
});

router.post("/add",verify,(req,res) =>{
    let admin = new Admin({
        email:req.body.email,
        password:req.body.password
    })
    admin.save()
    .then((data) => {
        res.redirect("/admin");
    }) 
    .catch((err) => {
        console.log(err);
    })
});

router.get("/login",(req,res) => {
    res.render("Login");
})

// router.post("/login",async(req,res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;  

//         const usremail = await Admin.findOne({email:email});
        
//         if(usremail.password === password)
//         {
//             res.render("Home");
//         }
//         else
//         {
//             res.render("Login",{wrong:"Invalid Credentials"});
//         }
//     } catch (error) {
//         res.send("Invalid Credentials");
//     }    
// });

router.post("/login",(req,res) => {
    const {email,password}=req.body;
    console.log(email);
    console.log(password);

    // Admin.findOne({email:email}).lean()
    // .then((result) => {
    //     if(result){
    //         const token = jwt.sign({email: req.body.email},key,{algorithm:"HS256",expiresIn:expireSec})
    //         res.cookie("token",token,{maxAge:expireSec*1000});
    //         res.send(result);
    //     }
    // })
    // .catch((err) => {
    //     res.send("error");
    // })

    Admin.findOne({email: email,password:password})
    .then((result) => {
        try {
            if(result){
                console.log("pooja gandi");
                const token=jwt.sign({email:req.body.email},key,{expiresIn:expireSec});
                res.cookie("token",token,{maxAge:expireSec*1000});
                res.render("Home");
            }
            else
            {
                res.json({message:"Invalid email/password"});
            }
        } catch (error) {
            res.send(error);
        }
    })
    .catch((err) => {
        console.log(err);
    })

})

router.get("/delete/:id",(req,res) => {
    let ID= req.params.id;
    Admin.findByIdAndDelete(ID)
    .then((data) => {
        res.redirect("/admin");
    })
    .catch((err) => {
        console.log(err);
    })
});


router.get('/*',(req,res) => {
    res.redirect('/admin/login');
})
module.exports =  router;