/**
 * @param {import('knex').Knex} knex
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('weapons_compositions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('weapons_compositions').insert([
        { parent_id: 1, material_id: 1, qty: 1 },
        { parent_id: 1, material_id: 6, qty: 1 },
        { parent_id: 1, material_id: 9, qty: 1 },
        { parent_id: 2, material_id: 6, qty: 1 },
        { parent_id: 3, material_id: 4, qty: 1 },
        { parent_id: 4, material_id: 9, qty: 1 },
        { parent_id: 4, material_id: 12, qty: 1 }
      ]);
    });

};
