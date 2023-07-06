import { register } from "./requests.js";
import { toast } from "./toast.js";

const handleSignUp = () => {
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
            setTimeout(() => {
                location.replace('../../')
            }, 6000)
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