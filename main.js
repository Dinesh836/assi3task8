
const parentContainer=document.getElementById("store");

const cart_items = document.querySelector('#cart .cart-items');


parentContainer.addEventListener('click', (e)=>{
    if(e.target.className=='addtocart-btn'){
        const id=e.target.parentNode.parentNode.id;
        const name=document.querySelector(`#${id} h3`).innerText;
        const img_src=document.querySelector(`#${id} img`).scr;
        const price=e.target.parentNode.firstElementChild.firstElementChild.innerText;
        let total_cart_price=document.querySelector('#total-value').innerText;
    
        if(document.querySelector(`#in-cart-${id}`)){
            alert(`${name} is already added to cart `);
            return;
        }
    
        const cart_item=document.createElement('div');
        cart_item.classList.add('cart_row');
        cart_item.setAttribute('id',`in-cart-${id}`)
        total_cart_price=parseFloat(total_cart_price)+parseFloat(price);
        total_cart_price=total_cart_price.toFixed(2);
        document.querySelector('#total-value').innerText=`${total_cart_price}`;
        cart_item.innerHTML= `<span class='cart-item cart-column'>
                                  <img class='cart-img' src="${img_src}" alt="">
                                  <span>${name}</span>
                              </span>
                              <span class='cart-price cart-column'>${price}</span> 
                              <span  class='cart-quantity cart-column'>
                                  <input id="value" type="text" value="1">
                                  <button>REMOVE</button>
                              </span> `;
        cart_items.appendChild(cart_item);

        const notif=document.querySelector('.notification');
        const son=document.createElement('div');
        son.classList.add('son');
        son.innerText=`${name} successfully added to cart`;
        notif.appendChild(son);
        setTimeout(()=>{
            son.remove();
        }, 2000);
    }
    
    if(e.target.className=='visit-cart' || e.target.className=='list cartspan'){
        e.preventDefault();
        document.querySelector('#showcart').style = "display:block;"
    }
    if(e.target.className=='cancel'){
        document.querySelector('#showcart').style = "display:none;"
    }
    if(e.target.className=='purchase-btn'){
        if(document.querySelector('#total-value').innerText==0.00){
            alert('nothing in the cart to purchase')
        }
       else {
        alert('thnx for PURCHASE');
       }   
       cart_items.innerHTML="";
       document.querySelector('#total-value').innerText=`0`;
    }
    if(e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
       // document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
    
})

window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("http://localhost:3000/products").then((data)=>{
        console.log(data)
        if(data.request.status==200){
            const products=data.data.products;
            const singleProduct=document.getElementById('products')
            products.forEach(product=>{
                const productHtml=
               ` <div>
                    <h1>${product.title}</h1>
                    <img src="${product.imageUrl}" alt="" />
                    <h2>${product.price}</h2>
                    <button>ADD TO CART</button>
                    <hr>
                </div>`
                singleProduct.innerHTML += productHtml;
            })
        }
    })
})



