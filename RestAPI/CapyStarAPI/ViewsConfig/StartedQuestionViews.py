from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import serializers
from rest_framework import status
from CapyStarAPI.models import (QuestionBank)
from CapyStarAPI.serializer import (QuestionBankSerializer)

class StartedQuestionViews(APIView):

    def get(selt, request):
        Questions = QuestionBank.objects.filter(
            Question_Group__Lessons__Lesson_Group__Course__id_Course= 1
        )
        if Questions:
            serializer = QuestionBankSerializer(Questions, many=True)
            return Response(serializer.data)
        else:
            return Response(
                    {"error": "không có dữ liệu"},
                    status = status.HTTP_400_NOT_FOUND)
