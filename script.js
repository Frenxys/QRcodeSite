let currentUrl = ""; // Variabile globale per mantenere il link attuale
let qrCodeStyling; // Istanza di QRCodeStyling
const dotStyles = ["square", "rounded", "dots"]; // Array degli stili dei dots
let currentDotStyleIndex = 0; // Indice dello stile attuale

// Event listener per il bottone "Genera QR Code"
document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value.trim();
    const downloadBtn = document.getElementById('download-btn');
    const dotsStyleIcon = document.getElementById('dots-style-icon');
    const qrCodeContainer = document.getElementById('qr-code-container');

    if (url === "") {
        alert("Per favore, inserisci un link valido.");
        return;
    }

    // Memorizza il link attuale
    currentUrl = url;

    // Aggiungi effetto di scossa al pulsante
    this.classList.add('shake');
    setTimeout(() => this.classList.remove('shake'), 500); // Rimuovi la classe dopo 500 ms

    // Genera il QR code con lo stile predefinito
    generateQRCode(currentUrl);

    // Mostra i pulsanti di download e l'icona di cambio stile
    downloadBtn.style.display = 'inline-block';
    dotsStyleIcon.style.display = 'inline-block'; // Mostra l'icona
});

// Funzione per generare il QR Code
function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const color = document.getElementById('color-picker').value;

    // Pulisci il contenuto del div prima di generare un nuovo QR Code
    qrCodeContainer.innerHTML = ""; // Rimuovi il vecchio QR code

    // Crea una nuova istanza di QRCodeStyling con lo stile attuale
    qrCodeStyling = new QRCodeStyling({
        width: 256,
        height: 256,
        data: url,
        dotsOptions: {
            color: color, // Colore dei dots
            type: dotStyles[currentDotStyleIndex] // Tipo di dots
        },
        backgroundOptions: {
            color: "#ffffff" // Sfondo bianco
        },
        imageOptions: {
            crossOrigin: "anonymous",
        }
    });

    // Renderizza il QR code nel div
    qrCodeStyling.append(qrCodeContainer);
}

// Funzione per cambiare lo stile dei dots
document.getElementById('dots-style-icon').addEventListener('click', function() {
    // Incrementa l'indice per cambiare stile
    currentDotStyleIndex = (currentDotStyleIndex + 1) % dotStyles.length; // Torna all'inizio se supera la lunghezza

    // Aggiorna lo stile dei dots e rigenera il QR code
    qrCodeStyling.update({
        dotsOptions: {
            type: dotStyles[currentDotStyleIndex] // Nuovo stile
        }
    });
});

// Funzione per preparare il download del QR Code
document.getElementById('download-btn').addEventListener('click', function() {
    qrCodeStyling.download({
        name: 'qrcode',
        extension: 'png'
    });
});

// Event listener per il color picker per cambiare il colore dinamicamente
document.getElementById('color-picker').addEventListener('input', function() {
    if (currentUrl !== "") {
        // Se c'è un URL già generato, aggiorna il QR code con il nuovo colore
        qrCodeStyling.update({
            dotsOptions: {
                color: this.value
            }
        });
    }
});



// Funzione per generare bolle animate
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Genera una dimensione variabile per la bolla
    const size = Math.random() * 50 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.top = `${window.innerHeight}px`; // Inizia dal fondo
    bubble.style.left = `${Math.random() * window.innerWidth}px`; // Posizione orizzontale casuale
    document.body.appendChild(bubble);

    // Aggiungi evento click per esplodere la bolla
    bubble.addEventListener('click', function() {
        explodeBubble(bubble);
    });

    // Anima la bolla in salita
    let bubbleAnimation = setInterval(() => {
        const bubbleRect = bubble.getBoundingClientRect();
        bubble.style.top = `${bubbleRect.top - 1}px`; // Sali di 1 pixel per frame

        // Rimuovi la bolla se esce dallo schermo
        if (bubbleRect.top + size < 0) {
            clearInterval(bubbleAnimation);
            document.body.removeChild(bubble);
        }
    }, 30); // Intervallo di 30 ms per il movimento fluido
}

// Funzione per esplodere la bolla e generare piccole bolle figlie
function explodeBubble(bubble) {
    const bubbleRect = bubble.getBoundingClientRect();
    document.body.removeChild(bubble); // Rimuovi la bolla originale

    // Genera bolle figlie
    for (let i = 0; i < 10; i++) {
        createMiniBubble(bubbleRect.left + bubbleRect.width / 2, bubbleRect.top + bubbleRect.height / 2);
    }
}

// Funzione per creare una mini bolla che si allontana dalla posizione iniziale
function createMiniBubble(x, y) {
    const miniBubble = document.createElement('div');
    miniBubble.classList.add('bubble');
    const size = Math.random() * 10 + 5; // Bolle più piccole
    miniBubble.style.width = `${size}px`;
    miniBubble.style.height = `${size}px`;
    miniBubble.style.position = 'absolute';
    miniBubble.style.top = `${y}px`;
    miniBubble.style.left = `${x}px`;

    document.body.appendChild(miniBubble);

    // Direzione casuale
    const angle = Math.random() * 2 * Math.PI; // Angolo casuale tra 0 e 360 gradi
    const speed = Math.random() * 2 + 1; // Velocità casuale per la bolla

    // Movimento delle mini bolle
    let miniBubbleAnimation = setInterval(() => {
        const miniBubbleRect = miniBubble.getBoundingClientRect();
        miniBubble.style.left = `${miniBubbleRect.left + Math.cos(angle) * speed}px`;
        miniBubble.style.top = `${miniBubbleRect.top + Math.sin(angle) * speed}px`;

        // Rimuovi la mini bolla dopo un certo tempo
        if (miniBubbleRect.top < -50 || miniBubbleRect.left < -50 || miniBubbleRect.left > window.innerWidth + 50) {
            clearInterval(miniBubbleAnimation);
            document.body.removeChild(miniBubble);
        }
    }, 20); // Intervallo per aggiornamento rapido del movimento

    // Esplosione della mini bolla dopo un tempo random
    setTimeout(() => {
        clearInterval(miniBubbleAnimation);
        document.body.removeChild(miniBubble); // Rimuovi la bolla
    }, Math.random() * 1000 + 500); // Esplosione casuale tra 500ms e 1500ms
}

// Crea bolle in continuazione ogni 500ms
setInterval(createBubble, 900);
