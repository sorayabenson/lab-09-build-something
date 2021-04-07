const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Ghost = require('../lib/models/Ghost');

describe('lab-09 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let ghosts;
  beforeEach(async () => {
    ghosts = Ghost.callToTheHereAfter({
      name: 'Human Ghost',
      img: 'humanghost.png',
      tagline: 'Wrap your lonely heart in the tender embrace of Human Ghost.',
      backstory: 'Human Ghost made the finest rose water, distiled from their mountainside rose garden.'
    })
  })

  it('post /ghosts creates a new ghost and sends it to the database', () => {
    const newGhost = {
      name: 'Plant Ghost',
      img: 'plantghost.png',
      tagline: 'Is your home a graveyard for house plants? This ghost cares for spirits of all the plants you have killed.',
      backstory: 'Plant Ghost knew only excessive care for it`s brief, but overwatered life.'
    }

    return request(app)
      .post('/ghosts')
      .send(newGhost)
      .then((res) => {
        expect(res.body).toEqual({
          ...newGhost,
          id: '2'
        })
      })
  });

  it('get / ghosts returns all ghosts from the database', () => {
    return request(app)
      .get('/ghosts')
      .then((res) => {
        expect(res.body[0].name).toEqual('Human Ghost')
        expect(res.body[0].id).toEqual('1');
      })
  });

  it('get /:id returns the ghost with the corresponding id', () => {
    return request(app)
      .get('/ghosts/1')
      .then((res) => {
        expect(res.body[0].name).toEqual('Human Ghost')
        expect(res.body[0].id).toEqual('1');
      })
  });

  it('put /:id updated the ghost with the corresponding id', () => {
    const updatedGhost = { 
      name: 'Rose Garden Ghost',
      img: 'rosegardenghost.png',
      tagline: 'Wrap your lonely heart in the tender embrace of Rose Garden Ghost.',
      backstory: 'Rose Garden Ghost made the finest rose water, distiled from their mountainside rose garden.'
    }
    
    return request(app)
      .put('/ghosts/1')
      .send(updatedGhost)
      .then((res) => {
        expect(res.body).toEqual({
          ...updatedGhost,
          id: '1'
        })
      })
  });

  it('delete /:id deletes the corresponding ghost from the database', () => {
    return request(app)
      .delete('/ghosts/1')
      .then((res) => {
        expect(res.body).toEqual({
          name: 'Human Ghost',
          img: 'humanghost.png',
          tagline: 'Wrap your lonely heart in the tender embrace of Human Ghost.',
          backstory: 'Human Ghost made the finest rose water, distiled from their mountainside rose garden.'
        })
      })
  })
});
