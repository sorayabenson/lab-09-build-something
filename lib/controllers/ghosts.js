const { Router } = require('express');
const Ghost = require('../models/Ghost');
const pool = require('../utils/pool');

module.exports = Router()
    .post('', async (req, res, next) => {
        const { body } = req;
        Ghost
            .callToTheHereAfter(body)
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
        const { body } = req;
        const { id } = req.params;
        Ghost
            .returnMemories(body, id)
            .then(data => res.send(data))
            .catch(next);
    })
    
    .delete(':id', async (req, res, next) => {
        try {
            
        } catch(err) {
            next(err);
        }
    })