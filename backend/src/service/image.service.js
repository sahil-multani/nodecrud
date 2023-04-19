const mkdirp = require("mkdirp");
const multer = require("multer");
const fs = require("fs");
const { nanoid } = require('nanoid');
let storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    //create a tmp dir if not exist
    mkdirp("./tmp").then(() => {
      cb(null, "./tmp");
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }

    cb(null, true);
  },
  // onError: function (err, next) {
  // 	console.log('error', err);
  // 	next(err);
  // },
});
let upload2 = multer({
  storage: storage2,
});
router.post("/uploadImage", upload2.single("file"), async (req, res) => {
  if (!req.file) {
    return res.send({ success: 0, messsage: "upload a file !" });
  }
  const whitelistValidation = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];
  if (!whitelistValidation.includes(req.file.mimetype)) {
    return res.send({
      success: false,
      message: "Only .png, .jpg  .jpeg .gif and .webp formats allowed!",
    });
  }

  const whitelist = ["image/png", "image/jpeg", "image/jpg"];
  let includesmime = whitelist.includes(req.file.mimetype);
  let channel_id = Date.now();
  let sender_id = nanoid();
  let filePath = req?.file?.path;
  if (!filePath) return res.send({ success: 0, messsage: "upload a file !" });
  let fileName = req.file.filename;
  let compressed = false;

  await moveFile("tmp/" + fileName);

  async function moveFile(fileLocation) {
    let ext = path.extname(filePath);
    let newname = nanoid() + ext;
    let storePath = path.resolve(
      `C:\\app_uploads\\${sender_id}\\${channel_id}`
    );
    let destination = path.resolve(`${storePath}\\${newname}`);
    let fullurl = `/file/${sender_id}/${channel_id}/${newname}`;

    await mkdirp(storePath).then(async () => {
      mv(fileLocation, destination, function (err) {
        if (err) {
          console.log(err);
          res.send({ success: 0, url, error: err });
        } else {
          console.log(`moved file from [${fileLocation}] to [${destination}]`);
          if (fs.existsSync("tmp/" + fileName)) {
            fs.unlinkSync("tmp/" + fileName);
          }
          // fileName(fs.existsSync(""))
          if (fs.existsSync(fileLocation)) {
            fs.unlinkSync(fileLocation);
          }
          if (fs.existsSync(destination)) {
            res.send({
              success: 1,
              fileName: newname,
              url: fullurl,
              compressed,
            });
            // fs.unlinkSync(fileLocation);
          } else res.send({ success: 0, url });
        }
      });
    });
  }
});
