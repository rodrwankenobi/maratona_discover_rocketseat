const express =require("express")
const routes = express.Router()
const views = __dirname + "/views/"
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const DashboardController = require("./controllers/DashboardController")

routes.get("/", DashboardController.index)
routes.get("/index", (req,res) => res.redirect("/"))
routes.get("/job", JobController.create)
routes.post("/job", JobController.save)
routes.post("/job/:id", JobController.update)
routes.get("/job/:id", JobController.show)
routes.post("/job/delete/:id", JobController.delete)
routes.get("/profile", ProfileController.index)
routes.post("/profile", ProfileController.update)

module.exports = routes;