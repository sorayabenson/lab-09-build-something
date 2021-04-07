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

    static async summonTheFright() {
        const data = await pool.query(`
        SELECT * FROM ghosts`);
        
        return data.rows;
    }

    static async summon(id) {
        const data = await pool.query(`
            SELECT * FROM ghosts
            WHERE id=$1`,
            [id]);

            return data.rows;
    }

    static async returnMemories(body, id) {
        const data = await pool.query(`
        UPDATE ghosts
        SET name=$1,
            img=$2,
            tagline=$3,
            backstory=$4
        WHERE id=$5
        RETURNING *`,
        [
            body.name,
            body.img,
            body.tagline,
            body.backstory,
            id
        ])

        return data.rows[0];
    }
}