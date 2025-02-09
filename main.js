const numberOfHearts = 20; // Количество сердечек
const lines = ["Я люблю тебя ночью,",
    "Люблю тебя днем,",
    "Ты и утром, и вечером",
    "В сердце моем.",
    "С Днем влюбленных тебя",
    "Я поздравить хочу!",
    "И на память тебе",
    "Валентинку вручу.",
    "Чтобы знала ты точно",
    "И наверняка,",
    "Что люблю я тебя",
    "На года, на века.",
    "Для меня ты прекраснее",
    "Всех на земле.",
    "Я за встречу с тобой",
    "Благодарен судьбе."
    ];
let lineIndex = 0;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Функция для создания одного сердца
function createHeart() {
    const heartDiv = document.createElement("div");
    heartDiv.setAttribute("class", "heart");

    const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heart.setAttribute("viewBox", "0 0 32 29.6");
    heartDiv.appendChild(heart);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z");
    path.setAttribute("fill", "red");

    heart.appendChild(path);

    const size = getRandom(window.innerHeight / 20, window.innerHeight / 10);
    heartDiv.style.width = `${size}px`;
    heartDiv.style.height = `${size}px`;

    // Рандомная позиция по горизонтали
    const x = getRandom(0, window.innerWidth - size);
    heartDiv.style.left = `${x}px`;

    // Устанавливаем продолжительность анимации в зависимости от размера сердечка
    const duration = getRandom(10, 15); // Длительность анимации от 5 до 10 секунд
    heartDiv.style.animationDuration = `${duration}s`;

    document.querySelector(".hearts").appendChild(heartDiv);

    // Удаляем сердце после завершения анимации
    heartDiv.addEventListener('animationend', () => {
        heartDiv.remove();
    });

    // Создаем новое сердце через 15% от длительности анимации
    setTimeout(createHeart, duration * 0.15 * 1000); // 0.15 * 1000 для преобразования в миллисекунды
}

// Создаем несколько сердечек
for (let i = 0; i < numberOfHearts; i++) {
    createHeart();
}

document.getElementById("start-buton").addEventListener("click", 
    function()
    {
        document.getElementById("ready-text").style.opacity = 0;
        this.style.opacity = 0;
        const panel = document.getElementById("panel");
        panel.style.width = "80%";
        panel.style.transform = "translateY(5%)";
        setTimeout(() => {
            this.style.display = "none";
            panel.style.height = `${calculateTotalHeight(panel)}px`;
        }, 50);
        const poemBlock = document.getElementById("poem-block");
        poemBlock.style.opacity = 0;
        poemBlock.style.display = "flex";
        poemBlock.style.opacity = 1;
        lineIndex = 0;
        setTimeout(() => {
            const textElement = document.getElementById('poem-text');
            textElement.textContent = ""; // Очищаем текст перед началом
            showNextLine(); // Начинаем показывать строки
        }, 1000);
    }
)

function typeWriter(text, element, delay = 100, callback) {
    let index = 0;

    // Функция для показа следующего символа
    function showNextChar() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index); // Добавляем символ
            index++;
            setTimeout(showNextChar, delay); // Рекурсивно вызываем через заданный интервал
        } else {
            element.style.opacity = "1"; // Устанавливаем полную непрозрачность после завершения
            if (callback) callback(); // Вызываем колбек, если он есть
        }
    }

    showNextChar(); // Запускаем процесс
}

function showNextLine() {
    const textElement = document.getElementById('poem-text');
    const panel = document.getElementById("panel");
    panel.style.height = `${calculateTotalHeight(panel)}px`;
    
    if (lineIndex < lines.length) {
        const textToShow = lines[lineIndex];
        textElement.innerHTML += lineIndex != 0 ? "<br>" : "";
        panel.style.height = `${calculateTotalHeight(panel)}px`;
        typeWriter(textToShow, textElement, 50, function() {
            lineIndex++;
            // Задержка перед показом следующей строки
            setTimeout(showNextLine, 500); // Задержка 2 секунды
        });
    }
    else {
        afterPoem();
    }
}

function calculateTotalHeight(container) {
    let totalHeight = 20;
    const children = container.children;

    for (let child of children) {
        totalHeight += child.offsetHeight + 
            parseInt(getComputedStyle(child).marginTop) + 
            parseInt(getComputedStyle(child).marginBottom);
    }

    return totalHeight;
}

function afterPoem()
{
    setTimeout(() => {
        const poemText = document.getElementById("poem-text");
        const panel = document.getElementById("panel");
        const hearts = document.querySelector(".hearts");
        poemText.style.opacity = 0;
        panel.style.width = 0;
        panel.style.height = 0;
        panel.style.opacity = 0;
        document.body.style.backgroundColor = "black";
        hearts.style.opacity = 0;
        setTimeout(function() {
            window.location.href = "tulips/html.html";
        }, 2000);
    }, 3000);
}