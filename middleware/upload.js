const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../constants');

//path.join(STATIC_PATH, 'images'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  const FILE_MINE_TYPE_REGEXP = /^image\/(gif|jpeg|png)$/;
  if (FILE_MINE_TYPE_REGEXP.test(file.minetype)) {
    return cb(null, true);
  }
  cb(null, false);
}
module.exports.uploadUserImage = multer({
  storage,
  fileFilter,
});
