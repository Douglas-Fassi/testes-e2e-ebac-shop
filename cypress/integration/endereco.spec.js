/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereco.page'

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {

    beforeEach(() => {
        cy.visit('minha conta')
        cy.fixture('perfil').then(dados =>{
            cy.login(dados.usuario, dados.senha)
        })
       
    });

    it('Deve fazer cadastro de faturamento com sucesso', () => {
      EnderecoPage.editarEnderecoFaturamento('Doug', 'Fassi', 'House', 'Brasil', 'Rua Anônima', '007', 'Secreta', 'Acre', '00707-007', '90123-4567', 'semem@ilcom.com.br')
      cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
        
    });
});