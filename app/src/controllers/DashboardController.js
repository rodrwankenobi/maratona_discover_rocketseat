const Job = require("../model/Job")
const Profile = require("../model/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
    async index(req,res) {
    const jobs = await Job.get()
    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length
    }
    const profile = await Profile.get()
        // total de horas para cada job
        let jobTotalHours = 0
        
        
        
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress';
            statusCount[status] +=1;

            // total de horas por dia se o job estiver em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily_hours']) : jobTotalHours
            
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job,profile["value_hour"])
            }
        })
        
        const freeHours = profile['hours_per_day'] - jobTotalHours
        
        
        return res.render( "index", {jobs: updatedJobs, "profile": profile, statusCount: statusCount, freeHours: freeHours})
    }
}