import { menuArray } from './data.js'

let pizzaHtml = ``
let burgerHtml = ``
let beerHtml = ``

let removeBool = false

const pizzaObj = menuArray.filter(function(element){
    return element.name === "Pizza"
})[0]

const burgerObj = menuArray.filter(function(element){
    return element.name === "Hamburger"
})[0]

const beerObj = menuArray.filter(function(element){
    return element.name === "Beer"
})[0]

document.addEventListener("click", function(e){

    if(e.target.dataset.pizza){
        add(pizzaObj)
        pizzaHtml = handlePizzaOrdersHtml()
    } else if(e.target.dataset.hamburger){
        add(burgerObj)
        burgerHtml = handleBurgerOrdersHtml()
    } else if(e.target.dataset.beer){
        add(beerObj)
        beerHtml = handleBeerOrdersHtml()
    }

    render()
        
})

document.addEventListener("click", function(e){

    if(e.target.dataset.rmv === "pizza"){
        remove(pizzaObj)
        pizzaHtml = handlePizzaOrdersHtml()
    } else if(e.target.dataset.rmv === "hamburger"){
        remove(burgerObj)
        burgerHtml = handleBurgerOrdersHtml()
    } else if(e.target.dataset.rmv === "beer"){
        remove(beerObj)
        beerHtml = handleBeerOrdersHtml()
    }

    render()
        
})

function add(item){

    item.orders++

}

function remove(item){
    
    if(item.orders > 0){
        item.orders--
    }
    
}

function calcSubPrice(objName, objPrice, objOrders) {

    let price = 0
    
    if(removeBool){
        price = objPrice / objOrders
        removeBool = false
    } else {
        price = objPrice * objOrders
    }

    
    let priceHtml = `<div class="${objName}-price">€${price}</div>`
    
    return priceHtml

}

function calcTotalPrice(){

    let price = 0
    menuArray.forEach(function(item) {
        price += item.price * item.orders
    })

    return price

}

function getFeedHtml(){

    let menuHtml = ''
    
    menuArray.forEach(function(item) {
      
       menuHtml += `
       <div class="menu-item">
           <div class="menu-item-type">
               <div class="icon">${item.emoji}</div>
               <div class="details">
                   <h3>${item.name}</h3>
                   <p class="ingredients">${item.ingredients}</p>
                   <p class="price">€${item.price}</p>
               </div>
           </div>
           <div class="menu-item-adder">
               <button data-${item.name}="${item.name}">➕</button>
           </div>
       </div>`
    })

    return menuHtml

}

function handlePizzaOrdersHtml(){

   let pizzaOrdersHtml = ``

   pizzaOrdersHtml = `
       <div class="cart-container">
           <div class="menu-item-type">
               <div class="cart-details">
                   <h3>${pizzaObj.name}</h3>
                   <button class="remove" data-rmv="pizza">remove</p>
               </div>
               ${calcSubPrice(pizzaObj.name, pizzaObj.price, pizzaObj.orders)}
           </div>
       </div>
   `
   return pizzaOrdersHtml

}

function handleBurgerOrdersHtml(){

   let burgerOrdersHtml = ``

   burgerOrdersHtml = `
       <div class="cart-container">
           <div class="menu-item-type">
               <div class="cart-details">
                   <h3>${burgerObj.name}</h3>
                   <button class="remove" data-rmv="hamburger">remove</p>
               </div>
               ${calcSubPrice(burgerObj.name, burgerObj.price, burgerObj.orders)}
           </div>
       </div>
   `
   return burgerOrdersHtml

}

function handleBeerOrdersHtml(){

   let beerOrdersHtml = ``

   beerOrdersHtml = `
       <div class="cart-container">
           <div class="menu-item-type">
               <div class="cart-details">
                   <h3>${beerObj.name}</h3>
                   <button class="remove" data-rmv="beer">remove</p>
               </div>
               ${calcSubPrice(beerObj.name, beerObj.price, beerObj.orders)}
           </div>
       </div>
   `
   return beerOrdersHtml

}

function getCartHtml() {

    let cartHtml = `
    <div class="cart">
        ${pizzaHtml} 
        ${burgerHtml}
        ${beerHtml}
        
        <div class="total-price">
            <div>
                <h3>Total price:</h3>
            </div>
            <div>
                €${calcTotalPrice()}
            </div>
        </div>
    </div>
    `

    return cartHtml

}

function getCompleteOrderHtml() {
    const completeHtml = `<div class="buy-container" id="completeOrderBtn">
            <button id="purchase-btn">Complete order</button>
        </div>`
        return completeHtml
}

function thankYou() {

    let thankYouHtml = `
        <div class="thank-you" id="thankYouContent">
            <h2>Thanks, James! Your order is on its way!</h2>
        </div>`
    return thankYouHtml
    

}

function render(){

    document.getElementById('feed').innerHTML = getFeedHtml()
    document.getElementById('cart').innerHTML = getCartHtml()
    document.getElementById('completeOrderContainer').innerHTML = getCompleteOrderHtml()

}

render()

const buyBtn = document.getElementById('purchase-btn')
const modalBg = document.getElementById('modal-bg')
const modal = document.getElementById('modal')
const payBtn = document.getElementById('payBtn')
// const thankYouContainer = document.getElementById('thankYouContainer')
// const thankYouContent = document.getElementById('thankYouContent')

buyBtn.addEventListener("click", function(e){
    modalBg.classList.add("display")
    modal.classList.add("display")
    console.log("click")
    e.stopPropagation()
})

modalBg.addEventListener("click", function(e){
    modalBg.classList.remove("display")
    modal.classList.remove("display")
    console.log("remove")
    e.stopPropagation()
})

payBtn.addEventListener("click", function(e){
    e.preventDefault()
    modalBg.classList.remove("display")
    modal.classList.remove("display")
    // thankYouContainer.innerHtml = thankYou()    
    e.stopPropagation()

})


