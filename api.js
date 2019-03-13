const multer = require('multer');
const fs = require('fs');
var Tesseract = require('tesseract.js');
const router = require('express').Router();
var myFileName;


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        myFileName = 'photo';
        cb(null, 'photo');
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('photo');


router.post('/ocr', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json("An error occured!");
        }
        var imageFile = fs.readFileSync('./uploads/'+'photo');
        Tesseract.recognize(imageFile)
        .progress(function  (p) { console.log('progress', p)    })
        .then(function (result) {
            fs.unlinkSync('./uploads/'+myFileName);
            console.log('result', result.text);
            res.json({'result': result.text});
        }); 
    });
});

// export router
module.exports = router;
