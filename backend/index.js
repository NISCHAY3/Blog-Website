const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const path = require("path")
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
// const corsOptions = {
// //     origin: '*',
// //     credentials: true,
// // };

// app.use(cors(corsOptions));
//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch (err) {
        console.log(err)
    }
}




//middlewares
dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    origin: "http://localhost:3000",
    credentials: true
}))
console.log(cors());



// app.use(cors({ origin: "http://localhost:3000", credentials: true }))
// app.options("/api/users", cors({
//     methods: ["GET", "PUT", "POST", "DELETE"], // Add other allowed methods as needed
// }));
// app.options("/api/auth", cors({
//     methods: ["GET", "PUT", "POST", "DELETE"], // Add other allowed methods as needed
// }));
// app.options("/api/posts", cors({
//     methods: ["GET", "PUT", "POST", "DELETE"], // Add other allowed methods as needed
// }));
// app.options("/api/comments", cors({
//     methods: ["GET", "PUT", "POST", "DELETE"], // Add other allowed methods as needed
// }));
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

//image upload
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT, () => {
    connectDB()
    console.log("app is running on port " + process.env.PORT)
})