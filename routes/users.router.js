const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router();

const service = new UsersService();

router.get('/', async (req, res) => {
  const { limit, offset } = req.query;
  const users = await service.find(parseInt(limit), offset);

  res.status(200).send(users);
});

router.post('/', async (req, res) => {
  const body = req.body;

  const rta = await service.create(body);

  res.status(201).json({
    message: 'created',
    data: rta
  });
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const rta = await service.update(id, body);

    res.json({
      message: 'created',
      data: rta,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message
    })
  }
})

module.exports = router;
