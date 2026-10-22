# Automação de Testes E2E com Cypress, TypeScript & Page Object Model — SauceDemo

| Projeto | Stack Principal | Padrão de Arquitetura | Pipeline CI/CD | Aplicação-Alvo |
| :--- | :--- | :--- | :--- | :--- |
| **QA E2E Automation** | Cypress + TypeScript | Page Object Model (POM) | GitHub Actions | [SauceDemo (Swag Labs)](https://www.saucedemo.com/) |

---

## 1. Visão Geral & Contexto de Engenharia

Este repositório contém a suíte de **Automação de Testes End-to-End (E2E)** desenvolvida em **Cypress com TypeScript** para validação regressiva do e-commerce **SauceDemo**.

O código deste projeto automatiza os cenários de teste, partições de equivalência (EP) e valores limite (BVA) previamente modelados na etapa de planejamento e testes manuais:
* 🔗 **Repositório de Origem (Planejamento, BDD & Bug Reports):** [Projeto 1 — Estratégia de QA & Testes de Caixa-Preta](https://github.com/pedzmrx/qa-saucedemo-test-strategy)

---

## 2. Arquitetura do Projeto

Para garantir alta manutenibilidade, baixo acoplamento e reaproveitamento de código, a suíte aplica o padrão de projeto **Page Object Model (POM)**, isolando o mapeamento de seletores (`data-test`) e ações de página das regras de asserção dos testes:

* 📁 **`.github/workflows/`**
  * ⚙️ `cypress.yml` — Pipeline de Integração Contínua (CI/CD) executada no GitHub Actions a cada *push*.
* 📁 **`cypress/support/pages/`** *(Camada de Page Objects)*
  * 📄 `LoginPage.ts` — Seletores, ações de autenticação e validações de bloqueio de acesso.
  * 📄 `InventoryPage.ts` — Ordenação de catálogo, manipulação de itens e estado do contador do carrinho.
  * 📄 `CheckoutPage.ts` — Preenchimento de formulário de entrega, auditoria de impostos (8%) e fechamento de pedido.
* 📁 **`cypress/e2e/`** *(Camada de Especificação de Testes)*
  * 🧪 `login.cy.ts` — Suíte automatizada de autenticação (`CT-01` a `CT-04`).
  * 🧪 `inventory.cy.ts` — Suíte automatizada de catálogo e carrinho (`CT-05` e `CT-06`).
  * 🧪 `checkout.cy.ts` — Suíte automatizada de fluxo de compra ponta a ponta (`CT-07` a `CT-09`).
* 📄 **`cypress.config.ts`** — Configurações globais de *viewport* (1920x1080), `baseUrl`, vídeos e *screenshots* automáticos.
* 📄 **`tsconfig.json`** — Configuração de tipagem estrita do TypeScript.

---

## 3. Cobertura de Testes Automatizados & Rastreabilidade

| ID | Suíte (`Spec`) | Cenário Automatizado | Ref. Caixa-Preta | Status CI/CD |
| :---: | :--- | :--- | :---: | :---: |
| **CT-01** | `login.cy.ts` | Login com sucesso utilizando credenciais válidas | `EP-L01` | ✅ **Passing** |
| **CT-02** | `login.cy.ts` | Bloqueio de acesso para usuário bloqueado (`locked_out_user`) | `EP-L02` | ✅ **Passing** |
| **CT-03** | `login.cy.ts` | Bloqueio de acesso com senha incorreta | `EP-L04` | ✅ **Passing** |
| **CT-04** | `login.cy.ts` | Validação de obrigatoriedade com campo *Username* vazio | `EP-L05` | ✅ **Passing** |
| **CT-05** | `inventory.cy.ts` | Ordenação de produtos no catálogo por preço (menor para maior) | Funcional | ✅ **Passing** |
| **CT-06** | `inventory.cy.ts` | Adição e remoção de item único atualizando o *badge* do carrinho | `BVA-02` | ✅ **Passing** |
| **CT-07** | `checkout.cy.ts` | Compra completa ponta a ponta com cálculo de impostos (Caminho Feliz) | `EP-C01` | ✅ **Passing** |
| **CT-08** | `checkout.cy.ts` | Bloqueio de avanço no Checkout ao omitir o *Postal Code* | `EP-C04` | ✅ **Passing** |
| **CT-09** | `checkout.cy.ts` | Impedimento de Checkout com carrinho vazio (`0` itens) | `BVA-01` | ⏸️ **Quarantined (`it.skip`)** |

> **Nota sobre Quarentena de Teste (`CT-09`):** O cenário `CT-09` encontra-se isolado com `it.skip` na esteira de CI/CD devido à anomalia conhecida em produção (`BUG-01`: botão de Checkout permanece ativo com `0` itens no carrinho), garantindo a estabilidade do *build* enquanto o defeito aguarda correção.

---

## 4. Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (v18 ou superior) e **NPM** instalados.

### Comandos de Execução

| Ordem | Comando no Terminal | Descrição da Ação |
| :---: | :--- | :--- |
| **01** | `npm install` | Instala todas as dependências do Cypress e TypeScript. |
| **02** | `npm run cy:open` | Abre a interface visual interativa do Cypress (*Test Runner*). |
| **03** | `npm test` | Executa toda a suíte em modo *Headless* no terminal e gera vídeos de evidência. |
| **04** | `npm run cy:run:chrome` | Executa a suíte em modo *Headless* utilizando o motor do Google Chrome. |

---

## 5. Tecnologias & Boas Práticas Aplicadas

* **Cypress (v13+)** com *Auto-Wait* nativo e gravação automática de artefatos de execução.
* **TypeScript** para segurança de tipos e inteligência de código (*IntelliSense*).
* **Page Object Model (POM)** para separação limpa entre lógica de interação e scripts de teste.
* **Seletores Resilientes** baseados exclusivamente em atributos de teste (`[data-test="..."]`).
* **GitHub Actions (CI/CD)** com execução automatizada em nuvem e *upload* de vídeos e *screenshots* como artefatos de *build*.