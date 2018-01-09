import webapp2
from pages import Page  # from pages file import Page class


class MainHandler(webapp2.RequestHandler):
    def get(self):
        new_page = Page()
        new_page.body = "Something different than the attribute inherited by the class."
        self.response.write(new_page.print_out())
app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
