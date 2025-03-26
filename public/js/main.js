// General scripts for page interactions (loading animations, global event listeners)

// Fetch products from the backend
fetch("http://localhost:5000/data/products.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched products:", data);
    // Store the fetched products in a global variable
    window.products = data;
    loadContent("home");
  })
  .catch((error) => console.error("Error fetching products:", error));

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

// Select all description toggle buttons
const descriptionToggles = document.querySelectorAll(".description-toggle");

descriptionToggles.forEach(button => {
    button.addEventListener("click", function () {
        const content = this.nextElementSibling; // Get the next element (description-content)
        const icon = this.querySelector(".plus-icon"); // Get the + icon

        // Toggle visibility
        if (content.style.display === "block") {
            content.style.display = "none";
            icon.textContent = "+"; // Change back to plus icon
        } else {
            content.style.display = "block";
            icon.textContent = "−"; // Change to minus icon when open
        }
    });
});


// Dynamically load content
const data = {
  home: {
    hero_image: "../Assets/Images/hero-image.jpeg",
    women_cat_image: "../Assets/Images/women-clothing.jpg",
    men_cat_image: "../Assets/Images/mens-clothing.jpg",
    slide1_image: "../Assets/Images/slide-1.jpeg",
    slide2_image: "../Assets/Images/slide-2.jpeg",
    slide3_image: "../Assets/Images/slide-3.jpeg",
    slide4_image: "../Assets/Images/slide-4.jpeg",
    slide5_image: "../Assets/Images/slide-5.jpeg",
    slide6_image: "../Assets/Images/slide-6.jpeg",
    slide7_image: "../Assets/Images/slide-7.jpeg",
    slide8_image: "../Assets/Images/slide-8.jpeg",
    luxe_image: "../Assets/Images/luxe-image.jpg",
    everyday_image: "../Assets/Images/everyday-image.jpg",
  },
  productpage: {},
  cart: {},
  checkout: {},
  account: {},
  collections: {},
  productdetailpage: {},
};

