function validateAndLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor, completa ambos campos.');
    } else {
      // Ambos campos están llenos, redirigir a otra página
      window.location.href = 'index.html';
    }
}