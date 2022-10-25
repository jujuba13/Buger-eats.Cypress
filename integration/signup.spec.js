/// /*<reference types="cypress" />

import {SignupPage} from '../pages/SignupPage'
import {sinup} from '../fixtures/deliver.json'

import SignupFactory from '../factories/SignupFactory'

describe('Signup', function(){

 /*beforeEach( function() {
     
    cy.readFile('C:/Users/JAON/OneDrive - GFT Technologies SE/workspace/QaNinja/cypress-discovery/buger-eats/cypress/fixtures/deliver.json')

    cy.fixture('deliver').then((d)=> {
     this.deliver = d
    })   
 })*/
    
    it('User should be deliver', function(){

        var deliver = SignupFactory.deliver()
        
        var signup = new SignupPage()
        signup.go()
        cy.wait(3000)
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
       
    }) 

    it('Incorrect document', function(){
        
        var deliver = SignupFactory.deliver()
        deliver.cpf = '99998888899bbb'

       cy.wait(3000)

        var signup = new SignupPage()
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        cy.get('.alert-error').should('have.text',"Oops! CPF inválido")
        
    })

    it('Incorrect email', function(){
        
        var deliver = SignupFactory.deliver()
       deliver.email = 'juliana.franca.com.br'

        cy.wait(3000)
 
         var signup = new SignupPage()
         signup.go()
         signup.fillForm(deliver)
         signup.submit()
         cy.get('.alert-error').should('have.text',"Oops! Email com formato inválido.")
     
     })
 
     context('Required fields', function()  {
        
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o e-mail'},
            {field:'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}

        ]
     })

        before(function() {
        var signup = new SignupPage()
        signup.go()
        signup.submit()
         })
        /* messages.forEach(function(msg){
            it(`${msg.field} is required`, function()  {
                signup.alertShouldBe(msg.output)
            })
         })*/
    it('Requires fields', function(){
        var signup = new SignupPage()
        signup.go()
        signup.submit()

        cy.wait(15000)

        cy.get('#page-deliver > form > fieldset:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span')
        .should( 'have.exist', 'É necessário informar o nome')
        cy.get('#page-deliver > form > fieldset:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span')
        .should('have.text', 'É necessário informar o CPF')
        cy.get('#page-deliver > form > fieldset:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span')
        .should('have.text', 'É necessário informar o email')
        cy.get('#page-deliver > form > fieldset:nth-child(3) > div:nth-child(2) > div:nth-child(1) > span')
        .should('have.text', 'É necessário informar o CEP')
        cy.get('#page-deliver > form > fieldset:nth-child(3) > div:nth-child(4) > div:nth-child(1) > span')
        .should('have.text', 'É necessário informar o número do endereço')
        cy.get('#page-deliver > form > fieldset:nth-child(4) > span')
        .should('have.text', 'Selecione o método de entrega')
        cy.get('#page-deliver > form > span.alert-error')
        .should('have.text', 'Adicione uma foto da sua CNH') 
    })
    })
