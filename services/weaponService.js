const { find, getPowerLevel, getMaxWeaponBuilds } = require('../models/weapon');

const WeaponService = () => {
  const getWeapon = async (id) => {
    return find(id);
  };

  const getWeaponPower = async (id) => {
    return getPowerLevel(id);
  };

  const getWeaponMaxQuantity = async (id) => {
    return getMaxWeaponBuilds(id);
  };

  return {
    getWeapon,
    getWeaponPower,
    getWeaponMaxQuantity
  };
};

module.exports = WeaponService;
