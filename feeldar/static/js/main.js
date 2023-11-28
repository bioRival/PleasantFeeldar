$( document ).ready(function() {
// GLOBAL
// =============================================================

// Toggles Class on an element
// has optional clearClass parameter - string of jquery selector, clears all active classes
//   in that selector 
function toggleActive(event) {
    btn = $(this);

    if (typeof event.data.clearClass !== 'undefined') {
        $(event.data.clearClass).removeClass('active');
        btn.addClass('active');
    } else {
        if (btn.hasClass('active')) {
            btn.removeClass('active');
        } else {
            btn.addClass('active');
        }
    }
}
$('.site-main .chat-bot-area .emotion-pick-container .emotion-pick-item .emotion-pick-button').click({
    clearClass: '.site-main .chat-bot-area .emotion-pick-container .emotion-pick-item .emotion-pick-button',
}, toggleActive);

$('.footer-area .marquee-area .footer-line').marquee({
    //duration in milliseconds of the marquee
	duration: 100000,
	//gap in pixels between the tickers
	gap: 100,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'left',
	//true or false - should the marquee be duplicated to show an effect of continues flow
	duplicated: true,
    startVisible: true,
});
// =============================================================
// END GLOBAL

// MAIN PAGE
// =============================================================

// Marquee line of merch page yellow vertical
$('.site-main .games-list-area .yellow-line-marquee').marquee({
    //duration in milliseconds of the marquee
	duration: 100000,
	//gap in pixels between the tickers
	gap: 0,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'right',
	//true or false - should the marquee be duplicated to show an effect of continues flow
	duplicated: true,
    startVisible: true,
});
// =============================================================
// END MAIN PAGE






// OTHER
// Emoji Buttons for picking a mood 
// changes style based on choice, shows extra text
function pickMood() {
    function restoreDefault() {
        btns = $('.youtube-area .youtube-container .mood-picker .mood-button');
        btns_text =$('.youtube-area .youtube-container .mood-picker .mood-button p');
        
        btns.removeClass('active');
        btns_text.css({
            'display': 'none',
        });
        btns.css({
            'border-radius': '50%',
        });
    }

    restoreDefault();
    
    btn = $(this);
    btn_text = btn.children('p');
    btn.addClass('active');
    btn_text.addClass('active');
    btn_text.css({
        'display': 'block',
    });
    btn.css({
        'border-radius': '10px'
    });

}

// Emoji Buttons under a video
// change style based on user choice
function rateVideo() {
    btn = $(this);

    if (btn.hasClass('active')) {
        btn.removeClass('active');

        let number = btn.children('span').text();
        if (number === "") {number = 0}
        number = Number(number);
        number--;
        if (number <= 0) {
            btn.removeClass('rated');
            number = "";
        }
        btn.children('span').text(number);

        
    } else {
        btn.addClass('active');
        btn.addClass('rated');

        let number = btn.children('span').text();
        if (number === "") {number = 0}
        number = Number(number);
        number++;
        btn.children('span').text(number);
    }
    
}


// Marquee line of merch page yellow vertical
$('.site-main .sub-menu-area .marquee-merch-yellow').marquee({
    //duration in milliseconds of the marquee
	duration: 150000,
	//gap in pixels between the tickers
	gap: 0,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'left',
	//true or false - should the marquee be duplicated to show an effect of continues flow
	duplicated: true,
    startVisible: true,
});


// Marquee line of merch page red horizontal on background
$('.site-main .merch-area .red-line-wrapper .marquee-merch-red').marquee({
    //duration in milliseconds of the marquee
	duration: 20000,
	//gap in pixels between the tickers
	gap: 0,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'right',
	//true or false - should the marquee be duplicated to show an effect of continues flow
	duplicated: true,
    startVisible: true,
});

// Favorite Button on Merch Page
function addToFavorites() {
    icon = $(this).children('i');
    if (icon.hasClass('fa-regular')) {
        icon.removeClass('fa-regular');
        icon.addClass('active');
        icon.addClass('fa-solid');
        icon.addClass("fa-bounce");
        setTimeout(function(){
            icon.removeClass("fa-bounce");
            }, 1000);
    } else {
        icon.removeClass('fa-solid');
        icon.removeClass('active');
        icon.addClass('fa-regular');
        icon.addClass('fa-shake');
        setTimeout(function(){
            icon.removeClass("fa-shake");
            }, 1000);
    }
}
$('.site-main .merch-area .merch-list .merch-item .merch-photo-con .fav-button').click(addToFavorites);

$('.youtube-area .youtube-container .mood-picker .mood-button').click(pickMood);
$('.youtube-area .youtube-container .youtube-screen .rating .rating-item').click(rateVideo);
});

