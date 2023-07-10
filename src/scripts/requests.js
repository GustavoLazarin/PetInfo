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

export async function getUser() {
    const token = localStorage.getItem('@petInfo:token');
    const user = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async res => {
        const resJson = await res.json();

        if (res.ok) {
            localStorage.setItem('@petInfo:user', JSON.stringify(resJson));
        }
    })
}

export async function getAllPosts() {
    const token = localStorage.getItem('@petInfo:token');

    const request = await fetch(`${baseUrl}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async res => {
        if (res.ok) {
            const resJson = await res.json();
            return resJson;
        }
    })

    return request;
}

export async function createPost(postBody) {
    const token = localStorage.getItem('@petInfo:token');
    
    const post = await fetch(`${baseUrl}/posts/create`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    }).then(async res => {
        const resJson = await res.json();

        if(res.ok) {
            return resJson;
        }
        return resJson;
    })
}

export async function updatePost(postId, postBody) {
    const token = localStorage.getItem('@petInfo:token');
    
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    }).then(async res => {
        const resJson = await res.json();

        if(res.ok) {
            return resJson;
        }
    })
}

export async function deletePost(postId) {

    const token = localStorage.getItem('@petInfo:token')

    const request = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async res => {
        const resJson = await res.json();

        if (res.ok) {
            toast(resJson.message, 'O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed', 'green')
            return resJson
        }
    })
}