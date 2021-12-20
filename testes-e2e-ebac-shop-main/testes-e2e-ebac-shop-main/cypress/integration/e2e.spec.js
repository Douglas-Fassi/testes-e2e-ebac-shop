/// <reference types="cypress" />

import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando os produtos ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    let dadosLogin

    context('Funcionalidade Login', () => {
        before(() => {
            cy.fixture('perfil').then(perfil => {
                dadosLogin = perfil
            })
        });

        beforeEach(() => {
            cy.visit('minha-conta')
        });

        afterEach(() => {
            cy.screenshot()
        });

        it('Login com sucesso usando Comando customizado', () => {
            cy.login(dadosLogin.usuario, dadosLogin.senha)
            cy.get('.page-title').should('contain', 'Minha conta')
        });

        it('Login usando fixture', () => {
            cy.fixture('perfil').then((dados) => {
                cy.login(dados.usuario, dados.senha)
            })
            cy.get('.page-title').should('contain', 'Minha conta')
        });

        it('Deve fazer login com sucesso - sem otimização', () => {
            cy.get('#username').type(dadosLogin.usuario)
            cy.get('#password').type(dadosLogin.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
        })
    })

    describe('Funcionalidade Endereços - Faturamento e Entrega', () => {

        beforeEach(() => {
            cy.visit('minha conta')
            cy.fixture('perfil').then(dados => {
                cy.login(dados.usuario, dados.senha)
            })

        });

        it('Deve fazer cadastro de faturamento com sucesso', () => {
            EnderecoPage.editarEnderecoFaturamento('Doug', 'Fassi', 'House', 'Brasil', 'Rua Anônima', '007', 'Secreta', 'Acre', '00707-007', '90123-4567', 'semem@ilcom.com.br')
            cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        });

        it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de Dados', () => {
            EnderecoPage.editarEnderecoFaturamento(
                dadosEndereco[3].nome,
                dadosEndereco[3].sobrenome,
                dadosEndereco[3].empresa,
                dadosEndereco[3].pais,
                dadosEndereco[3].endereco,
                dadosEndereco[3].numero,
                dadosEndereco[3].cidade,
                dadosEndereco[3].estado,
                dadosEndereco[3].cep,
                dadosEndereco[3].telefone,
                dadosEndereco[3].emai
            )

            cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        });


    });

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('[class="product-block grid"]')
            .eq(7)
            .click()
    });

    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 4

        cy.get('[class="product-block grid"]')
            .contains('Ariel Roll Sleeve Sweatshirt').click()
        cy.get('.button-variable-item-L').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')

    });

    it('Deve adicionar produtos ao carrinho - Usando Comando Customizado', () => {
        //(produto, tamanho, cor, quantidade)
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt', 'L', 'Red', 4)

        cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('.showlogin').click()

        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-button').click()

        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
        cy.get('#place_order').click({ force: true })

        cy.get('.woocommerce-notice').should('contain', 'pedido foi recebido.')


    });




})