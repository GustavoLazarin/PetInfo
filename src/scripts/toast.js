export function toast(title, message, color, asset ='"../assets/alarm-ico.png"') {
    const body = document.body;

    if (color == 'green') {
        color = '#087d5a';
    } else if (color == 'red') {
        color = '#c83751'
    }

    body.insertAdjacentHTML('beforeend', `
    <section class="toast-container">
        <div class="toast__header">
            <img src=${asset}>
            <h2 class="toast__title" style="color: ${color}">${title}</h2>
        </div>
        <p class="toast__message">${message}</p>
        </section>
        `)
        
        //Verificando se existem mais que um toast na tela
        let toasts = document.querySelectorAll('.toast-container');
    
        if (toasts.length > 1) {
            toasts[0].remove();
        }
        
    const toast = document.querySelector('.toast-container');

    setTimeout(() => {
        toast.classList.add('toast--fade-out')
    }, 4000)

    setTimeout(() => {
        toast.classList.add('hidden')
    }, 5980)

    setTimeout(() => {
        toast.remove()
    }, 6000)

    
}