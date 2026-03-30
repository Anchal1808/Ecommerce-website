const token = localStorage.getItem('token');

function loadCart() {
    fetch('http://localhost:3000/api/cart', {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data); // check karne ke liye
    });
}

loadCart();