// Подгружаем карточки если их нужно подгружать с сервера
import { getResource } from "../services/reqeusts";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    btn.addEventListener('click', function() {
        // Также можно обратиться к файлу json напрямую assets/db.json
        getResource('http://localhost:3000/styles')
        // Если обращаемся к файлу напрямую, то нужно передавать в функцию res.styles
        .then(res => createCards(res))
        .catch(error => console.log(error))
        
        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');

            card.innerHTML = `
            <div class="styles-block">
                <img src=${src} alt="style">
                <h4>${title}</h4>
                <a href="#">${link}</a>
            </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }
}

export default showMoreStyles;