const searchButton = document.getElementById('searchButton');
const closeSearch = document.getElementById('closeSearch');
const navbar = document.getElementById('navbar');
const searchBar = document.getElementById('searchBar');

searchButton.addEventListener('click', () => {
    navbar.classList.add('search-active');
    searchBar.querySelector('input').focus();
});

closeSearch.addEventListener('click', () => {
    navbar.classList.remove('search-active');
});
