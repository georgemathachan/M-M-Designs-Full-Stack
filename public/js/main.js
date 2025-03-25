// General scripts for page interactions (loading animations, global event listeners)


// Fetch products from the backend
fetch('http://localhost:5000/api/products')
  .then(response => response.json())
  .then(data => {
    console.log("Fetched products:", data);
    // Store the fetched products in a global variable
    window.products = data;
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

// Toggle menu
document.addEventListener("DOMContentLoaded", function () {
  const login = document.getElementById("login");
  const register = document.getElementById("register");
  const indicator = document.getElementById("indicator");
  const loginBtn = document.querySelector(".form-btn span:nth-child(1)");
  const registerBtn = document.querySelector(".form-btn span:nth-child(2)");

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

// Dynamically load content
const data = {
  home: {
    hero_image: "../public/Assets/hero-image.jpeg",
    women_cat_image: "../public/Assets/Images/mens-clothing.jpg",
    men_cat_image: "../public/Assets/Images/kids-clothing.jpg",
    slide1_image: "../public/Assets/Images/slide-1.jpg",
    slide2_image: "../public/Assets/Images/slide-2.jpg",
    slide3_image: "../public/Assets/Images/slide-3.jpg",
    slide4_image: "../public/Assets/Images/slide-4.jpg",
    slide5_image: "../public/Assets/Images/slide-5.jpg",
    slide6_image: "../public/Assets/Images/slide-6.jpg",
    slide7_image: "../public/Assets/Images/slide-7.jpg",
    slide8_image: "../public/Assets/Images/slide-8.jpg",
    luxe_image: "../public/Assets/Images/luxe-image.jpg",
    everyday_image: "../public/Assets/Images/everyday-image.jpg",
  },
  productpage: {},
  cart: {},
  checkout: {},
  account: {},
  collections: {},
  productdetailpage: {},
};

// Function to load content dynamically
function loadContent(page) {
  const content = document.getElementById("content");
  let html = "";

  switch (page) {
    case "home":
      html = `
        <section class="hero">
          <img src="${data.home.hero_image}" alt="Hero Image" />
          <h1>QUALITY <br />SOUTH INDIAN <br />CLOTHING</h1>
          <p>Discover premium products designed just for you.</p>
          <div class="buttons">
            <button class="button-dark">
              <a href="#collections">VIEW COLLECTIONS</a>
            </button>
            <button class="button-light">
              <a href="#productpage">SHOP ALL</a>
            </button>
          </div>
        </section>
        <section class="navbar-spacer"></section>
        <section class="content-break">
          <h1>DISCOVER</h1>
          <p>LUXURY, AFFORDABLE, SOUTH INDIAN CLOTHING</p>
        </section>
        <section class="navbar-spacer"></section>
        <section class="categories">
          <div class="category luxe">
            <a href="#productpage">
              <img src="${data.home.women_cat_image}" alt="Women's Clothing" />
            </a>
            <a href="#productpage">
              <button class="button-light">SHOP WOMEN</button>
            </a>
            <p>Discover elegant and modern styles for every occasion.</p>
          </div>
          <div class="category everyday">
            <a href="#productpage">
              <img src="${data.home.men_cat_image}" alt="Men's Clothing" />
            </a>
            <a href="#productpage">
              <button class="button-light">SHOP MEN</button>
            </a>
            <p>Shop for classic and contemporary fashion for men.</p>
          </div>
        </section>
        <section class="navbar-spacer"></section>
        <section class="content-break">
          <h1>SHOP</h1>
          <p>EXPLORE A STUNNING VARIETY OF FABRICS, PATTERNS, AND TEXTURES - CRAFTED FOR EVERY STYLE AND OCCASION</p>
        </section>
        <section class="navbar-spacer"></section>
        <section class="slideshow-container">
          ${window.products
            ? window.products
                .map(
                  (product) => `
                <div class="slide fade">
                  <div class="image-container">
                    <img src="${product.image}" alt="${product.name}" />
                  </div>
                  <div class="product-info">
                    <p class="product-title">${product.name}</p>
                    <p class="product-price">£${product.price.toFixed(2)}</p>
                  </div>
                </div>
              `
                )
                .join("")
            : "<p>Loading products...</p>"}
        </section>
        <section class="navbar-spacer"></section>
        <div class="categories">
          <div class="category luxe">
            <a href="#productpage">
              <img src="${data.home.luxe_image}" alt="Luxe Collection" />
            </a>
            <h2>LUXE</h2>
            <p>Indulge in timeless elegance with our premium collection of high-end fashion, crafted from the finest materials for a sophisticated look.</p>
            <a href="#productpage">
              <button class="button-light">EXPLORE LUXURY</button>
            </a>
          </div>
          <div class="category everyday">
            <a href="#productpage">
              <img src="${data.home.everyday_image}" alt="Everyday Collection" />
            </a>
            <h2>EVERYDAY</h2>
            <p>Discover affordable style that never compromises on quality. Trendy, comfortable, and budget-friendly essentials for your daily wardrobe.</p>
            <a href="#productpage">
              <button class="button-light">SHOP EVERYDAY WEAR</button>
            </a>
          </div>
        </div>
      `;
      break;

    case "collections":
      html = `
      <div class="container">
      <div class="row">
        <div class="col-2">
          <img src="../Assets/Images/product-image-placeholder.jpg" alt="" />
        </div>
        <div class="col-2">
          <h1>ONAM Collection</h1>
          <p>
            Our Onam collection features finely woven cotton and silk garments
            with signature kasavu borders. Handloom-crafted for elegance and
            durability, each piece blends heritage craftsmanship with modern
            design. Experience timeless festive wear with impeccable drape and
            luxurious comfort.
          </p>
          <button class="button-light">VIEW COLLECTION</button>
        </div>
      </div>
    </div>
    <section class="product-row">
        <div class="product-card">
            <a href="./ProductDetailPage.html" class="product-link">
                <div class="product-image">
                    <img src="../Assets/Images/product-image-placeholder.jpg" />
                    <div class="product-label">AVAILABLE NOW</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">Product Name</h3>
                    <p class="product-price">£XX.XX</p>
                </div>
            </a>
        </div>
        <div class="product-card">
            <a href="./ProductDetailPage.html" class="product-link">
                <div class="product-image">
                    <img src="../Assets/Images/product-image-placeholder.jpg" />
                    <div class="product-label">AVAILABLE NOW</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">Product Name</h3>
                    <p class="product-price">£XX.XX</p>
                </div>
            </a>
        </div>
        <div class="product-card">
            <a href="./ProductDetailPage.html" class="product-link">
                <div class="product-image">
                    <img src="../Assets/Images/product-image-placeholder.jpg" />
                    <div class="product-label">AVAILABLE NOW</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">Product Name</h3>
                    <p class="product-price">£XX.XX</p>
                </div>
            </a>
        </div>
    </section>

    <div class="container">
        <div class="row">
          
          <div class="col-2">
            <h1>ONAM Collection</h1>
            <p>
              Our Onam collection features finely woven cotton and silk garments
              with signature kasavu borders. Handloom-crafted for elegance and
              durability, each piece blends heritage craftsmanship with modern
              design. Experience timeless festive wear with impeccable drape and
              luxurious comfort.
            </p>
            <button class="button-light">VIEW COLLECTION</button>
          </div>
          <div class="col-2">
            <img src="../Assets/Images/product-image-placeholder.jpg" alt="" />
          </div>
        </div>
      </div>
      <section class="product-row">
          <div class="product-card">
              <a href="./ProductDetailPage.html" class="product-link">
                  <div class="product-image">
                      <img src="../Assets/Images/product-image-placeholder.jpg" />
                      <div class="product-label">AVAILABLE NOW</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">Product Name</h3>
                      <p class="product-price">£XX.XX</p>
                  </div>
              </a>
          </div>
          <div class="product-card">
              <a href="./ProductDetailPage.html" class="product-link">
                  <div class="product-image">
                      <img src="../Assets/Images/product-image-placeholder.jpg" />
                      <div class="product-label">AVAILABLE NOW</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">Product Name</h3>
                      <p class="product-price">£XX.XX</p>
                  </div>
              </a>
          </div>
          <div class="product-card">
              <a href="./ProductDetailPage.html" class="product-link">
                  <div class="product-image">
                      <img src="../Assets/Images/product-image-placeholder.jpg" />
                      <div class="product-label">AVAILABLE NOW</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">Product Name</h3>
                      <p class="product-price">£XX.XX</p>
                  </div>
              </a>
          </div>
      </section>
      <div class="container">
        <div class="row">
          <div class="col-2">
            <img src="../Assets/Images/product-image-placeholder.jpg" alt="" />
          </div>
          <div class="col-2">
            <h1>ONAM Collection</h1>
            <p>
              Our Onam collection features finely woven cotton and silk garments
              with signature kasavu borders. Handloom-crafted for elegance and
              durability, each piece blends heritage craftsmanship with modern
              design. Experience timeless festive wear with impeccable drape and
              luxurious comfort.
            </p>
            <button class="button-light">VIEW COLLECTION</button>
          </div>
        </div>
      </div>
      <section class="product-row">
          <div class="product-card">
              <a href="./ProductDetailPage.html" class="product-link">
                  <div class="product-image">
                      <img src="../Assets/Images/product-image-placeholder.jpg" />
                      <div class="product-label">AVAILABLE NOW</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">Product Name</h3>
                      <p class="product-price">£XX.XX</p>
                  </div>
              </a>
          </div>
          <div class="product-card">
              <a href="./ProductDetailPage.html" class="product-link">
                  <div class="product-image">
                      <img src="../Assets/Images/product-image-placeholder.jpg" />
                      <div class="product-label">AVAILABLE NOW</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">Product Name</h3>
                      <p class="product-price">£XX.XX</p>
                  </div>
              </a>
          </div>
          <div class="product-card">
              <a href="./ProductDetailPage.html" class="product-link">
                  <div class="product-image">
                      <img src="../Assets/Images/product-image-placeholder.jpg" />
                      <div class="product-label">AVAILABLE NOW</div>
                  </div>
                  <div class="product-info">
                      <h3 class="product-title">Product Name</h3>
                      <p class="product-price">£XX.XX</p>
                  </div>
              </a>
          </div>
      </section>
      `;
      break;
    default:
      html = `
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
      `;
  }

  content.innerHTML = html;
}

// Event listener for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.getAttribute("href").substring(1);
    loadContent(page);
  });
});

// Load home page by default
window.onload = () => {
  loadContent("home");
};

// Function to handle navigation clicks
function handleNavigation(e) {
  e.preventDefault();
  const page = this.getAttribute("href").substring(1);
  if (page) {
    loadContent(page);
    history.pushState({ page }, "", `#${page}`); // Update URL without reload
  }
}

// Attach event listener to all links with hash-based navigation
document.addEventListener("click", (e) => {
  const target = e.target.closest("a[href^='#']");
  if (target) {
    handleNavigation.call(target, e);
  }
});

// Handle back/forward navigation using browser buttons
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.page) {
    loadContent(e.state.page);
  }
});

// Load home page by default on first load
window.onload = () => {
  const initialPage = window.location.hash.substring(1) || "home";
  loadContent(initialPage);
};
