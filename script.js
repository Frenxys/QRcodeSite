document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    
    if (url.trim() === "") {
        alert("Per favore, inserisci un link valido.");
        return;
    }

    // Cancella il QR code precedente se presente
    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.innerHTML = '';

    // Genera il nuovo QR Code
    const canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, url, function(error) {
        if (error) {
            console.error(error);
            alert("Errore nella generazione del QR Code.");
        } else {
            // Mostra il pulsante di download solo dopo la generazione del QR code
            document.getElementById('download-btn').style.display = 'inline-block';
        }
    });

    qrCodeContainer.appendChild(canvas);
});

// Aggiungi funzionalità di download
document.getElementById('download-btn').addEventListener('click', function() {
    const canvas = document.querySelector('#qr-code-container canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr_code.png';
        link.click();
    } else {
        alert("Nessun QR Code generato per il download.");
    }
});
