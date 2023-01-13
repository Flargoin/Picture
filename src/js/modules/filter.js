const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          items = menu.querySelectorAll('li'),
          btnAll = menu.querySelector('.all'),
          btnLovers = menu.querySelector('.lovers'),
          btnChef = menu.querySelector('.chef'),
          btnGirl = menu.querySelector('.girl'),
          btnGuy = menu.querySelector('.guy'),
          btnGrandmother = menu.querySelector('.grandmother'),
          btnGranddad = menu.querySelector('.granddad'),
          markAll = wrapper.querySelectorAll('.all'),
          markGirl = wrapper.querySelectorAll('.girl'),
          markLovers = wrapper.querySelectorAll('.lovers'),
          markChef = wrapper.querySelectorAll('.chef'),
          markGuy = wrapper.querySelectorAll('.guy'), 
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    }

    function showType(btn, event, mark) {
        btn.addEventListener(event, () => {
            typeFilter(mark);
        });
    }

    showType(btnAll, 'click', markAll);
    showType(btnLovers, 'click', markLovers);
    showType(btnGirl, 'click', markGirl);
    showType(btnChef, 'click', markChef);
    showType(btnGuy, 'click', markGuy);
    showType(btnGrandmother, 'click');
    showType(btnGranddad, 'click');

    menu.addEventListener('click', (e) => {
        let target = e.target;
        if(target && target.tagName == "LI") {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });
}

export default filter;