from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework import status
from .models import (Topic, QuestionBank, QuestionBank, Learners)
from .serializer import (TopicSerializer, LearnersSerializer, QuestionBankSerializer)
from CapyStarAPI.services.learner import LearnerService

# Create your views here.
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'Đăng nhập và lấy toàn bộ dữ liệu người học': 'SigninLearner/',
        'Danh sách bài học bắt đầu': 'StartedQuestion/',
        'Lưu dữ liệu bài học đã hoàn thành cho người học': 'SaveSessionForUser/'
    } 
    return Response(api_urls)

# Cho người dùng đăng nhập và gửi toàn bộ dữ liệu khóa học cho người học
@api_view(['GET'])
def SignIn_Learner(request):
    try:
        email = request.data.get("email")
        password_hash = request.data.get("password_hash")
        if not email or not password_hash:
            return Response(
                {"error":"Trường Dữ Liệu Rỗng!"},
                status = status.HTTP_400_BAD_REQUEST
            ) 
        learner = Learners.objects.filter(email = email, password_hash = password_hash).first()
        if not learner:
            return Response(
                {"error":"Không tìm thấy người học từ email và mật khẩu!"},
                status = status.HTTP_404_NOT_FOUND
            )
        service = LearnerService(learner)
        data = service.SetUpDataForSiginLearner()
        return Response(
            data,
            status = status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
                {"error":"Không tìm thấy người học từ email và mật khẩu!"},
                status = status.HTTP_400_BAD_REQUEST
            )

# Lấy bài kiểm tra đầu tiên
@api_view(['GET'])
def Get_StartedQuestion(request):
    Questions = QuestionBank.objects.filter(
        Question_Group__Lessons__Lesson_Group__Course__id_Course= 1
    )
    if Questions:
        serializer = QuestionBankSerializer(Questions, many=True)
        return Response(serializer.data)
    else:
        return Response(status = status.HTTP_404_NOT_FOUND)


# Save dữ liệu khi người học hoàn thành 1 bài học
@api_view(['POST'])
def SaveSessionForLearner(request):
    false_answer = request.data.get("false_answer",[])
    learner_session = request.data.get("learner_session", [])
    email = request.data.get("email")
    password_hash = request.data.get("password_hash")

    if not false_answer or not false_answer or not email or not password_hash:
        return Response(
            {"error": "Dữ liệu rỗng"},
            status = status.HTTP_400_BAD_REQUEST
        )
    
    leaner = Learners.objects.filter(email = email, password_hash = password_hash).first()

    if not leaner:
        return Response(
            {"error": "Lỗi Dữ Liệu Người Dùng"},
            status = status.HTTP_404_NOT_FOUND
        )

    service = LearnerService(leaner)
    return service.SaveFalseAnswerAndSessonForLearner(false_answer, learner_session)

