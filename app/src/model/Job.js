const { create } = require("../controllers/JobController");
const Database = require("../db/config")

module.exports = {
    async get(){
        const db = await Database()
        const data = db.all(`SELECT * FROM jobs`)
        db.close()
        return data;
    },
    async update(newJob){
        
        const db = await Database()
        await db.run(`
            UPDATE jobs
            SET
                name='${newJob.name}',
                daily_hours=${newJob.daily_hours},
                total_hours=${newJob.total_hours},
                created_at=${newJob.created_at}
            WHERE id=${newJob.id}
        `);
        db.close()
    },
    async delete(id){
        const db = await Database()
        await db.run(`
            DELETE FROM jobs
            WHERE id=${id}
        `);
        db.close()
    },
    async create(newJob){
        
        
        
        const db = await Database()
        comando_insert = `
        INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
            )
            VALUES(
               '${newJob.name}',
                ${newJob.daily_hours},
                ${newJob.total_hours},
               '${newJob.created_at}'
                );
        `;
        await db.run(comando_insert)
        
        
        db.close()
    }
}