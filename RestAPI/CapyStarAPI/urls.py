from django.urls import path
from . import views
from CapyStarAPI.ViewsConfig.StartedQuestionViews import StartedQuestionViews
from CapyStarAPI.ViewsConfig.TranslateViews import TransalteViews
urlpatterns = [
    path('', views.ApiOverview, name= 'home'),
    path('SigninLearner/', views.SignIn_Learner, name= 'SignIn Learner'),
    path('StartedQuestion/', StartedQuestionViews.as_view(), name= 'Get_StartedQuestion'),
    path('SaveSessionForUser/', views.SaveSessionForLearner, name= 'set_SessionForUser'),
    path('HandleTranslate/', TransalteViews.as_view(), name= 'handle_Translate'),
    # Nếu không muốn có đường dẫn như này http://192.168.1.4:8000/api/QuestionForLearners/?Course_id=1 thì dùng lệnh bên dưới 
]