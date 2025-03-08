//general scipts for page interactions (loading animations, global event listeners)


fetch('http://localhost:5000/api/products')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Render products on the frontend
  })
  .catch(error => console.error('Error fetching products:', error));

// Get the navbar element
const navbar = document.querySelector(".navbar");

// Listen for the scroll event
window.addEventListener("scroll", () => {
  // If the page is scrolled down, add the 'scrolled' class
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    // If at the top of the page, remove the 'scrolled' class
    navbar.classList.remove("scrolled");
  }
});

//Toggle menu

document.addEventListener("DOMContentLoaded", function () {
  var login = document.getElementById("login");
  var register = document.getElementById("register");
  var indicator = document.getElementById("indicator");
  var loginBtn = document.querySelector(".form-btn span:nth-child(1)");
  var registerBtn = document.querySelector(".form-btn span:nth-child(2)");

  function register_() {
    register.style.transform = "translateX(0px)";
    login.style.transform = "translateX(0px)";
    indicator.style.transform = "translateX(100px)";
    console.log("Switched to Register");
  }

  function login_() {
    register.style.transform = "translateX(300px)";
    login.style.transform = "translateX(300px)";
    indicator.style.transform = "translateX(0px)";
    console.log("Switched to Login");
  }

  // Attach event listeners
  if (loginBtn && registerBtn) {
    loginBtn.addEventListener("click", login_);
    registerBtn.addEventListener("click", register_);
  } else {
    console.error("Login or Register button not found.");
  }
});

