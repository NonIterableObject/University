document.querySelector('#live-search').oninput = function () {
    let val = this.value.trim().toLowerCase();
    let productItems = document.querySelectorAll('.product-item');
    if (val !== '') {
        productItems.forEach((el) => {
            let hElement = el.querySelector('div h3')
            if (hElement.innerText.toLowerCase().search(val) === -1) {
                el.classList.add('hide');
            } else {
                el.classList.remove('hide')
            }
        });
    } else {
        productItems.forEach((el) => {
            el.classList.remove('hide')
        });
    }
};