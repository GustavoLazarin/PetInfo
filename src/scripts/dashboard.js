import { createModal } from "./modal.js";
import { getUser } from "./requests.js";

const verifyToken = () => {
    const token = localStorage.getItem('@petInfo:token');
    
    if (!token) {
        location.replace('../../')
    }
}

const handleHeader = () => {
    const newPostButton = document.querySelector('header .confirm__button');
    const imgButton = document.querySelector('.profile-img');

    newPostButton.addEventListener('click', () => {
        createModal('create');
    })
    
    imgButton.addEventListener('click', () => {
        const logOutController = document.querySelector('.logout__container');
        logOutController.classList.toggle('hidden')
    })


}

// const handleNewPost = () => {

// }
verifyToken()

getUser()

handleHeader()
