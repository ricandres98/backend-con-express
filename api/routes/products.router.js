const express = require('express');

const productsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/product.schema');

const router = express.Router();

const service = new productsService();

router.get('/', async (request, response) => {
  const { limit } = request.query;
  const products = await service.find(parseInt(limit));

  response.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);

      if(product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({
          message:"product id doesn't exist"
        })
      }
    } catch(error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const updatedProduct = await service.update(id, body);

      res.json(updatedProduct);
    } catch (error) {
      next(error);
      // res.status(404).send({
      //   message: error.message,
      // });
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
