// $(document).ready(function() {
//     $('.corousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: true,
//         // autoplay: true,
//         // autoplaySpeed: 1000,
//         // fade: true,
//         // cssEase: 'linear'
//         prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrow.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../icons/right_icon.png"></button>',
//         responsive: [{
//             breakpoint: 992,
//             settings: {
//                 dots: true,
//                 arrows: false
//             }
//         }]
//     });
// });

const slider = tns({
    container: '.corousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
});
document.querySelector('.prev').addEventListener('click', function() {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function() {
    slider.goTo('next');
});


$(document).ready(function() {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__content').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });


    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide(".catalog-item__content");
    toggleSlide(".catalog-item__back");

    // modal 
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });


    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "please enter your name",
                phone: "please enter your phone number",
                email: {
                    required: "Please enter your email address",
                    email: "your email address has to contain @"
                }
            }
        });

    };
    valideForms("#consultation-form");
    valideForms("#consultation form");
    valideForms("#order form");

    $('input[name=phone]').mask("+1(999) 999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        })
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });
    new WOW().init();
});