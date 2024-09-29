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
        }
    });

    qrCodeContainer.appendChild(canvas);
});
