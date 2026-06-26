// localStorage key
const CART_COUNT_KEY = "craftory_cart_count";

// Navbar-এর cart number
const cartCountElement = document.getElementById("cart-count");

// Cart page-এর message (থাকলেও, না থাকলেও সমস্যা নেই)
const cartMessageElement = document.getElementById("cart-message");

// শুরুতে 0
let cartCount = 0;

// আগের value থাকলে localStorage থেকে নিয়ে নেই
const savedCount = localStorage.getItem(CART_COUNT_KEY);
if (savedCount !== null) {
  const parsed = parseInt(savedCount, 10);
  if (!isNaN(parsed) && parsed >= 0) {
    cartCount = parsed;
  }
}

// উপরে Cart + Cart page message update করার ফাংশন
function updateCartDisplay() {
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }

  if (cartMessageElement) {
    cartMessageElement.classList.remove("cart-message-empty", "cart-message-filled");

    if (cartCount === 0) {
      cartMessageElement.textContent =
        "Your cart is empty. Start exploring handmade pieces from the Products page.";
      cartMessageElement.classList.add("cart-message-empty");
    } else {
      const text =
        cartCount === 1
          ? "You currently have 1 handmade item in your cart."
          : `You currently have ${cartCount} handmade items in your cart.`;
      cartMessageElement.textContent = text;
      cartMessageElement.classList.add("cart-message-filled");
    }
  }
}

// সব Add to cart বাটন খুঁজে আনা
const addToCartButtons = document.querySelectorAll(".add-to-cart");
console.log("Add to cart buttons:", addToCartButtons.length);

// click event সেট করা
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount = cartCount + 1;
    localStorage.setItem(CART_COUNT_KEY, String(cartCount));
    updateCartDisplay();
    alert("Added to cart!");
  });
});

// পেজ লোড হলে একবার show করি
updateCartDisplay();
