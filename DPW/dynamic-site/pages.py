"""
Ben Forshey
DWP Online
26 Feb 2015
Dynamic Site
"""

# superclass to abstract HTML5 templating
class HTML5Page(object):
    # init variables that are required for an HTML5 page
    def __init__(self):
        self.title = ''
        self.description = ''
        self.web_fonts = ''
        self.css = ''
        self.body_content = ''
        self.script = ''
        self.__html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{self.title}</title>
    <meta name="description" content="{self.description}">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="{self.web_fonts}">
    <link rel="stylesheet" href="{self.css}">
</head>
<body>
    {self.body_content}
    <script src="{self.script}"></script>
</body>
</html>
        '''

    # getter and setter for private property __html_content
    @property
    def html_content(self):
        return self.__html_content

    @html_content.setter
    def html_content(self, h):
        self.__html_content = h

    # method to count length of strings (useful in limiting titles and descriptions)
    # intended to act as polymorphic function in subclass
    def word_count(self, string, length):
        count = len(string)  # store the length of the passed string
        # logic to determine which message to display
        if count > length:
            print "You have exceeded the limit."
        else:
            print "You have not exceeded the limit."

# class for the informational pages that will be displayed
class InfoPage(HTML5Page):
    def __init__(self):
        super(InfoPage, self).__init__()  # inherit from abstract superclass
        self.title = "Rope Guide"
        self.description = "Rope Guide will give you the specs you need to decide which rope is right for you."
        self.web_fonts = 'http://fonts.googleapis.com/css?family=Roboto:400,700,400italic|Roboto+Condensed'
        self.css = 'styles/main.css'
        self.body_content = '''<header>
    <h1>Ropes, Inc.</h1>
    <nav>
        <a href="#" class="nav">Home Page</a><a href="#" class="nav">Rope Store</a><a href="#" class="nav nav--current-selection">Rope Guide</a>
    </nav>
</header>
    <div class="content-container">
        <h2>Our Quality Promise</h2>
        <p>Ropes, Inc is dedicated to bringing you the highest quality lightly-used / once-used climbing ropes from the finest manufacturers at unbeatable prices. We're so confident in our ropes that we stand behind them as we sell them to you.</p>
        <a href="?default=True" class="view-link">Our Ropes</a>
        <a href="?milspec=True" class="view-link">Milspec</a>
        <a href="?kelty=True" class="view-link">Kelty</a>
        <a href="?spectra=True" class="view-link">Spectra</a>
        <a href="?tether=True" class="view-link">Tether</a>
        <a href="?aircore=True" class="view-link">Aircore</a><br/>
        '''
        self.view = ''
        self.footer = '''<footer>
    <p>&copy; Ropes, Inc 2015</p>
</footer>

        '''
        self.script = 'js/main.js'
        self.html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{self.title}</title>
    <meta name="description" content="{self.description}">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="{self.web_fonts}">
    <link rel="stylesheet" href="{self.css}">
</head>
<body>
        {self.body_content}
        {self.view}
    </div>
    {self.footer}
    <script src="{self.script}"></script>
</body>
</html>
        '''

    # polymorphism of function in superclass (made to be more specific for this class)
    # all in the log files, but this isn't information that I'd want displayed to the user
    def word_count(self, string, length):
        count = len(string)  # store the length of the passed string
        # instructions
        print "SEO best practices dictate that description meta tags be less than 150 characters and title meta tags be less than 50 characters."
        # logic to determine which message to display
        if count > length:
            return "You have exceeded the count."
        else:
            return "You have not exceeded count."

    # set formatting for local variables and return for use
    def format_locals(self):
        html5 = self.html_content
        html5 = html5.format(**locals())
        return html5