const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const models = require("../../models/usersFunc.js");

const UPLOAD_DIR = path.join(process.cwd(), "upload");
const AVATAR_DIR = path.join(process.cwd(), "public", "avatars");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const fileName = [date, file.originalname].join("_");
    cb(null, fileName);
  },
  limits: { fileSize: 1_000_000 },
});
const upload = multer({ storage: storage });
const changeAvatar = async (req, res, next) => {
  const { id, avatar } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(AVATAR_DIR, originalname);
  try {
    const image = await Jimp.read(temporaryName);
    image
      .resize(250, 250, Jimp.RESIZE_NEAREST_NEIGHBOR)
      .quality(60)
      .writeAsync(fileName);
    fs.rename(temporaryName, fileName);
    await models.updateUser(id, { avatar: { avatarURL: fileName } });
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ avatar, message: "Plik załadowany pomyślnie", status: 200 });
};

module.exports = {
  UPLOAD_DIR,
  AVATAR_DIR,
  storage,
  upload,
  changeAvatar,
};
