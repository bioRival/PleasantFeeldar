# views.py
from django.shortcuts import render, redirect
from .models import Question, Answer

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
