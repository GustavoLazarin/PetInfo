import { renderPosts } from "./render.js";
import { createPost, deletePost, getAllPosts, updatePost } from "./requests.js";

export function renderModal(modalType, post) {
    const body = document.body;

    if (modalType == 'create') {
        postCreatorModal(body)
    } else if (modalType == 'read') {
        postReaderModal(body, post)
    } else if (modalType == 'edit') {
        postEditorModal(body, post)
    } else if (modalType == 'delete') {
        postDeleteModal(body, post)
    }
    
    const modal = document.querySelector('.modal__controller');

    modal.showModal();
    handleCloseModal()
}

function handleCloseModal() {
    const modal = document.querySelector('.modal__controller');
    const closeButtons = document.querySelectorAll('.modal__container .close-cancel__button');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.close();
            modal.remove();
        })
    })
}

const postCreatorModal = (body) => {
    body.insertAdjacentHTML('beforeend', 
    `<dialog class="modal__controller">
        <section class="modal__container">
            <div class="modal__header">
                <h2>Criando novo post</h2>
                <button class="close-cancel__button">X</button>
            </div>
            <div class="modal__content">
                <div class="modal__input-container">
                    <label>Título do post</label>
                    <input name="title" type="text" class="inp-value" placeholder="Digite o título aqui...">
                </div>
                <div class="modal__input-container">
                    <label for="">Conteúdo do post</label>
                    <textarea name="content" class="inp-value" cols="30" rows="6" placeholder="Desenvolva o conteúdo do post aqui..."></textarea>
                </div>
            </div>
            <div class="modal__buttons">
                <button class="close-cancel__button">Cancelar</button>
                <button class="confirm__button">Publicar</button>
            </div>
        </section>
    </dialog>`
    )
    const inputs = document.querySelectorAll('.inp-value');
    const publishButton = document.querySelector('.modal__container .confirm__button')
    const objPost = {};

    publishButton.addEventListener('click', () => {
        const modal = document.querySelector('.modal__controller');
        let count = 0;
        
        inputs.forEach(input => {
            objPost[input.name]=input.value;

            //Verificando se há campos vazios
            if (input.value == '') {
                count++;
            }
        })

        if (count != 0) {
            const modalContainer = document.querySelector('.modal__content');
            const emptyAlert = document.querySelector('#empty-alert')

            if (!emptyAlert) {
                modalContainer.insertAdjacentHTML('beforeend', '<p id="empty-alert" style="color: var(--alert100);">*É necessário preencher todos os campos para publicar!</p>');
            }

            count = 0;
        } else {
            // Chamando a função que cria o Post!
            createPost(objPost)
            modal.remove();
        }
        
        renderPosts(getAllPosts())
    })
}

function postReaderModal(body, post) {

    const {title, content, createdAt, user} = post[0];

    //Formatação da data
    const createdDate = new Date(createdAt).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
    const formatedDate = createdDate[0].toUpperCase() + createdDate.slice(1);

    body.insertAdjacentHTML('beforeend', `
        <dialog class="modal__controller">
            <section class="modal__container">
                <div class="modal__header">
                    <div class="post__info">
                        <div class="post__user-info">
                            <img src="${user.avatar}" alt="user-img">
                            <h3 class="post__user-name">${user.username}</h3>
                        </div>
                        <p class="user-info__divisor">|</p>
                        <p class="post__date">${formatedDate}</p>
                    </div>
                    <button class="close-cancel__button">X</button>
                </div>
                <div class="modal__content">
                    <h2 class="modal__content-title">${title}</h2>
                    <p class="modal__content-text">${content}</p>
                </div>
            </section>
        </dialog>
    `)
}

function postEditorModal(body, post) {

    const {id, title, content} = post[0]

    body.insertAdjacentHTML('beforeend', `
        <dialog class="modal__controller">
            <section class="modal__container">
                <div class="modal__header">
                    <h2>Edição</h2>
                    <button class="close-cancel__button">X</button>
                </div>
                <div class="modal__content">
                    <div class="modal__input-container">
                        <label>Título do post</label>
                        <input type="text" name="title" class="inp-value" placeholder="Digite o título aqui..." value="${title}">
                    </div>
                    <div class="modal__input-container">
                        <label for="">Conteúdo do post</label>
                        <textarea name="content" id="" class="inp-value" cols="30" rows="6" placeholder="Desenvolva o conteúdo do post aqui...">${content}</textarea>
                    </div>
                </div>
                <div class="modal__buttons">
                    <button class="close-cancel__button">Cancelar</button>
                    <button id="save-changes" class="confirm__button">Salvar Alterações</button>
                </div>
            </section>
        </dialog>
    `)

    const saveButton = document.querySelector('#save-changes');

    saveButton.addEventListener('click', async () => {
        const modal = document.querySelector('.modal__controller')

        const postBody = {}

        const inputs = document.querySelectorAll('.inp-value');
        inputs.forEach(input => postBody[input.name] = input.value);

        await updatePost(id, postBody);
        renderPosts()
        modal.close()
    })

    
}

function postDeleteModal(body, post) {
    const modal = document.createElement('dialog');
    const container = document.createElement('div');
    const header = document.createElement('div')
    const title = document.createElement('h2')
    const closeBtn = document.createElement('button')
    const contentBox = document.createElement('div')
    const contentTitle = document.createElement('h2')
    const contentText = document.createElement('p')
    const buttons = document.createElement('div')
    const cancelButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    closeBtn.innerText = 'X';
    title.innerText = 'Confirmação de exclusão';
    contentTitle.innerText = 'Tem certeza que deseja excluir este post?';
    contentText.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir';
    cancelButton.innerText = 'Cancelar';
    deleteButton.innerText = 'Sim, excluir este post';

    modal.className = 'modal__controller';
    container.className = 'modal__container';
    header.className = 'modal__header';
    closeBtn.className = 'close-cancel__button';
    contentBox.className = 'modal__content';
    contentTitle.className = 'modal__content-title';
    contentText.className = 'modal__content-text';
    buttons.className = 'modal__buttons';
    buttons.style = 'justify-content: flex-start;';
    cancelButton.classList.add('close-cancel__button');
    deleteButton.classList.add('alert__button');

    body.appendChild(modal);
    modal.appendChild(container);
    container.append(header, contentBox, buttons);
    header.append(title, closeBtn);
    contentBox.append(contentTitle, contentText);
    buttons.append(cancelButton, deleteButton);

    //Adicionando funcionalidade ao botão delete
    deleteButton.addEventListener('click', async () => {
        await deletePost(post[0].id)
        renderPosts()
        modal.close();
    })
}