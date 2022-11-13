import { faker } from '@faker-js/faker';

const courses = {
  data: Array.from({ length: 10 }, () => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    image: faker.image.imageUrl(),
    price: faker.datatype.number({ min: 10, max: 100 }),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    totalRating: faker.datatype.number({ min: 1, max: 100 }),
    teacher: faker.name.fullName(),
    category: faker.lorem.words(1),
  })),
};

export default courses;
