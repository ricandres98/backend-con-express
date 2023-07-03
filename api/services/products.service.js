const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class productsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const maxLength = 100;

    for(let i = 0; i < maxLength; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.nanoid(),
      ...data,
    }

    this.products.push(newProduct);

    return newProduct;
  }

  async find(limit) {
    const productsToSend = [];
    let quantity = limit | this.products.length;
    quantity = quantity > this.products.length ? this.products.length : quantity

    for(let i = 0; i < quantity; i++) {
      productsToSend.push(this.products[i]);
    }

    return new Promise((resolve) => {
      setTimeout(()=>{
        resolve(productsToSend);
      }, 1000)
    })
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if(!product) {
      throw boom.notFound('product not found');
    }
    if(product.isBlocked) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  async delete(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if(productIndex === -1) {
      throw new boom.notFound('Product not found')
    }
    this.products.splice(productIndex, 1);
    return { id };
  }

  async update(id, data) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if(productIndex === -1) {
      throw boom.notFound('Product not found')
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...data,
    }

    return this.products[productIndex];
  }
}

module.exports = productsService;
