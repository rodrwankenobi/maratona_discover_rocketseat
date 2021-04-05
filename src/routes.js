const express =require("express")
const routes = express.Router()
const views = __dirname + "/views/"
const Profile = {
    data: {
        name: "Rodrigo",
        avatar: "https://avatars.githubusercontent.com/u/49798159?s=60&v=4", 
        "monthly-budget": 3000, 
        "days-per-week": 5,
        "hours-per-day": 8,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req,res) {
             return res.render(views + "profile", {profile: Profile.data})
        },
        update(req,res){
            // req.body para pegar os dados
            const data = req.data
            // definir quantas semanas tem em um ano
            const weeksPerYear = 52
            // remover as semanas de ferias do ano, para pegar as semanas em um mês
            const weeksPerMonth = (weeksPerYear-data["vacation-per-year"]) / 12
            // quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            // total de horas trabalhadas no mes
            const monthlyTotalHours = weeksPerMonth * weekTotalHours
            // qual sera o valor da minha hora
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }
            return res.redirect("/profile")
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 60,
            created_at: Date.now(),
            budget: 4000
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 4,
            "total-hours": 47,
            created_at: Date.now(),
            budget: 4000
        }
    ],
    controllers: {
        index(req,res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job,Profile.data["value-hour"])
                }
            })
            return res.render(views + "index", {jobs: updatedJobs, "profile": Profile.data})
        },
        create(req,res) {
            return res.render(views + "job")
        },
        save(req,res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 0
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createAt: Date.now()
            })
            return res.render(views + "job")
        },
        show(req,res) {
            const id = req.params.id

            const job = Job.data.find(job => job.id==id)
            if(!job) {
                return res.send("Job not found")
            }
            job.budget = Job.services.calculateBudget(job,Profile.data["value-hour"])
            return res.render(views + "job-edit", { job })
        },
        update(req,res){
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) == Number(jobId))

            if (!job){
                return res.send("Job not found")
            }
            const updatedJob = {
                ...job,
                name: req.body.name, 
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["total-hours"]
            }
            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)){
                    job = updatedJob
                }
                return job
            })
            return res.redirect("/job/" + jobId)
        },
        delete(req,res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) != Number(jobId))

            return res.redirect("/")
        }
    },
    services: {
        remainingDays(job){
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
        
            // transforma milli em dias
            const daysInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / daysInMs)
        
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

routes.get("/", Job.controllers.index)
routes.get("/index", (req,res) => res.redirect("/"))
routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)
routes.post("/job/:id", Job.controllers.update)
routes.get("/job/:id", Job.controllers.show)
routes.post("/job/delete/:id", Job.controllers.delete)
routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)

module.exports = routes;