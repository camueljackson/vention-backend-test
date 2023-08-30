/**
 * @param {import('knex').Knex} knex
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('weapons')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('weapons').insert([
        {
          id: 1,
          name: 'Excalibur',
          power_level: 21680,
          qty: 0
        },
        {
          id: 2,
          name: 'Magic Staff',
          power_level: 3700,
          qty: 0
        },
        {
          id: 3,
          name: 'Transmogrifier',
          power_level: 10,
          qty: 0
        },
        {
          id: 4,
          name: 'Axe',
          power_level: 12040,
          qty: 0
        }
      ]);
    });
};
