const db = require('../config/dbConfig.js');
const weapons_table = 'weapons';
const weapons_compositions_table = 'weapons_compositions';
const Material = require('./material.js');

class Weapon {
  constructor({ id, name, base_power, qty, deleted_at }) {
    this.id = id;
    this.name = name;
    this.base_power = base_power;
    this.qty = qty;
    this.deleted_at = deleted_at;
  }

  static async find(id) {
    const weapon = await db(weapons_table).where('id', id).first();
    if (!weapon) return null;
    return new Weapon(weapon);
  }

  static async getPowerLevel(id) {
    const weaponComposition = await db(weapons_compositions_table)
      .select('material_id', 'qty')
      .where('parent_id', id);

    if (!weaponComposition) throw new Error('Error getting Weapon Materials');

    const materialPower = weaponComposition.reduce(
      async (acc, curr) =>
        (acc += await Material.getMaterialPower(curr.material_id)) * curr.qty,
      0
    );

    let totalPower = 0;

    for (let { material_id, qty } of weaponComposition) {
      const materialTotalPower = await Material.getMaterialPower(material_id);
      totalPower += materialTotalPower;
    }

    return totalPower;
  }
}

module.exports = Weapon;