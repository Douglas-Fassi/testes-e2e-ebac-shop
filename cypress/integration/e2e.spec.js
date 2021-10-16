/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

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
        cy.get('.button-variable-item-S').click()
        cy.get('.button-variable-item-Purple').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.')

    });

    it('Deve adicionar produtos ao carrinha - Usando Comando Customizado', () => {
        //(produto, tamanho, cor, quantidade)
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt', 'S', 'Red', 4)
        
        cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')
    });

    it('Deve adicionar produtos ao carrinha - Usando Comando Customizado', () => {
        //(produto, tamanho, cor, quantidade)
        cy.addProdutos('Aether Gym Pant', '36', 'Blue', 1)

        cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.')

    });


})