let currentUrl = "";
let qrCodeStyling;
let logoUrl = "";
const dotStyles = ["square", "rounded", "dots"];
let currentDotStyleIndex = 0;

document.getElementById('upload-logo-bubble').addEventListener('click', function() {
    document.getElementById('logo-input').click();
});

document.getElementById('logo-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoUrl = e.target.result;
            generateQRCode(currentUrl);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('generate-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value.trim();
    const downloadBtn = document.getElementById('download-btn');
    const dotsStyleIcon = document.getElementById('dots-style-icon');

    if (url === "") {
        alert("Per favore, inserisci un link valido.");
        return;
    }

    currentUrl = url;

    this.classList.add('shake');
    setTimeout(() => this.classList.remove('shake'), 500);

    generateQRCode(currentUrl);

    downloadBtn.style.display = 'inline-block';
    dotsStyleIcon.style.display = 'inline-block';
});

document.getElementById('reset-btn').addEventListener('click', function() {
    currentUrl = "";
    logoUrl = "";
    currentDotStyleIndex = 0;
    document.getElementById('url-input').value = "";
    document.getElementById('qr-code-container').innerHTML = "";
    document.getElementById('download-btn').style.display = 'none';
    document.getElementById('dots-style-icon').style.display = 'none';
});

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
        qrCodeStyling.append(qrCodeContainer);
    }
}

document.getElementById('download-btn').addEventListener('click', function() {
    qrCodeStyling.download({ name: "qr-code", extension: "png" });
});

document.getElementById('dots-style-icon').addEventListener('click', function() {
    currentDotStyleIndex = (currentDotStyleIndex + 1) % dotStyles.length;
    generateQRCode(currentUrl);
});

document.getElementById('color-picker').addEventListener('input', function() {
    generateQRCode(currentUrl);
});



function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 50 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.top = `${window.innerHeight}px`; 
    bubble.style.left = `${Math.random() * window.innerWidth}px`; 
    document.body.appendChild(bubble);


    bubble.addEventListener('click', function() {
        explodeBubble(bubble);
    });


    let bubbleAnimation = setInterval(() => {
        const bubbleRect = bubble.getBoundingClientRect();
        bubble.style.top = `${bubbleRect.top - 1}px`; 

        if (bubbleRect.top + size < 0) {
            clearInterval(bubbleAnimation);
            document.body.removeChild(bubble);
        }
    }, 30); 
}

function explodeBubble(bubble) {
    const bubbleRect = bubble.getBoundingClientRect();
    document.body.removeChild(bubble); 

    for (let i = 0; i < 10; i++) {
        createMiniBubble(bubbleRect.left + bubbleRect.width / 2, bubbleRect.top + bubbleRect.height / 2);
    }
}

function createMiniBubble(x, y) {
    const miniBubble = document.createElement('div');
    miniBubble.classList.add('bubble');
    const size = Math.random() * 10 + 5; 
    miniBubble.style.width = `${size}px`;
    miniBubble.style.height = `${size}px`;
    miniBubble.style.position = 'absolute';
    miniBubble.style.top = `${y}px`;
    miniBubble.style.left = `${x}px`;

    document.body.appendChild(miniBubble);

    const angle = Math.random() * 2 * Math.PI; 
    const speed = Math.random() * 2 + 1; 

    let miniBubbleAnimation = setInterval(() => {
        const miniBubbleRect = miniBubble.getBoundingClientRect();
        miniBubble.style.left = `${miniBubbleRect.left + Math.cos(angle) * speed}px`;
        miniBubble.style.top = `${miniBubbleRect.top + Math.sin(angle) * speed}px`;

        if (miniBubbleRect.top < -50 || miniBubbleRect.left < -50 || miniBubbleRect.left > window.innerWidth + 50) {
            clearInterval(miniBubbleAnimation);
            document.body.removeChild(miniBubble);
        }
    }, 20);

    setTimeout(() => {
        clearInterval(miniBubbleAnimation);
        document.body.removeChild(miniBubble); 
    }, Math.random() * 1000 + 500); 
}

setInterval(createBubble, 900);
