// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const route=require('./routes/FirstRoutes')
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
const fs = require('fs');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

require("dotenv").config();
const PORT = process.env.PORT||3000;
const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const API=process.env.API;
const FRONTENDAPI=process.env.FRONTENDAPI;
const LOCAL=process.env.LOCAL;
const STRIPE=process.env.STRIPE
app.listen(PORT,function()
{
  console.log('server_connect');
})

app.use('/',route);
app.get('/',function(req,res)
{
  res.send("default_path_working")
  
})

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL); // No need for useNewUrlParser or useUnifiedTopology
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Stop app if DB fails
  }
};

// Call connection function
connectDB();

const stripe = require("stripe")(STRIPE);
app.post("/getcheckoutdata", async (req, res) => {
  const { products } = req.body;
 console.log(products);

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Invalid or missing products data" });
  }

  const lineItems = products.map((product) => {
    if (!product.title || !product.images || !product.images.length || !product.price) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.images[0]],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: 1,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${LOCAL}home`,
      cancel_url: `${LOCAL}Cart`,
    });

    res.status(200).json({ 
      id: session.id, 
      message: "Checkout session created successfully" });
  
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});


// const multer  = require('multer')


// //importing schema
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // const upload = multer({ dest: 'uploads/' })
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../src/images");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/DataBase')
//   .then(() => console.log('mongoose connected'))
//   .catch(err => console.log(err));

// // Upload image route
// app.post("/upload-image", upload.single("image"), async (req, res) => {
//   const imageName = req.file.filename;

//   try {
//     await Images.create({ image: imageName });
//     res.json({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

// // Get images route
// app.get("/get-image", async (req, res) => {
//   try {
//     const data = await Images.find({});
//     res.send({ status: "ok", data: data });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });
module.exports = app;
