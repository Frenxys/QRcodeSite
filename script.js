document.getElementById('generate-btn').addEventListener('click', function() {
    const urlInput = document.getElementById('url-input').value;
    const qrCodeContainer = document.getElementById('qr-code-container');
    const color = document.getElementById('color-picker').value; // Colore selezionato dall'utente

    // Resetta il contenuto del div ogni volta che si genera un nuovo QR code
    qrCodeContainer.innerHTML = '';

    if (urlInput) {
        // Genera il QR code con il colore selezionato e lo inserisce nel div
        QRCode.toCanvas(document.createElement('canvas'), urlInput, {
            color: {
                dark: color, // Colore del QR code
                light: "#FFFFFF" // Sfondo del QR code (bianco)
            }
        }, function (error, canvas) {
            if (error) console.error(error);
            qrCodeContainer.appendChild(canvas);  // Aggiunge il canvas con il QR code al div
        });

        // Mostra il pulsante "Crea nuovo QRCode"
        document.getElementById('reset-btn').style.display = 'inline-block';
    }
});

document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('url-input').value = ''; // Resetta il campo input
    document.getElementById('qr-code-container').innerHTML = ''; // Pulisce il QR code precedente
    document.getElementById('reset-btn').style.display = 'none'; // Nasconde il pulsante "Crea nuovo QRCode"
});
