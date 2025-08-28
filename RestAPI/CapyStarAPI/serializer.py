from rest_framework import serializers

from .models import Topic
from .models import VocabularyQuestions

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id','name']

class VocabularyQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocabularyQuestions
        fields = ('id', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer', 'topic')

