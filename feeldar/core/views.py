import re
import core.filter_words
from django.db.models import Count
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

from .forms import AnonymousTextForm
from .models import Content, Emotion, ContentEmotion, AnonymousText
from collections import Counter
import random


def index(request):
    """ View for Home Page """
    emotions = Emotion.objects.all()
    return render(request, 'index.html',{'emotions': emotions})


def merch(request):
    """ View for Merch Page """
    return render(request, 'merch.html')


def about_me(request):
    form = AnonymousTextForm()
    random_texts = get_random_texts()

    if request.method == 'POST':
        form = AnonymousTextForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data['text']
            if not contains_hate_speech(text):
                form.save()
                return redirect('about_me')

    return render(request, 'about-me.html', {'form': form, 'texts': random_texts})

def get_random_texts():
    all_texts = list(AnonymousText.objects.all())
    return random.sample(all_texts, min(3, len(all_texts))) if all_texts else []

def contains_hate_speech(text):
    hate_words = core.filter_words.hate_words
    for word in hate_words:
        if re.search(fr'\b{word}\b', text, flags=re.IGNORECASE):
            return True
    return False


def list_boxes(request):
    # Получение всех текстов из базы данных
    texts = AnonymousText.objects.all()
    return render(request, 'list_boxes.html', {'texts': texts})


# Представление для выбора видео
@login_required
def select_video(request):
    videos = Content.objects.all()
    return render(request, 'core/select_video.html', {'videos': videos})


# Представление для выбора эмоции
@login_required
def select_emotion(request, video_id):
    video = get_object_or_404(Content, id=video_id)
    emotions = Emotion.objects.all()
    if request.method == 'POST':
        selected_emotion_id = request.POST.get('emotion_id')
        selected_emotion = get_object_or_404(Emotion, id=selected_emotion_id)
        video_emotion = ContentEmotion(video=video, emotion=selected_emotion, user=request.user)
        video_emotion.save()
        return redirect('video_details', video_id=video_id)
    return render(request, 'core/select_emotion.html', {'video': video, 'emotions': emotions})


@login_required
def video_list(request):
    videos = Content.objects.all()
    video_emotions = ContentEmotion.objects.filter(video__in=videos)

    videos = videos.annotate(emotion_count=Count('contentemotion'))

    return render(request, 'core/video_list.html', {'videos': videos, 'video_emotions': video_emotions})


def get_most_common_emotion(video):
    emotions = ContentEmotion.objects.filter(video=video)
    emotion_counter = Counter(emotion.emotion for emotion in emotions)
    most_common_emotion, _ = emotion_counter.most_common(1)[0]
    return most_common_emotion


@login_required
def video_details(request, video_id):
    video = get_object_or_404(Content, id=video_id)
    most_common_emotion = get_most_common_emotion(video)
    return render(request, 'core/video_details.html', {'video': video, 'most_common_emotion': most_common_emotion})





# Chat-bot functions
# =========================================================================================
def get_videos(emotion_id):
    """ 
    Picks 5 videos based on given emotion, 
    if video has > 0 of that emotion it will be in the list 
    """
    emotion = Emotion.objects.get(id=emotion_id)
    filters = {f"emotion_{emotion.codename}__gt": 0}
    result = Content.objects.filter(**filters).order_by('?')[:5]
    return result


def get_top3_emotions(video_id):
    """ Picks 3 top emotions from a given video, returns dictionary {name: amount} """
    videoT = Content.objects.get(youtube_id=video_id)
    emotions = {
            'funny': videoT.emotion_funny,
            'cute': videoT.emotion_cute,
            'sad': videoT.emotion_sad,
            'sexy': videoT.emotion_sexy,
            'scary': videoT.emotion_scary,
            'awkward': videoT.emotion_awkward,
            'nostalgic': videoT.emotion_nostalgic,
            'angry': videoT.emotion_angry,
        }
    sorted_emotions = sorted(emotions.items(), key=lambda x: x[1], reverse=True)
    top3_emotions = dict(sorted_emotions[:3])
    return top3_emotions


def update_bot(request):
    """ Sends a Json with 5 videos """
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'GET':
        emotion_id = request.GET.get('emotion_id')
        if emotion_id:
            content_list = get_videos(emotion_id)
        else:
            content_list = Content.objects.all().order_by('?')[:5]
        contents = []
        for content in content_list:
            contents.append({
                'youtube_id': content.youtube_id, 
                'title': content.title,
                'top_emotions': get_top3_emotions(content.youtube_id),
            })

        return JsonResponse({'contents': contents}, status=200)
    else:
        return JsonResponse({}, status=400)


@csrf_exempt
def save_emotion(request):
    if request.method == 'POST':
        emotion_name = request.POST.get('emotion_id')
        video_id = request.POST.get('video_id')
        user_id = request.user.id

        try:
            emotion = Emotion.objects.get(codename=emotion_name)
            video = Content.objects.get(youtube_id=video_id)

            content_emotion = ContentEmotion.objects.create(
                video_id=video.id,
                emotion_id=emotion.id,
                user_id=user_id
            )

            content = Content.objects.get(youtube_id=video_id)

            # Увеличиваем значение параметра соответствующей эмоции на 1
            if emotion.codename == 'funny':
                content.emotion_funny += 1
            elif emotion.codename == 'cute':
                content.emotion_cute += 1
            elif emotion.codename == 'sad':
                content.emotion_sad += 1
            elif emotion.codename == 'sexy':
                content.emotion_sexy += 1
            elif emotion.codename == 'scary':
                content.emotion_scary += 1
            elif emotion.codename == 'awkward':
                content.emotion_awkward += 1
            elif emotion.codename == 'nostalgic':
                content.emotion_nostalgic += 1
            elif emotion.codename == 'angry':
                content.emotion_angry += 1

            content.save()

            return JsonResponse({'success': True})

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
# =========================================================================================
# End Chat-bot Functions