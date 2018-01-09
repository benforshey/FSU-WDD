import webapp2
from pages import Page  # from pages file import Page class


class MainHandler(webapp2.RequestHandler):
    def get(self):
        new_page = Page()
        new_page.title = "Set via Getter Property!"
        new_page.body = "Changed with properties."
        self.response.write(new_page.whole_page)

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
