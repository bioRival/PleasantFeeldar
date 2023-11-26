from django.shortcuts import render, redirect
import random
from .forms import AnonymousTextForm
from .models import Question, Answer, AnonymousText, QuizResult


def quiz(request, question_id=None):
    if question_id is None:

        question = Question.objects.first()
        request.session['correct_answers'] = 0
        return render(request, 'website/quiz.html', {'question': question})

    current_question = Question.objects.get(pk=question_id)

    if request.method == 'POST':
        selected_answer_id = request.POST.get('answer')

        if selected_answer_id:
            selected_answer = Answer.objects.get(pk=selected_answer_id)
            if selected_answer.is_correct:
                request.session['correct_answers'] += 1
                feedback = "Правильно! 🎉"
            else:
                feedback = "Упс! Неправильный ответ. 😕"
            return render(request, 'website/feedback.html', {'feedback': feedback, 'question': current_question})

    next_question = Question.objects.filter(pk__gt=current_question.id).first()
    if next_question is None:
        total_questions = Question.objects.count()
        correct_answers = request.session.get('correct_answers', 0)
        percentage_correct = (correct_answers / total_questions) * 100 if total_questions > 0 else 0

        return render(request, 'website/quiz_results.html',
                      {'correct_answers': correct_answers, 'total_questions': total_questions,
                       'percentage_correct': percentage_correct})

    return render(request, 'website/quiz.html', {'question': next_question})


def quiz_results(request):
    total_results = QuizResult.objects.count()
    incorrect_results = QuizResult.objects.filter(is_correct=False).count()
    percentage_incorrect = (incorrect_results / total_results) * 100 if total_results > 0 else 0

    context = {
        'total_results': total_results,
        'incorrect_results': incorrect_results,
        'percentage_incorrect': percentage_incorrect,
    }

    return render(request, 'website/quiz_results.html', context)

def anonymous_box(request):
    if request.method == 'POST':
        form = AnonymousTextForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('anonymous_box')
    else:
        form = AnonymousTextForm()

        all_texts = list(AnonymousText.objects.all())
        random_texts = random.sample(all_texts, min(3, len(all_texts)))

    return render(request, 'website/box/anonymous_box.html', {'form': form, 'texts': random_texts})


def list_boxes(request):
    texts = AnonymousText.objects.all()
    return render(request, 'website/box/list_boxes.html', {'texts': texts})