// Function to load content dynamically
function loadContent(page, category = "all") {
  const content = document.getElementById("content");
  let html = "";

  function loadProducts() {
    const content = document.querySelector("#content");
    const titleElement = document.querySelector("#productpage-title");
    if (!content || !window.products) return; // Exit if not on the product page or products not loaded

    // Get category from URL parameters (default to "all")
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("category") || "all";

    // Filter products by category
    const filteredProducts =
      category === "all"
        ? window.products
        : window.products.filter(
            (product) =>
              product.category.toLowerCase() === category.toLowerCase()
          );

    // Clear existing content
    content.innerHTML = "";

    // If no products found
    if (filteredProducts.length === 0) {
      content.innerHTML = `<p>No products found in this category.</p>`;
      return;
    }

    let productRow = document.createElement("section");
    productRow.classList.add("product-row");
    content.appendChild(productRow);

    filteredProducts.forEach((product, index) => {
      // Create product card
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <a href="#productdetailpage?id=${product.id}" class="product-link">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-label">AVAILABLE NOW</div>
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">£${product.price.toFixed(2)}</p>
          </div>
        </a>
      `;

      productRow.appendChild(productCard);

      // Create a new row after every 3rd product
      if ((index + 1) % 3 === 0 && index !== filteredProducts.length - 1) {
        productRow = document.createElement("section");
        productRow.classList.add("product-row");
        content.appendChild(productRow);
      }
    });
  }

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
            <a href="#productpage?category=women">
              <img src="${data.home.women_cat_image}" alt="Women's Clothing" />
            </a>
            <a href="#productpage?category=women">
              <button class="button-light">SHOP WOMEN</button>
            </a>
            <p>Discover elegant and modern styles for every occasion.</p>
          </div>
          <div class="category everyday">
            <a href="#productpage?category=men">
              <img src="${data.home.men_cat_image}" alt="Men's Clothing" />
            </a>
            <a href="#productpage?category=men">
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
          <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide1_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide2_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide3_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide4_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide5_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide6_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide7_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
      <div class="slide fade">
        <div class="image-container">
          <img src="${data.home.slide8_image}" alt="" />
        </div>
        <div class="product-info">
          <p class="product-title">Product Title</p>
          <p class="product-price">£XX.XX</p>
        </div>
      </div>
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
      <section class="navbar-spacer"></section>
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
    case "productpage":
      html = `
      <section class="navbar-spacer"></section>
          <h2 id="productpage-title">Shop ${
            category ? category.toUpperCase() : "ALL"
          }</h2>
          <section class="product-row"></section>
        `;
      break;

    case "cart":
      html = `
      <section class="navbar-spacer"></section>
          <div class="small-container cart-page">
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        <tr>
          <td>
            <div class="cart-info">
              <img
                src="../Assets/Images/product-image-placeholder.jpg"
                alt="Product"
              />
              <div>
                <p>Product Name</p>
                <small>Price: £XX.XX</small>
                <a href="">Remove</a>
              </div>
            </div>
          </td>

          <td><input type="number" value="1" /></td>
          <td>£XX.XX</td>
        </tr>
      </table>
      <div class="total-price">
        <table>
            <tr>
                <td>Subtotal</td>
                <td>£XX.XX</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td>£XX.XX</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>£XX.XX</td>
            </tr>
    
        </table>
      </div>
    </div>
      `;
      break;
    case "productdetailpage":
      html = `
      <section class="navbar-spacer"></section>
      <section class="product-container">
      <div class="product-gallery">
        <img
          class="main-image"
          src="../Assets/Images/product-image-placeholder.jpg"
        />
        <div class="thumbnail-row">
          <img
            class="thumbnail"
            src="../Assets/Images/product-image-placeholder.jpg"
          />
          <img
            class="thumbnail"
            src="../Assets/Images/product-image-placeholder.jpg"
          />
          <img
            class="thumbnail"
            src="../Assets/Images/product-image-placeholder.jpg"
          />
          <img
            class="thumbnail"
            src="../Assets/Images/product-image-placeholder.jpg"
          />
        </div>
      </div>
      <div class="product-info">
        <h1 class="product-title">Product Title</h1>
        <p class="product-price">£XX.XX</p>
        <hr />

        <div class="product-options">
          <div class="option-group">
            <h3 class="option-title">Colour</h3>
            <div class="option-buttons">
              <div
                class="option-circle"
                style="background-color: #d9c4a1"
              ></div>
              <div
                class="option-circle"
                style="background-color: #2d2d2d"
              ></div>
            </div>
          </div>

          <div class="option-group">
            <h3 class="option-title">Material</h3>
            <div class="option-buttons">
              <div
                class="option-circle"
                style="background-color: #c2b8a3"
              ></div>
            </div>
          </div>
        </div>

        <div class="purchase-section">
          <div class="quantity-selector">
            <input type="number" value="1" min="1" />
          </div>
          <button class="button-dark">ADD TO CART</button>
        </div>

        <div class="wishlist">
          <span class="material-symbols-outlined">favorite_border</span>
          <span>ADD TO WISHLIST</span>
        </div>
      </div>
    </section>

    <section class="product-description">
        <div class="description-item">
            <button class="description-toggle">
                Details <span class="plus-icon">+</span>
            </button>
            <div class="description-content">
                <p>Lovely jubbly outift</p>
            </div>
        </div>
        <div class="description-item">
            <button class="description-toggle">
                Care and materials <span class="plus-icon">+</span>
            </button>
            <div class="description-content">
                <p>You know what to do</p>
            </div>
        </div>
        <div class="description-item">
            <button class="description-toggle">
                Delivery <span class="plus-icon">+</span>
            </button>
            <div class="description-content">
                <p>Delivery times vary based on location. Estimated delivery within 5-7 business days.</p>
            </div>
        </div>
    
        <div class="description-item">
            <button class="description-toggle">
                Exchange & Returns <span class="plus-icon">+</span>
            </button>
            <div class="description-content">
                <p>Returns accepted within 30 days. Items must be unused and in original packaging.</p>
            </div>
        </div>
    
        <div class="description-item">
            <button class="description-toggle">
                Sourcing & Materials <span class="plus-icon">+</span>
            </button>
            <div class="description-content">
                <p>Made from sustainable, high-quality materials sourced responsibly.</p>
            </div>
        </div>
    </section>
    



    <section class="content-break">
      <h1>CUSTOMERS ALSO VIEWED</h1>
    </section>
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
      case "account":
      html = `
      <div class="account-page">
      <div class="container">
        <div class="row">
          <div class="col-2">
            <img src="../Assets/Images/product-image-placeholder.jpg" alt="" />
          </div>
          <div class="col-2">
            <div class="form-container">
              <div class="form-btn">
                <span>Login</span>
                <span>Sign Up</span> 
                <hr id="indicator">
              </div>
              <form id="login">
                <input type="text" placeholder="Email">
                <input type="password" placeholder="Password">
                <button class="button-light">Login</button>
                <a href="">Forgot password</a>
              </form>
              <form id="register">
                <input type="text" placeholder="First name">
                <input type="text" placeholder="Last name">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <button class="button-light">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    default:
      html = `
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
      `;
  }

  content.innerHTML = html;

  // Call loadProducts if on product page
  if (page === "productpage") {
    loadProducts();
  }
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
  const href = this.getAttribute("href").substring(1);

  let page = href.split("?")[0]; // Extract page name
  let params = new URLSearchParams(href.split("?")[1]); // Extract query parameters
  let category = params.get("category") || "all"; // Default to "all"

  loadContent(page, category);
  history.pushState({ page, category }, "", `#${page}?category=${category}`);
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
    loadContent(e.state.page, e.state.category || "all");
  } else {
    loadContent("home");
  }
});
