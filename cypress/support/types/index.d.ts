/// <reference types="cypress" />

interface User {
  email: string;
  password: string;
  username: string;
  token?: string;
}

interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
  slug?: string;
}

declare namespace Cypress {
  interface SuiteConfigOverrides {
    tags?: string | string[];
  }

  interface TestConfigOverrides {
    tags?: string | string[];
  }

  interface Chainable {
    loginViaApi(email: string, password: string): Chainable<User>;
    registerViaApi(user: User): Chainable<User>;
    createArticleViaApi(article: Article): Chainable<Article>;
    deleteArticleViaApi(slug: string): Chainable<Cypress.Response<any>>;
  }
}
