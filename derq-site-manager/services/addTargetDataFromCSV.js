const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const Target = require("../DAO/targetSchema");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const csvUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      // upload only csv format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

function addTargetDataFromCSV(req, res) {
  let audiences = [];
  let uri = path.resolve(process.cwd()) + "/uploads/" + req.file.filename;

  fs.createReadStream(uri)
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      fs.unlinkSync(uri);
      throw error.message;
    })
    .on("data", (row) => {
      audiences.push(row);
    })
    .on("end", () => {
      Target.insertMany(audiences, (error, result) => {
        if (error) {
          res.status(500);
          res.json({ message: "Database error", type: "error" });
        } else {
          console.log("Audience csv added to DB");
          res.status(200);
          res.json(audiences);
        }
      });
      fs.unlinkSync(uri);
    });
}

module.exports = {
  csvUpload,
  addTargetDataFromCSV,
};
