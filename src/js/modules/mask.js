// Модуль для создания маски телефона
const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        // Установка фокуса на элементе
        elem.focus();

        // прописываем функционал для установки курсора
        // Если у элемента есть метод setSelectionRange
        if(elem.setSelectionRange) {
            // то устанавливаем курсор по начальной и конечной позиции(так как они одинаковы мы ничего не выделяем, а именно ставим курсор).
            elem.setSelectionRange(pos, pos);
        // Если есть createTextRange (практически тоже самое только для корректной работы в IE)
        } else if(elem.createTextRange) {
            // Диапозон на основе элемента создан.
            let range = elem.createTextRange();

            // Объединение граничных точек диапозона
            range.collapse(true);

            // Конечная точка выделения (символ, позиция)
            range.moveEnd('character', pos);

            // Начальная точка выделения (символ, позиция)
            range.moveStart('character', pos);

            // Выделение между moveEnd и moveStart и установка курсора.
            range.select();
        }
    };

    // Функция которая совершает основной функционал с маской
    function createMask(event) {
        // Матрица - это шаблон в который будет вписан номер
        let matrix = '+7(___) ___ __ __',
        // Итератор
        i = 0,
        // def - получим статичное значение матрицы без лишних знаков
        def = matrix.replace(/\D/g, ''),
        // val - получим динамичное значение введённое пользователем без лишних знаков
        val = this.value.replace(/\D/g, '');

        // если пользователь ничего не ввёл, то ставить в дефолтное положение
        if(def.length >= val.length) {
            val = def;
        }

        // Заполнение маски (в replace мы можем передавать аргументом функцию)
        this.value = matrix.replace(/./g, function(a) {
            /* 
                1) Набор в регулярных выражениях. Например, [_\d] - это нижние подчёркивание и числа.
                2) Метод test() выполняет поиск сопоставления регулярного выражения указанной строке. Возвращает true или false.
                3) i - Итератор и длина строки val сравниваються (i < val.length): 
                    - Если true переход на следующий символ
                    - Если false( i >= val.length):
                        = true => ''
                        = false => a
            */
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        // Если теряем фокус с инпута и длина строки равна 2, то очищать инпут.
        if(event.type === 'blur') {
            if(this.value.length === 2) {
                this.value = '';
            }
        // Если это другое событие, например focus вызываем функцию установки курсора
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    // Получаем инпуты со страницы
    let inputs = document.querySelectorAll(selector);

    // Всем инпутам назначаем обработчики события input, focus, blur
    inputs.forEach(item => {
        item.addEventListener('input', createMask);
        item.addEventListener('keypress', createMask);
        item.addEventListener('focus', createMask);
        item.addEventListener('blur', createMask);
    });
}
export default mask;

/* 
    ДЗ. Исправление багов
    1) Баг приклике в инпуте перед маской 
    2) Автозаполнение полей где запрещено использовать латиницу +
*/