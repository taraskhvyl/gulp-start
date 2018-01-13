jQuery(document).ready(function ($) {
    var windowWidth = $(window).width();

    // BEGIN GENERAL
    function formatState (state) {
        if (!state.id) {
            return state.text;
        }

        var $state = $(
            '<span><img src="' + state.element.dataset.image + '" class="img-flag" /> ' + state.text + '</span>'
        );
        return $state;
    }

    $('.footer__bottom--country').select2({
        templateResult: formatState,
        minimumResultsForSearch: -1,
        dropdownAutoWidth : true,
        width: 'auto'
    });

    // init video
    // $(document).on("click", ".button-play--big", function() {
    //     var currentVideo = $(this).attr('data-video');
    //
    //     $.fancybox.open({
    //         src  : currentVideo,
    //         type : 'frame'
    //     });
    //
    // });

    // END GENERAL


    // init header
    $(".header").headroom();

    // init slider
    // $('.slider__list').flickity({
    //     cellAlign: 'left',
    //     contain: true,
    //     prevNextButtons: false,
    //     pageDots: false,
    //     wrapAround: true
    // });

    //initialize swiper when document ready
    // var mySwiper = new Swiper ('.slider__container', {
    //     loop: true,
    //     spaceBetween: 20,
    //     slidesPerView: 4,
    //     navigation: {
    //         nextEl: '.slider__nav--next',
    //         prevEl: '.slider__nav--prev'
    //     }
    // });

    // click on external links
    $('.link--external').on('click', function() {
       window.open($(this).attr('data-href'));
    });


    function initTopMenu() {
        var $nav = $('.greedy-nav');
        var $btn = $('.greedy-nav button');
        var $vlinks = $('.greedy-nav .header__nav--visible');
        var $hlinks = $('.greedy-nav .header__nav--hidden');

        var breaks = [];

        function updateNav() {

            if(windowWidth > 769) {
                var availableSpace = $btn.hasClass('add-menu--hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

                if ($vlinks.width() > availableSpace) {

                    breaks.push($vlinks.width());

                    $vlinks.children().last().prependTo($hlinks);

                    if ($btn.hasClass('add-menu--hidden')) {
                        $btn.removeClass('add-menu--hidden');
                    }
                } else {
                    if (availableSpace > breaks[breaks.length - 1]) {
                        $hlinks.children().first().appendTo($vlinks);
                        breaks.pop();
                    }

                    if (breaks.length < 1) {
                        $btn.addClass('add-menu--hidden');
                        $hlinks.addClass('add-menu--hidden');
                    }
                }

                // Keep counter updated
                $btn.attr("count", breaks.length);

                // Recur if the visible list is still overflowing the nav
                if ($vlinks.width() > availableSpace) {
                    updateNav();
                }
            }
        }

        $(window).on('resize', updateNav);


        $btn.hover(function() {
            $(this).toggleClass('add-menu--hidden');
            $hlinks.stop(true, true).fadeToggle();
        });

        updateNav();
    }

    if(windowWidth > 769) {
        initTopMenu();
    }

    // BEGIN PRICES SECTION

    $('.price__info select').each(function() {
        var $currentElem = $(this),
            currentParent = $currentElem.parent();

        $currentElem.select2({
            minimumResultsForSearch: -1,
            width: 'resolve',
            dropdownParent: currentParent,
            dropdownAutoWidth: true
        });
    });



    // END PRICES SECTION


    // BEGIN SLIDER WHAT YOU HAVE
    var sliderWhat = new Swiper ('.slider-what__slides', {
        simulateTouch: false,
        effect: 'fade'
    });

    $('.slider-what__item').on('click', function() {
        var currentElem = $(this),
            currIndex = currentElem.index();

        $('.slider-what__item').removeClass('active');
        sliderWhat.slideTo(currIndex);

        currentElem.addClass('active');
    });



    // END SLIDER WHAT YOU HAVE


    // BEGIN INTRO

    //click on video intro
    $('.intro__video_url').on('click', function() {
        var $currentParent = $(this).parent(),
            $video = $currentParent.find('iframe'),
            videoSrc = $video.attr('src');

        $video.attr('src', videoSrc + "&autoplay=1");
        $(this).delay(150).fadeOut();


    });

    // END INTRO

});



