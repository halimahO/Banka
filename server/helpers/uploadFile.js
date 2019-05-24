import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './avatars');
  },
  filename: (req, file, cb) => {
    let idPhoto = new Date();
    let day = idPhoto.getDate();
    let month = idPhoto.getMonth() + 1; // January is 0!
    const year = idPhoto.getFullYear();
    let hour = idPhoto.getHours();
    let minute = idPhoto.getMinutes();
    let second = idPhoto.getSeconds();
    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }

    if (minute < 10) {
      minute = `0${minute}`;
    }

    if (second < 10) {
      second = `0${second}`;
    }
    idPhoto = `${month}-${day}-${year}-${hour}_${minute}_${second}`;

    cb(null, `${idPhoto}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

export default upload;
