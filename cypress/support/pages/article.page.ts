export class ArticlePage {
  readonly articleBody = ".article-content";
  readonly articleTitle = "h1";
  readonly editButton = "a[href*='/editor/']";
  readonly deleteButton = "button.btn-outline-danger";
  readonly favoriteButton = "button.btn-outline-primary";
  readonly commentInput = "textarea[placeholder='Write a comment...']";
  readonly commentSubmit = "button[type='submit']";
  readonly commentList = ".card";
  readonly authorLink = "a.author";
  readonly tagList = ".tag-list .tag-pill";

  visit(slug: string) {
    cy.visit(`/article/${slug}`);
    return this;
  }

  clickEdit() {
    cy.get(this.editButton).first().click();
    return this;
  }

  clickDelete() {
    cy.get(this.deleteButton).first().click();
    return this;
  }

  clickFavorite() {
    cy.get(this.favoriteButton).first().click();
    return this;
  }

  addComment(comment: string) {
    cy.get(this.commentInput).clear().type(comment);
    cy.get(this.commentSubmit).click();
    return this;
  }
}
