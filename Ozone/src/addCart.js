function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = cartWrapper.querySelector('#cart-empty');


    cards.forEach((elem) => {
        const btnAddCart = elem.querySelector('button');
        btnAddCart.addEventListener('click', () => {

            const cardClone = elem.cloneNode(true);
            cartWrapper.appendChild(cardClone);

            const btnRemoveCart = cardClone.querySelector('button');
            btnRemoveCart.textContent = 'Убрать из корзины';
            btnRemoveCart.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
            showData();
        });
    });

    function showData() {

        const cartCards = document.querySelectorAll('.cart-wrapper .card');
        const countCards = cartCards.length;
        const counter = document.querySelector('.counter');

        const cardPrice = document.querySelectorAll('.cart-wrapper .card-price');
        const cartTotal = document.querySelector('.cart-total span');

        let totalPrice = 0;

        cardPrice.forEach((elem) => {
            totalPrice += parseFloat(elem.textContent);
        });
        cartTotal.textContent = totalPrice;
        //console.log(totalPrice);

        counter.textContent = countCards;

        if (countCards > 0) {
            cartEmpty.remove();
        } else {
            const empt = cartWrapper.querySelector('#cart-empty');
            if (!empt) {
                document.querySelector('.cart-wrapper').appendChild(cartEmpty);
            }
        }

    }
}