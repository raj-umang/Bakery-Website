/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

//Login Button
document.getElementById("loginButton").addEventListener("click", function () {
  // Redirect to another page
  window.location.href = "/login"; // Change "/login" to the URL of your login page
});

//Cart Button
document.getElementById("Cart").addEventListener("click", function () {
  // Redirect to another page
  window.location.href = "/cart"; // Change "/login" to the URL of your login page
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "40px",
  opacity: 1,
  scale: 1.1,
  duration: 2500,
  delay: 300,
  //reset: true, //animation repeat
});

sr.reveal(`.home__data, .about__img, .about__data, .visit__data`);

sr.reveal(
  `.home__image, .footer__img-1, .footer__img-2
`,
  {
    rotate: {
      z: -15,
    },
  }
);
sr.reveal(`.home__bread, .about__bread`, {
  rotate: {
    z: 15,
  },
});
sr.reveal(`.home__footer`, {
  scale: 1,
  origin: "bottom",
});

sr.reveal(`.new__card:nth-child(1) img`, {
  rotate: {
    z: -30,
  },
  distance: 0,
});
sr.reveal(`.new__card:nth-child(2) img`, {
  rotate: {
    z: 15,
  },
  distance: 0,
  delay: 600,
});
sr.reveal(`.new__card:nth-child(3) img`, {
  rotate: {
    z: -30,
  },
  distance: 0,
  delay: 900,
});

sr.reveal(`.favorite__card img`, {
  interval: 100,
  rotate: {
    z: 15,
  },
  distance: 0,
});

sr.reveal(`.footer__container`, {
  scale: 1,
});

/*=============== ADD TO CART VIA POPUP WINDOW ===============*/

function addToCartFromFavorite(productName, quantity) {
  // Assuming you have the product price stored somewhere
  const productPrice = 6.0; // Replace with the actual price

  // Implement your addToCart functionality here
  addToCart(productName, quantity, productPrice);
  // After updating the cart in addToCartFromPopup and addToCartFromFavorite
  updateCartUI();
}

function increaseQuantityPopup(popupId) {
  let quantityPopupElement = document.querySelector(
    `#${popupId} .quantity-popup`
  );
  let currentQuantity = parseInt(quantityPopupElement.textContent);
  quantityPopupElement.textContent = currentQuantity + 1;
}

function decreaseQuantityPopup(popupId) {
  let quantityPopupElement = document.querySelector(
    `#${popupId} .quantity-popup`
  );
  let currentQuantity = parseInt(quantityPopupElement.textContent);
  if (currentQuantity > 1) {
    quantityPopupElement.textContent = currentQuantity - 1;
  }
}

function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "flex";
}

// Close the popup when clicking outside of it
window.onclick = function (event) {
  if (event.target.classList.contains("popup")) {
    event.target.style.display = "none";
  }
};

// Cart object to store items
// const cart = {
//   items: [],
//   total: 0,
// };
let items = [];
let total = 0;
let cart = {};

// Function to add items to the cart from the popup
function addToCartFromPopup(productName, quantity, price, popupId) {
  console.log("Adding to cart from popup: " + quantity + " " + productName);

  // Calculate total price for the current item
  const totalPrice = price * quantity;

  // Check if the item is already in the cart
  const existingItem = items.find((item) => item.name === productName);

  if (existingItem) {
    // If the item is already in the cart, update its quantity and total price
    existingItem.quantity = quantity;
    existingItem.total = total + totalPrice;
  } else {
    // If the item is not in the cart, add it
    items.push({
      name: productName,
      quantity: quantity,
      price: price,
      total: totalPrice,
    });
  }

  // Update the total price of the cart
  // cart.total += totalPrice;
  cart.item = items;
  cart.total = items.reduce(
    (accumulator, currentObject) => accumulator + currentObject.total,
    0
  );

  // Log the updated cart for testing (you can replace this with your API calls or state updates)
  // console.log("Updated Cart:", cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  // Update and reflect the cart details on the UI
  updateCartUI();
}

// Function to update and reflect the cart details on the UI
function updateCartUI() {
  // Implement the logic to update the cart display on the UI
  // For example, you can update a cart element on your webpage with the latest details
  // Here, we're just logging the details for testing
  console.log("Cart Total:", cart.total);
  console.log("Cart Items:", cart.items);
}
