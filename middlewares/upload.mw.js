const path = require('path');
const multer = require('multer');
const { PATH_IMAGES } = require('../constants');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, `../${PATH_IMAGES}`));
  },
  filename: (req, file, cb) => {
    const uniqueFileName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 100) +
      '-' +
      file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

module.exports.singleUpload = (name)=>upload.single(name);