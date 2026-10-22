export class LoginPage {
// 1. Mapeamento de Seletores
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

// 2. Ações da Página (Quando / When)
  acessarPagina(): void {
    cy.visit('/');
  }

  preencherUsuario(username: string): void {
    cy.get(this.usernameInput).clear().type(username);
  }

  preencherSenha(password: string): void {
    cy.get(this.passwordInput).clear().type(password);
  }

  clicarEmLogin(): void {
    cy.get(this.loginButton).click();
  }

  executarLogin(username: string, password: string): void {
    this.preencherUsuario(username);
    this.preencherSenha(password);
    this.clicarEmLogin();
  }

// 3. Asserções / Validações (Então / Then)
  validarRedirecionamentoCatalogo(): void {
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('be.visible').and('have.text', 'Products');
  }

  validarMensagemDeErro(mensagemEsperada: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', mensagemEsperada);
  }
}

export default new LoginPage();