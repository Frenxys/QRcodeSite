// Funzione per rendere la finestra draggabile
const dragElement = (el) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
};

// Attiva il drag sulla finestra
const draggableWindow = document.getElementById('draggable-window');
dragElement(draggableWindow);

// Funzione per generare QR Code
document.getElementById('generate-btn').addEventListener('click', function() {
    const urlInput = document.getElementById('url-input');
    const url = urlInput.value;

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

    // Svuota il campo di input
    urlInput.value = "";
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
        alert(
