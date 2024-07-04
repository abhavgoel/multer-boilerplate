const express = require("express");
const path = require("path");
const multer  = require('multer');

const PORT=3000;

const app = express();

const storage = multer.diskStorage({ //to store in file system as original files
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname );
    }
});
  
const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.urlencoded({extended: false}));


app.get("/" ,(req,res) => {
    return res.render("homepage");
});

app.post("/upload",upload.single("profile_img"),(req,res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});