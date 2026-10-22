import loginPage from '../support/pages/LoginPage';

describe('Módulo de Autenticação - SauceDemo', () => {
  beforeEach(() => {
    // Contexto (Dado que): Antes de cada teste, abre a página inicial
    loginPage.acessarPagina();
  });

  it('CT-01: Deve realizar login com sucesso utilizando credenciais válidas (EP-L01)', () => {
    loginPage.executarLogin('standard_user', 'secret_sauce');
    loginPage.validarRedirecionamentoCatalogo();
  });

  it('CT-02: Deve bloquear tentativa de login com usuário bloqueado (EP-L02)', () => {
    loginPage.executarLogin('locked_out_user', 'secret_sauce');
    loginPage.validarMensagemDeErro(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  it('CT-03: Deve impedir login com senha incorreta (EP-L04)', () => {
    loginPage.executarLogin('standard_user', 'senha_incorreta_123');
    loginPage.validarMensagemDeErro(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  it('CT-04: Deve exibir erro ao tentar logar com o campo Username vazio (EP-L05)', () => {
    loginPage.preencherSenha('secret_sauce');
    loginPage.clicarEmLogin();
    loginPage.validarMensagemDeErro('Epic sadface: Username is required');
  });
});