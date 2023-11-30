// Chat-bot Logic part 1
// ========================================================================================= 

// Stores picked emotion
var EMOTION = undefined;

// Shows current video as iframe in 1280x720, hides some elements
function showVideoMode() {
    $('.site-main .chat-bot-area .chat-bot-intro').addClass('d-none');
    $('.site-main .chat-bot-area .chat-bot').removeClass('d-none');

    $('.site-main .chat-bot-area .text2').addClass('d-none');
    $('.site-main .chat-bot-area .youtube-screen').removeClass('d-none');
    $('.site-main .chat-bot-area .video-pick').addClass('d-none');
    $('.site-main .chat-bot-area .snack-pick p').addClass('d-none');
    $('.site-main .chat-bot-area .snack-pick .snack-images').addClass('d-none');
    $('.site-main .chat-bot-area .chat-bot-menu .pick-more-button').addClass('d-none');
    $('.site-main .chat-bot-area .chat-bot-menu .back-to-pick-button').removeClass('d-none');
}

// Shows video and snacks picking rows, hides iframe, opposite to showVideoMode
function showPickMode() {
    $('.site-main .chat-bot-area .chat-bot-intro').addClass('d-none');
    $('.site-main .chat-bot-area .chat-bot').removeClass('d-none');

    $('.site-main .chat-bot-area .text2').removeClass('d-none');
    $('.site-main .chat-bot-area .youtube-screen').addClass('d-none');
    $('.site-main .chat-bot-area .video-pick').removeClass('d-none');
    $('.site-main .chat-bot-area .snack-pick p').removeClass('d-none');
    $('.site-main .chat-bot-area .snack-pick .snack-images').removeClass('d-none');
    $('.site-main .chat-bot-area .chat-bot-menu .pick-more-button').removeClass('d-none');
    $('.site-main .chat-bot-area .chat-bot-menu .back-to-pick-button').addClass('d-none');
}

// Changes iframe source as given
function openVideo(videoUrl) {
    showVideoMode();
    $('.site-main .chat-bot-area .youtube-screen .youtube-iframe').attr("src", videoUrl);
}
// ========================================================================================= 
// End Chat-bot Logic part 1






$(document).ready(function () {
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

    // ABOUT-ME PAGE
    // =============================================================

    // marquee line about-me page yellow vertical
    $('.site-main .banner-area .marquee-about-me-yellow-wrapper .marquee-about-me-yellow').marquee({
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

    $('.site-main .banner-area .marquee-about-me-red1').marquee({
        //duration in milliseconds of the marquee
        duration: 50000,
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
            btns_text = $('.youtube-area .youtube-container .mood-picker .mood-button p');

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
            if (number === "") { number = 0 }
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
            if (number === "") { number = 0 }
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
            setTimeout(function () {
                icon.removeClass("fa-bounce");
            }, 1000);
        } else {
            icon.removeClass('fa-solid');
            icon.removeClass('active');
            icon.addClass('fa-regular');
            icon.addClass('fa-shake');
            setTimeout(function () {
                icon.removeClass("fa-shake");
            }, 1000);
        }
    }
    $('.site-main .merch-area .merch-list .merch-item .merch-photo-con .fav-button').click(addToFavorites);

    $('.youtube-area .youtube-container .mood-picker .mood-button').click(pickMood);
    $('.youtube-area .youtube-container .youtube-screen .rating .rating-item').click(rateVideo);





    // Chat-bot Logic part 2
    // ========================================================================================= 
    function getVideoList(emotion_id) {
        showPickMode();
        $('.site-main .chat-bot-area .video-pick').empty();
        $.ajax({
            url: 'update_bot',
            type: 'GET',
            data: { 'emotion_id': emotion_id },
            success: function (response) {
                response.contents.forEach(function (video) {
                    $('.site-main .chat-bot-area .video-pick').append(`
                        <div class="video-item" onclick="openVideo('https://www.youtube.com/embed/${video.youtube_id}')">
                            <img src='https://i.ytimg.com/vi/${video.youtube_id}/mqdefault.jpg' alt="">
                            <div class="sub-rating">
                            ${getRatingItems(video.top_emotions)}
                            </div>
                            <h4>${video.title}</h4>
                        </div>
                    `);
                });
            }
        });
    }

    function getRatingItems(top_emotions) {
    const ratingItems = [];
    Object.keys(top_emotions).forEach(function (emotion) {
        const count = top_emotions[emotion];
        if (count > 0) {
            ratingItems.push(`
            <div class="rating-item">
                <span>${count}</span>
                <div class="emotion-${emotion.toLowerCase()}"></div>
            </div>
        `);
        }
    });
    return ratingItems.join('');
}
    
    // Pick-more-button, uses stored emotion_id to pick 5 more videos
    $('.site-main .chat-bot-area .snack-pick .chat-bot-menu .pick-more-button').on('click', function () {
        getVideoList(EMOTION);
    });


    // Click on Video
    $('.site-main .chat-bot-area .chat-bot-menu .back-to-pick-button').click(showPickMode);


    // Click on "ЖМИ" start button
    $('.site-main .chat-bot-area .chat-bot-intro .chat-bot-start-button').on('click', function () {
        getVideoList();
    });


    // Emotion-pick-button, gets 5 videos based on clicked button
    $('.site-main .chat-bot-area .emotion-pick-button').on('click', function () {        
        // Toggles active class effect on emotion picking buttons
        btn = $(this);
        $('.site-main .chat-bot-area .emotion-pick-button').removeClass('active');
        btn.addClass('active');

        // Emotion Id from data-emotion-id on clicked button
        var emotion_id = $(this).data('emotion-id');

        // Remembers the choice for re-pick function
        EMOTION = emotion_id;

        // GET
        getVideoList(emotion_id);
    });
    // End Chat-bot Logic
    // ========================================================================================= 
});


// Unused
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
        success: function (response) {
        }
    });
}

