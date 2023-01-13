const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result),
          selects = document.querySelectorAll('.calc_form select');

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round(((+sizeBlock.value) * (+materialBlock.value)) + (+optionsBlock.value));

        if(sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if(promocodeBlock.value == "IWANTPOPART") {
            resultBlock.textContent = Math.round(+sum * 0.7);
            state.result = Math.round(+sum * 0.7);
        } else {
            resultBlock.textContent = +sum;
            if(sizeBlock.value && materialBlock.value || sizeBlock.value && materialBlock.value && promocodeBlock.value) {
                state.result = +sum;
            }
        }

        function updateObject(select, value, key, block) {
            if(select.getAttribute('id') === value) {
                state[key] = block.value;
            }
        }
    
        selects.forEach(item => {
            updateObject(item, 'size', 'size', sizeBlock);
            updateObject(item, 'material', 'material', materialBlock);
            updateObject(item, 'options', 'option', optionsBlock);
        });

        console.log(state);
    }

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
}

export default calc;