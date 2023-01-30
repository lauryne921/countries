const body = document.querySelector('body'); 
const toggle = document.querySelector('.toggle-mode'); 
const emoji = document.querySelector('.emoji'); 
const mode = document.querySelector('.mode'); 
const header = document.querySelector('header'); 
const select = document.querySelector('select'); 
const searchBar = document.getElementById('search-bar'); 

toggle.addEventListener('click', () => { 
    toggleElement(body); 
    if (emoji.innerHTML === '🌘') {
        emoji.innerHTML = '🌖'; 
        localStorage.setItem('darkMode', true);
    } else {
        emoji.innerHTML = '🌘'; 
        localStorage.setItem('darkMode', false);
    }
    toggleElement(header);
    toggleElement(select); 
    toggleElement(searchBar); 
    document.querySelectorAll('.card').forEach(card => {
        toggleElement(card); 
    }); 
});


function toggleElement(e) {
    e.classList.toggle('active'); 
}
