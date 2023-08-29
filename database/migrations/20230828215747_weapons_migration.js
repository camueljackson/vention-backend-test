/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('weapons', function (t) {
    t.increments('id').unsigned().primary();
    t.text('name');
    t.integer('power_level');
    t.integer('qty');
    t.timestamp('deleted_at').nullable();
  });
  await knex.schema.createTable('weapons_compositions', function (t) {
    t.integer('parent_id').index();
    t.integer('material_id').index();
    t.integer('qty');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {};
