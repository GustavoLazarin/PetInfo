import { renderModal } from "./modal.js";
import { getAllPosts } from "./requests.js";

export async function renderPosts() {
    const postsArray = await getAllPosts();

    console.log(`Renderizando ${postsArray.length} posts!`)
    
    const loggedUser =  JSON.parse(localStorage.getItem('@petInfo:user'));

    const feed = document.querySelector('.feed__posts-list'); 
    feed.innerHTML = '';   

    postsArray.forEach(post => {
        const {id, title, content, createdAt, user: {username, avatar}} = post;
        const postOwner = post.user.id;

        //Formatação da data
        const createdDate = new Date(createdAt).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
        const formatedDate = createdDate[0].toUpperCase() + createdDate.slice(1);

        //Limitando o conteúdo do post para no maximo 145caracteres.
        let previewContent = content;

        if (content.length > 145) {
            previewContent = content.slice(0, 145) + '...';
        }
        //Renderizando o Post em tela
        feed.insertAdjacentHTML('afterbegin', 
        `<li class="feed__post" data-post-id="${id}">
            <div class="post__header">
                <div class="post__info">
                    <div class="post__user-info">
                        <img src="${avatar}" alt="user-img">
                        <h3 class="post__user-name" data-id="${postOwner}">${username}</h3>
                    </div>
                    <p class="user-info__divisor">|</p>
                    <p class="post__date">${formatedDate}</p>
                </div>
            </div>
            <div class="post__content">
                <h2 class="post__title">${title}</h2>
                <p>${previewContent}</p>
                <button class="show-more">Acessar publicação</button>
            </div>
         </li>`)

         //Verificando se o usuário logado é proprietario do Post
         if (postOwner == loggedUser.id) {

            const postHeader = document.querySelector('.post__header');

            postHeader.insertAdjacentHTML('beforeend', 
            `<div class="post__edit">
                <button class="redirect-edit__button">Editar</button>
                <button class="close-cancel__button">Excluir</button>
            </div>`)     
            
        }
        
        //Adicionando função aos botões
        const showMoreButton = document.querySelector('.show-more');
        const editButton = document.querySelector('.redirect-edit__button');
        const deleteButton = document.querySelector('.close-cancel__button');

        showMoreButton.addEventListener('click', async () => {
            renderModal('read', await getPostById(id)); //Chamando função que rendezira o modal para ver o post.
        });

        if (editButton) {
            editButton.addEventListener('click', async () => {
                renderModal('edit', await getPostById(id));
            })
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', async () => {
                renderModal('delete', await getPostById(id));
            })
        }
    })
}

async function getPostById(id) {
    const posts = await getAllPosts();
    
    const myPost = posts.filter(post => post.id == id);
    return myPost;
}