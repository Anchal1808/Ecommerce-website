const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // reload nahi hoga

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert(`Login successful! Welcome back, ${data.user.name}`);
            localStorage.setItem('token', data.token); // JWT store
            window.location.href = 'shop.html'; // redirect to shop page
        } else {
            alert(data.msg); // invalid credentials
        }

    } catch (err) {
        console.error(err);
        alert('Server error');
    }
});