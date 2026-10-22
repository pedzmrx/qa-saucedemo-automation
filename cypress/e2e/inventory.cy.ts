import loginPage from '../support/pages/LoginPage';
import inventoryPage from '../support/pages/InventoryPage';

describe('Módulo de Catálogo e Carrinho - SauceDemo', () => {
  beforeEach(() => {
    // Contexto (Dado que): Usuário autenticado na página de inventário
    loginPage.acessarPagina();
    loginPage.executarLogin('standard_user', 'secret_sauce');
    loginPage.validarRedirecionamentoCatalogo();
  });

  it('CT-05: Deve ordenar produtos por preço do menor para o maior', () => {
    inventoryPage.selecionarOrdenacao('Price (low to high)');

    inventoryPage.validarPrimeiroItemDaLista('Sauce Labs Onesie', '$7.99');
    inventoryPage.validarUltimoItemDaLista('Sauce Labs Fleece Jacket', '$49.99');
  });

  it('CT-06: Deve adicionar e remover item único no carrinho atualizando o contador (BVA-02)', () => {
    inventoryPage.adicionarMochilaAoCarrinho();
    inventoryPage.validarBotaoRemoverMochilaVisivel();
    inventoryPage.validarContadorDoCarrinho('1');

    inventoryPage.removerMochilaDoCarrinho();
    inventoryPage.validarCarrinhoVazioSemContador();
  });
});