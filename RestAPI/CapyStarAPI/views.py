from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Topic, VocabularyQuestions
from .serializer import TopicSerializer, VocabularyQuestionsSerializer

# Create your views here.
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_items': '/',
        'Search by Topic': '/?topic=topic_name',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/delete/pk'
    } 
    return Response(api_urls)

@api_view(['GET'])
def View_Topic(request):

    if request.query_params:
        Topics = Topic.objects.filter(**request.query_params.dict())
    else:
        Topics = Topic.objects.all()
    
    if Topics:
        serializer = TopicSerializer(Topics, many=True)
        return Response(serializer.data)
    else:
        return Response(status = status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def View_VocabularyQuestions(request):

    if request.query_params:
        Questions = VocabularyQuestions.objects.filter(**request.query_params.dict())
    else:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if Questions:
        serializer = VocabularyQuestionsSerializer(Questions, many=True)
        return Response(serializer.data)
    else:
        return Response(status = status.HTTP_404_NOT_FOUND)
    




