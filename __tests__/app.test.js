const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('lab-09 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

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
          id: '1'
        })
      })
  })
});
