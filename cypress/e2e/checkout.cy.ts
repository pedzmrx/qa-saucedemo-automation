import loginPage from '../support/pages/LoginPage';
import inventoryPage from '../support/pages/InventoryPage';
import checkoutPage from '../support/pages/CheckoutPage';

describe('Módulo de Checkout e Fechamento de Pedido - SauceDemo', () => {
  beforeEach(() => {
    // Contexto: Usuário autenticado no sistema
    loginPage.acessarPagina();
    loginPage.executarLogin('standard_user', 'secret_sauce');
    loginPage.validarRedirecionamentoCatalogo();
  });

  it('CT-07: Deve finalizar compra ponta a ponta com sucesso - Caminho Feliz (EP-C01)', () => {
    inventoryPage.adicionarMochilaAoCarrinho();
    inventoryPage.irParaOCarrinho();

    checkoutPage.iniciarCheckout();
    checkoutPage.preencherDadosEntrega('Pedro', 'Silva', '69000-000');
    checkoutPage.continuarParaRevisao();

    checkoutPage.validarResumoDeValores(
      'Item total: $29.99',
      'Tax: $2.40',
      'Total: $32.39'
    );

    checkoutPage.finalizarPedido();
    checkoutPage.validarPedidoConcluidoComSucesso('Thank you for your order!');
  });

  it('CT-08: Deve bloquear avanço no checkout ao omitir o Postal Code (EP-C04)', () => {
    inventoryPage.adicionarMochilaAoCarrinho();
    inventoryPage.irParaOCarrinho();

    checkoutPage.iniciarCheckout();
    checkoutPage.preencherDadosEntrega('Pedro', 'Silva');
    checkoutPage.continuarParaRevisao();

    checkoutPage.validarErroFormulario('Error: Postal Code is required');
  });

  it.skip('CT-09: Deve impedir checkout quando o carrinho estiver vazio com 0 itens (BVA-01 / BUG-01)', () => {
    inventoryPage.irParaOCarrinho();
    checkoutPage.validarBotaoCheckoutDesabilitado();
  });
});