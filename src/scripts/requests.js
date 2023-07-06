import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333"

export async function register(userBody) {
    const request = await fetch(`${baseUrl}/users/create`,{
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userBody)
    }).then(async res => {
        const resJson = await res.json();
        
        if (res.ok) {
            toast('Usuário cadastrado com sucesso!', 'Você será redirecionado para a pagina de login.', 'green');

            //Limpando valor dos inputs
            let inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.value = '');
            
            return resJson;
        } else {
            throw new Error(resJson.message);
        }
    }).catch(err => {
        toast('Oops, verifique as infoemações e tente novamente.', err.message, 'red');
    })   
}

export async function login(userBody) {
    const request = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    }).then(async res => {
        const resJson = await res.json();

        if (res.ok) {
            const token = resJson.token;
            localStorage.setItem('@petInfo:token', token)
            toast('Usuário logado com sucesso!', 'Bem-vindo, você sera redirecionado imediatamente.', 'green', './src/assets/alarm-ico.png')
            return res;
        } else {
            throw new Error(resJson.message);
        }
    }).catch(err => {
        return err.message;
    })
    return request
}