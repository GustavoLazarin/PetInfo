export function createModal(modalType) {
    const body = document.body;

    if (modalType == 'create') {
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
            inputs.forEach(input => objPost[input.name]=input.value)
            
            // Chamando a função que cria o Post!
            createPost(objPost);
        })
    }
    const modal = document.querySelector('.modal__controller');

    modal.showModal();
    handleCloseModal()
}

function handleCloseModal() {
    const modal = document.querySelector('.modal__controller');
    const closeButtons = document.querySelectorAll('.modal__container .close-cancel__button');
    const inputs = document.querySelectorAll('.inp-value');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            inputs.forEach(input => input.value = '');
            modal.close();
        })
    })
}