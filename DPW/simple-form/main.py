'''
Ben Forshey
DWP Online
12 Feb 2015
Simple Form
'''
import webapp2
from template import CardTemplate
from template import CardResults


class MainHandler(webapp2.RequestHandler):
    def get(self):

        # instantiate two instances of classes in "template.py"
        card_form = CardTemplate()
        card_results = CardResults()

        # logic for deciding which information / instance needs to be displayed / used
        if self.request.GET:

            # set varaiables to GET data (as defined by name attribute in HTML)
            sender_email = self.request.GET['sender-email']
            sender_name = self.request.GET['sender-name']
            recipient_email = self.request.GET['recipient-email']
            confirm_receipt = self.request.GET['confirm-receipt']
            message_font = self.request.GET['message-font']
            sender_message = self.request.GET['sender-message']

            # call method to pass data from GET request into results page
            self.response.write(card_results.prepare_template_GET(sender_email, sender_name, recipient_email, confirm_receipt, message_font, sender_message))

        else:
            # no GET request, so render the form instance of the CardForm class and call the method that will return the content
            self.response.write(card_form.prepare_template())

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
