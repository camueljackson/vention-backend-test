const router = require('express').Router();

const WeaponService = require('../services/weaponService.js');

router.get('/:id', async (req, res) => {
  try {
    const weapon = await WeaponService().getWeapon(req.params.id);
    res.status(200).json(weapon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/power/:id', async (req, res) => {
  try {
    const weaponPower = await WeaponService().getWeaponPower(req.params.id);
    res.status(200).json(weaponPower);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/max-quantity/:id', async (req, res) => {
  try {
    res.send('Max Quantity');
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
