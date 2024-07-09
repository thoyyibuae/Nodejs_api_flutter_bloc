

const express = require('express')
const router = express.Router()
const Book = require('../models/book_model');
// const jwt = require('jsonwebtoken'); 
const auth = require("../auth/jwt/authentication_page");


// self.routes['/:username'] = require('../models/book_model');


// router.get('/pagetest', function(req, res) {
//     //here comes the url parsing code
//     console.log(" test page book");
//    }
// );



router.get('/books', async (req, res) => {
    // console.log("Get Request")
    // res.send('Get Request')
    try {
        // const datas = await Data.find()
        // res.json(datas)



        await Book.find().then(result => {
            return res.send(result);

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





router.get('/books/:id',async (req, res) => {

    try {


        await Book.findById(req.params.id).then(result => {
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



router.patch('/patchBook/:id', async (req, res) => {
    try {
        const dt = await Book.findById(req.params.id)
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



router.put('/updateBook/:id', async(req, res) => {
    const id = req.params.id;
    console.log(id);
    // const qunatity = req.body.quantity.quantity;
    try{
       
        // const newUpdate = parseInt(book.quantity) + parseInt(qunatity);

     
        await Book.updateOne(
            { _id: req.params.id},
            {$set :{  
                name: req.body.name,
                description : req.body.description,
                isbn:req.body.isbn,
                authorName: req.body.authorName,
                writtenYear: req.body.writtenYear}},       
      
            )
        // )
        // Data.name = req.params.name;
        // Data.sub = req.params.sub;
         const row = await Book.findOne({_id:
        req.params.id});
        console.log(row);
        return res.json({success: true, msg: 'success',user:row});
    }
    catch(e){
        console.log(e);
        return res.json({success: false, msg: 'Error'});
    }
   
  
    res.send(result);
});





router.put('/update/:id', function(req, res)  {
    var id = req.params.id;      
  
    Book.findById({id, function(err, intake) {
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


  router.delete('/deleteBook/:id',async(req,res,next)=>{
      
    var id= req.params.id;

    try{
        var book = await Book.findById({_id:id});



        // findOneAndRemove({id: req.params.id});
        console.log(book);

        if(!book) {
            return next();
        }
     
        await Book.deleteOne({_id: req.params.id}); 
    //     await Book.remove
    //    ({
    //         _id: id
    //     });

       return res.json({
            message: 'Success',
            book: book
        });


        // return res.status(200).send({
        //     "success":deleted,
        // "msg":"deleted successfully"});
    }
    catch(e){
        next(e);
        return res.json({
            message: e.message,
        success:false});
    }

    // return
  });


router.post('/addBooks',async (req, res) => {


    console.log(req.body.name);


    console.log(req.body.description);

    console.log(req.body.isbn);

    console.log(req.body.authorName);

    console.log(req.body.writtenYear);

    const data = new Book({
        name: req.body.name,
        description : req.body.description,
        isbn:req.body.isbn,
        authorName: req.body.authorName,
        writtenYear: req.body.writtenYear

    });
    console.log(data);

    try {
        await data.save().then(result => {
            return  res.status(200).json({ 
                message: 'User added successfully ' ,
                bookDetails: result
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

});




module.exports = router
