
//checkbox
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

//end checkbox





