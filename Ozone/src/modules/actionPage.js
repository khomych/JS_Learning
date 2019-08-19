import filter from './filter.js';

export default function actionPage() {

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




}