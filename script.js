//Elements for the tab switcher, small product images, and large product images
const tabBox = document.querySelector(".operation-tab-box");
const tabImage = document.querySelectorAll(".pdImage-small");
const contentImage = document.querySelectorAll(".pdImage");

//Event listener to switch between product images when thumbnails are clicked
tabBox.addEventListener("click", function (e) {
  const clicked = e.target.closest(".pdImage-small");
  if (!clicked) return;

  tabImage.forEach((el) => el.classList.remove("active-small"));
  contentImage.forEach((el) => el.classList.remove("active"));

  // Adding active class to the clicked thumbnail and corresponding large image
  clicked.classList.add("active-small");
  document
    .querySelector(`.operation-content-${clicked.dataset.tab}`)
    .classList.add("active");
});

// Function to hide the cart overlay
function removeoverlay() {
  overlayCart.classList.remove("d-block");
  overlayCart.classList.remove("height");
}

// Product quantity management
const number = document.querySelector(".number-box");
const quantity = document.querySelector("#quant");
let productQuantity;

//Event listeners for incrementing and decrementing the product quantity
number.addEventListener("click", function (e) {
  removeoverlay();

  productQuantity = Number(quantity.textContent); // Current quantity
  if (!e.target.alt) return;
  else if (e.target.alt === "icon-plus") {
    productQuantity++; // Increase quantity
    quantity.textContent = productQuantity;
  } else if (e.target.alt === "icon-minus" && Number(quantity.textContent) > 0) {
    productQuantity--; // Decrease quantity if greater than 0
    quantity.textContent = productQuantity;
  }
});

// Add to Cart Functionality
const btn = document.querySelectorAll(".btn");
const productNumber = document.querySelector(".pdNum");
const emptyContent = document.querySelector(".cartContent-empty");
const fullContent = document.querySelector(".cartContent-full");

const cartQuantity = document.querySelector("#quantity");
const cartTotal = document.querySelector("#total");

// This function manages the style changes when the cart is updated
function generalStyle() {
  productNumber.textContent = productQuantity;
  productNumber.classList.remove("d-block");
  emptyContent.classList.add("show");
  fullContent.classList.remove("show");
}

//Event listener to the add to cart buttons
btn.forEach((el) => {
  el.addEventListener("click", function (e) {
    generalStyle();

    // If quantity is greater than 0, show the cart details
    if (productQuantity > 0) {
      productNumber.classList.add("d-block");
      emptyContent.classList.remove("show");
      fullContent.classList.add("show");
      cartQuantity.textContent = productQuantity; // Update cart quantity
      cartTotal.textContent = `$${productQuantity * 125}`; // Update total price

      // Deleting items from the cart
      document.querySelector(".delete-icon").addEventListener("click", function (e) {
        quantity.textContent = 0; // Reset quantity
        productQuantity = 0;
        generalStyle(); // Update the cart display
      });
    }
    removeoverlay();
  });
});

const cartIcon = document.querySelector(".h-logo");
const overlayCart = document.querySelector(".overlay-cart");

cartIcon.addEventListener("click", function (e) {
  overlayCart.classList.toggle("d-block");
  overlayCart.classList.toggle("height");
});

// Slider functionality for product images
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".overlay-operation-tab-box");

let curSlide = 0;
const maxslide = slides.length;

// Highlights the active thumbnail image
const activeImg = function (slide) {
  document.querySelectorAll(".slider-dot").forEach((el) => el.classList.remove("slider-dot-active"));
  document.querySelector(`.slider-dot[data-tab="${slide}"]`).classList.add("slider-dot-active");
};
activeImg(0);

// Switches to the selected slide (image)
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

// Moves to the next slide
const nextSlide = function () {
  if (curSlide === maxslide - 1) {
    curSlide = 0; // Loop back to the first slide
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeImg(curSlide);
};

// Moves to the previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxslide - 1; // Loop back to the last slide
  } else curSlide--;
  goToSlide(curSlide);
  activeImg(curSlide);
};

// Event listeners for the slider buttons
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// Keyboard navigation for the slider
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  else if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "Escape") {
    overlaySlider.classList.remove("overlay-active"); // Closes lightbox on escape
  }
});

// Switching slides using dots (thumbnails)
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-dot")) {
    const slide = e.target.dataset.tab;
    goToSlide(slide);
    curSlide = parseInt(slide, 10);
    activeImg(slide);
  }
});

// Lightbox functionality for product images
const productImage = document.querySelectorAll(".pdImage");
const overlaySlider = document.querySelector(".main-overlay");

productImage.forEach((el, i) => {
  el.addEventListener("click", function (e) {
    overlaySlider.classList.add("overlay-active");
    goToSlide(i);
    curSlide = i;
    activeImg(i);
  });
});

// Close the lightbox
document.querySelector(".slider-delete").addEventListener("click", function () {
  overlaySlider.classList.remove("overlay-active");
});

// Icon Menu button functionality to show/hide the mobile navigation
const iconMenu = document.querySelector(".icon-menu");
const iconCross = document.querySelector(".cross-icon");
const mainNav = document.querySelector(".main-nav-list");

// Open the mobile menu
iconMenu.addEventListener("click", function (e) {
  mainNav.classList.add("open");
  document.querySelector(".bg").classList.add("bg-color");
});

// Close the mobile menu
iconCross.addEventListener("click", function () {
  mainNav.classList.remove("open");
  document.querySelector(".bg").classList.remove("bg-color");
});


const reviewForm = document.querySelector('.add-review-form');
const reviewsContainer = document.querySelector('.reviews');

reviewForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const reviewText = this.review.value;
  const reviewerName = this.name.value;

  // Create new review element
  const newReview = document.createElement('div');
  newReview.classList.add('review');

  const reviewParagraph = document.createElement('p');
  reviewParagraph.classList.add('review-text');
  reviewParagraph.textContent = reviewText;

  const reviewerSpan = document.createElement('span');
  reviewerSpan.classList.add('reviewer-name');
  reviewerSpan.textContent = `- ${reviewerName}`;

  newReview.appendChild(reviewParagraph);
  newReview.appendChild(reviewerSpan);

  // Add new review to the reviews container
  reviewsContainer.appendChild(newReview);

  // Reset form
  this.reset();
});