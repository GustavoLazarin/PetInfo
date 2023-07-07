import { getUser, login } from "./requests.js";
import { toast } from "./toast.js";

const handleLogin = () => {
    /* 
    1- Capturar os inputs - OK
    2- Capturar o botão de login - OK
    3- Criar um obj User - OK
    4- Adicionar um evento de click no botao - OK
        4.1- Fazer um loop, que: - OK
        a- A cada input, resgata o value, e incrementa no obj user - OK

    ** SE todos os campos estão preenchidos: envia o obj User como parametro da funcão de login
    ** SENAO: toast solicitando para preencher os dados

    
    6- Envia ao usuario um toast informando a condição    
    */

    const inputs = document.querySelectorAll('input');
    const button = document.querySelector('.confirm__button');
    const userBody = {}
    let count = 0;

    button.addEventListener('click', async (e) => {
        e.preventDefault();

        inputs.forEach(input => {
            userBody[input.id] = input.value;

            if (input.value.trim() == '') {
                count ++
            }   
        });
        
        if (count != 0) { //Verificando se todos campos estão preenchidos
            toast('Dados incompletos', 'Por favor, preencha todos os campos e tente novamente!', 'red', './src/assets/alarm-ico.png');
            count = 0;
        } else {
            const loginRequest = await login(userBody);

            if (loginRequest.ok) { //Sucesso! Redirecionamento :D
                getUser()
                setTimeout(() => {
                    location.replace('./src/pages/dashboard.html')
                }, 6000)
            } else {  //Lógica para feedback visual em caso de informações incorretas
                const inputContainers = document.querySelectorAll('.input-container');
                const missAlert = document.querySelector('.miss-alert');

                if (missAlert) {
                    missAlert.remove();
                }
    
                if (loginRequest.includes('email')) {
                    console.log(inputContainers)
                    inputContainers[0].insertAdjacentHTML('beforeend', `<p class="miss-alert">O email está incorreto</p>`)    
                } else if (loginRequest.includes('senha')) {
                    inputContainers[1].insertAdjacentHTML('beforeend', `<p class="miss-alert">A senha está incorreta</p>`)
                }
            }
        }
    })
}

const handleSignUp = () => {
    const button = document.querySelector('.redirect-edit__button');

    button.addEventListener('click', (e) => {
        e.preventDefault();
        location.replace('./src/pages/signup.html')
    })
}

handleLogin()
handleSignUp()