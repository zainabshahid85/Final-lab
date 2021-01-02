const express = require('express')
const multer=require('multer')
const app = express()
const path =require('path')
const bodyParser=require("body-parser")
const {Product}=require("./Model/Product")
const port = 8000



app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));


let image;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    console.log(file);
    image=Date.now() + path.extname(file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

upload = multer({ storage });

app.post("/product",
  (req, res, next) => {
    next();
  },
  upload.single("prImage"),
  (req, res, next) => {
      console.log(req.body)
    let pro = new Product(({} = req.body));
  pro.prImage = image ;
    pro
      .save()
      .then((d) => res.status(201).json(d))
      .catch((e) => res.status(401).json(e));
  }
);
app.get('/admin',(req,res)=>{
    console.log()
    res.render("admin")
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})