/* 
2C = Two of Clover (Tréboles)
2D = Two of Diamont (Diamantes)
2H = Two of Hearts (Corazones)
2S = Two of Spades (Picas) 
*/

let deck =          [];
const tipos =       ['C', 'D', 'H', 'S'];
const especiales =  ['A', 'J', 'Q', 'K'];

const jugadorDiv = document.querySelector('#jugador-cartas');
const computadorDiv = document.querySelector('#computadora-cartas');
let marcadorJ = document.querySelector('#marcadorJ');
let marcadorC = document.querySelector('#marcadorC');

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
    // console.log(deck);
    deck = _.shuffle( deck );    
    console.log(deck);
    return deck;
};

let card = crearDeck();

const pedirCarta = () => {
    // <img src="assets/cartas/2C.png" class="carta" alt=""></img>
    card = _.shuffle(card);
    let seleccion = card.shift();
    
    // let cardVal = seleccion[0];
    let cardVal = seleccion.length > 2 ? seleccion[0]+seleccion[1]:seleccion[0];

    cardVal =   cardVal === 'A' ? 11 :
                cardVal === 'K' ? 10 :
                cardVal === 'Q' ? 10 :
                cardVal === 'J' ? 10 : parseInt(cardVal);    

    marcadorJ.textContent = parseInt(marcadorJ.textContent) + cardVal;
    
    nuevaCarta = document.createElement('img');
    nuevaCarta.classList.add('carta', 'src');
    nuevaCarta.src = `assets/cartas/${seleccion}.png`;
        
    jugadorDiv.appendChild(nuevaCarta);

    // computadorDiv.appendChild(nuevaCarta);

    console.log(card.length);
    if (marcadorJ.textContent == 21) {
        alert('Has Ganado');
    } 
}



const nuevoJuego = () => {
    document.location.reload();
}



const btnPedir = document.querySelector('#pedirCarta').addEventListener('click', pedirCarta);
const btnNuevoJuego = document.querySelector('#nuevoJuego').addEventListener('click', nuevoJuego);





