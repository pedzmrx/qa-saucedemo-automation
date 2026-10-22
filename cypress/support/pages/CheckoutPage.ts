export class CheckoutPage {
// 1. Mapeamento de Seletores (Carrinho, Formulário, Resumo e Conclusão)
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly errorMessage = '[data-test="error"]';

  private readonly subtotalLabel = '[data-test="subtotal-label"]';
  private readonly taxLabel = '[data-test="tax-label"]';
  private readonly totalLabel = '[data-test="total-label"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly completeHeader = '[data-test="complete-header"]';

// 2. Ações da Página (Quando / When)
  iniciarCheckout(): void {
    cy.get(this.checkoutButton).click();
  }

  preencherDadosEntrega(nome: string, sobrenome: string, cep?: string): void {
    cy.get(this.firstNameInput).clear().type(nome);
    cy.get(this.lastNameInput).clear().type(sobrenome);
    if (cep) {
      cy.get(this.postalCodeInput).clear().type(cep);
    }
  }

  continuarParaRevisao(): void {
    cy.get(this.continueButton).click();
  }

  finalizarPedido(): void {
    cy.get(this.finishButton).click();
  }

// 3. Asserções / Validações (Então / Then)
  validarResumoDeValores(subtotal: string, taxa: string, total: string): void {
    cy.url().should('include', '/checkout-step-two.html');
    cy.get(this.subtotalLabel).should('contain.text', subtotal);
    cy.get(this.taxLabel).should('contain.text', taxa);
    cy.get(this.totalLabel).should('contain.text', total);
  }

  validarPedidoConcluidoComSucesso(mensagemEsperada: string): void {
    cy.url().should('include', '/checkout-complete.html');
    cy.get(this.completeHeader)
      .should('be.visible')
      .and('have.text', mensagemEsperada);
  }

  validarErroFormulario(mensagemEsperada: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', mensagemEsperada);
  }

  validarBotaoCheckoutDesabilitado(): void {
    cy.get(this.checkoutButton).should('be.disabled');
  }
}

export default new CheckoutPage();