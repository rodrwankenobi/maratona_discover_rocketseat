const express =require("express")
const routes = express.Router()
const views = __dirname + "/views/"
const profile = {
    name: "Rodrigo",
    avatar: "https://avatars.githubusercontent.com/u/49798159?s=60&v=4", 
    "monthly-budget": 3000, 
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4
}

routes.get("/", (req,res) => res.render(views + "index",{profile}))
routes.get("/index", (req,res) => res.redirect("/"))
routes.get("/job", (req,res) => res.render(views + "job"))
routes.get("/job/edit", (req,res) => res.render(views + "job-edit"))
routes.get("/profile", (req,res) => res.render(views + "profile",{profile}))

module.exports = routes;