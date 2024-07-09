
var email = require('git-user-email');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, });


// model class  file image upload model class
const imageSchema = mongoose.Schema({
    username:
{
    type:String,
    required:true
},

    image: { data: Buffer, contentType: String },
    imageUrl : {
        type: String,
        required:  true
    }
    
}, { timestamps: true });

const ImageModel = mongoose.model('images', imageSchema);


//api section for the file upload controller business login

router.post('/upload', upload.single('image'), async (req, res, next) => {

    console.log(email());

    // return res.status(200).send("data got it");


    // var body = req.file.buffer;
    var base64Data = req.file.buffer.toString('base64').replace(/^data:image\/png;base64,/,"");
    var encodedBuffer = base64Data.toString('base64');
    const imag = { data: new Buffer.from(encodedBuffer, 'base64'), 
    contentType: req.file.mimetype };

    // var body = req.rawBody,
   

//    var binaryData = new Buffer(base64Data, 'base64').toString('binary')
    console.log(encodedBuffer.toString())
    const dataUrl = `data:${req.file.mimetype};base64,${encodedBuffer}`;
    const savedImage = await ImageModel.create({
        username:req.body.username,
       image: imag,
       imageUrl:dataUrl
    });
    res.send(savedImage);
});


// get images by id
router.get('/getImage/:id', async (req, res, next) => {
    const { id: _id } = req.params;
  
    // If you dont use lean(), you wont decode image as base64
    const image = await ImageModel.findOne({ _id }).lean().exec();

    console.log(image);
    console.log("Line79")
    if(image == ""|| image ==null ){
        return res.send({"message":"details not found"});
    }
    const dataImagePrefix = image
//     let url ='https://xxxx/image.jpg';
// let blob = new Blob([url]);
// let file = new File([blob], "filename", { type: "image/jpg"  });
    res.send(dataImagePrefix);
});



// get all username with images
router.get("/getAllImages",async(req,res)=>{

    // var images= await ImageModel.find();
    await ImageModel.find().lean().exec().then(result => {
      
        return res.send({users:result});

    }).catch(err => {
        return res.sendStatus(500).send({
            message: err.message || "some error occured"
        });
});

});



router.delete("/deleteFile/:id", async (req,res)=>{
    
    var id =req.body.id;
    var file= await ImageModel.findOne({_id:id});

    if(!file){
        return res.status(403).send({"message":"Item does not exist",
    success:false});
    }

    await ImageModel.remove({_id:id});

    return res.status(200).send({
        message:"File Details Removed succcessfully",
success:true

});

});



router.put('/updateFiles/:id',
upload.single('image'),  async(req, res) => {


    const id = req.params.id;
    console.log(id);
    // const qunatity = req.body.quantity.quantity;
    try{
        var base64Data = req.file.buffer.toString('base64')
    .replace(/^data:image\/png;base64,/,"");
    var encodedBuffer = base64Data.toString('base64');
    const imag = { data: new Buffer.from(encodedBuffer, 'base64'), 
    contentType: req.file.mimetype };

    // var body = req.rawBody,
   

//    var binaryData = new Buffer(base64Data, 'base64').toString('binary')
    // console.log(encodedBuffer.toString())
    const dataUrl = `data:${req.file.mimetype};base64,${encodedBuffer}`;
        // const newUpdate = parseInt(book.quantity) + parseInt(qunatity);


     
        await ImageModel.updateOne(
            { _id: req.params.id},
            {$set :{  
                username:req.body.username,
                image: imag,
                imageUrl:dataUrl}},       
      
            )
        // )
        // Data.name = req.params.name;
        // Data.sub = req.params.sub;
         const row = await ImageModel.findOne({_id:
        req.params.id});
        // console.log(row);
        return res.json({success: true, msg: 'success',user:row});
    }
    catch(e){
        console.log(e);
        return res.json({success: false, msg: 'Error'});
    }
   
  
    // res.send(result);
});



router.put("/updateFile/:id",upload.single('image'), 
async (req, res, next) => {



    // var body = req.file.buffer;
    var base64Data = req.file.buffer.toString('base64')
    .replace(/^data:image\/png;base64,/,"");
    var encodedBuffer = base64Data.toString('base64');
    const imag = { data: new Buffer.from(encodedBuffer, 'base64'), 
    contentType: req.file.mimetype };

    // var body = req.rawBody,
   

//    var binaryData = new Buffer(base64Data, 'base64').toString('binary')
    console.log(encodedBuffer.toString())
    const dataUrl = `data:${req.file.mimetype};base64,${encodedBuffer}`;

        var id= req.body.id;

       var file= await ImageModel.findOne({id:id});

       if(!file){
        return res.status(403).send({"message":"File does not exist!"});
       }

       // const qunatity = req.body.quantity.quantity;
    try{
       
        // const newUpdate = parseInt(book.quantity) + parseInt(qunatity);

       await ImageModel.updateOne(
            { _id: id},
            {$set :{  
                id:id,
                username:req.body.username,
                image: imag,
                imageUrl:dataUrl}},       
      
            )
        // )
        // Data.name = req.params.name;
        // Data.sub = req.params.sub;
         const row = await ImageModel.findOne({id:
        id});
        console.log(row);
        return res.json({
            success: status,
             message: 'success',
             user:row});
    }

    catch(e){

        console.log(e);
        return res.json({success: false, message: 'Error'});
    }
});


module.exports = router;