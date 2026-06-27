window.addEventListener("DOMContentLoaded", () => {
    let products = document.querySelectorAll(".product-card"),
        buttons = document.querySelectorAll(".btn--buy"),
        openBtn = document.querySelector("#openCartBtn"),
        closeCartBtn = document.getElementById("closeCartBtn"),
        cartList = document.querySelector('#cartList'),
        cartCount = document.querySelector('#cartCount'),
        p = document.querySelector('.cart__empty'),
        clearCart = document.querySelector('#clearCart'),
        cartTotal = document.querySelector('#cartTotal'),
        modalOverlay = document.querySelector(".modal-overlay");

    openBtn.addEventListener("click", () => {
        modalOverlay.classList.add("is-open")
    });

    closeCartBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('is-open')
    })

    buttons.forEach(element => {
        element.addEventListener('click', (e) => {

            let productCard = e.target.closest('.product-card');
            if (!productCard) return;

            let { id, name, price, unit, image } = productCard.dataset;

            let cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.dataset.id = id;
            cartItem.dataset.price = price;
            cartItem.innerHTML = `<img class="cart-item__img" src="${image}" alt="${name}" />
          <div class="cart-item__info">
            <p class="cart-item__name">${name}</p>
            <p class="cart-item__unit-price">${price} so'm / ${unit}</p>
          </div>
          <div class="cart-item__qty">
            <button class="qty-btn qty-btn--minus" type="button">−</button>
            <span class="qty-value">1</span>
            <button class="qty-btn qty-btn--plus" type="button">+</button>
          </div>
          <span class="cart-item__total">${price} so'm</span>
          <button class="cart-item__remove" type="button" aria-label="O'chirish">✕</button>
        `;

            let minus = cartItem.querySelector('.qty-btn--minus'),
                addItem = cartItem.querySelector('.qty-btn--plus'),
                qtyValue = cartItem.querySelector('.qty-value'),
                itemRemove = cartItem.querySelector('.cart-item__remove'),
                totalEl = cartItem.querySelector('.cart-item__total');


            addItem.addEventListener('click', () => {
                let qty = Number(qtyValue.textContent) + 1;
                qtyValue.textContent = qty;
                totalEl.textContent = (qty * +price) + " so'm";
                totalPrice();
            });


            // Decreasing item price and count
            minus.addEventListener('click', () => {
                let qty = Number(qtyValue.textContent) - 1;

                if (qty < 1) {
                    cartItem.remove();
                    cartCount.textContent = Number(cartCount.textContent) - 1;
                    productCard.classList.remove('is-hidden');
                    updateEmptyState();
                    totalPrice()
                    return
                }

                qtyValue.textContent = qty;
                totalEl.textContent = (qty * +price) + " so'm";
            });

            // Removing with X
            itemRemove.addEventListener('click', () => {
                cartItem.remove();
                cartCount.textContent = Number(cartCount.textContent) - 1;
                productCard.classList.remove('is-hidden');
                updateEmptyState();
                totalPrice();
            });

            cartList.appendChild(cartItem);

            updateEmptyState();
            totalPrice();
            cartCount.textContent = Number(cartCount.textContent) + 1;
            productCard.classList.add('is-hidden');

        });
    });

    function updateEmptyState() {
        if (cartList.children.length > 0) {
            p.classList.add("is-hidden");
        } else {
            p.classList.remove("is-hidden");
        }
    }

    function totalPrice() {
        let sum = 0;
        cartList.querySelectorAll('.cart-item').forEach(item => {
            sum += Number(item.querySelector('.qty-value').textContent) * Number(item.dataset.price);
        });
        cartTotal.textContent = sum + " so'm";
    }

    clearCart.addEventListener('click', () => {
        cartList.innerHTML = '';
        cartCount.textContent = 0;
        products.forEach(card => card.classList.remove('is-hidden'));
        updateEmptyState();
        totalPrice()
    });
});


