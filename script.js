let currentUrl = ""; // Variabile globale per mantenere il link attuale

document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    const qrCodeContainer = document.getElementById('qr-code-container');

    if (url.trim() === "") {
        alert("Per favore, inserisci un link valido.");
        return;
    }

    // Memorizza il link attuale
    currentUrl = url;

    // Aggiungi effetto di scossa
    this.classList.add('shake');
    setTimeout(() => this.classList.remove('shake'), 500); // Rimuovi la classe dopo 500 ms

    // Chiama la funzione per generare il QR code con il colore scelto
    generateQRCode(currentUrl);
});

// Funzione per generare il QR Code
function generateQRCode(url) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    const color = document.getElementById('color-picker').value;

    // Pulisci il contenuto del div prima di generare un nuovo QR Code
    qrCodeContainer.innerHTML = ""; // Rimuovi il vecchio QR code

    // Crea un nuovo QRCode con il colore attuale
    new QRCode(qrCodeContainer, {
        text: url,
        width: 256,
        height: 256,
        colorDark: color, // Colore scuro del QR code
        colorLight: "#ffffff", // Colore di sfondo del QR code (bianco)
        correctLevel: QRCode.CorrectLevel.H // Livello di correzione degli errori
    });

    // Effetto di dissolvenza per il QR Code
    $(qrCodeContainer).hide().fadeIn(500); // Dissolvenza in 500 ms
}

// Event listener per cambiare il colore dinamicamente
document.getElementById('color-picker').addEventListener('input', function() {
    if (currentUrl.trim() !== "") {
        // Se c'è un URL già generato, rigenera il QR code con il nuovo colore
        generateQRCode(currentUrl);
    }
});



// Funzione per generare bolle
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 50 + 20; // Dimensione variabile
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.top = `${window.innerHeight}px`; // Inizia dal fondo
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    document.body.appendChild(bubble);

    // Aggiungi evento click per esplodere la bolla
    bubble.addEventListener('click', function() {
        explodeBubble(bubble);
    });

    // Animazione delle bolle
    let bubbleAnimation = setInterval(() => {
        const bubbleRect = bubble.getBoundingClientRect();
        bubble.style.top = `${bubbleRect.top - 1}px`; // Sali di 1 pixel

        // Rimuovi la bolla se esce dallo schermo
        if (bubbleRect.top + size < 0) {
            clearInterval(bubbleAnimation);
            document.body.removeChild(bubble);
        }
    }, 30);
}

// Funzione per esplodere la bolla
function explodeBubble(bubble) {
    document.body.removeChild(bubble);
}

// Crea bolle in continuazione
setInterval(createBubble, 500);
