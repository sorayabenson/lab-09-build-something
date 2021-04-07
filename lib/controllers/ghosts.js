const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router()
    .post('', async (req, res, next) => {
        try {
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
                req.body.name,
                req.body.img,
                req.body.tagline,
                req.body.backstory
            ])
            
            res.send(data.rows[0]);
        } catch(err) {
            next(err);
        }
    });

    // .post('', async (req, res, next) => {
    //     try {
            
    //     } catch(err) {
    //         next(err);
    //     }
    // })