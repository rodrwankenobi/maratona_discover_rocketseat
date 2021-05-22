const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();
    await db.exec(`
        CREATE TABLE profile
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INTEGER,
            days_per_week INTEGER,
            hours_per_day INTEGER,
            vacation_per_year INTEGER,
            value_hour INTEGER
        )
    `);

    await db.exec(`
        CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INTEGER,
            total_hours INTEGER,
            created_at DATETIME
        )
    `);

    await db.run(`
        INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
            )
            VALUES(
                "Pizzaria Guloso",
                2,
                1,
                1617514376018
                );
    `);

    db.run(`
       INSERT INTO jobs(
           name,
           daily_hours,
           total_hours,
           created_at
           )
           VALUES(
               "OneTwo Project",
               3,
               47,
               1617514376018
            );
    `);
    await db.run(`
        INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
            )
            VALUES(
                "Rodrigo Ferreira",
                "https://avatars.githubusercontent.com/u/49798159?s=400&u=20d95c877d6f2c7bdaa32563e1c903fa2a4c6f7f&v=4",
                3000,
                5,
                8,
                2,
                40
            );
    `);


    db.close();
  },
};

initDb.init();
