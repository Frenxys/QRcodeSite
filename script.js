let currentUrl = ""; // Variabile globale per mantenere il link attuale

// Event listener per il bottone "Genera QR Code"
document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value.trim();
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

    // Genera il QR code con il colore scelto
    generateQRCode(currentUrl);
});

// Funzione per generare il QR Code
function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const color = document.getElementById('color-picker').value;

    // Pulisci il contenuto del div prima di generare un nuovo QR Code
    qrCodeContainer.innerHTML = ""; // Rimuovi il vecchio QR code

    // Crea un nuovo QRCode con il colore selezionato
    new QRCode(qrCodeContainer, {
        text: url,
        width: 256,
        height: 256,
        colorDark: color, // Colore scuro del QR code
        colorLight: "#ffffff", // Colore di sfondo del QR code (bianco)
        correctLevel: QRCode.CorrectLevel.H // Livello di correzione degli errori
    });

    // Rimuovi l'effetto di dissolvenza per un aggiornamento più veloce
}

// Event listener per il color picker per cambiare il colore dinamicamente
document.getElementById('color-picker').addEventListener('input', function() {
    if (currentUrl !== "") {
        // Se c'è un URL già generato, rigenera il QR code con il nuovo colore
        generateQRCode(currentUrl);
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

// Funzione per esplodere la bolla al click
function explodeBubble(bubble) {
    document.body.removeChild(bubble);
}

// Crea bolle in continuazione ogni 500ms
setInterval(createBubble, 500);
