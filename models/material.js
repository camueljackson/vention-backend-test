const db = require('../config/dbConfig.js');
const table = 'materials';
const materials_composition_table = 'compositions';
const materials_table = 'materials';

class Material {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.base_power = payload.base_power;
    this.qty = payload.qty;
    this.deleted_at = payload.deleted_at;
  }

  static async find(id) {
    const material = await db(table).where('id', id).first();
    if (!material) return null;
    return new Material(material);
  }

  static async getMaterialPower(id) {
    const weaponCompositionMaterialID = await db(materials_composition_table)
      .select('material_id', 'qty')
      .where('parent_id', id);

    if (!weaponCompositionMaterialID)
      throw new Error('Error getting Material Composition');

    if (!weaponCompositionMaterialID.length) {
      const singleMaterialPower = await db(materials_table)
        .select('base_power')
        .where('id', id)
        .first();

      if (!singleMaterialPower)
        throw new Error('Error getting Material Composition');

      return singleMaterialPower.base_power;
    }

    let totalPower = 0;

    for (let { material_id, qty } of weaponCompositionMaterialID) {
      const materialBasePower = await db(materials_table)
        .select('base_power')
        .where('id', material_id)
        .first();

      totalPower += materialBasePower.base_power * qty;
    }

    return totalPower;
  }

  // TO BE IMPLEMENTED
  update() {}
}

module.exports = Material;
