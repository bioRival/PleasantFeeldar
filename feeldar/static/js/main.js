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

// Footer Marquee Red Line
$('.footer-area .marquee-area .footer-red-line').marquee({
    //duration in milliseconds of the marquee
	duration: 50000,
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

// Footer Marquee Yellow Line
$('.footer-area .marquee-area .footer-yellow-line').marquee({
    //duration in milliseconds of the marquee
	duration: 50000,
	//gap in pixels between the tickers
	gap: 100,
	//time in milliseconds before the marquee will start animating
	delayBeforeStart: 0,
	//'left' or 'right'
	direction: 'right',
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

$('.site-main .chat-bot-2 .chat-bot .chat_butt').on('click', function() { //отредактировать путь согласно расположению
        var emotion_id = $(this).data('emotion-id');
        $.ajax({
            url: 'update_bot',
            type: 'GET',
            data: {'emotion_id': emotion_id},
            success: function(response) {
                $('#video-list').empty();
                response.contents.forEach(function(video) {
                    var videoUrl = 'https://www.youtube.com/embed/' + video.url;
                    var imgUrl = 'https://img.youtube.com/vi/' + video.url + '/mqdefault.jpg';
                    $('#video-list').append('<div><h3>' + video.url + '</h3><img src="' + imgUrl + '" width="320" height="180" onclick="openVideo(\'' + video.url + '\')"></div>');
                });
            }
        });
    });
});
//сделал глобальной чтобы не возникало проблем с маршрутами
function openVideo(videoUrl) {
    $('#video-list').empty();
    var iframeUrl = '//www.youtube.com/embed/' + videoUrl;
    var videoHtml = `
        <div>
            <iframe src="${iframeUrl}" frameborder="0" allowfullscreen width="882" height="501"></iframe>
        </div>`;
    $('#video-list').append(videoHtml);

function saveEmotion(emotion_id, video_url) {
var emotion = emotion_id;
var videoTitle = video_url.split('/').pop();
$.ajax({
    type: 'POST',
    url: 'save_emotion',
    data: {
        'emotion': emotion,
        'videoTitle': videoTitle
    },
    success: function(response) {
    }
});
}


