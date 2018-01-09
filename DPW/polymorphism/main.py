import webapp2

class MainHandler(webapp2.RequestHandler):
    def get(self):
        p = FormPage()
        p.inputs = [['first_name', 'text', 'First Name'], ['last_name', 'text', 'Last Name'], ['Submit', 'submit']]
        self.response.write(p.print_out())

class Page(object):  # is abstract, because only used as superclass
    def __init__(self):
        self._head = '''<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>'''
        self._body = "<h1>Class Page(object)</h1>"
        self._tail = '''</body>
</html>
        '''

    def print_out(self):
        return self._head + self._body + self._tail

class FormPage(Page):  # inherits public and protected attributes + any methods of parent class
    def __init__(self):
        super(FormPage, self).__init__()  # constructor function for superclass / parent class
        self._form_open = '<form method="GET">'
        self._form_close = '</form>'
        self.__inputs = []
        self._form_imputs = ''

    @property
    def inputs(self):
        pass

    # change private inputs var
    # sort through array and create HTML inputs
    @inputs.setter
    def inputs(self, arr):  # if I'm using the setter, I need to use a parameter (but not pass argument, because setter syntax is "attribute.setter_property = value") to hold the content of what's being set
        self.__inputs = arr
        for item in arr:
            self._form_imputs += '<input type="' + item[1] + '" name="' + item[0]
            try:
                self._form_imputs += '" placeholder="' + item[2] + '"/><br/>'
            except:
                self._form_imputs += '" /><br/>'
        print self._form_imputs

    # Polymorphism via method overriding!
    def print_out(self):
        return self._head + self._body + self._form_open + self._form_imputs + self._form_close + self._tail


app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
