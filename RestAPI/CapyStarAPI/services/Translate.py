from googletrans import Translator


class Translates:
    def __init__(self):
        self.translator = Translator()
    
    def ToTranslate(self, text):
        return self.translator.translate(text, src='en', dest='vi')