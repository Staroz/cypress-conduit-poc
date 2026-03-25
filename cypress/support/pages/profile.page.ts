export class ProfilePage {
  readonly username = ".user-info h4";
  readonly bio = ".user-info p";
  readonly userImage = ".user-info img";
  readonly followButton = "button.btn-outline-secondary";
  readonly editProfileButton = "a[href*='settings']";
  readonly myArticlesTab = ".articles-toggle .nav-link:first-child";
  readonly favoritedArticlesTab = ".articles-toggle .nav-link:last-child";
  readonly articlePreviews = ".article-preview";

  visit(username: string) {
    cy.visit(`/profile/${username}`);
    return this;
  }

  clickFollow() {
    cy.get(this.followButton).click();
    return this;
  }

  clickEditProfile() {
    cy.get(this.editProfileButton).click();
    return this;
  }

  clickMyArticles() {
    cy.get(this.myArticlesTab).click();
    return this;
  }

  clickFavoritedArticles() {
    cy.get(this.favoritedArticlesTab).click();
    return this;
  }
}
