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



//Inserta las cartas en el DOM y crea un nuevo array mezclado
//usando emojis[]
function empezarJuego(){

    const emojis = ["🍉","🍉","🥭","🥭","🍐","🍐","🍌","🍌","🍇","🍇","🍑","🍑","🍒","🍒","🥥","🥥",]
    //var emojis_mezclados = emojis.sort(() => (Math.random() > .5) ? 2 : -1)

    //Algoritmo para mezclar los emojis
    function mezclarEmojis() {
        emojis_mezclados = emojis.slice();
        
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
        <div class="contenedor">
            <div class="juego"></div>
        </div>
    `
    mezclarEmojis()

    //Inserta las cartas en pantalla
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

    //Oculta todas las cartas con una animacion y
    //las vuelve a mezclar.
    reiniciarBtn.addEventListener('click', () => {
        ocultarCartas().then(() => {
            setTimeout(empezarJuego, 250);
        });
    });

    //Oculta las cartas con una animacion
    function ocultarCartas() {
        return new Promise(resolve => {
            let cartasOcultas = 0;

            function ocultarCartaConRetraso(i) {
                setTimeout(() => {
                    var miInput = document.getElementById(`check${i}`);
                    miInput.checked = false;

                    cartasOcultas++;

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






