
function validateAndLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor, completa ambos campos.');
    } else {
      // Ambos campos están llenos, redirigir a otra página
      empezarJuego()
    }
}

validateAndLogin()

//Inserta las los elementos del juego en el dom
function empezarJuego(){

    const emojis = ["🍉","🍉","🥭","🥭","🍐","🍐","🍌","🍌","🍇","🍇","🍑","🍑","🍒","🍒","🥥","🥥",]
    /*Otra forma de mezclar que funciona: var emojis_mezclados = emojis.sort(() => (Math.random() > .5) ? 2 : -1)*/

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
                <p id="movimientos"></p>
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
                    
                }, i * 35);
            }

            for (let i = 0; i < emojis.length; i++) {
                ocultarCartaConRetraso(i);
            }
        });
    }

    //const juegoElement = document.querySelector('.juego');
    var comparando = []
    var recuerdo = []
    var listaEncontrados = []
    var contador = 0
    var referenciaMovimientos = document.querySelector("#movimientos")
    juegoElement.addEventListener('click', function(event) {
        
        if (event.target.tagName === 'INPUT') {
            contador++
            referenciaMovimientos.innerHTML = `${contador}`
            var label = document.querySelector(`label[for=${event.target.id}]`);
            var contenidoLabel = label.textContent;
            console.log(contenidoLabel);
            if (event.target.checked === true) {
                comparando.push(contenidoLabel)

            }

            if (comparando.length === 1 || comparando.length === 2){
                recuerdo.push(event.target.id)
                console.log("Este es un recuerdo de referencia: " + recuerdo);
            }

            
            if (comparando.length === 1) {
                console.log(recuerdo[0]);
                document.querySelector(`#${recuerdo[0]}`).disabled = true;
            }else if (comparando.length === 2){
                document.querySelector(`#${recuerdo[0]}`).disabled = false;
            }

            if(comparando.length === 2){
                console.log("Has revelado 2 cartas");
                if (comparando[0] === comparando[1]) {
                    console.log("Has descubierto una pareja");
                    //Esto hace que las cartas reveladas no se puedan volver a ocultar
                    document.querySelector(`#${recuerdo[0]}`).disabled = true;
                    document.querySelector(`#${recuerdo[1]}`).disabled = true;
                    listaEncontrados.push([recuerdo[0],recuerdo[1]])
                    comparando = []
                    recuerdo = []
                    console.log("Hasta ahora has encontrado estas: "+listaEncontrados);
                }else{
                    console.log("No le acertaste, borrare los recuerdos y las comparaciones y ocultare de nuevo las cartas");
                    for (let i = 0; i < emojis.length; i++) {
                        //esto corrige el bug que se puedan revelar mas de 2 elementos durante 1 turno
                        var miInput = document.getElementById(`check${i}`);
                        if(miInput.checked === false){
                            miInput.disabled = true;
                        }
                    }

                    //Esto hace que las cartas se queden reveladas durante 0.8 segundos antes de volverse a ocultar
                    setTimeout(()=>{
                        var referencia1 = document.getElementById(recuerdo[0]);
                        referencia1.checked = false;
                        var referencia2 = document.getElementById(recuerdo[1]);
                        referencia2.checked = false;
                        comparando = []
                        recuerdo = []
                        habilitarCartas()   
                    },800);

                    function habilitarCartas() {
                        for (let i = 0; i < emojis.length; i++) {
                            //esto vuelve a habilitar las casillas una vez ocultas las parejas erroneas
                            var miInput = document.getElementById(`check${i}`);
                            if (!listaEncontrados.includes(miInput)) {
                                miInput.disabled = false;    
                            }
                        }
                    }
                }
            }
            console.log(comparando);
        }
        console.log(listaEncontrados.length);
        if (listaEncontrados.length === 8) {
            console.log("Has ganado!!");
            for (let i = 0; i < emojis.length; i++) {
                var miInput = document.getElementById(`check${i}`);    
                miInput.disabled = true;
            }
        }
    }); 
}









