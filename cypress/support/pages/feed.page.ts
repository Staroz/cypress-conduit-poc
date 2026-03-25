export class FeedPage {
  readonly banner = ".banner";
  readonly bannerTitle = ".banner h1";
  readonly articlePreviews = ".article-preview";
  readonly feedToggle = ".feed-toggle";
  readonly globalFeedTab = ".feed-toggle .nav-link:last-child";
  readonly yourFeedTab = ".feed-toggle .nav-link:first-child";
  readonly tagsSidebar = ".sidebar";
  readonly tagPills = ".tag-list .tag-pill";
  readonly pagination = ".pagination";
  readonly paginationItems = ".pagination .page-item";
  readonly articleTitles = ".article-preview h1";
  readonly articleAuthors = ".article-preview .author";

  visit() {
    cy.visit("/");
    return this;
  }

  clickGlobalFeed() {
    cy.get(this.globalFeedTab).click();
    return this;
  }

  clickYourFeed() {
    cy.get(this.yourFeedTab).click();
    return this;
  }

  clickTag(tagName: string) {
    cy.get(this.tagPills).contains(tagName).click();
    return this;
  }

  clickPage(pageNumber: number) {
    cy.get(this.paginationItems).eq(pageNumber - 1).click();
    return this;
  }
}
