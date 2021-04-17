module.exports = {
    remainingDays(job){
        
        
        
        const remainingDays = (job["total_hours"] / job["daily_hours"]).toFixed()
        
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)
    
        const timeDiffInMs = dueDateInMs - Date.now()
    
        // transforma milli em dias
        const daysInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / daysInMs)
        
        
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total_hours"]
}