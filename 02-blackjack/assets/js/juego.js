/* 
2C = Two of Clover (Tréboles)
2D = Two of Diamont (Diamantes)
2H = Two of Hearts (Corazones)
2S = Two of Spades (Picas) 
*/

let deck =          [];
const tipos =       ['C', 'D', 'H', 'S'];
const especiales =  ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJ = document.querySelector('#jugador-cartas');
const divCartasC = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

// const marcadorJ = document.querySelector('#marcadorJ');
// const marcadorC = document.querySelector('#marcadorC');

const crearDeck = () => {
    
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push( i + tipo );
        }        
    }
    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle( deck );        
    // console.table(deck);
    return deck;
};

crearDeck();

const pedirCarta = () => {

    if (deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}
// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    
    // Esta manera es con expresion regular
    // const valor = carta.replace(regex, '');

    
    // let puntos = 0;
    //     puntos = ( isNaN(valor)) ? 
    //         puntos = (valor === 'A') ? 11 : 10 
    //     : puntos = valor * 1;

    return ( isNaN(valor) )     ? 
                (valor === 'A') ? 11 : 10 
            : valor * 1;


    // if ( isNaN(valor) ) {
        
    //     puntos = ( valor === 'A' ) ? 11 : 10;
        
    // } else {
    //     puntos = valor * 1;
    // }    
}

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {

        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        // console.log(puntosComputadora);
        puntosHTML[1].textContent = puntosComputadora;
        
        let nuevaCartaHtml = document.createElement('img');
        nuevaCartaHtml.classList.add('carta');
        nuevaCartaHtml.src = `assets/cartas/${carta}.png`;
        divCartasC.append(nuevaCartaHtml);

        if (puntosMinimos > 21) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {        
        
        if (( puntosJugador > puntosComputadora) && (puntosJugador < 21) || (puntosComputadora > 21) ) {
            alert('Gana el Jugador');
        } else if (puntosJugador === puntosComputadora) {
            alert('No gana nadie');
        } else {
            alert('Gana la computadora');
        }
        
    }, 10);
}

// esta es la expresion regular para este ejercicio
// const regex = /[CDHS]/g;

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    // console.log(puntosJugador);
    puntosHTML[0].textContent = puntosJugador;
    
    let nuevaCartaHtml = document.createElement('img');
    nuevaCartaHtml.classList.add('carta');
    nuevaCartaHtml.src = `assets/cartas/${carta}.png`;
    divCartasJ.append(nuevaCartaHtml);

    if (puntosJugador > 21) {
        // console.warn('Has perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        // console.warn('21 genial ');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    
});

btnDetener.addEventListener('click', () => {
    turnoComputadora(puntosJugador);
    btnPedir.disabled = true;
    btnDetener.disabled = true;
});

btnNuevo.addEventListener('click', () => {
    crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosHTML[0].textContent = 0;
    puntosHTML[1].textContent = 0;
    puntosComputadora = 0;
    puntosJugador = 0;
    divCartasJ.textContent = '';
    divCartasC.textContent = '';
});