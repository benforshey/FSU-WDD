import webapp2


class MainHandler(webapp2.RequestHandler):

    def get(self):
        # Tommy's grades
        t = Transcript()
        t.grade_1 = 90
        t.grade_2 = 100
        t.quiz_1 = 75
        t.quiz_2 = 99
        # t._Transcript__final_grade = 100  # the way to access private variables (but don't)
        # print t._Transcript__final_grade
        t.final_grade = 99  # through the setter
        self.response.write("Tommy's final grade is " + str(t.final_grade) + ".")

        # Sally's grades
        s = Transcript()
        s.grade_1 = 45
        s.grade_2= 80
        s.quiz_1 = 66
        s.quiz_2 = 76
        s.calc_grade()
        self.response.write("<br>Sally's final grade is " + str(s.final_grade) + ".")


class Transcript(object):
    def __init__(self):
        self.grade_1 = 0  # public (no uderscores)
        self.grade_2 = 0
        self.grade_3 = 0
        self.quiz_1 = 0
        self.quiz_2 = 0
        self.final_exam = 0
        self.__final_grade = 0  # private (two underscores)

    @property
    def final_grade(self):
        return self.__final_grade

    @final_grade.setter
    def final_grade(self, new_final_grade):
        self.__final_grade = new_final_grade

    # calculate final grade
    def calc_grade(self):
        self.__final_grade = (self.grade_1 + self.grade_2 + self.grade_3 + self.quiz_1 + self.quiz_2 + self.final_exam) / 5

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
