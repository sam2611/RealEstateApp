import express from "express"
import postRoute from "./routes.post.route.js"

const router= express.Router()

app.use("/api/posts",postRoute)

app.listen(8800, () => {
    console.log("Server is running!");
});