import { renderOrderySummery } from './checkout/ordersummary.js';
import { renderPaymentSummary } from './checkout/paymentsummary.js';
import { cart } from '../data/cart.js';

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    return cartQuantity;
};

updateCartQuantity();
renderOrderySummery();
renderPaymentSummary();