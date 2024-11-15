async function loadUsers() {
    try {
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo de usuarios');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error(error);
        alert('No se pudo cargar la lista de usuarios');
    }
}

// Función para validar las credenciales
async function authenticateUser(email, password) {
    const users = await loadUsers();
    if (!users) return false;

    // Verifica si existe un usuario con las credenciales proporcionadas
    const user = users.find(user => user.email === email && user.password === password);
    return user !== undefined;
}

// Función para manejar el inicio de sesión
async function login(event) {
    event.preventDefault(); // Evita el envío del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
        alert('Inicio de sesión exitoso');
        // Aquí podrías redirigir al usuario a otra página o guardar el estado de sesión
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Asigna el evento de submit al formulario
document.querySelector('form').addEventListener('submit', login);