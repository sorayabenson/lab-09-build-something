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
    });

    // .post('', async (req, res, next) => {
    //     try {
            
    //     } catch(err) {
    //         next(err);
    //     }
    // })