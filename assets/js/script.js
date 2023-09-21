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
                card.querySelector('.canvas').style.backgroundColor = '#' + randomColor;
                card.querySelector('.hex').innerHTML = '#' + randomColor;
            } else {
                card.querySelector('.canvas').style.backgroundColor = '#ffffff';
                card.querySelector('.hex').innerHTML = '#ffffff';
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
