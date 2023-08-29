const { find, getPowerLevel } = require('../models/weapon');

const WeaponService = () => {
  const getWeapon = async (id) => {
    return find(id);
  };

  const getWeaponPower = async (id) => {
    return getPowerLevel(id);
  };

  return {
    getWeapon,
    getWeaponPower
  };
};

module.exports = WeaponService;
