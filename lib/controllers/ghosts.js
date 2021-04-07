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
            .summonTheFright()
            .then(data => res.send(data))
            .catch(next);
    })

    .get('/:id', async (req, res, next) => {
        const { id } = req.params;    
        Ghost
            .summon(id)
            .then(data => res.send(data))
            .catch(next);
    })

    .put('/:id', async (req, res, next) => {
        try {
            const data = await pool.query(`
            UPDATE ghosts
            SET name=$1,
                img=$2,
                tagline=$3,
                backstory=$4
            WHERE id=$5
            RETURNING *`,
            [
                req.body.name,
                req.body.img,
                req.body.tagline,
                req.body.backstory,
                req.params.id
            ])

            res.send(data.rows[0])
            
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