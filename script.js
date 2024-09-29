document.getElementById('generate-btn').addEventListener('click', function() {
    const urlInput = document.getElementById('url-input').value;
    const qrCodeCanvas = document.getElementById('qr-code');
    if (urlInput) {
        // Genera il QR code usando la libreria qrcode.js
        QRCode.toCanvas(qrCodeCanvas, urlInput, function (error) {
            if (error) console.error(error);
            console.log('QR code generato!');
        });
        document.getElementById('reset-btn').style.display = 'inline-block'; // Mostra il pulsante "Crea nuovo QRCode"
    }
});

document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('url-input').value = ''; // Resetta il campo input
    const qrCodeCanvas = document.getElementById('qr-code');
    const context = qrCodeCanvas.getContext('2d');
    context.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height); // Pulisce il QR code precedente
    document.getElementById('reset-btn').style.display = 'none'; // Nasconde il pulsante "Crea nuovo QRCode"
});
