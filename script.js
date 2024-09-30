let currentUrl = ""; // Variabile globale per mantenere il link attuale
let qrCodeStyling; // Istanza di QRCodeStyling
let logoUrl = ""; // URL del logo caricato
const dotStyles = ["square", "rounded", "dots"]; // Array degli stili dei dots
let currentDotStyleIndex = 0; // Indice dello stile attuale

// Event listener per la bolla di caricamento logo
document.getElementById('upload-logo-bubble').addEventListener('click', function() {
    document.getElementById('logo-input').click(); // Clicca sul file input
});

// Event listener per il caricamento del logo
document.getElementById('logo-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoUrl = e.target.result; // Imposta l'URL del logo caricato
            generateQRCode(currentUrl); // Rigenera il QR code con il logo
        };
        reader.readAsDataURL(file); // Leggi il file come URL data
    }
});

// Event listener per il bottone "Genera QR Code"
document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value.trim();
    const downloadBtn = document.getElementById('download-btn');
    const dotsStyleIcon = document.getElementById('dots-style-icon');

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

    downloadBtn.style.display = 'inline-block';
    dotsStyleIcon.style.display = 'inline-block'; // Mostra l'icona
});

// Funzione per generare il QR Code
function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const color = document.getElementById('color-picker').value;

    if (qrCodeStyling) {
        qrCodeStyling.update({
            data: url,
            image: logoUrl,
            dotsOptions: {
                color: color,
                type: dotStyles[currentDotStyleIndex]
            }
        });
    } else {
        qrCodeStyling = new QRCodeStyling({
            width: 256,
            height: 256,
            data: url,
            image: logoUrl,
            dotsOptions: {
                color: color,
                type: dotStyles[currentDotStyleIndex]
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: 10
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            canvas: true,
            qrOptions: {
                errorCorrectionLevel: 'H',
            }
        });
        qrCodeStyling.append(qrCodeContainer); // Aggiungi il QR code al contenitore
    }
}

// Event listener per il pulsante di download
document.getElementById('download-btn').addEventListener('click', function() {
    qrCodeStyling.download({ name: "qr-code", extension: "png" }); // Scarica il QR code come immagine
});

// Event listener per cambiare lo stile dei dots
document.getElementById('dots-style-icon').addEventListener('click', function() {
    currentDotStyleIndex = (currentDotStyleIndex + 1) % dotStyles.length; // Cambia indice
    generateQRCode(currentUrl); // Rigenera il QR code con il nuovo stile
});

// Event listener per il selettore di colore
document.getElementById('color-picker').addEventListener('input', function() {
    generateQRCode(currentUrl); // Rigenera il QR code con il nuovo colore
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
