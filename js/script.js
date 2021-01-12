
window.addEventListener('DOMContentLoaded', () => {


     //TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContenet () {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show' , 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent (i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show' , 'fade');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContenet();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if(target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContenet();
                        showTabContent(i);
                    }
                });
            }

        });

        //TIMER 

        const deadline = '2021-01-19';

        function getTimeRemaining (endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60  * 24)),
                hours = Math.floor(t / (1000 * 60 * 60  ) % 24),
                minutes = Math.floor(t / (1000 * 60  ) % 60),
                seconds = Math.floor(t / (1000 ) % 60);

            return {
                'total' : t,
                'days': days,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }

        console.log(getTimeRemaining(deadline));

        
            function noneZero (a) {
                if (a < 10 && a>=0) {
                    return `0${a}`;
                } else {
                    return a;
                }
            } 

        function setClock (selector , endtime) {
            const clock = document.querySelector(selector),
                days = clock.querySelector('#days'),
                hours = clock.querySelector('#hours'),
                minutes = clock.querySelector('#minutes'),
                seconds = clock.querySelector('#seconds'),
                timeinterval = setInterval(updateClock , 1000);

                updateClock();
                
                function updateClock () {
                    const t = getTimeRemaining(endtime);

                    days.innerHTML = noneZero(t.days);
                    hours.innerHTML = noneZero(t.hours);
                    minutes.innerHTML = noneZero(t.minutes);
                    seconds.innerHTML = noneZero(t.seconds);

                    if(t.total <= 0) {
                        clearInterval(timeinterval);
                    }
                }

        }

        setClock ('.timer', deadline);


        //MODAL

        const btnsShowModal = document.querySelectorAll('[data-showmodal]'),
            btnHideModal = document.querySelector('.modal__close'),
            modal = document.querySelector('.modal');


        btnsShowModal.forEach((btns) => {
            btns.addEventListener('click' , showModal);
        });

        function showModal () {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearTimeout(modalTimer);
        }

        function hideModal () {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';            
        }

        btnHideModal.addEventListener('click', hideModal);

        modal.addEventListener('click' , (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        document.addEventListener('keydown' , (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                hideModal();
            }
        });

        const modalTimer = setTimeout(showModal , 3000);

        function scrollModal () {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                showModal();
                window.removeEventListener('scroll' , scrollModal);
            }     

        } 

        window.addEventListener('scroll' , scrollModal);

});