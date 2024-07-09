var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')

var app = express();
var port = process.env.PORT || 9000;
const path = require('path');
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// serving static files
app.use('/uploads', express.static('uploads'));

// request handlers
app.get('/', (req, res) => {
    res.send('Node js file upload rest apis');
});
// handle storage using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }

    // Unhandled 'error' event
});
var upload = multer({ storage: storage });
// handle single file upload
app.post('/upload', upload.single('dataFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Please upload a file.' });
    }
    // formData.append("dataFile", file)

    return res.send({ message: 'File uploaded successfully.', file });
});

app.listen(port, () => {
    console.log('Server started on: ' + port);
});



// // handle storage using multer
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
// });
// var upload = multer({ storage: storage });


// // handle single file upload
// app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).send({ message: 'Please upload a file.' });
//     }
//     return res.send({ message: 'File uploaded successfully.', file });
// });

