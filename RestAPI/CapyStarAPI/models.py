from django.db import models

# Create your models here.
class Learners(models.Model):
    id_learners = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=200, null=True, blank=True)
    password_hash = models.CharField(max_length=200, null=True, blank=True)
    full_name = models.CharField(max_length=200, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return self.full_name

class Topic(models.Model):
    id_Topic = models.BigAutoField(primary_key=True)
    Topic_name = models.CharField(max_length=100)
    Topic_description = models.CharField(max_length=100)
    def __str__(self):
        return self.Topic_name

class Levels(models.Model):
    id_level = models.CharField(max_length=100, primary_key=True)
    Level_name = models.CharField(max_length=255)
    Level_description = models.CharField(max_length=255)
    def __str__(self):
        return self.Level_name
    
class Course(models.Model):
    id_Course = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    completion = models.BooleanField(default=False)
    completion_date = models.DateTimeField(null = True, blank = True)
    Level = models.ForeignKey(Levels, on_delete=models.CASCADE, related_name="Course")
    Topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="Course")
    def __str__(self):
        return self.title

class Learner_Profiles(models.Model):
    id_Profiles = models.BigAutoField(primary_key=True)
    Learners = models.ForeignKey(Learners, on_delete=models.CASCADE, related_name="profiles")
    aim = models.CharField(max_length=255, null=True, blank=True)
    # Thêm trường để lưu điểm trung bình (GPA) với độ chính xác mong muốn
    # max_digits=4: Tổng số chữ số là 4 (ví dụ: 10.00)
    # decimal_places=2: 2 chữ số sau dấu phẩy (ví dụ: 9.50)
    score = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=0)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="profiles")
    progress_learners = models.CharField(max_length=255, null=True, blank=True)
    Level = models.ForeignKey(Levels, on_delete=models.CASCADE, null=True, blank=True, related_name="profiles")
    def __str__(self):
        return f"Learner Profile {self.Learners.full_name}"

class Lesson_Group(models.Model):
    id_group = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="Lesson_Group")
    Level = models.ForeignKey(Levels, on_delete=models.CASCADE, related_name="Lesson_Group")
    Topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="Lesson_Group")
    def __str__(self):
        return f"Lession Group {self.Topic.Topic_name} - {self.Level.Level_name}"

class Lessons(models.Model):
    id_lessons = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    completion = models.BooleanField(default=False)
    completion_date = models.DateTimeField(null = True, blank = True)
    Lesson_Group = models.ForeignKey(Lesson_Group, on_delete=models.CASCADE, related_name="lessons")
    Level = models.ForeignKey(Levels, on_delete=models.CASCADE, related_name="lessons")
    Topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="lessons")
    def __str__(self):
        return self.title
    
class LearningSession(models.Model):
    id_session = models.BigAutoField(primary_key=True)
    learner = models.ForeignKey(Learners, on_delete=models.CASCADE, related_name="sessions")
    lesson = models.ForeignKey(Lessons, on_delete=models.CASCADE, related_name="sessions")
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    time_spent = models.IntegerField(null=True, blank=True)  # tính bằng giây
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.id_session} - {self.learner.full_name}"

class QuestionBank(models.Model):
    QUESTION_TYPES = [
        ('vocabulary', 'Vocabulary'),
        ('reading', 'Reading'),
        ('grammar', 'Grammar'),
        ('listening', 'Listening'),
    ]

    id_question = models.AutoField(primary_key=True)
    question = models.TextField()
    question_type = models.CharField(max_length=50, choices=QUESTION_TYPES)

    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="questions")
    level = models.ForeignKey(Levels, on_delete=models.CASCADE, related_name="questions")

    # Vocabulary fields
    option_a = models.CharField(max_length=200, blank=True, null=True)
    option_b = models.CharField(max_length=200, blank=True, null=True)
    option_c = models.CharField(max_length=200, blank=True, null=True)
    option_d = models.CharField(max_length=200, blank=True, null=True)
    correct_answer = models.CharField(max_length=200, blank=True, null=True)

    # Reading / Listening fields 
    passage = models.TextField(blank=True, null=True)

    # Grammar fields
    grammar_rule = models.TextField(blank=True, null=True)     # mô tả quy tắc ngữ pháp
    grammar_example = models.TextField(blank=True, null=True)  # ví dụ minh họa

    # Listening fields
    audio_text = models.CharField(max_length=255, blank=True, null=True)  
    transcript = models.TextField(blank=True, null=True)                 
    explain_question = models.TextField(blank=True, null=True)  
    def __str__(self):
        return f"{self.question_type}: {self.question[:50]}"

class Question_Group(models.Model):
    id_QuestionGroup = models.BigAutoField(primary_key=True)
    Lessons = models.ForeignKey(Lessons, on_delete=models.CASCADE, related_name="Question_Group")
    Topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="Question_Group")
    Question_bank = models.ForeignKey(QuestionBank, on_delete=models.CASCADE, related_name="Question_Group")

    def __str__(self):
        return f"{self.Question_bank.question_type}: {self.Question_bank.question[:50]}"

class False_Answer(models.Model):
    Learners = models.ForeignKey(Learners, on_delete=models.CASCADE)
    Lessons = models.ForeignKey(Lessons, on_delete=models.CASCADE)
    Question_bank = models.ForeignKey(QuestionBank, on_delete=models.CASCADE)
    question = models.TextField()
    correct_answer = models.CharField(max_length=255)
    learners_answer = models.CharField(max_length=255)
    answered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"False Answer For User {self.Learners.full_name} - id: {self.Learners.id_learners}"


