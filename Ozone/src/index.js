'use strict'

//checkbox

function toggleCheckbox() {
    const checkbox = document.querySelectorAll(".filter-check_checkbox");

    checkbox.forEach(function (elem) {
        elem.addEventListener('change', function () {
            if (elem.checked) {
                elem.nextElementSibling.classList.add('checked');
            } else {
                elem.nextElementSibling.classList.remove('checked');
            }
        });
    });
}






//end checkbox

//cart

function toggleCart() {
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





//end cart

//работа с товаром

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



//end работа с товаром


//Фильтр по акции

function actionPage() {

    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');

    const min = document.getElementById('min');
    const max = document.getElementById('max');

    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    //фильтр по акции

    discountCheckbox.addEventListener('click', filter);

    // end фильтр по акции

    // фильтр по цене
    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
    }

    max.addEventListener('change', filter);
    min.addEventListener('change', filter);

    //end фильтр по цене

    //поиск

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });

    });

    // End поиск


    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    }

}

//End Фильтр

// Получение данных с сервера

function getData() {
    const goodsWraper = document.querySelector('.goods');

    return fetch('./db/db.json').then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не получены, ошибка: ' + response.status);
            }

        })
        .then((data) => {
            return data;

        })
        .catch((err) => {
            console.warn(err);
            goodsWraper.innerHTML = '<div class="data-error">Данные не получены!</div>';
        });
}


//выводим карточки товара
function renderCards(data) {
    const goodsWraper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
                                <div class="card" data-category="${good.category}">
                                ${(good.sale) ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
									
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url('${good.img}')"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
										<h5 class="card-title">${good.title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
								</div>  
        `;

        goodsWraper.appendChild(card);
    });
}
// End Получение данных с сервера


function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });
    console.dir(categories);

    categories.forEach((category) => {
        const li = document.createElement('li');
        li.textContent = category;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        
        if(catalogWrapper.style.display){
            catalogWrapper.style.display = "";
        } else {
            catalogWrapper.style.display = "block";
        }

        if(event.target.tagName === 'LI'){
            cards.forEach((card) => {
                if(card.dataset.category !== event.target.textContent) {
                    card.parentNode.style.display = 'none';
                } else {
                    card.parentNode.style.display = '';
                }

            });
        }
        
    });


}





getData().then((data) => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});