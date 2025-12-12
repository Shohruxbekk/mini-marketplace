
const source = "https://fakestoreapi.com/products"
const productdiv = document.getElementById("products")
productdiv.innerHTML="<h2 class='loading'>Loading...</h2>"
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
async function loadProducts(){
   productdiv.innerHTML=""
    try{
     const res = await fetch(source)

     const products = await res.json() 
     
     products.forEach(product => {
     const card = document.createElement("div")
     card.className = "card"
     card.innerHTML=`
     <img class="" src=${product.image}>
     <div class="product-title">
     <h1>${product.title}</h1>
     </div>
     <div class="product-info">
     <p>$${product.price}</p>
     <button class="add-to-cart">Add to cart</button>
     </div>`  
    productdiv.appendChild(card)
      const addToCartBtn = card.querySelector(".add-to-cart") 
      addToCartBtn.addEventListener("click", () => {
   let cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const existing = cart.find(i => i.id === product.id)
  if (existing) existing.quantity += 1
  else cart.push({ ...product, quantity: 1 })

  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("storage"))      
 
     });
    
  
     });
     }
     catch(error){
        productdiv.innerHTML="Mahsulotlarni yuklashda Xatolik :(" 
     }
 
}

