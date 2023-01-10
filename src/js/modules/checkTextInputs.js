const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(item => {
        item.setAttribute('autocomplete', 'off');
        item.addEventListener('keypress', function(e) {
            if(e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
}
export default checkTextInputs;