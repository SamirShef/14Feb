const numberOfHearts = 20; // Количество сердечек

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
    setTimeout(createHeart, duration * 0.15 * 1000); // 0.1 * 1000 для преобразования в миллисекунды
}

// Создаем несколько сердечек
for (let i = 0; i < numberOfHearts; i++) {
    createHeart();
}
