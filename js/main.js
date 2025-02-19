//general scipts for page interactions (loading animations, global event listeners)

// Get the navbar element
const navbar = document.querySelector('.navbar');

// Listen for the scroll event
window.addEventListener('scroll', () => {
  // If the page is scrolled down, add the 'scrolled' class
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    // If at the top of the page, remove the 'scrolled' class
    navbar.classList.remove('scrolled');
  }
});
