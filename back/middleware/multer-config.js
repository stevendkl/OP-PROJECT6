// Import multer
const multer = require('multer');

// Change image type name
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Set storage location
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //Rename the image to filename + timestamp
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    //remove file type
    const filename = name.substring(0, name.lastIndexOf("."));
    const extension = MIME_TYPES[file.mimetype];
    //generate new file name
    callback(null, filename + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');