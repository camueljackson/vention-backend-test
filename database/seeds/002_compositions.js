/**
 * @param {import('knex').Knex} knex
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('compositions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('compositions').insert([
        { parent_id: 1, material_id: 2, qty: 2 }, // ***

        { parent_id: 2, material_id: 3, qty: 5 },
        { parent_id: 2, material_id: 4, qty: 5 },

        { parent_id: 3, material_id: 5, qty: 5 },
        { parent_id: 3, material_id: 12, qty: 1 },

        { parent_id: 6, material_id: 2, qty: 1 }, // ***
        { parent_id: 6, material_id: 7, qty: 2 }, // ***
        { parent_id: 6, material_id: 8, qty: 3 }, // ***

        { parent_id: 9, material_id: 10, qty: 5 }, // ***

        { parent_id: 10, material_id: 11, qty: 10 }
      ]);
    });

  // { parent_id: 2, material_id: 3, qty: 5 },
  // { parent_id: 2, material_id: 4, qty: 5 },

  // { parent_id: 6, material_id: 2, qty: 1 },
  // { parent_id: 6, material_id: 7, qty: 2 },
  // { parent_id: 6, material_id: 8, qty: 3 },

  // { parent_id: 9, material_id: 10, qty: 5 },

  //

  /*
    EXCALIBUR POWER_LEVEL (composed of materials 1,6,9)

    mat:1 > base_power = 100
    mat:1 > made of 2x mat:2 > base_power = 2x20
    
    mat:2 > made of 5x mat:3 > base_power = 5x60
    mat:2 > made of 5x mat:4 > base_power = 5x10

    mat:3 > made of 5x mat:5 > base_power = 5x30
    mat:3 > made of 1x mat:12 > base_power = 1x300

    mat:4 > CORE > base_power = 10
    mat:5 > CORE > base_power = 30
    mat:12 > CORE > base_power = 300

    total:
    mat:3 base_power > 60 + (5x30) + (1*300) = 510
    mat:2 base_power > 20 + (5x510) + (5x10) = 2320

  */
};
