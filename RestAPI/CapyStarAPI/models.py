from django.db import models

# Create your models here.
class Topic(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class VocabularyQuestions(models.Model):
    question = models.CharField(max_length=255)
    option_a = models.CharField(max_length=100)
    option_b = models.CharField(max_length=100)
    option_c = models.CharField(max_length=100)
    option_d = models.CharField(max_length=100)
    correct_answer = models.CharField(max_length=1)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    # models.CASCADE khi một Topic bị xóa thì toàn bộ VocabularyQuestions chứa khóa của Topic đó cũng bị xóa theo
    def __str__(self):
        return self.question