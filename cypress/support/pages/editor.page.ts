export class EditorPage {
  readonly titleInput = "input[placeholder='Article Title']";
  readonly descriptionInput = "input[placeholder=\"What's this article about?\"]";
  readonly bodyInput = "textarea[placeholder='Write your article (in markdown)']";
  readonly tagInput = "input[placeholder='Enter tags']";
  readonly publishButton = "button[type='button']";

  visit() {
    cy.visit("/editor");
    return this;
  }

  fillTitle(title: string) {
    cy.get(this.titleInput).clear().type(title);
    return this;
  }

  fillDescription(description: string) {
    cy.get(this.descriptionInput).clear().type(description);
    return this;
  }

  fillBody(body: string) {
    cy.get(this.bodyInput).clear().type(body);
    return this;
  }

  addTag(tag: string) {
    cy.get(this.tagInput).type(`${tag}{enter}`);
    return this;
  }

  publish() {
    cy.get(this.publishButton).click();
    return this;
  }

  createArticle(title: string, description: string, body: string, tags?: string[]) {
    this.fillTitle(title);
    this.fillDescription(description);
    this.fillBody(body);
    if (tags) {
      tags.forEach((tag) => this.addTag(tag));
    }
    this.publish();
    return this;
  }
}
