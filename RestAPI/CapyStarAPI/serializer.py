from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Learners, Topic, Levels, QuestionBank, Learner_Profiles, Course, Lesson_Group, Lessons, Question_Group, QuestionBank, False_Answer, LearningSession

class LearnersSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        max_length=200, 
        required=False, # Đặt là bắt buộc nếu bạn muốn email là duy nhất
        allow_null=True,  # Tùy chọn, để đảm bảo nó có thể được lưu là NULL trong DB
        validators=[UniqueValidator(
            queryset=Learners.objects.all(), 
            message="Email này đã tồn tại."
        )]
    )
    class Meta:
        model = Learners
        fields = ('id_learners', 'email', 'password_hash', 'full_name', 'created_at')
        read_only_fields = ('id_learners', 'created_at',)

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id_Topic', 'Topic_name', 'Topic_description']

class LevelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Levels
        fields = ['id_level', 'Level_name', 'Level_description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id_Course', 'title', 'description', 'completion', 'completion_date',
                'Level', 'Topic')

class Learner_ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learner_Profiles
        fields = ('id_Profiles', 'Learners', 'aim', 'score', 'Course', 'progress_learners',
                'Level')
        
class Lesson_GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson_Group
        fields = ('id_group', 'title', 'description', 'Course', 'Level', 'Topic')  

class LessonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessons
        fields = ('id_lessons', 'title', 'description', 'completion', 'completion_date', 'Lesson_Group',
                'Level', 'Topic')

class LearningSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningSession
        fields = ('id_session', 'learner', 'lesson', 'score', 'time_spent', 'completed_at')
        read_only_fields = ('learner',)

class QuestionBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = ('id_question', 'question', 'question_type', 'option_a', 'option_b',
                'option_c', 'option_d', 'correct_answer', 'passage', 'grammar_rule', 
                'grammar_example',  'audio_text',  'transcript', 'explain_question', 'level', 'topic_id')

class Question_GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question_Group
        fields = ('id_QuestionGroup', 'Lessons', 'Topic', 'Question_bank')

class False_AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = False_Answer
        fields = ('id', 'Learners', 'Lessons', 'Question_bank', 'question', 'correct_answer', 'learners_answer', 'answered_at')
        read_only_fields = ('Learners',)
