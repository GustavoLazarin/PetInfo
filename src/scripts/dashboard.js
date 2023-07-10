import { renderModal } from "./modal.js";
import { renderPosts } from "./render.js";
import { getAllPosts, getUser } from "./requests.js";

const verifyToken = () => {
    const token = localStorage.getItem('@petInfo:token');
    
    if (!token) {
        location.replace('../../')
    }
}

const showUserProfile = () => {
    const user = JSON.parse(localStorage.getItem('@petInfo:user'));

    const profileImg = document.querySelector('.profile-img');
    const userName = document.querySelector('.logout__username');

    profileImg.src = user.avatar;
    userName.innerHTML = `@${user.username}`;
}

const handleHeader = () => {

    //Algoritimo para criar nova postagem
    const newPostButton = document.querySelector('header .confirm__button');
    
    newPostButton.addEventListener('click', () => {
        renderModal('create');
    })
    
    //Algoritimo para manipular o logout 
    const imgButton = document.querySelector('.profile-img');

    imgButton.addEventListener('click', () => {
        const logOutController = document.querySelector('.logout__container');
        const logOutButton = document.querySelector('.logout__button');
        logOutController.classList.toggle('hidden');

        logOutButton.addEventListener('click', () => {
            localStorage.clear();
            location.replace('../../')
        })

    })



}

verifyToken()

getUser()

showUserProfile()

handleHeader()

renderPosts(getAllPosts());
