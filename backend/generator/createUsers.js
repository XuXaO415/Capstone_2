import { faker } from "@faker-js/faker";

function createUsers() {
  const users = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    image_url: faker.image.imageUrl(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    zip_code: faker.address.zipCode(),
    hobbies: faker.lorem.words(),
    interests: faker.lorem.words(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  };
  return { data: users };
}

const users = createUsers();
console.log(users);

module.exports = createUsers;
