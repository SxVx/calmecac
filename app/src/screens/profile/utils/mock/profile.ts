import { faker } from '@faker-js/faker';

const profile = {
  name: faker.name.firstName(),
  image: 'https://i.pravatar.cc/300',
};

export default profile;
