var fs   = require('fs');
var imageFile = fs.readFileSync('yo.png');
var encoded = Buffer.from(imageFile).toString('base64');

fs.writeFile("yo1",encoded, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
