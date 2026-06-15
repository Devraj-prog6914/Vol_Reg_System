const multer = require('multer');
const path = require('path');

// Configure multer to store files on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});

// File filter for images and documents
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'avatar') {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed for avatar'), false);
        }
    } else if (file.fieldname === 'resume') {
        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and Word documents are allowed for resume'), false);
        }
    } else {
        cb(null, true);
    }
};

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB max size
    },
    fileFilter
});

module.exports = upload;
