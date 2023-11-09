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

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb(new Error('Wrong mimetype'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits:{
    fileSize: 5*1024*1024 //5Mb
  }
});

module.exports.singleUpload = (name) => upload.single(name);
