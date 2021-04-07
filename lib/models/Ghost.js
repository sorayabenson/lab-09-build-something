const pool = require('../utils/pool');

module.exports = class Ghost {
    static async create(body) {
        const data = await pool.query(`
        INSERT INTO ghosts (
            name,
            img,
            tagline,
            backstory
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            body.name,
            body.img,
            body.tagline,
            body.backstory
        ])
        
        return data.rows[0];
    }

    static async summon() {
        const data = await pool.query(`
        SELECT * FROM ghosts`);
        
        return data.rows;
    }
}