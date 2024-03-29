import {cart , removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products , getProduct} from '../../data/products.js';
import {currencyFormat} from '../utility/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions , getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentsummary.js';
import { updateCartQuantity } from '../checkouts.js';
// const today = dayjs();
// const deliveryDate = today.add(7,'days');//number to be added, length of time days or minutes or seconds etc
// console.log(deliveryDate.format('dddd, MMMM D')); //what kind of format


export function renderOrderySummery(){
    let cartSummaryHTML= '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
    
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
    );
    const dateString = deliveryDate.format(
        'dddd , MMMM D'
    );
    
        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${currencyFormat(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML (matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
        });
        function deliveryOptionsHTML (matchingProduct, cartItem){
                let html = '';
            deliveryOptions.forEach((deliveryOption) => {
                const today = dayjs();
                const deliveryDate = today.add(
                    deliveryOption.deliveryDays,
                    'days'
                );
                const dateString = deliveryDate.format(
                    'dddd , MMMM D'
                );
                const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${currencyFormat(deliveryOption.priceCents)}`;//terrarnary operator

                const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

                html += `
                <div class="delivery-option js-delivery-option"
                            data-product-id="${matchingProduct.id}"
                            data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                        ${ischecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
                </div>
                `
            });
            return html;
        };

        document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

        document.querySelectorAll('.js-delete-link').forEach((link) => {
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
                renderPaymentSummary();
                updateCartQuantity();
            });   
        });

       

        document.querySelectorAll('.js-delivery-option').forEach((element)=>{
            element.addEventListener('click',()=>{
            // ShortH  and Property
                // const productid = element.dataset.productid;
                // const deliveryOptionid = element.dataset.deliveryOptionId;
                const {productId,deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId,deliveryOptionId);

                renderOrderySummery();
                renderPaymentSummary();
            });
        });
}

/*
technique we used

    1. Update the data
    2. Regenerate all the HTML
    = MVC
Model - View - Controller
        MVC
        Split our code into 3 parts
        1. Model = saves and manages the data eg: data folder
        MVC
        2. View = takes the data and displays
        it on the page eg: taking data and generatin html
        MVC
        3. Controller = runs some code when we
        interact with the page eg; event listeners

mvc is a design pattern most frameworks run via mvc

we use mvc bcz
MVC = makes sure the page
always matches the data
*/