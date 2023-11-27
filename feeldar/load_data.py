import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'feeldar.settings')

django.setup()

import django
django.setup()


from website.models import Question, Answer

def load_data():
    # Ваши вопросы и ответы
    questions_data = [
        {
            "text": "Главный мой кумир с 13 лет?",
            "answers": [
                {"text": "Curtis James Jackson III, 50 Cent", "is_correct": True},
                {"text": "Shawn Corey Carter, Jay-Z", "is_correct": False},
                {"text": "Calvin Cordozar Broadus Jr, Snoop Dogg", "is_correct": False},
                {"text": "Andre Romell Young, Dr. Dre", "is_correct": False},
            ]
        },
        {
            "text": "Аффирмация, которая сделала меня тем, кто я есть?",
            "answers": [
                {"text": "The best revenge is massive success", "is_correct": False},
                {"text": "Get rich or die trying", "is_correct": True},
                {"text": "You’re not obligated to win. You’re obligated to keep trying. To the best you can do everyday", "is_correct": False},
            ]
        },
        {
            "text": "Первое шоу, на которое я сделал обзор?",
            "answers": [
                {"text": "4 свадьбы", "is_correct": False},
                {"text": "Беременна в 16", "is_correct": False},
                {"text": "Давай поженимся", "is_correct": False},
                {"text": "Званый ужин", "is_correct": True},
            ]
        },
        {
            "text": "Моя любимая игра?",
            "answers": [
                {"text": "League of Legends (LOL)", "is_correct": False},
                {"text": "Defense of the Ancients (DotA)", "is_correct": True},
                {"text": "Heroes of the Storm ", "is_correct": False},
                {"text": "Smite", "is_correct": False},
            ]
        },
        {
            "text": "Какая цитата не моя?",
            "answers": [
                {"text": "Ты загрузил видеоролик в интернет, рано или поздно я его найду, это лишь дело времени, братан", "is_correct": False},
                {"text": "И это хорошо!", "is_correct": True},
                {"text": "Если меня смотрят различные рекламодатели онлайн казино, кейсов в CS:GO, то знайте, я не буду рекламировать вашу хуйню, потому что я уважаю своих подписчиков.", "is_correct": False},
            ]
        },
        {
            "text": "Профессия в моей трудовой книжке?",
            "answers": [
                {"text": "Повелитель мусора", "is_correct": False},
                {"text": "Дрессировщик", "is_correct": False},
                {"text": "Спасатель МЧС", "is_correct": False},
                {"text": "Инженер по информационным технологиям", "is_correct": True},
            ]
        },
        {
            "text": "Мой самый главный буллер?",
            "answers": [
                {"text": "emmaxxcrane", "is_correct": False},
                {"text": "fuckdrainiloveu", "is_correct": False},
                {"text": "Мама", "is_correct": True},
                {"text": "deroy_night", "is_correct": False},
            ]
        },
        {
            "text": "Какое моё видео залетело на максимальное количество просмотров?",
            "answers": [
                {"text": "ДМУД. Семья Правосудовичей - [ХУДШИЕ]", "is_correct": False},
                {"text": "ПОЛОВИНКИ. ЭГОИСТИЧНАЯ ТОЛСТУШКА - [ХУДШИЕ] - 7,8 млн.", "is_correct": True},
                {"text": "БЕРЕМЕННА В 16. НЕ ТАКАЯ КАК ВСЕ - [ХУДШИЕ]", "is_correct": False},
            ]
        },
        {
            "text": "Мой первый клип?",
            "answers": [
                {"text": "Вирус", "is_correct": True},
                {"text": "Витаминка", "is_correct": False},
                {"text": "Могу себе позволить", "is_correct": False},
            ]
        },
        {
            "text": "Почему я не репер?",
            "answers": [
                {"text": "У меня нет слуха", "is_correct": False},
                {"text": "У меня нет продюсера", "is_correct": False},
                {"text": "Я - ленивый", "is_correct": True},
            ]
        },
    ]

    for q_data in questions_data:
        question = Question.objects.create(text=q_data["text"])

        for answer_data in q_data["answers"]:
            Answer.objects.create(question=question, text=answer_data["text"], is_correct=answer_data["is_correct"])


if __name__ == '__main__':
    load_data()
