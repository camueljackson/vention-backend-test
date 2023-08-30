const db = require('../config/dbConfig.js');
const materials_composition_table = 'compositions';
const materials_table = 'materials';
const weapons_table = 'weapons_compositions';

class Material {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.base_power = payload.base_power;
    this.qty = payload.qty;
    this.deleted_at = payload.deleted_at;
  }

  static async find(id) {
    const material = await db(materials_table).where('id', id).first();
    if (!material) return null;
    return new Material(material);
  }

  /**
   * The function `getMaterialPower` calculates the total power level of a material and its compositions
   * recursively.
   * @param id - The `id` parameter is the identifier of a material. It is used to retrieve the
   * material's composition and calculate its power level.
   * @returns the total power level of a material, taking into account its base power and the power
   * levels of its compositions.
   */
  static async getMaterialPower(id) {
    try {
      const material_compositions = await db(materials_composition_table).where(
        'parent_id',
        id
      );

      const material = await db(materials_table)
        .select('base_power', 'id')
        .where('id', id)
        .first();

      if (!material_compositions.length) {
        return material.base_power;
      }

      let materialBasePower = material.base_power;

      for (let { material_id, qty } of material_compositions) {
        const compositionPowerLevel = await Material.getMaterialPower(
          material_id
        );
        materialBasePower += compositionPowerLevel * qty;
      }

      return materialBasePower;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * The function updates the base power of a material in a database table and returns the updated
   * material.
   * @param params - {id, base_power}
   * @returns The updated material object is being returned.
   */
  static async update(params) {
    await db(materials_table).where('id', params.id).update({
      base_power: params.base_power
    });

    const updatedMaterial = await db(materials_table)
      .where('id', params.id)
      .first();

    Material.updateAllMaterials(params.id);
    return updatedMaterial;
  }

  static async updateAllMaterials(id) {
    // IN PROGRESS
    const material_compositions = await db(materials_composition_table).where(
      'material_id',
      id
    );

    if (!material_compositions.length) return;
    for (let { material_id, qty } of material_compositions) {
      await Material.getMaterialPower(material_id);
    }
  }

  static async getMaterialInventory(id) {
    const material_inventory = await db(materials_table)
      .select('qty')
      .where('id', id)
      .first();

    return material_inventory;
  }
}

module.exports = Material;
