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

    let totalPower = 0;

    for (let { material_id, qty } of weaponComposition) {
      const materialTotalPower = await Material.getMaterialPower(material_id);
      if (Number(materialTotalPower)) totalPower += materialTotalPower * qty;
    }

    return totalPower;
  }

  static async getMaxWeaponBuilds(id) {
    const weaponComposition = await db(weapons_compositions_table)
      .select('material_id', 'qty')
      .where('parent_id', id);

    if (!weaponComposition) throw new Error('Error getting Weapon Materials');

    let totalWeaponBuilds = [];

    for (let { material_id, qty } of weaponComposition) {
      const material_inventory = await Material.getMaterialInventory(
        material_id
      );

      if (qty > material_inventory.qty)
        return 'Not enough materials to build a weapon';

      totalWeaponBuilds = totalWeaponBuilds.concat(
        material_inventory.qty / qty
      );
    }

    return Math.min(...totalWeaponBuilds);
  }
}

module.exports = Weapon;