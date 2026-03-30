const bar=document.getElementById('bar');
const close=document.getElementById('close');
const nav=document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.toggle('active');
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}

/// Cart functionality
let cartButtons = document.querySelectorAll('.cart');
cartButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.pro');
        const name = productCard.querySelector('h5').innerText;
        const priceText = productCard.querySelector('h4').innerText;
        const price = parseFloat(priceText.replace('$',''));
        const img = productCard.querySelector('img').src;

        // Load existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if product already exists
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.qty += 1; // Increase quantity
        } else {
            cart.push({ name, price, img, qty: 1 });
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${name} added to cart!`);
    });
});

// Function to render cart page
function renderCart() {
    const cartTableBody = document.querySelector('#cart tbody');
    if(!cartTableBody) return; // only for cart page

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = (item.price * item.qty).toFixed(2);
        total += parseFloat(subtotal);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><a href="#" class="remove" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.img}" alt=""></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.qty}" min="1" class="qty" data-index="${index}"></td>
            <td>$${subtotal}</td>
        `;
        cartTableBody.appendChild(tr);
    });

    document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)').innerText = `$${total.toFixed(2)}`;
    document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2) strong').innerText = `$${total.toFixed(2)}`;

    // Remove item
    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = btn.getAttribute('data-index');
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // Update quantity
    document.querySelectorAll('.qty').forEach(input => {
        input.addEventListener('change', () => {
            const idx = input.getAttribute('data-index');
            cart[idx].qty = parseInt(input.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// Call renderCart only if on cart page
if(document.querySelector('#cart')) {
    renderCart();
}