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





function empezarJuego(){



    const emojis = ["🍉","🍉","🥭","🥭","🍐","🍐","🍌","🍌","🍇","🍇","🍑","🍑","🍒","🍒","🥥","🥥",]
    //var emojis_mezclados = emojis.sort(() => (Math.random() > .5) ? 2 : -1)

    function mezclarEmojis() {
        // Crear una copia del array original
        emojis_mezclados = emojis.slice();
        
        // Aplicar el algoritmo de mezcla Fisher-Yates
        for (let i = emojis_mezclados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [emojis_mezclados[i], emojis_mezclados[j]] = [emojis_mezclados[j], emojis_mezclados[i]];
        }
    }

    var bodyElement = document.body;
    bodyElement.innerHTML = `
        <div class="control">
            <button id="reiniciar">Reiniciar juego</button>
            <div class="info">
                <p>Movimientos:</p>
                <p>Tiempo:</p>
            </div>
        </div>
        <div class="container">
            <div class="juego"></div>
        </div>
    `
    mezclarEmojis()

    const juegoElement = document.querySelector('.juego');

    for (let i = 0; i < emojis.length; i++) {
        
        let nuevaCarta = document.createElement('div');
        nuevaCarta.className = 'carta';

        nuevaCarta.innerHTML = `
        <input type="checkbox" id="check${i}" class="check">
        <label for="check${i}" class="label">${emojis_mezclados[i]}</label>
        `;

        juegoElement.appendChild(nuevaCarta);

    }    

    var reiniciarBtn = document.getElementById('reiniciar');

    reiniciarBtn.addEventListener('click', () => {
        ocultarCartas().then(() => {
            setTimeout(empezarJuego, 1000); // Agrega un tiempo de espera adicional de 1000 milisegundos
        });
    });

    function ocultarCartas() {
        // Devuelve una promesa que se resuelve cuando todas las cartas se han ocultado
        return new Promise(resolve => {
            let cartasOcultas = 0;

            function ocultarCartaConRetraso(i) {
                setTimeout(() => {
                    var miInput = document.getElementById(`check${i}`);
                    miInput.checked = false;

                    cartasOcultas++;

                    // Si todas las cartas se han ocultado, resuelve la promesa
                    if (cartasOcultas === emojis.length) {
                        resolve();
                    }
                    
                }, i * 25);
            }

            for (let i = 0; i < emojis.length; i++) {
                ocultarCartaConRetraso(i);
            }
        });
    }
}

empezarJuego()






