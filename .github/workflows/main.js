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

    // Рандомный размер (от 30% до 60% от оригинального размера)
    const size = getRandom(30, 60);
    heartDiv.style.width = `${size}px`;
    heartDiv.style.height = `${size}px`;

    // Рандомный угол поворота (от -30 до 30 градусов)
    const rotation = getRandom(-30, 30);
    heartDiv.style.transform = `rotate(${rotation}deg)`;

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

    // Создаем новое сердце через 30% от длительности анимации
    setTimeout(createHeart, duration * 0.3 * 1000); // 0.6 * 1000 для преобразования в миллисекунды
}

// Создаем несколько сердечек
for (let i = 0; i < numberOfHearts; i++) {
    createHeart();
}
