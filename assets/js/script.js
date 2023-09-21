document.addEventListener('DOMContentLoaded', () => {

    const downloadTxtBtn = document.getElementById('downloadTxt');
    const downloadPngBtn = document.getElementById('downloadPng');
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    const cards = document.querySelectorAll('.card');
    const hex = document.querySelectorAll('.hex');

    const generateColors = () => {
        const numColors =  5;

        cards.forEach((card, index) => {
            if (index < numColors) {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                const hexValue = '#' + randomColor;
                card.querySelector('.canvas').style.backgroundColor = hexValue;
                card.querySelector('.hex').innerHTML = hexValue;

                // Add click event listener to copy hex value
                card.addEventListener('click', function() {
                    const hexText = this.querySelector('.hex').innerHTML;
                    const tempInput = document.createElement('input');
                    tempInput.value = hexText;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);

                    // Display toast notification
                    const toast = document.createElement('div');
                    toast.classList.add('toast');
                    toast.innerText = `Copied ${hexText} to clipboard!`;
                    document.body.appendChild(toast);

                    setTimeout(() => {
                        toast.style.opacity = '1';
                    }, 100);

                    setTimeout(() => {
                        toast.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(toast);
                        }, 300);
                    }, 3000);
                });
            } else {
                card.querySelector('.canvas').style.backgroundColor = '#ffffff';
                card.querySelector('.hex').innerHTML ='#ffffff';
                card.removeEventListener('click', function() {});
            }
        });
    };

    downloadTxtBtn.addEventListener('click', () => {
        const hexCodes = Array.from(hex).map(element => '#' + element.innerHTML.slice(1) + '\r\n').join(''); // Add '#' and newline
        const blob = new Blob([hexCodes], { type: 'text/plain' });

        const reader = new FileReader();
        reader.onload = function () {
            const link = document.createElement('a');
            link.href = reader.result;
            link.download = 'color_palette.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        reader.readAsDataURL(blob);
    });

    downloadPngBtn.addEventListener('click', () => {
        const cardsContainer = document.querySelector('.cards');

        const targetWidth = 1000;
        const targetHeight = 400;
        const backgroundColor = '#EBEBF3';

        cardsContainer.style.height = `${targetHeight}px`;
        cardsContainer.style.backgroundColor = backgroundColor;

        domtoimage.toBlob(cardsContainer, { width: targetWidth, height: targetHeight })
            .then(function (blob) {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'color_palette.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .finally(() => {
                cardsContainer.style.height = '';
                cardsContainer.style.backgroundColor = '';
            });
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            generateColors();
            main.removeAttribute('hidden');
            intro.setAttribute('hidden', '');
        }
    });

});
