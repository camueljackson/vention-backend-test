const { find, update } = require('../models/material');

const MaterialService = () => {
  const getMaterial = async (id) => {
    return find(id);
  };

  const updateMaterial = async (params) => {
    return update(params);
  };

  return {
    getMaterial,
    updateMaterial
  };
};

module.exports = MaterialService;
