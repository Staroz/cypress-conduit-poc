import {faker} from "@faker-js/faker"

export const buildUser = (overrides?: Partial<User>): User => {
  return {
    username: faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 15),
    email: faker.internet.email(),
    password: faker.internet.password({length: 12}),
    ...overrides
  }
}