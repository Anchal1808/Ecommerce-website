const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Add to cart
let cartButtons = document.querySelectorAll('.cart');

cartButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const productCard = btn.closest('.pro');
        const name = productCard.querySelector('h5').innerText;
        const priceText = productCard.querySelector('h4').innerText;
        const price = parseFloat(priceText.replace('$', ''));
        const img = productCard.querySelector('img').getAttribute('src');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, img, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(name + " added to cart");
    });
});

// Render cart
function renderCart() {
    const cartTableBody = document.querySelector('#cart-items');
    if (!cartTableBody) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = (item.price * item.qty).toFixed(2);
        total += parseFloat(subtotal);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><a href="#" class="remove" data-index="${index}">❌</a></td>
            <td><img src="${item.img}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.qty}" min="1" class="qty" data-index="${index}"></td>
            <td>$${subtotal}</td>
        `;
        cartTableBody.appendChild(tr);
    });

    document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)').innerText = `$${total.toFixed(2)}`;
    document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2) strong').innerText = `$${total.toFixed(2)}`;

    // remove
    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let idx = btn.getAttribute('data-index');
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // quantity update
    document.querySelectorAll('.qty').forEach(input => {
        input.addEventListener('change', () => {
            let idx = input.getAttribute('data-index');
            cart[idx].qty = parseInt(input.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// run on cart page
if (document.querySelector('#cart-items')) {
    renderCart();
}