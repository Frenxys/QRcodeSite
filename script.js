// Funzionalità per generare QR Code
document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.innerHTML = '';

    if (url.trim() === "") {
        alert("Per favore, inserisci un link valido.");
        return;
    }

    // Genera il QR Code
    $('#qr-code-container').qrcode({
        text: url,
        width: 128,
        height: 128
    });
});

// Funzione per generare bolle
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 50 + 20; // dimensione variabile
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.top = `${window.innerHeight}px`; // Inizia dal fondo
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    
    // Colore verde
    bubble.style.background = 'rgba(60, 179, 113, 0.6)'; // Verde

    document.body.appendChild(bubble);

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


// Crea bolle in continuazione
setInterval(createBubble, 500);
