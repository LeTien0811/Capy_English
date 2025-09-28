from rest_framework.response import Response
from rest_framework import status
from CapyStarAPI.models import (Topic, Levels, Learners, QuestionBank, Learner_Profiles, Course, Lesson_Group,
                    Lessons, Question_Group, QuestionBank, LearningSession, False_Answer)
from CapyStarAPI.serializer import (TopicSerializer, LevelsSerializer, LearnersSerializer, CourseSerializer,
                        Learner_ProfilesSerializer, Lesson_GroupSerializer, LessonsSerializer,
                            LearningSessionSerializer, QuestionBankSerializer, 
                            Question_GroupSerializer, False_AnswerSerializer)
class LearnerService:

    def __init__(self, learner: Learners):
        self.learner = learner
    
    def SetUpDataForSiginLearner(self):
        try:                          
            topic = Topic.objects.all()
            level = Levels.objects.all()

            learner_profile = self.learner.profiles.first()

            course = None
            if learner_profile and learner_profile.Course:
                course = learner_profile.Course

            lesson_group = Lesson_Group.objects.none()
            lessons = Lessons.objects.none()
            if course:
                lesson_group = course.Lesson_Group.all()
                lesson_ids = [lg.id_group for lg in lesson_group]
                lessons = Lessons.objects.filter(Lesson_Group__in=lesson_ids)

        # Lấy các nhóm câu hỏi và ngân hàng câu hỏi liên quan đến bài học
            question_group = Question_Group.objects.none()
            question_bank = QuestionBank.objects.none()
            if lessons.exists():
                question_group = Question_Group.objects.filter(Lessons__in=lessons)
                question_bank_ids = [qg.Question_bank.id_question for qg in question_group]
                question_bank = QuestionBank.objects.filter(id_question__in=question_bank_ids)

        # Lấy lịch sử học tập và câu trả lời sai
            learning_session = self.learner.sessions.all()
            false_answer = self.learner.false_answer_set.all()
        
            learner_serializer = LearnersSerializer(self.learner)
            topic_serializer = TopicSerializer(topic, many=True)
            level_serializer = LevelsSerializer(level, many=True)
            learner_profile_serializer = Learner_ProfilesSerializer(learner_profile)
            course_serializer = CourseSerializer(course)
            lesson_group_serializer = Lesson_GroupSerializer(lesson_group, many=True)
            lesson_serializer = LessonsSerializer(lessons, many=True)
            question_group_serializer = Question_GroupSerializer(question_group, many=True)
            question_bank_serializer = QuestionBankSerializer(question_bank, many=True)
            learning_session_serializer = LearningSessionSerializer(learning_session, many=True)
            false_answer_serializer = False_AnswerSerializer(false_answer, many=True)
        

        # 4. Trả về Response
            response_data = {
                'learner': learner_serializer.data,
                'topic': topic_serializer.data,
                'level': level_serializer.data,
                'learner_profile': learner_profile_serializer.data,
                'course': course_serializer.data,
                'lesson_group': lesson_group_serializer.data,
                'lesson': lesson_serializer.data,
                'question_group': question_group_serializer.data,
                'question_bank': question_bank_serializer.data,
                'learning_session': learning_session_serializer.data,
                'false_answer': false_answer_serializer.data,
            }
            return response_data
        except AttributeError as e:
            return (
                {"error": f"Lỗi logic khi xử lý dữ liệu: {str(e)}"},
            )  
        except Exception as e:
            return (
                {"error": f"Đã xảy ra lỗi không mong muốn: {str(e)}"},
                )
    
    def SaveFalseAnswerAndSessonForLearner(self, false_answer, learner_session):
        errors = []
        save_false_answer = []

        if false_answer: 
            for item in false_answer:
                serializer = False_AnswerSerializer(data = item)
                if serializer.is_valid():
                    serializer.save(Learners = self.learner)
                    save_false_answer.append(serializer.data)
                else:
                    errors.append(
                        {"type": "false_answer",
                        "data": item,
                        "errors": serializer.errors})
                
        save_Session_Learner = {}
        session_serializer = LearningSessionSerializer(data = learner_session)
        if session_serializer.is_valid():
            session_serializer.save(learner = self.learner)
            save_Session_Learner = session_serializer.data
        else:
            errors.append(
                {"type": "learner_session",
                "data": learner_session,
                "errors": session_serializer.errors})
        
        data = {
            "false_answer": save_false_answer,
            "learner_session": save_Session_Learner
        }

        if errors:
            return Response({
                "message": "Một Số Dữ Liệu Không Hợp Lệ", 
                "errors": errors}, 
                status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "message": "Dữ liệu đã được lưu thành công",
            "data": data},
            status=status.HTTP_200_OK)
