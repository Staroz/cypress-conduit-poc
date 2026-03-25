import { faker } from "@faker-js/faker";

export const buildArticle = (overrides?: Partial<Article>): Article => {
  return {
    title: faker.lorem.sentence(5),
    description: faker.lorem.sentence(10),
    body: faker.lorem.paragraphs(2),
    tagList: [faker.helpers.arrayElement(["javascript", "testing", "webdev", "react"])],
    ...overrides,
  };
};
