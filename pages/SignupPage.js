
export class SignupPage {

    go(){
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats-qa.vercel.app/')

        cy.get('a[href= "/deliver"]').click()

        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        cy.get('div[class="field"]  [placeholder="Nome completo"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.wait(4000)
        cy.get('div[class="field"]  [name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsaap)
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept="image/*"]').attachFile('/images/' + deliver.cnh)
    }

    submit(){
        cy.get('button[type= "submit"]').click()

    }

    modalContentShouldBe(expectedMessage) {
        //cy.wait(10000)
        cy.get('div #swal2-html-container').should('have.text', expectedMessage)

    }
    alertShouldBe(expectedMessage){
        cy.contains('.alert-error').should('be.visible', expectedMessage)
    }
    
}

export default SignupPage