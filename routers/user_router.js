const express = require('express')
const router = express.Router()
const User = require('../models/user_model');
const jwt = require('jsonwebtoken'); 
const auth = require("../auth/jwt/authentication_page");


router.get('/users/email/:email',async (req, res) => 

{
    console.log(req.params.email)

    try {


        // const findUser = await userSchema.findOne({
        //     "email": req.body.email
        // });


        await User.findOne({email : req.params.email})
        .then
        (result => {
            return res.json(result);

        })
        .catch(err => {
            return res.sendStatus(500).send({
                message: err.message || "some error occured"
            });

        })
    }
    catch (err) {
        res.send("Error" + err)
    }
})



router.get('/users', async (req, res) =>

{
    // console.log("Get Request")
    // res.send('Get Request')
    try {
        // const datas = await Data.find()
        // res.json(datas)

        await User.find().then(result =>
            
            {
            console.log("Total users :"+result);
            return res.send(result);

        }).catch(err => {
            return res.sendStatus(500).send(
                {
                message: err.message || "some error occured"
            });

        })
    }
    catch (err) {
        res.send("Error" + err)
    }
})



router.get('/users/:id',auth,async (req, res) => 

{

    try {


        await User.findById(req.params.id).then(result => {
            return res.json(result);

        }).catch(err => {
            return res.sendStatus(500).send({
                message: err.message || "some error occured"
            });

        })
    }
    catch (err) {
        res.send("Error" + err)
    }
})


// collection.findOne({name : name}, function(err,doc){
//     if(err) throw err;
//     if(doc)
//         console.log("Found: "+name+", pass="+doc.pass);
//     else
//         console.log("Not found: "+name);
//     db.close();
// });




router.patch('/patchUser/:id', async (req, res) => {
    try {
        const dt = await User.findById(req.params.id)
        // .then(result => {
        dt.sub = req.body.sub
        const a1 = await dt.save()
        return res.json(a1);

        // }).catch(err => {
        //     return res.sendStatus(500).send({
        //         message: err.message || "some error occured"
        //     });
        // })
    }
    catch (err) {
        res.send("Error")
    }
});



router.put('/updateUser/:id',auth,
 async(req, res) => {
    const id = req.params.id;
    console.log(id);
    // const qunatity = req.body.quantity.quantity;
    try{
       
        // const newUpdate = parseInt(book.quantity) + parseInt(qunatity);

     
        await User.updateOne(
            { _id: id},
            {$set :{ name: req.body.name , 
                email : req.body.email,
                password:req.body.password,
                tech: req.body.tech,
            sub: req.body.sub}},       
      
            )
        // )
        // Data.name = req.params.name;
        // Data.sub = req.params.sub;
         const row = await User.findOne({_id: id});
        console.log(row);
        return res.json({success: true, msg: 'success',user:row});
    }
    catch(e){
        console.log(e);
        return res.json({success: false, msg: 'Error'});
    }
   
  
    res.send(result);
});

router.put('/update/:id',auth,function(req, res)  {
    var id = req.params.id;      
  
    User.findById({id, function(err, intake) {
        if (err)
            res.send(err);
              check : true;
              intake.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Error'});
        }
        res.json({success: true, msg: 'Successful update check state.'});
      });
    }})
  });

router.post('/register', async (req, res) => {


    console.log(req.body.email);


    console.log(req.body.password);

    console.log(req.body.name);

    console.log(req.body.tech);

    const data = new User({
        name: req.body.name,
        email : req.body.email,
        password:req.body.password,
        tech: req.body.tech,
        sub: req.body.sub

    });
    console.log(data);

    try {
        await data.save().then(result => {
            return  res.status(200).json({ 
                message: 'User added successfully ' ,
                user: result
        });

            // return res.json(result);

        }).catch(err => {
            return res.sendStatus(500).send({
                message: err.message || "some error occured"
            });
        })
    }
    catch (err) {

        res.send('Error')
    }

})





router.post("/login", async (req,res)=>{


    console.log("Line 184");
    console.log(req.body);
    console.log("Line 186");
      try{



        User.findOne({
            email: req.body.email,
          })
            // .populate("roles", "-__v")
            .then((dt, err) => {
              if (dt) {
                console.log("User :"+dt);
                if (dt.password !== req.body.password) {
                    return res.status(401).json("Wrong Credentials!");
                  }
                  else{
        
                  }

                const  SECRET_KEY="abc123"
              
        
                  var token = jwt.sign({ id: dt._id,email: dt.email },  
                    SECRET_KEY, {
                    expiresIn: '1h' // expires in 24 hours
                  });
              
                        console.log(res.statusCode);
                  
                  res.status(200).send({ auth: true,
                    success:true,
                    user:dt,
                     accessToken: token ,
                    "message":"User Logged Successfully"});
               
                return;
              }
              if (!dt) {
                return res.status(404).send({ message: "User Not found." });
              }
        


        });
        // console.log(MyRes);


      }
      catch(err)
      {
        console.log("the error "+err);

          res.status(500).json(err)

      }})
     
   
   


    router.get("/auth/welcome",auth,
     (req,res)=>{
       
        res.status(200).send("Welcome 🙌 ");
    });


    router.delete("/deleteUser/:id",auth,
    async (req,res,next)=>{
        var id= req.params.id;
        try{
            

        var user = await User.findById({_id:id});
    
        if(!user){
            // if(res.statusCode.toString() =="404")
     return res.send({message:"User Not Found",status:res.statusCode.toString()});
            // return next();
        }

        await User.remove({
            _id:id
        });

     
        // if(res.statusCode == 404){
        //     return res.json({
               

        //         message:"User Not found",
        //         success:false
        //     });
        // }

        // return res.json({
        //     user:user,
        //     message:"Remove Success",
        //     success:true
        // });
    }
    catch(e){

        next(e) ;
        return res.json({
            message: e.message,
        success:false});
    }
    
    });

module.exports = router
