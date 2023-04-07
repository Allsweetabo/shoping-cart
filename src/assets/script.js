const products = [{
  name: "cherry",
  price: 10.99,
  quantity: 0,
  productId: 1,
  image: "../images/cherry.jpg"
},
{
  name: "orange",
  price: 7.99,
  quantity: 0,
  productId: 2,
  image: "../images/orange.jpg"
},
{
  name: "strawberry",
  price: 15.99,
  quantity: 0,
  productId: 3,
  image: "../images/strawberry.jpg"
}];

let cart = [];
function getProductById(productId, products) {

  if (!products) {
    // If the products array is undefined or null, return null
    return null;
  }

  // Find the product with the specified productId in the products array
  const product = products.find(p => p.productId === productId);

  // If no product is found, return null
  if (!product) {
    return null;
  }

  // Return a copy of the product object to prevent accidental mutation
  return {...product};
}

function addProductToCart(productId) {
  const product = getProductById(productId,products);

  if (!cart) {
    // If the cart is undefined or null, create a new empty array
    cart = [];
  }

  const index = cart.findIndex(item => item.productId === productId);

  if (index !== -1) {
    // If the product already exists in the cart, increase its quantity
    // cart[index].quantity++;
    increaseQuantity(productId);
   
  } else {
    // Otherwise, add the product to the cart with a quantity of 1
    increaseQuantity(productId);
    const newProduct = {...product, quantity: 1};
    cart.push(newProduct);
    
  }
  
}


function increaseQuantity(productId) {
  // Find the product in the cart
  const cartItem = cart.find(item => item.productId === productId);
  const product = products.find(item => item.productId === productId);

  if (cartItem) {
    // The product is in the cart, so increase its quantity
    cartItem.quantity += 1;
  }

  if (product) {
    // The product is in the cart, so increase its quantity
    product.quantity += 1;
  }
}

function decreaseQuantity(productId) {
  // Find the product in the cart
  const cartItem = cart.find(item => item.productId === productId);
  const product = products.find(item => item.productId === productId);
  
  if (cartItem) {
    // The product is in the cart, so decrease its quantity
    cartItem.quantity -= 1;

    if (cartItem.quantity === 0) {
      // If the quantity reaches 0, remove the product from the cart
      // const itemIndex = cart.findIndex(item => item.id === productId);
      
      // cart.splice(itemIndex, 1);
      removeProductFromCart(productId)
    }
  }

  if (product) {
    // The product is in the cart, so decrease its quantity
    if(product.quantity > 0){
      product.quantity -= 1;
    }
    

    if (product.quantity === 0) {
      // If the quantity reaches 0, remove the product from the cart
      removeProductFromCart(productId)
    }
  }
}

function removeProductFromCart(productId) {
  // Find the product in the cart
  const cartItem = cart.find(item => item.productId === productId);

  if (cartItem) {
    const product = products.find(item => item.productId === productId);
    product.quantity = 0
    // The product is in the cart, so set its quantity to 0
    cartItem.quantity = 0;

    // Remove the product from the cart
    const itemIndex = cart.findIndex(item => item.productId === productId);
    cart.splice(itemIndex, 1);
  }
}


function cartTotal() {
  let total = 0;

  // Iterate through the cart and add up the prices of all items
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

function emptyCart() {
  cart = [];
}

let cartTotalValue = 0
function pay(amount) {
  cartTotalValue += amount;
 let  result = cartTotalValue - cartTotal();

 //check if current amount is greater than the grand total
  if(result > cartTotal()){
    cartTotalValue = 0;
  }
  
  return result;
 }


/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
