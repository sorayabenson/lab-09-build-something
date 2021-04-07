const { Router } = require('express');
const Ghost = require('../models/Ghost');
const pool = require('../utils/pool');

module.exports = Router()
    .post('', async (req, res, next) => {
        const { body } = req;
        Ghost
            .create(body)
            .then(data => res.send(data))
            .catch(next);
    })

    .get('', async (req, res, next) => {
        Ghost
            .summon()
            .then(data => res.send(data))
            .catch(next);
    })

    .get('/:id', async (req, res, next) => {
            try {
                const data = await pool.query(`
                SELECT * FROM ghosts
                WHERE id=$1`,
                [req.params.id]);

                res.send(data.rows);
            } catch(err) {
                next(err);
            }
        })

    // .post('', async (req, res, next) => {
    //     try {
            
    //     } catch(err) {
    //         next(err);
    //     }
    // })