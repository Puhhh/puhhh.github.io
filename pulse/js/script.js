$(document).ready(function(){
    /* $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/right.svg"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    }); */
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    }); //переключение табов у каталога (для фитнеса, для бега, для триатлона)

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }; //функция переключения классов активности у блоков каталога (подробнее - назад)

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    }); //появление блоков при клике
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    }); //закрытие блоков при клике на крестик
    $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    }); //появление блоков при клике на кнопку купить в каталоге

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required:true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Имя должно состоять минимум из {0}-х символов")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой e-mail адрес",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }; //функция проверки данных в формах

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        } //если форма не прошла валидацию то данные не отправляются
        
        $.ajax({
            type: "POST", //метод отправки данные
            url: "mailer/smart.php", //чем мы отправляем данные
            data: $(this).serialize() //какие данные отправляем
        }).done(function() { //что делаем после того как ajax отработал
            $(this).find("input").val(""); //очистка инпутов после отправки данных
            $('#consultation, #order').fadeOut(); //скрытие модальных окн после отправки данных
            $('.overlay, #thanks').fadeIn('slow'); //показать 

            $('form').trigger('reset'); //перезапуск форм
        });
        return false;
    });

    //Smooth scroll and pageup
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Add smooth scrolling to all links
    $("a").on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    new WOW().init();

    window.onload = event => {
        setTimeout(function() {
            document.getElementById("footer__map").style.visibility = "visible";
        }, 9000);
    };
});

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    responsive: {
        320: {
            edgePadding: 20,
            nav:true,
            items: 1,
            gutter: 20
        },
        991: {
            nav:false
        }
    }
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});