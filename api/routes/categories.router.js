const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      categoryName: 'clothes',
      categoryId: 25,
    },
    {
      categoryName: 'toys',
      categoryId: 24,
    },
  ]);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;
