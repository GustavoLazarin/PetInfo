const baseUrl = "http://localhost:3333"

// USUARIO DE TESTE -> DELETAR
// const user = {
//     username: "Lazarin2",
//     email: "lazaringustavo11@mail.com",
//     password: "123456",
//     avatar: "https://unsplash.com/s/photos/human"
// }

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
            console.log('Usuário cadastrado com sucesso!') //AJUSTAR CONSOLE PARA TOAST!
            return resJson;
        } else {
            throw new Error(resJson.message);
        }
    }).catch(err => {
        console.log(err.message) //AJUSTAR CONSOLE PARA TOAST!
    })
}