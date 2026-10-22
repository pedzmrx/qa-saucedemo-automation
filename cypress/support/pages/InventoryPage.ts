export class InventoryPage {
// 1. Mapeamento de Seletores
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly inventoryItems = '[data-test="inventory-item"]';
  private readonly itemNames = '[data-test="inventory-item-name"]';
  private readonly itemPrices = '[data-test="inventory-item-price"]';
  private readonly addToCartBackpackBtn = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private readonly removeBackpackBtn = '[data-test="remove-sauce-labs-backpack"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';

// 2. Ações da Página (Quando / When)
  selecionarOrdenacao(opcao: string): void {
    cy.get(this.sortDropdown).select(opcao);
  }

  adicionarMochilaAoCarrinho(): void {
    cy.get(this.addToCartBackpackBtn).click();
  }

  removerMochilaDoCarrinho(): void {
    cy.get(this.removeBackpackBtn).click();
  }

  irParaOCarrinho(): void {
    cy.get(this.cartLink).click();
  }

// 3. Asserções / Validações (Então / Then)
  validarPrimeiroItemDaLista(nomeEsperado: string, precoEsperado: string): void {
    cy.get(this.inventoryItems).first().within(() => {
      cy.get(this.itemNames).should('have.text', nomeEsperado);
      cy.get(this.itemPrices).should('have.text', precoEsperado);
    });
  }

  validarUltimoItemDaLista(nomeEsperado: string, precoEsperado: string): void {
    cy.get(this.inventoryItems).last().within(() => {
      cy.get(this.itemNames).should('have.text', nomeEsperado);
      cy.get(this.itemPrices).should('have.text', precoEsperado);
    });
  }

  validarBotaoRemoverMochilaVisivel(): void {
    cy.get(this.removeBackpackBtn).should('be.visible').and('have.text', 'Remove');
  }

  validarContadorDoCarrinho(quantidadeEsperada: string): void {
    cy.get(this.cartBadge).should('be.visible').and('have.text', quantidadeEsperada);
  }

  validarCarrinhoVazioSemContador(): void {
    cy.get(this.cartBadge).should('not.exist');
  }
}

export default new InventoryPage();