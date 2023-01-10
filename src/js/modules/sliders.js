/* 
    slides - слайды
    dir - направление движения слайдов
    prev next - стрелки переключения
*/
const sliders = (slides, dir, prev, next) => {
    // slideIndex - показывает на каком мы слайде
    let slideIndex = 1,
    // paused - переменная нужна для того чтобы тормозить анимацию при наведении на слайдер
        paused = false;
    // Получение всех слайдов со страницы
    const items = document.querySelectorAll(slides);

    // Функция показа определённого слайда
    function showSlides(n) {
        // Проверка что индекс не превышает кол-во слайдов
        if(n > items.length) {
            slideIndex = 1;
        }
        // Проверка что индекс не 0 и не отрицателен
        if(n < 1) {
            slideIndex = items.length;
        }

        // Назначение каждому слайду класса и сокрытие слайдов.
        items.forEach( item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        // Показать текущий слайд (так как стоит slideIndex = 1 , а отсчёт идёт с 0 , мы совершаем [slideIndex - 1])
        items[slideIndex - 1].style.display = 'block';
    }    

    // Показываем первый слайд дефолтно.
    showSlides(slideIndex);

    // Функция перелистывания вперёд или назад на n слайдов
    function plusSlides(n) {
        // вызываем функцию показа слайдов.
        showSlides(slideIndex += n);
    }

    // конструкция try/catch, на случай если будет ошибка не сломать весь проект.
    try {
        // Получаем стрелки со страницы
        const nextArrow = document.querySelector(next),
              prevArrow = document.querySelector(prev);

        // Вешаем обработчик событий для стрелки 'НАЗАД'
        prevArrow.addEventListener('click', () => {
            // Вызываем функцию перелистывания на -1 слайд
            plusSlides(-1);
            // Добавляем и убираем классы анимаций
            items[slideIndex - 1].classList.add('slideInLeft');
            items[slideIndex - 1].classList.remove('slideInRight');
        });
        
        // Вешаем обработчик событий для стрелки 'ВПЕРЁД'
        nextArrow.addEventListener('click', () => {
            // Вызываем функцию перелистывания на 1 слайд
            plusSlides(1);
            // Добавляем и убираем классы анимаций
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
    // Пока catch можно оставить пустым. Уже такая конструкция не даст проекту упасть.
    } catch(e) {}

    // Функция автоматического перелистования слайдов
    function activateAnimation() {
        // Если направление слайдера вертикальное
        if(dir === 'vertical') {
            // Записывать id setInterval в paused
            paused = setInterval(function() {
                // Вызываем функцию перелистывания на 1 слайд
                plusSlides(1);
                 // Добавляем класс анимации
                items[slideIndex - 1].classList.add('slideInDown');
            }, 5000);
        } else {
            // Записывать id setInterval в paused
            paused = setInterval(function() {
                // Вызываем функцию перелистывания на 1 слайд
                plusSlides(1);
                // Добавляем и убираем классы анимаций
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            }, 5000);
        }
    }

    // Вызываем функцию автоматического перелистования слайдов
    activateAnimation();


    // Обращаемся к слайдеру и вешаем на него обработчик события "Наведение мыши", и останавливаем анимацию перелистования.
    items[0].parentNode.addEventListener('mouseenter', ()=> {
        clearInterval(paused);
    });
    // Обращаемся к слайдеру и вешаем на него обработчик события "Убрал курсор мыши", и восстанавливаем анимацию перелистования.
    items[0].parentNode.addEventListener('mouseleave', ()=> {
        activateAnimation();
    });
}

export default sliders;