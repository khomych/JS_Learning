export default function toggleCart() {
    const cartBtn = document.querySelector('#cart');
    const cartCloseBtn = document.querySelector('.cart-close');
    const counter = document.querySelector('.counter');
    const cart = document.querySelector('.cart');

    cartBtn.addEventListener('click', () => {
        cart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    cartCloseBtn.addEventListener('click', () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    });
}