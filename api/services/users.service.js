const { faker } = require('@faker-js/faker')

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const maxLength = 5;

    for(let i = 0; i < maxLength; i++) {
      this.users.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({min: 18, max: 70}),
        id: faker.string.alphanumeric(5)
      });
    }
  }

  async find(limit, offset) {
    const usersToSend = [];

    let quantity = limit || this.users.length;
    quantity = quantity > this.users.length ? this.users.length : quantity;

    const startingPoint = offset > 0 ? offset - 1 : 0;

    for(let i = startingPoint; i < quantity; i++) {
      usersToSend.push(this.users[i]);
    }

    return usersToSend;
  }

  async create(data) {
    if(data) {
      const newUser = {
        ...data,
        id: faker.string.alphanumeric(5),
      };

      this.users.push(newUser);
      return newUser;
    }
  }

  async update(id, data) {
    const userIndex = this.users.findIndex((item) => item.id === id);

    if(userIndex === -1) {
      throw new Error('that id doesn´t match');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...data,
    }

    return this.users[userIndex];
  }
}

module.exports = UsersService;
