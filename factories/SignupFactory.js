var faker = require("faker")
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {
         var firstName = faker.name.firstName()
         var lastName = faker.name.lastName()

          var  data = { 
            name: `${firstName} ${lastName}`,
            cpf : cpf.generate(),
            email : faker.internet.email(firstName),
            whatsaap : '13999999999',
            address: {
            postalcode : '11025-202',
             street: 'Rua Alexandre Martins',
             number: '111',
             details: 'Apto 11',
             district: 'Aparecida',
             city_state: 'Santos/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg' 
            }
            return data
    }
}