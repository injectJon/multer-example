var express = require('express'),
    multer =  require('multer'),
    app =     express()


var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './uploads')
      },
      filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
      }
    })

var limits = {
  fieldNameSize,  // int - (default: 100 bytes)
  fieldSize,      // int - (default: 1MB)
  fields,         // int - (default: Infinite)
                // For multipart forms..
  fileSize,       // int - (default: Infinite bytes)
  files,          // int - (default: Infinite)
  parts,          // int - (default: Infinite)
  headerPairs,    // int - (default: 2000)
}

var upload = multer({ storage }, { limits }).single('userPhoto')

/*
e.g. after upload,
req.files === {
  userPhoto:
  {
    fieldname: 'userPhoto',
    originalname: 'banner.png',
    name: 'banner1415699779303.png',
    encoding: '7bit',
    mimetype: 'image/png',
    path: 'uploads&#92;banner1415699779303.png',
    extension: 'png',
    size: 11800,
    truncated: false,
    buffer: null
  }
}
*/

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/api/photo', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end('Error uploading file.')
    }
    res.end('File is uploaded')
  })
})

app.listen(3010, function() {
  console.log('Working on port 3000')
})
