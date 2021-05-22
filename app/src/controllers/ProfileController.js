const Profile = require("../model/Profile")
module.exports = {
    async index(req,res) {
        data = await Profile.get()
        return res.render( "profile", {profile: data})
    },
    async update(req,res){
        // req.body para pegar os dados
        const data = req.body
        // definir quantas semanas tem em um ano
        const weeksPerYear = 52
        // remover as semanas de ferias do ano, para pegar as semanas em um mês
        const weeksPerMonth = (weeksPerYear-data["vacation_per_year"]) / 12
        // quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours_per_day"] * data["days_per_week"]
        // total de horas trabalhadas no mes
        const monthlyTotalHours = weeksPerMonth * weekTotalHours
        // qual sera o valor da minha hora
        const valueHour = data["monthly_budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })
        return res.redirect("/profile")
    }
}