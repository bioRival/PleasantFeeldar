from django.db.models import Count
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_GET

from .models import Content, Emotion, ContentEmotion
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
    """ View for About Me Page """
    return render(request, 'about-me.html')


# Представление для регистрации
def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('select_video')
    else:
        form = RegistrationForm()
    return render(request, 'registration/register.html', {'form': form})


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


#def chatbot(request):
#    emotions = Emotion.objects.all()
#    return render(request, 'core/chat.html', {'emotions': emotions})
#    # testing / chat переключатель


def get_videos(emotion_id):
    """ Picks 5 videos based on given emotion """
    emotion = Emotion.objects.get(id=emotion_id)
    filters = {f"emotion_{emotion.codename}__gt": 0}
    result = Content.objects.filter(**filters).order_by('?')[:5]
    return result


def get_top3_emotions(content):
    """ Picks 3 top emotions from a given video, returns dictionary {name: amount} """
    # Getting all emotion values
    emotion_dict = {
        'funny': content.emotion_funny,
        'cute': content.emotion_cute,
        'sad': content.emotion_sad,
        'sexy': content.emotion_sexy,
        'scary': content.emotion_scary,
        'awkward': content.emotion_awkward,
        'nostalgic': content.emotion_nostalgic,
        'angry': content.emotion_angry,
    }

    # Sorting all emotions by value, then picking first 3
    emotion_dict = dict(sorted(emotion_dict.items(), key=lambda item: item[1], reverse = True)[:3])
    return emotion_dict


def update_bot(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'GET':
        emotion_id = request.GET.get('emotion_id')
        if emotion_id:
            content_list = get_videos(emotion_id)
        else:
            content_list = Content.objects.order_by('?')[:5]
        contents = []
        for content in content_list:
            contents.append({
                'youtube_id': content.youtube_id, 
                'title': content.title,
                'emotion_dict': get_top3_emotions(content),
            })
        # contents = [{'youtube_id': content.youtube_id, 'title': content.title} for content in content_list]
        # print(contents)
        return JsonResponse({'contents': contents}, status=200)
    else:
        return JsonResponse({}, status=400)


@login_required
def save_emotion(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        emotion_name = request.POST.get('emotion')
        video_title = request.POST.get('videoTitle')
        emotion = Emotion.objects.get(name=emotion_name)
        video = Content.objects.get(title=video_title)
        user = request.user

        content_emotion = ContentEmotion(video=video, emotion=emotion, user=user)
        content_emotion.save()

        return HttpResponse("Success")
    else:
        return HttpResponseBadRequest()