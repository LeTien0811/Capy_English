from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview, name= 'home'),
    path('topic/', views.View_Topic, name= 'view_topic'),
    path('VocabularyQuestionsSerializer/', views.View_VocabularyQuestions, name= 'view_Question'),
]