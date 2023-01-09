const forms = () => {
    /* 
        forms - все формы на странице
        inputs - все инпуты со страницы
        upload - все инпуты с атрибутом name = upload со страницы
    */
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name = "upload"]');

    // Объект с оповещениями
    const message = {
        // Текстовые оповещения
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...',
        // Картинки (визуальное оповещение)
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    }

    // Функция отправки данных
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    // Объект с путями для отправки данных
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    /* Функция очистки инпутов */
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });

        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    }

    // Часть кода которая вытаскивает имя файла, в случаи если имя длинное оно обрезается и заменяет текст соседнего блока.
    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    });

    // Перебор всех форм
    forms.forEach(item => {
        // Событие отправки на каждую форму.
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // Создаём блок для оповещений
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage); 
            
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            // Создаём элемент img для визуального оповещения
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            /* Создаём элемент div для текстового оповещения */
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            // Собираем данные из формы и определяем по какому пути их отправить
            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            // Вызываем функцию отправки данных и обрабатываем промис
            postData(api, formData)
            .then((res) => {
                console.log(res);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
            })
            .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure;
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.remove();
                    clearInputs();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                }, 5000)
            });
        });
    });
}

export default forms; 