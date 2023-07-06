import { register } from "./requests.js";
import { toast } from "./toast.js";

const handleSignUp = () => {
    /*
    1- Capturar todos os inputs - OK
    2- Capturar o botao de submit - OK
    3- Criar um obj user vazio - OK
    4- Percorrer todos inputs, e resgatar o value - OK
        4.1- Para cada value, adicionar uma nova chave ao obj - OK
    5- Adicionar um evento de clique no botao - OK
        5.1- Prevenir default - OK
        5.2- Chamar a request signup, enviando o obj user como parametro - OK
    6- Informar o usuário se o cadastro foi bem sucedido ou nao      <-        <-        --> ADICIONAR TOAST !!! <--
    */

    const inputs = document.querySelectorAll('.register__form input');
    const submitButton = document.querySelector('.confirm__button');
    const userBody = {};
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let count = 0;
        
        inputs.forEach(input => {
            userBody[input.id] = input.value.trim(); //.trim remove os espaços do inicio e fim do input (caso hajam)
    
            if (input.value.trim() == "") { //Verificando se existem espaços vazios
                count++
            }
        })
        if (count != 0) {
            toast('Dados incompletos', 'Por favor, preencha todos os campos e tente novamente!', 'red')
            count = 0;
        } else {
            register(userBody);
        }
    })
}

const handleBackToLogin = () => {
    const backButtons = document.querySelectorAll('.redirect-edit__button');
    
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            location.replace('../../')
        })
    })
}

handleSignUp()

handleBackToLogin()