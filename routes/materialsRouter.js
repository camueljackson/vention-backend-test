const router = require('express').Router();

const MaterialService = require('../services/materialService.js');

router.get('/:id', async (req, res) => {
  try {
    const material = await MaterialService().getMaterial(req.params.id);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// QUEST 3
router.post('/update-material', async (req, res) => {
  try {
    const updatedMaterial = await MaterialService().updateMaterial(req.query);
    res.status(200).json({ material_id: updatedMaterial.id });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
