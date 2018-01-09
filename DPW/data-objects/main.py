# data objects
import webapp2


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello world!')

        luke = Character()
        luke.name = "Luke Sykwalker"
        luke.profession = "Jedi Knight"
        luke.age = 26
        luke.home_planet = "Tattooine"

        leia = Character()
        leia.name = "Princess Leia"
        leia.profession = "Princess"
        leia.age = luke.age
        leia.home_planet = "Alderan"

        yoda = Character()
        yoda.name = "Master Yoda"
        yoda.profession = "Jedi Knight"
        yoda.age = 762
        yoda.home_planet = "Dagobah"

        characters = [luke, leia, yoda]
        print characters[0].profession


class Character(object):
    def __init__(self):  # constructor function
        self.name = ""
        self.profession = ""
        self.age = 0
        self.home_planet = ""


app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
