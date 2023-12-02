//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const img_box = document.querySelector(".img_box");
const image = document.querySelector(".img_box .correct-img");
const img_text = document.querySelector(".img_box .img-text");


// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
    changeImg(1); // set image
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Changing Images
function changeImg(que_numb) {
  image.src = `${STATIC_URL}img/quiz/${que_numb}.png`;
  let img_lines = [
    'Curtis James Jackson III, 50 Cent',
    'Get rich or die trying',
    'Званый ужин',
    'DOTA 2',
    'И это хорошо!',
    'Инженер по информационным технологиям',
    'Мама <i class="fa-solid fa-heart"></i>',
    'ПОЛОВИНКИ. ЭГОИСТИЧНАЯ ТОЛСТУШКА - 7,8 млн.',
    'Вирус',
    'Я - ленивый',
  ];
  img_text.innerHTML = img_lines[que_numb-1];
}

function showImg() {
  quiz_box.classList.add('moveQuiz');
  img_box.classList.add('activeImg');
}

function hideImg() {
  img_box.classList.remove('activeImg');
  quiz_box.classList.remove('moveQuiz');
}

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Осталось Времени"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
    changeImg(que_numb); // set image
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.history.go(0); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Осталось Времени"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
        hideImg();
        changeImg(que_numb);
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}


// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
    showImg();
}

function showResult(){
    hideImg();
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 8){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>и поздравляю! 🎉, У тебя <p>'+ userScore +'</p> из <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 6){ // if user scored more than 1
        let scoreTag = '<span>и неплохо 😎, У тебя <p>'+ userScore +'</p> из <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>и сорян 😐, У тебя только <p>'+ userScore +'</p> из <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Время Вышло"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
            showImg();
        }
    }
}

function startTimerLine(time){
  counterLine = setInterval(timer, 25);
  function timer(){
      time += 1; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if(time > 637){ //if time value is greater than 549
          clearInterval(counterLine); //clear counterLine
      }
  }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> из <p>'+ questions.length +'</p> Вопросов</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

// creating an array and passing the number, questions, options, and answers
let questions = [
    {
    numb: 1,
    question: "Кто мой главный кумир с 13 лет?",
    answer: "Curtis James Jackson III, 50 Cent",
    options: [
      "Curtis James Jackson III, 50 Cent",
      "Shawn Corey Carter, Jay-Z",
      "Calvin Cordozar Broadus Jr, Snoop Dogg",
      "Andre Romell Young, Dr. Dre"
    ]
  },
    {
    numb: 2,
    question: "Аффирмация, которая сделала меня тем, кто я есть",
    answer: "Get rich or die trying",
    options: [
      "The best revenge is massive success",
      "You're not obligated to win. You're obligated to keep trying. To the best you can do everyday.",
      "Get rich or die trying",
      "The perfect moment is this one"
    ]
  },
    {
    numb: 3,
    question: "Первое шоу, на которое я сделал обзор",
    answer: "Званый ужин",
    options: [
      "Беременна в 16",
      "Давай поженимся",
      "4 свадьбы",
      "Званый ужин"
    ]
  },
    {
    numb: 4,
    question: "Моя любимая игра",
    answer: "Defense of the Ancients (DotA 2)",
    options: [
      "League of Legends (LOL)",
      "Defense of the Ancients (DotA 2)",
      "Heroes of the Storm",
      "Smite"
    ]
  },
    {
    numb: 5,
    question: "Какая цитата не моя",
    answer: "И это хорошо!",
    options: [
      "Ты загрузил видеоролик в интернет, рано или поздно я его найду, это лишь дело времени, братан",
      "Доброго времени суток, мои приятные молодые люди",
      "И это хорошо!",
      "Ну легенды! По лайкам поднажмите!!!"
    ]
  },
    {
      numb: 6,
      question: "Профессия в моей трудовой книжке",
      answer: "Инженер по информационным технологиям",
      options: [
        "Спасатель МЧС",
        "Дрессировщик",
        "Инженер по информационным технологиям",
        "Повелитель мусора"
      ]
    },
      {
      numb: 7,
      question: "Мой самый главный буллер",
      answer: "Мама",
      options: [
        "Мама",
        "fuckdrainiloveu",
        "emmaxxcrane",
        "deroy_night"
      ]
    },
      {
      numb: 8,
      question: "Какое моё видео залетело на максимальное количество просмотров?",
      answer: "ПОЛОВИНКИ. ЭГОИСТИЧНАЯ ТОЛСТУШКА",
      options: [
        "ДМУД. Семья Правосудовичей",
        "БЕРЕМЕННА В 16. НЕ ТАКАЯ КАК ВСЕ",
        "ПОЛОВИНКИ. ЭГОИСТИЧНАЯ ТОЛСТУШКА",
        "Званый ужин. Яна Лукьянова"
      ]
    },
      {
      numb: 9,
      question: "Мой первый клип",
      answer: "Вирус",
      options: [
        "Витаминка",
        "Могу себе позволить",
        "Дно",
        "Вирус"
      ]
    },
      {
      numb: 10,
      question: "Почему я не репер?",
      answer: "Я - ленивый",
      options: [
        "У меня нет продюсера",
        "У меня нет слуха",
        "Боюсь баттл с Noize MC",
        "Я - ленивый"
      ]
    },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  //   {
  //   numb: 6,
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
];