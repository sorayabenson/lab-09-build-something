const { Router } = require('express');
const Ghost = require('../models/Ghost');
const pool = require('../utils/pool');

module.exports = Router()
    .post('', async (req, res, next) => {
        const { body } = req;
        try {
            const data = await Ghost.create(body);

            res.send(data);
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