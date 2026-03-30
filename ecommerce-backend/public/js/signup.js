const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // page reload nahi hoga

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert(`Signup successful! Welcome, ${data.user.name}`);
            localStorage.setItem('token', data.token); // JWT store
            window.location.href = 'shop.html'; // redirect to shop page
        } else {
            alert(data.msg); // error message show karega
        }

    } catch (err) {
        console.error(err);
        alert('Server error');
    }
});