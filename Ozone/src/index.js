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







//end cart

//работа с товаром





//end работа с товаром


//Фильтр по акции





//End Фильтр

// Получение данных с сервера




//выводим карточки товара

// End Получение данных с сервера








getData().then((data) => {
    renderCards(data);
    renderCatalog();
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    //renderCatalog();
});