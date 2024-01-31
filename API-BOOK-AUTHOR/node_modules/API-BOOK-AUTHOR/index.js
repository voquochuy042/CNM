const express = require("express")
const cors = require("cors")
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")

const authorRoute = require("./routes/author")
const bookRoute = require("./routes/book")

app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors())
app.use(morgan("common"))
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect db
mongoose.connect(process.env.mongodb_url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use("/v1/author", authorRoute)
app.use("/v1/book", bookRoute)
app.listen(8000, () => {
    console.log("ruiiiii")
})