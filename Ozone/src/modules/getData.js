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