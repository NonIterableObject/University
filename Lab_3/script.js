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

function getProductItems() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://fakestoreapi.com/products');
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.timeout = 30000; // 30 секунд (в миллисекундах)
        xhr.ontimeout = function () {
            alert('Запрос превысил максимальное время');
        }
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        };
        xhr.onerror = () => {
            resolve(xhr.response)
        };
        xhr.send();
    })
}


function createProductElements() {
    getProductItems()
        .then(allProducts => {
            for (let product of allProducts) {
                let divProduct = document.querySelector('#products')

                let mainDivElement = document.createElement('div');
                mainDivElement.className = 'product-item';

                let imgElement = document.createElement('img')
                imgElement.src = product['image'];

                let divElement = document.createElement('div');
                divElement.className = 'product-list';

                let hElement = document.createElement('h3');
                hElement.innerText = `${product['title']}`;

                let spanElement = document.createElement('span');
                spanElement.className = 'price';
                spanElement.innerText = `${product['price']} $`;

                divElement.appendChild(hElement)
                divElement.appendChild(spanElement)

                mainDivElement.appendChild(imgElement)
                mainDivElement.appendChild(divElement)

                divProduct.appendChild(mainDivElement)
            }
        })
        .catch(err => assert(err))
}

createProductElements();

